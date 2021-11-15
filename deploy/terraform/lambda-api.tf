module "user_action_service_api" {
  source = "./modules/http_service_lambda"
  filename = "${var.deploy_config.work_dir}/terraform/dist/community-docs-api.zip"
  handler = "src/lambda/index.handler"
  function_name = "community-docs-api"
  role_name = var.lambda_user_action_service_role_name
  role_description = "Lambda execution role for the community-docs-api"
  runtime = "nodejs12.x"
  publish = "true"
  deploy_config = var.deploy_config

  environment_variables = local.environment_variables

  health_check_path = "/health-check"
  health_check_retry_limit = "4"
  health_check_retry_delay = "10"

  api_gateway_pathpart = "user-action"
  api_gateway_api_id = var.provision_api_gateway_aws_api_gateway_api_id
  api_gateway_authorizer_id = var.provision_api_gateway_aws_api_gateway_authorizer_id
  api_gateway_resource_latest_resource_id = var.provision_api_gateway_aws_api_gateway_api_root_resource_id
}

resource "aws_iam_role_policy_attachment" "lambda_user_action_service_api" {
  role = module.user_action_service_api.role_name
  policy_arn = aws_iam_policy.user_action_service_api.arn
}