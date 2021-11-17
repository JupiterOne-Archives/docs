locals {
  environment_variables = {
    ENVIRONMENT                          = var.target_name
    SENTRY_DSN                           = var.sentry_dsn

  }
}