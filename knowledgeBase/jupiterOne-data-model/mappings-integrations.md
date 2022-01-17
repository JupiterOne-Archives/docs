# Integrations Mappings

## godaddy Mappings

### `godaddy_account <-OWNS- <ROOT>`



## google_cloud Mappings



## bitbucket Mappings

### `bitbucket_workspace <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Atlassian"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Atlassian"`
>   * `displayName = "Atlassian"`
>   * `_type = "atlassian"`

### `bitbucket_workspace <-OWNS- <ROOT>`

### `bitbucket_user -IS-> Person`

> **Target Filters**
>&nbsp;
>   * `bitbucketNickname = source.nickname`



## atspoke Mappings

### `atspoke_account <-OWNS- <ROOT>`



## jira Mappings

### `jira_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Jira"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Jira"`
>   * `displayName = "Jira"`
>   * `_type = "jira"`

### `jira_account <-OWNS- <ROOT>`



## whitehat Mappings

### `whitehat_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "WhiteHat"`

> **Transferred Properties**
>&nbsp;
>   * `name = "WhiteHat"`
>   * `displayName = "WhiteHat"`
>   * `_type = "whitehat"`

### `whitehat_scan <-PROVIDES- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "WhiteHat"`

> **Transferred Properties**
>&nbsp;
>   * `name = "WhiteHat"`
>   * `displayName = "WhiteHat"`
>   * `_type = "whitehat"`

### `whitehat_account <-OWNS- <ROOT>`



## cisco_amp Mappings

### `cisco_amp_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Cisco"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Cisco"`
>   * `displayName = "Cisco"`
>   * `_type = "cisco"`

### `cisco_amp_account <-OWNS- <ROOT>`



## github Mappings

### `github_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "GitHub"`

> **Transferred Properties**
>&nbsp;
>   * `name = "GitHub"`
>   * `displayName = "GitHub"`
>   * `_type = "github"`

### `github_account <-OWNS- <ROOT>`

### `github_user -IS-> Person`

> **Target Filters**
>&nbsp;
>   * `githubUsername = source.username`



## threatstack Mappings

### `threatstack_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Threat Stack"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Threat Stack"`
>   * `displayName = "Threat Stack"`
>   * `_type = "threatstack"`

### `threatstack_account <-OWNS- <ROOT>`

### `threatstack_agent -PROTECTS-> Host`

> **Target Filters**
>&nbsp;
>   * `instanceId = source.instanceId`

### `threatstack_agent -PROTECTS-> Host`

> **Target Filters**
>&nbsp;
>   * `hostname = source.hostname`



## nowsecure Mappings

### `nowsecure_account <-OWNS- <ROOT>`

### `nowsecure_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "NowSecure"`

> **Transferred Properties**
>&nbsp;
>   * `name = "NowSecure"`
>   * `displayName = "NowSecure"`
>   * `_type = "nowsecure"`



## malwarebytes Mappings

### `malwarebytes_account <-OWNS- <ROOT>`



## pagerduty Mappings

### `pagerduty_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "PagerDuty"`

> **Transferred Properties**
>&nbsp;
>   * `name = "PagerDuty"`
>   * `displayName = "PagerDuty"`
>   * `_type = "pagerduty"`

### `pagerduty_account <-OWNS- <ROOT>`



## gitlab Mappings



## artifactory Mappings

### `artifactory_account <-OWNS- <ROOT>`



## digicert Mappings

### `digicert_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "DigiCert"`

> **Transferred Properties**
>&nbsp;
>   * `name = "DigiCert"`
>   * `displayName = "DigiCert"`
>   * `_type = "digicert"`

### `digicert_account <-OWNS- <ROOT>`



## feroot Mappings

### `feroot_account <-OWNS- <ROOT>`



## crowdstrike Mappings

### `crowdstrike_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "CrowdStrike"`

> **Transferred Properties**
>&nbsp;
>   * `name = "CrowdStrike"`
>   * `displayName = "CrowdStrike"`
>   * `_type = "crowdstrike"`

### `crowdstrike_account <-OWNS- <ROOT>`



## snyk Mappings

### `snyk_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Snyk"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Snyk"`
>   * `displayName = "Snyk"`
>   * `_type = "snyk"`

### `snyk_account <-OWNS- <ROOT>`



## bugcrowd Mappings

### `bugcrowd_account <-OWNS- <ROOT>`

### `bugcrowd_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "BugCrowd"`

