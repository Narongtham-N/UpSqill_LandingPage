variable "aws_region" {
  description = "AWS region for the S3 bucket and regional resources."
  type        = string
  default     = "ap-southeast-1"
}

variable "project_name" {
  description = "Lowercase project slug used in resource names and tags."
  type        = string

  validation {
    condition     = can(regex("^[a-z0-9][a-z0-9-]{1,23}$", var.project_name))
    error_message = "project_name must be 2-24 characters using only lowercase letters, numbers, and hyphens."
  }
}

variable "environment" {
  description = "Lowercase deployment environment, such as dev, staging, or prod."
  type        = string
  default     = "prod"

  validation {
    condition     = can(regex("^[a-z0-9][a-z0-9-]{1,11}$", var.environment))
    error_message = "environment must be 2-12 characters using only lowercase letters, numbers, and hyphens."
  }
}

variable "use_custom_domain" {
  description = "Whether to create an ACM certificate for root_domain and www.root_domain."
  type        = bool
  default     = false
}

variable "root_domain" {
  description = "Apex domain, for example upsqill.com. Leave empty to use the CloudFront domain only."
  type        = string
  default     = ""

  validation {
    condition     = var.root_domain == "" || can(regex("^[a-z0-9.-]+$", var.root_domain))
    error_message = "root_domain must be empty or a lowercase DNS name."
  }
}

variable "dns_provider" {
  description = "Where DNS is managed. Use external for Google/Squarespace DNS, or route53 for AWS Route53."
  type        = string
  default     = "external"

  validation {
    condition     = contains(["external", "route53"], var.dns_provider)
    error_message = "dns_provider must be external or route53."
  }
}

variable "attach_custom_domain_to_cloudfront" {
  description = "For external DNS, set true only after ACM DNS validation is complete. Route53 mode ignores this and attaches automatically."
  type        = bool
  default     = false
}

variable "cloudfront_price_class" {
  description = "CloudFront price class."
  type        = string
  default     = "PriceClass_100"

  validation {
    condition = contains([
      "PriceClass_100",
      "PriceClass_200",
      "PriceClass_All"
    ], var.cloudfront_price_class)
    error_message = "cloudfront_price_class must be PriceClass_100, PriceClass_200, or PriceClass_All."
  }
}

variable "default_cache_ttl" {
  description = "Default CloudFront cache TTL in seconds."
  type        = number
  default     = 3600
}

variable "max_cache_ttl" {
  description = "Maximum CloudFront cache TTL in seconds."
  type        = number
  default     = 86400
}

variable "enable_bucket_versioning" {
  description = "Whether to keep S3 object versions."
  type        = bool
  default     = true
}

variable "force_destroy_bucket" {
  description = "Whether Terraform can delete the S3 bucket even when objects remain. Keep false for production."
  type        = bool
  default     = false
}
