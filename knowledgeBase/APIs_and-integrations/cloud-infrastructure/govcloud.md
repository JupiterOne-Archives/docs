# AWS GovCloud

## Integration Walkthrough

The integration instance configuration requires the `accessKeyId` of the
customer's IAM user to create credentials used to read infrastructure
information through AWS APIs. The instance configuraiton also requires the
`secretAccessKey` that is associated with the `accessKeyId`.

### In AWS

#### Step 1: Create IAM Policy

1. From the AWS GovCloud Console homepage, search and select **IAM** under
   Services.

2. Select **Policies**

3. Click **Create Policy**, select the **JSON** tab, and enter the following
   document content:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Resource": "*",
         "Action": [
           "access-analyzer:List*",
           "batch:Describe*",
           "batch:List*",
           "cloudhsm:DescribeBackups",
           "cloudhsm:DescribeClusters",
           "cloudhsm:ListTags",
           "cloudwatch:GetMetricData",
           "cloudwatch:List*",
           "dynamodb:Describe*",
           "dynamodb:List*",
           "ec2:GetEbsDefaultKmsKeyId",
           "ec2:GetEbsEncryptionByDefault",
           "ecr:Describe*",
           "ecr:GetLifecyclePolicy",
           "ecr:GetRepositoryPolicy",
           "ecr:List*",
           "elasticache:List*",
           "elasticfilesystem:Describe*",
           "elasticmapreduce:List*",
           "es:List*",
           "kinesis:Describe*",
           "kinesis:List*",
           "lambda:GetFunction",
           "macie2:GetFindings",
           "macie2:ListFindings",
           "s3:GetObjectRetention",
           "s3:GetObjectLegalHold",
           "s3:Get*Configuration",
           "shield:GetSubscriptionState",
           "sns:GetTopicAttributes",
           "sns:GetSubscriptionAttributes",
           "sns:ListTopics",
           "sns:ListSubscriptions",
           "sns:ListTagsForResource",
           "waf:List*",
           "waf:Get*",
           "waf-regional:List*",
           "waf-regional:Get*",
           "workspaces:List*"
         ]
       },
       {
         "Effect": "Allow",
         "Action": ["apigateway:GET"],
         "Resource": ["arn:aws:apigateway:*::/*"]
       }
     ]
   }
   ```

4. Click **Tags** then **Review** and verify the permissions.

5. Enter `{{productNameNoSpaces}}SecurityAudit` as the **Name** and click
   **Create Policy**.

#### Step 2: Create IAM User

1. Navigate to the **Users** page and select user you are using

2. Select **Add users**

3. Enter `{{productNameNoSpaces}}User` as the **user name** for the new user

4. Select **Access key - Programmatic access** under **Select AWS credential
   type**

5. Select **Next: Permissions**

6. Select the **Attach existing policies directly** tab

7. In the Policy search box, search for `SecurityAudit`. Select both
   `SecurityAudit` and `{{productNameNoSpaces}}SecurityAudit` policies.
   `SecurityAudit` is an AWS-managed IAM policy that grants access to read
   security configurations of AWS resources.

8. Click **Tags** then **Review** and verify user information is correct

9. Click **Create User**

10. Copy both the **AccessKeyId** and **SecretAccessKey** (click show to
    display) from the final screen. These values are needed for JupiterOne
    Configuration

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **AWS GovCloud** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this AWS account in
  JupiterOne. Ingested entities will have this value stored in `tag.AccountName`
  when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Account ID** of the GovCloud account you are ingesting data from.
- Enter the **Access Key ID** of the IAM user to create credentials in order to
  authenticate with AWS.
- Enter the **Secret Access Key** associated with Access Key Id.

4. Click **Create Configuration** once all values are provided.
