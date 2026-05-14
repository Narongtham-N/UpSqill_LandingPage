output "cloudfront_url" {
  description = "URL of the CloudFront distribution"
  value       = "https://${aws_cloudfront_distribution.main.domain_name}"
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID used for invalidations"
  value       = aws_cloudfront_distribution.main.id
}

output "s3_frontend_bucket" {
  description = "Name of the S3 bucket for frontend"
  value       = aws_s3_bucket.frontend.id
}

output "aws_region" {
  description = "AWS region used for regional resources"
  value       = var.aws_region
}

output "custom_domain_url" {
  description = "Root URL of the production site"
  value       = local.cloudfront_domain_enabled ? "https://${var.root_domain}" : ""
}

output "www_custom_domain_url" {
  description = "WWW URL of the production site"
  value       = local.cloudfront_domain_enabled ? "https://www.${var.root_domain}" : ""
}

output "acm_dns_validation_records" {
  description = "DNS CNAME records to add at the external DNS provider for ACM validation"
  value = local.domain_enabled ? [
    for record in aws_acm_certificate.site[0].domain_validation_options : {
      domain = record.domain_name
      name   = record.resource_record_name
      type   = record.resource_record_type
      value  = record.resource_record_value
    }
  ] : []
}

output "external_dns_records" {
  description = "DNS records to add when dns_provider is external"
  value = local.domain_enabled && var.dns_provider == "external" ? {
    www = {
      name  = "www"
      type  = "CNAME"
      value = aws_cloudfront_distribution.main.domain_name
    }
    apex_note = "For the root/apex domain, use your DNS provider's ALIAS/ANAME/CNAME-flattening to ${aws_cloudfront_distribution.main.domain_name}, or forward the root domain to https://www.${var.root_domain}."
  } : null
}
