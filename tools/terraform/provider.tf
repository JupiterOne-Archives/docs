provider "aws" {
  skip_credentials_validation = true
  skip_metadata_api_check = true
  skip_requesting_account_id = true
  s3_force_path_style = true
  region = "us-east-1"
  access_key = "some-key"
  secret_key = "some-secret"

  endpoints {
  }
}
