data "aws_caller_identity" "current" {}

locals {
  domain_enabled            = var.use_custom_domain && var.root_domain != ""
  route53_dns_enabled       = local.domain_enabled && var.dns_provider == "route53"
  cloudfront_domain_enabled = local.domain_enabled && (local.route53_dns_enabled || var.attach_custom_domain_to_cloudfront)
  certificate_arn           = local.domain_enabled ? (local.route53_dns_enabled ? aws_acm_certificate_validation.site[0].certificate_arn : aws_acm_certificate.site[0].arn) : null
  name_prefix               = "${var.project_name}-${var.environment}"

  aliases = local.cloudfront_domain_enabled ? [
    var.root_domain,
    "www.${var.root_domain}"
  ] : []

  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

resource "aws_s3_bucket" "frontend" {
  bucket        = "${local.name_prefix}-frontend-${data.aws_caller_identity.current.account_id}"
  force_destroy = var.force_destroy_bucket

  tags = local.common_tags
}

resource "aws_s3_bucket_ownership_controls" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_versioning" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  versioning_configuration {
    status = var.enable_bucket_versioning ? "Enabled" : "Suspended"
  }
}

resource "aws_cloudfront_origin_access_control" "frontend" {
  name                              = "${local.name_prefix}-frontend-oac"
  description                       = "CloudFront access control for ${aws_s3_bucket.frontend.id}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_cache_policy" "static" {
  name        = "${local.name_prefix}-static-cache"
  comment     = "Static cache policy for ${local.name_prefix}"
  default_ttl = var.default_cache_ttl
  max_ttl     = var.max_cache_ttl
  min_ttl     = 0

  parameters_in_cache_key_and_forwarded_to_origin {
    enable_accept_encoding_brotli = true
    enable_accept_encoding_gzip   = true

    cookies_config {
      cookie_behavior = "none"
    }

    headers_config {
      header_behavior = "none"
    }

    query_strings_config {
      query_string_behavior = "none"
    }
  }
}

resource "aws_cloudfront_response_headers_policy" "security" {
  name    = "${local.name_prefix}-security-headers"
  comment = "Security headers for ${local.name_prefix}"

  security_headers_config {
    content_type_options {
      override = true
    }

    frame_options {
      frame_option = "DENY"
      override     = true
    }

    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = true
    }

    strict_transport_security {
      access_control_max_age_sec = 31536000
      include_subdomains         = true
      preload                    = true
      override                   = true
    }

    xss_protection {
      mode_block = true
      protection = true
      override   = true
    }
  }
}

resource "aws_cloudfront_distribution" "main" {
  aliases             = local.aliases
  comment             = "${local.name_prefix} static landing page"
  default_root_object = "index.html"
  enabled             = true
  http_version        = "http2and3"
  is_ipv6_enabled     = true
  price_class         = var.cloudfront_price_class
  tags                = local.common_tags

  origin {
    domain_name              = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.frontend.id
    origin_id                = "s3-${aws_s3_bucket.frontend.id}"
  }

  default_cache_behavior {
    allowed_methods            = ["GET", "HEAD", "OPTIONS"]
    cache_policy_id            = aws_cloudfront_cache_policy.static.id
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security.id
    target_origin_id           = "s3-${aws_s3_bucket.frontend.id}"
    viewer_protocol_policy     = "redirect-to-https"
  }

  custom_error_response {
    error_caching_min_ttl = 60
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404.html"
  }

  custom_error_response {
    error_caching_min_ttl = 60
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn            = local.cloudfront_domain_enabled ? local.certificate_arn : null
    cloudfront_default_certificate = local.cloudfront_domain_enabled ? false : true
    minimum_protocol_version       = local.cloudfront_domain_enabled ? "TLSv1.2_2021" : null
    ssl_support_method             = local.cloudfront_domain_enabled ? "sni-only" : null
  }
}

resource "aws_s3_bucket_policy" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontRead"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.frontend.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.main.arn
          }
        }
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.frontend]
}

data "aws_route53_zone" "root" {
  count        = local.route53_dns_enabled ? 1 : 0
  name         = var.root_domain
  private_zone = false
}

resource "aws_acm_certificate" "site" {
  count                     = local.domain_enabled ? 1 : 0
  provider                  = aws.us_east_1
  domain_name               = var.root_domain
  subject_alternative_names = ["www.${var.root_domain}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = local.common_tags
}

resource "aws_route53_record" "site_validation" {
  for_each = local.route53_dns_enabled ? {
    for dvo in aws_acm_certificate.site[0].domain_validation_options :
    dvo.domain_name => dvo
  } : {}

  allow_overwrite = true
  name            = each.value.resource_record_name
  records         = [each.value.resource_record_value]
  ttl             = 300
  type            = each.value.resource_record_type
  zone_id         = data.aws_route53_zone.root[0].zone_id
}

resource "aws_acm_certificate_validation" "site" {
  count           = local.route53_dns_enabled ? 1 : 0
  provider        = aws.us_east_1
  certificate_arn = aws_acm_certificate.site[0].arn
  validation_record_fqdns = [
    for record in aws_route53_record.site_validation : record.fqdn
  ]
}

resource "aws_route53_record" "alias_root" {
  count   = local.route53_dns_enabled ? 1 : 0
  name    = var.root_domain
  type    = "A"
  zone_id = data.aws_route53_zone.root[0].zone_id

  alias {
    evaluate_target_health = false
    name                   = aws_cloudfront_distribution.main.domain_name
    zone_id                = aws_cloudfront_distribution.main.hosted_zone_id
  }
}

resource "aws_route53_record" "alias_root_ipv6" {
  count   = local.route53_dns_enabled ? 1 : 0
  name    = var.root_domain
  type    = "AAAA"
  zone_id = data.aws_route53_zone.root[0].zone_id

  alias {
    evaluate_target_health = false
    name                   = aws_cloudfront_distribution.main.domain_name
    zone_id                = aws_cloudfront_distribution.main.hosted_zone_id
  }
}

resource "aws_route53_record" "alias_www" {
  count   = local.route53_dns_enabled ? 1 : 0
  name    = "www.${var.root_domain}"
  type    = "A"
  zone_id = data.aws_route53_zone.root[0].zone_id

  alias {
    evaluate_target_health = false
    name                   = aws_cloudfront_distribution.main.domain_name
    zone_id                = aws_cloudfront_distribution.main.hosted_zone_id
  }
}

resource "aws_route53_record" "alias_www_ipv6" {
  count   = local.route53_dns_enabled ? 1 : 0
  name    = "www.${var.root_domain}"
  type    = "AAAA"
  zone_id = data.aws_route53_zone.root[0].zone_id

  alias {
    evaluate_target_health = false
    name                   = aws_cloudfront_distribution.main.domain_name
    zone_id                = aws_cloudfront_distribution.main.hosted_zone_id
  }
}