> **Transferred Properties**
>&nbsp;
>   * `name = "BugCrowd"`
>   * `displayName = "BugCrowd"`
>   * `_type = "bugcrowd"`



## detectify Mappings

### `detectify_account <-OWNS- <ROOT>`

### `detectify_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Detectify"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Detectify"`
>   * `displayName = "Detectify"`
>   * `_type = "detectify"`



## duo Mappings

### `duo_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Duo"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Duo"`
>   * `displayName = "Duo"`
>   * `_type = "duo"`

### `duo_account <-OWNS- <ROOT>`



## AWS Mappings

### `aws_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Amazon Web Services"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Amazon Web Services"`
>   * `displayName = "AWS"`
>   * `_type = "aws"`
>   * `category = "CSP"`
>   * `webLink = "https://aws.amazon.com/"`
>   * `website = "https://aws.amazon.com/"`
>   * `linkToDPA = "https://d1.awsstatic.com/legal/aws-gdpr/AWS_GDPR_DPA.pdf"`
>   * `linkToISA = "https://aws.amazon.com/compliance/programs/"`
>   * `linkToMSA = "https://aws.amazon.com/agreement/"`
>   * `linkToSLA = "https://aws.amazon.com/legal/service-level-agreements/"`
>   * `privacyPolicy = "https://aws.amazon.com/privacy/"`
>   * `termsConditions = "https://aws.amazon.com/service-terms/"`
>   * `statusPage = "https://status.aws.amazon.com/"`
>   * `active = true`
>   * `validated = true`

### `Vendor -PROVIDES-> Control`

> **Target Filters**
>&nbsp;
>   * `_key = "aws::control:data-center-security"`

> **Transferred Properties**
>&nbsp;
>   * `_type = "aws_control"`
>   * `_key = "aws::control:data-center-security"`
>   * `name = "AWS Data Center Security Controls"`
>   * `description = "AWS Data Center Security Controls"`
>   * `category = "physical"`
>   * `function = "data-center-security"`
>   * `vendor = "AWS"`
>   * `webLink = "https://aws.amazon.com/compliance/data-center/controls/"`

### `aws_cloudfront_distribution -CONNECTS-> internet`

> **Target Filters**
>&nbsp;
>   * `_key = "global:internet"`

> **Transferred Properties**
>&nbsp;
>   * `_type = "internet"`
>   * `_key = "global:internet"`

### `aws_account <-OWNS- <ROOT>`

### `aws_iam_user -IS-> Person`

> **Target Filters**
>&nbsp;
>   * `email = [source.username,source.tag.Email]`

### `aws_transfer_server -CONNECTS-> Internet`

### `aws_instance -USES-> aws_iam_role`

> **Target Filters**
>&nbsp;
>   * `instanceProfileId = source.iamInstanceProfileId`

### `aws_ecs_container_instance <-RUNS- aws_instance`

> **Target Filters**
>&nbsp;
>   * `instanceId = source.ec2InstanceId`

### `aws_ecs_task <-TRIGGERS- aws_ecs_service`

> **Target Filters**
>&nbsp;
>   * `deployments = source.startedBy`

### `aws_ecs_task_definition -USES-> aws_ecr_image`

> **Target Filters**
>&nbsp;
>   * `fullName = source.containerImages`

### `aws_guardduty_finding <-HAS- aws_account`

> **Target Filters**
>&nbsp;
>   * `id = source.accountId`

### `aws_guardduty_finding <-HAS- aws_iam_role`

> **Target Filters**
>&nbsp;
>   * `id = source.roleId`

### `aws_guardduty_finding <-HAS- aws_iam_user`

> **Target Filters**
>&nbsp;
>   * `id = source.userId`

### `aws_guardduty_finding <-HAS- aws_iam_access_key`

> **Target Filters**
>&nbsp;
>   * `id = source.accessKeyId`

### `aws_guardduty_finding <-HAS- Person`

> **Target Filters**
>&nbsp;
>   * `userId = source.userName`

### `aws_ecr_image <-USES- (Host|Function|Container)`

> **Target Filters**
>&nbsp;
>   * `containerImages = source.fullName`

### `aws_efs_file_system <-USES- (Host|Function|Container)`

> **Target Filters**
>&nbsp;
>   * `efsArns = source.arn`



## fastly Mappings

### `fastly_account <-OWNS- <ROOT>`



## sentinelone Mappings

### `sentinelone_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "SentinelOne"`

