aws_region        = "ap-southeast-1"
project_name      = "upsqill"
environment       = "prod"
use_custom_domain = true
root_domain       = "upsqill.io"
dns_provider      = "external"

# For Google/Squarespace DNS:
# 1. Set use_custom_domain = true and root_domain = "yourdomain.com".
# 2. Run terraform apply, then add acm_dns_validation_records to Google DNS.
# 3. After ACM is issued, set this to true and run terraform apply again.
attach_custom_domain_to_cloudfront = true
