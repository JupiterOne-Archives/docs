resource "aws_iam_policy" "user_action_service_api" {
  name = var.lambda_user_action_service_role_name
  description = "Allows for the user-action service api to access the resources it needs"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:Query",
        "dynamodb:GetItem",
        "dynamodb:BatchWriteItem",
        "dynamodb:UpdateItem"
      ],
      "Resource": [
        "${aws_dynamodb_table.user_action_table.arn}*"
      ]
    },
    {
      "Action": [
        "lambda:InvokeFunction"
      ],
      "Effect": "Allow",
      "Resource": [
        "${var.account_service_lambda_function_arn}"
      ]
    }
  ]
}
EOF
}