> **Transferred Properties**
>&nbsp;
>   * `name = "SentinelOne"`
>   * `displayName = "SentinelOne"`
>   * `_type = "sentinelone"`

### `sentinelone_account <-OWNS- <ROOT>`

### `sentinelone_agent -PROTECTS-> user_endpoint`

> **Target Filters**
>&nbsp;
>   * `deviceId = source.uuid`

> **Transferred Properties**
>&nbsp;
>   * `deviceId = source.uuid`
>   * `_type = "user_endpoint"`
>   * `users = source.lastLoggedInUserName`



## servicenow Mappings

### `servicenow_account <-OWNS- <ROOT>`



## microsoft-365 Mappings

### `microsoft_365_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Microsoft"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Microsoft"`
>   * `displayName = "Microsoft"`
>   * `_type = "microsoft_365"`

### `microsoft_365_account <-OWNS- <ROOT>`

### `azure_user -IS-> Person`

> **Source Filters**
>&nbsp;
>   * `email = !null`

> **Target Filters**
>&nbsp;
>   * `email = toLowerCase(source.email)`

> **Transferred Properties**
>&nbsp;
>   * `email = toLowerCase(source.email)`
>   * `displayName = source.name`
>   * `name = source.name`
>   * `firstName = source.firstName`
>   * `lastName = source.lastName`
>   * `_type = "employee"`
>   * `userId = source.username`
>   * `title = source.jobTitle`



## heroku Mappings

### `heroku_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Heroku"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Heroku"`
>   * `displayName = "Heroku"`
>   * `_type = "heroku"`

### `heroku_account <-OWNS- <ROOT>`



## knowbe4 Mappings

### `knowbe4_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "KnowBe4"`

> **Transferred Properties**
>&nbsp;
>   * `name = "KnowBe4"`
>   * `displayName = "KnowBe4"`
>   * `_type = "knowbe4"`

### `knowbe4_account <-OWNS- <ROOT>`



## cbdefense Mappings

### `carbonblack_psc_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Carbon Black"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Carbon Black"`
>   * `displayName = "Carbon Black"`
>   * `_type = "carbonblack"`

### `carbonblack_psc_account <-OWNS- <ROOT>`



## onelogin Mappings

### `onelogin_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "OneLogin"`

> **Transferred Properties**
>&nbsp;
>   * `name = "OneLogin"`
>   * `displayName = "OneLogin"`
>   * `_type = "onelogin"`

### `onelogin_account <-OWNS- <ROOT>`



## airwatch Mappings

### `airwatch_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "VMware"`

> **Transferred Properties**
>&nbsp;
>   * `name = "VMware"`
>   * `displayName = "VMware"`
>   * `_type = "vmware"`

### `airwatch_account <-OWNS- <ROOT>`



## jamf Mappings

### `jamf_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Jamf"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Jamf"`
>   * `displayName = "Jamf"`
>   * `_type = "jamf"`

### `jamf_account <-OWNS- <ROOT>`



## veracode Mappings

### `veracode_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Veracode"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Veracode"`
>   * `displayName = "Veracode"`
>   * `_type = "veracode"`

### `veracode_scan <-PROVIDES- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Veracode"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Veracode"`
>   * `displayName = "Veracode"`
>   * `_type = "veracode"`

### `veracode_account <-OWNS- <ROOT>`



## checkmarx Mappings

### `checkmarx_account <-OWNS- <ROOT>`



## hackerone Mappings

### `hackerone_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "HackerOne"`

> **Transferred Properties**
>&nbsp;
>   * `name = "HackerOne"`
>   * `displayName = "HackerOne"`
>   * `_type = "hackerone"`

### `hackerone_account <-OWNS- <ROOT>`



## okta Mappings

### `okta_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Okta"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Okta"`
>   * `displayName = "Okta"`
>   * `_type = "okta"`

### `okta_account <-OWNS- <ROOT>`

### `okta_user -IS-> Person`

> **Source Filters**
>&nbsp;
>   * `employeeType = !(bot|generic|service|shared|system)`
>   * `userType = !(bot|generic|service|shared|system)`

> **Target Filters**
>&nbsp;
>   * `email = toLowerCase(source.login)`

