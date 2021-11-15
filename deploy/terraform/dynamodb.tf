resource "aws_dynamodb_table" "user_action_table" {
  name           = var.jupiterone_project
  hash_key       = "__accountIdUserId"
  range_key      = "id"
  billing_mode   = var.dynamodb_billing_mode
  read_capacity  = var.dynamodb_read_capacity
  write_capacity = var.dynamodb_write_capacity

  attribute {
    name = "__accountIdUserId"
    type = "S"
  }

  attribute {
    name = "id"
    type = "S"
  }
}