> **Transferred Properties**
>&nbsp;
>   * `email = toLowerCase(source.login)`
>   * `displayName = "{source.firstName} {source.lastName}"`
>   * `name = "{source.firstName} {source.lastName}"`
>   * `firstName = source.firstName`
>   * `lastName = source.lastName`
>   * `_type = "employee"`
>   * `employeeType = source.employeeType`
>   * `employeeId = source.employeeNumber`
>   * `userId = source.username`
>   * `department = source.department`
>   * `division = source.division`
>   * `location = source.location`
>   * `title = source.title`
>   * `manager = source.manager`
>   * `managerId = source.managerId`
>   * `managerEmail = source.managerEmail`
>   * `bitbucketUsername = source.bitbucketUsername`
>   * `githubUsername = source.githubUsername`

### `okta_application -CONNECTS-> azure_account`

> **Source Filters**
>&nbsp;
>   * `appAccountType = office365_account`
>   * `isSAMLApp = true`

> **Target Filters**
>&nbsp;
>   * `verifiedDomains = source.appDomain`

### `okta_application -CONNECTS-> source.appAccountType`

> **Source Filters**
>&nbsp;
>   * `isMultiInstanceApp = true`
>   * `isSAMLApp = true`

> **Target Filters**
>&nbsp;
>   * `accountId = source.appAccountId`

> **Transferred Properties**
>&nbsp;
>   * `vendor = source.appVendorName`
>   * `accountId = source.appAccountId`
>   * `primaryDomain = [source.appAccountId,source.appDomain]`
>   * `displayName = source.appAccountId`
>   * `_type = source.appAccountType`
>   * `ssoEnabled = true`

### `okta_application -CONNECTS-> source.appAccountType`

> **Source Filters**
>&nbsp;
>   * `isMultiInstanceApp = true`
>   * `isSAMLApp = true`

> **Target Filters**
>
>   * `primaryDomain = [source.appAccountId,source.appDomain]`

> **Transferred Properties**
>&nbsp;
>   * `vendor = source.appVendorName`
>   * `accountId = source.appAccountId`
>   * `primaryDomain = [source.appAccountId,source.appDomain]`
>   * `displayName = source.appAccountId`
>   * `_type = source.appAccountType`
>   * `ssoEnabled = true`

### `okta_application -CONNECTS-> Account`

> **Source Filters**
>&nbsp;
>   * `isMultiInstanceApp = false`
>   * `isSAMLApp = true`

> **Transferred Properties**
>&nbsp;
>   * `vendor = source.appVendorName`
>   * `name = source.appAccountType`
>   * `displayName = source.appAccountType`
>   * `_type = source.appAccountType`
>   * `ssoEnabled = true`

### `employee <-EMPLOYS- <ROOT>`



## cloudflare Mappings

### `cloudflare_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Cloudflare"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Cloudflare"`
>   * `displayName = "Cloudflare"`
>   * `_type = "cloudflare"`

### `cloudflare_account <-OWNS- <ROOT>`



## wazuh Mappings

### `wazuh_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Wazuh"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Wazuh"`
>   * `displayName = "Wazuh"`
>   * `_type = "wazuh"`

### `wazuh_account <-OWNS- <ROOT>`



## jumpcloud Mappings

### `jumpcloud_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "JumpCloud"`

> **Transferred Properties**
>&nbsp;
>   * `name = "JumpCloud"`
>   * `displayName = "JumpCloud"`
>   * `_type = "jumpcloud"`

### `jumpcloud_account <-OWNS- <ROOT>`

### `jumpcloud_user -IS-> Person`

> **Source Filters**
>&nbsp;
>   * `employeeType = !(bot|generic|service|shared|system)`
>   * `sambaServiceUser = !true`

> **Target Filters**
>&nbsp;
>   * `email = toLowerCase(source.email)`

> **Transferred Properties**
>&nbsp;
>   * `email = toLowerCase(source.email)`
>   * `displayName = source.displayName`
>   * `name = "{source.firstName} {source.lastName}"`
>   * `firstName = source.firstName`
>   * `lastName = source.lastName`
>   * `_type = "employee"`
>   * `employeeType = source.employeeType`
>   * `employeeId = source.employeeId`
>   * `userIds = source.username`
>   * `title = source.jobTitle`
>   * `bitbucketUsername = source.bitbucketUsername`
>   * `githubUsername = source.githubUsername`



## snipe-it Mappings

### `snipeit_account <-OWNS- <ROOT>`

### `snipeit_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Snipe-IT"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Snipe-IT"`
>   * `displayName = "Snipe-IT"`
>   * `_type = "snipeit"`



## whois Mappings



## tenable-cloud Mappings

### `tenable_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Tenable Cloud"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Tenable Cloud"`
>   * `displayName = "Tenable Cloud"`
>   * `_type = "tenable_cloud"`

### `tenable_account <-OWNS- <ROOT>`



## azure Mappings

### `azure_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Microsoft"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Microsoft"`
>   * `displayName = "Microsoft"`
>   * `_type = "azure"`

### `azure_account <-OWNS- <ROOT>`

### `azure_user -IS-> Person`

> **Source Filters**
>&nbsp;
>   * `email = !null`

> **Target Filters**
>&nbsp;
>   * `email = toLowerCase(source.email)`

> **Transferred Properties**
>&nbsp;
>   * `email = toLowerCase(source.email)`
>   * `displayName = source.name`
>   * `name = source.name`
>   * `firstName = source.firstName`
>   * `lastName = source.lastName`
>   * `_type = "employee"`
>   * `userId = source.username`
>   * `title = source.jobTitle`



## azure-devops Mappings

### `azure_devops_account <-OWNS- <ROOT>`



## qualys Mappings

### `qualys_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Qualys"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Qualys"`
>   * `displayName = "Qualys"`
>   * `_type = "qualys"`

### `qualys_account <-OWNS- <ROOT>`

### `Finding <-HAS- aws_instance`

> **Source Filters**
>&nbsp;
>   * `ec2InstanceArn = !null`

> **Target Filters**
>&nbsp;
>   * `_key = source.ec2InstanceArn`

> **Transferred Properties**
>&nbsp;
>   * `_key = source.ec2InstanceArn`
>   * `_type = "aws_instance"`

### `Finding <-HAS- Host`

> **Source Filters**
>&nbsp;
>   * `ec2InstanceArn = null`

> **Target Filters**
>&nbsp;
>   * `fqdn = source.fqdn`

> **Transferred Properties**
>&nbsp;
>   * `fqdn = source.fqdn`



## integration-benchmark Mappings



## trend_micro Mappings

### `trend_micro_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Trend Micro"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Trend Micro"`
>   * `displayName = "Trend Micro"`
>   * `_type = "trend_micro"`

### `trend_micro_account <-OWNS- <ROOT>`



## slack Mappings



## google Mappings

### `google_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Google"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Google"`
>   * `displayName = "Google"`
>   * `_type = "google"`

### `google_account <-OWNS- <ROOT>`

### `google_user -IS-> Person`

> **Source Filters**
>&nbsp;
>   * `employeeType = !(bot|generic|service|shared|system)`
>   * `userType = !(bot|generic|service|shared|system)`
>   * `role = !(bot|generic|service|shared|system)`

> **Target Filters**
>&nbsp;
>   * `email = toLowerCase(source.email)`

> **Transferred Properties**
>&nbsp;
>   * `email = toLowerCase(source.email)`
>   * `aliases = toLowerCase(source.aliases)`
>   * `displayName = "{source.firstName} {source.lastName}"`
>   * `name = "{source.firstName} {source.lastName}"`
>   * `firstName = source.firstName`
>   * `lastName = source.lastName`
>   * `_type = "employee"`
>   * `employeeType = source.employeeType`
>   * `employeeId = source.employeeNumber`
>   * `userIds = source.username`
>   * `title = source.title`
>   * `manager = source.manager`
>   * `managerId = source.managerId`
>   * `managerEmail = source.managerEmail`
>   * `bitbucketUsername = source.bitbucketUsername`
>   * `githubUsername = source.githubUsername`



## snowflake Mappings

### `snowflake_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Snowflake"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Snowflake"`
>   * `displayName = "Snowflake"`
>   * `_type = "snowflake"`

### `snowflake_account <-OWNS- <ROOT>`



## cisco_meraki Mappings

### `cisco_maraki_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "Cisco Meraki"`

> **Transferred Properties**
>&nbsp;
>   * `name = "Cisco Meraki"`
>   * `displayName = "Cisco Meraki"`
>   * `_type = "cisco_maraki"`

### `cisco_maraki_account <-OWNS- <ROOT>`



## npm Mappings

### `npm_account <-HOSTS- Vendor`

> **Target Filters**
>&nbsp;
>   * `name = "npm"`

> **Transferred Properties**
>&nbsp;
>   * `name = "npm"`
>   * `displayName = "npm"`
>   * `_type = "npm"`

### `npm_account <-OWNS- <ROOT>`



## rapid7 Mappings

### `rapid7_account <-OWNS- <ROOT>`
