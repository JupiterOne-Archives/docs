# Starter Configurations for Insights Dashboards

J1 provides prebuilt starter configurations for you to use if you did not want to [import the JSON file](./insights-dashboards.md) for the dashboard of your choice. The following prebuilt dashboards available are:

- [AWS Accounts](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/aws-accounts)

  Shows AWS master accounts, sub-accounts, as well as validated/unvalidated external accounts discovered by JupiterOne via analysis of IAM policies and trusts.

  > Prerequisite:
  >
  > This dashboard requires the J1 AWS integration and works best with multiple AWS accounts configured using AWS Organizations.

- [AWS Cost Analysis](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/aws-cost-analysis)

  Uses helpful queries for identifying resources that can result in increasing costs and attack surface within your AWS environment. 

  > Prerequisite:
  >
  > This dashboard requires the J1 AWS integration and works best with multiple AWS accounts configured using AWS Organizations.

- [AWS IAM](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/aws-iam)

  Shows AWS IAM Groups, Users, Roles, and important access policy assignments.

  > Prerequisite:
  >
  > This dashboard requires the J1 AWS integration.

- [AWS Resources](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/aws-resources)

  Shows key AWS resources and related metrics across accounts

  > Prerequisite:
  >
  > This dashboard requires the J1 AWS integration with one or more AWS accounts.

- [AWS S3 Security](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/aws-s3-security)

  Show several key configurations, metrics, and graphs related to AWS S3 security.

  > Prerequisite:
  >
  > This dashboard requires the J1 AWS integration.

- [Azure DataStore Resources](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/azure-datastore-security)

  Shows Azure container resources and encryption settings as well as logging options set on containers.

  > Prerequisite:
  >
  > This dashboard requires the J1 Azure integration.

- [Azure Resources](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/azure-resources)

  Shows Azure resources covering encryption settings, guest access, and resource access to key vaults.

  > Prerequisite:
  >
  > This dashboard requires the J1 Azure integration.

- [Critical Asset Attack Surface](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/critical-attack-surface)

  Critical assets are those that are business-critical, defined by contextual attributes in J1 Assets. The assets that are directly exposed to the internet or directly allowing access to everyone should be immediately mitigated. The number should remain zero. There is a Critical Assets alert rule pack that can be imported to continuously monitor and alert on it. Additionally, there are widgets to show the attack surface associated with critical assets that are indirectly connected to the internet or allowing access to everyone. These attack surface assets are the immediate first contact point which, if compromised, could lead to the compromise of critical assets a few points away. These attack surface entities should be closely monitored for any configuration changes or any alerts/problems.

  At the bottom of this dashboard are a few widgets showing critical assets connected to user endpoints 1-2 degrees away that are not monitored or protected by an agent, and accessible by users without MFA. User endpoints and users are inherently risky, especially with a remote workforce. If any of those ae found, they should be remediated by installing a security agent on the user endpoint and enabling MFA on the user account.

  > Prerequisite:
  >
  > This dashboard requires critical assets to be configured and defined in J1 Assets.

- [Data Breach Cost](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/data-breach-cost)

  Shows sensitive data discovery findings from publicly accessible or unencrypted data stores, and use a formula to calculate the potential cost if based on the number of sensitive data records that could be exposed.

  > Prerequisite:
  >
  > This dashboard requires a DLP service to be enabled and integrated, such as Amazon Macie.

- [Data Protection](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/data-protection)

  Shows secure development related metrics, including repo counts by project, open pull requests by developer, pull requests with self-approved/unapproved commits, and pull requests with commits made by unknown/unvalidated developers.

  > Prerequisite:
  >
  > This dashboard requires integrations with GitHub or GitLab or Bitbucket. Additionally, to correctly identify known developers, an IdP/SSO integration such as Okta, Google, or Azure AD is needed.

- [Development](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/development)

  Shows secure development related metrics, including repo counts by project, open pull requests by developer, pull requests with self-approved/unapproved commits, and pull requests with commits made by unknown/unvalidated developers.

  > Prerequisite:
  >
  > This dashboard requires integrations with GitHub or GitLab or Bitbucket. Additionally, ito correctly identify known developers, an IdP/SSO integration such as Okta, Google, or Azure AD is needed.

- [GCP Compute Projects and Instances](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/gcp-compute)

  Shows important configurations related to GCP Compute Projects and Instances.

  > Prerequisite:
  >
  > This dashboard requires the J1 Google Cloud integration.

- [GCP IAM](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/gcp-iam)

  Shows GCP IAM users, roles, service accounts, and important access privilege information.

  > Prerequisite:
  >
  > This dashboard requires the J1 Google Cloud integration.

- [GDPR Data Locations](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/gdpr-data-locations)

  Shows data stores in the EU, US, and elsewhere.

  > Prerequisite:
  >
  > This dashboard requires J1 cloud infrastructure integrations such as AWS, Azure, and Google Cloud.

- [Google Workspace](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/google-workspace)

  Shows various counts of both admin and non-admin users, third-party OAuth tokens and non-active super-admins. Additional widgets allow for Chrome version insight as well as notification of outdated/vulnerable versions of Chrome (adjust query as-needed).

  > Prerequisite:
  >
  > This dashboard requires the J1 Google Workspace integration.

- [GitHub Insights](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/github-insights)

  Shows detailed information on GitHub accounts, reporting on user access, developer activity, collaborator details, insights on pull requests, and issue summaries by repo.

  > Prerequisite:
  >
  > This dashboard requires the J1 GitHub integration.

- [High Risk Assets ](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/high-risk-assets)

  Shows vulnerability findings associated with production and internet-facing systems, non-public data stores with public access, and public data stores containing sensitive data.

  > Prerequisite:
  >
  > This dashboard requires J1 cloud infrastruction integrations such as AWS, Azure, and Google Cloud.         

- [IR - Cloud Instance & Workload Analysis ](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/cloud-instance-workload-analysis)

  This is an interactive dashboard that prompts you to enter the hostname or IP address or instance ID of a cloud workload/instance.

  It answers these key questions for any given virtual instance or workload across all three major CSPs in seconds:

  - Is the workload/instance still active or online? What are its configurations?
  - What resources are connected to it?
  - What else are in the same blast radius?
  - How is it connected to the Internet (external attack path)?
  - Who has admin/privileged access to it?
  - What data stores does it have access to?

  > Prerequisite:
  >
  > This dashboard requires J1 cloud infrastructure integrations such as AWS, Azure, and Google Cloud.

- [IR - User Endpoint Blast Radius](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/user-endpoint-blast-radius)

  This is an interactive dashboard that prompts you to enter a macAddress of a device and visualize the device owner's access, full inventory of digital identities, and the resources they have access to.

  > Prerequisite:
  >
  > This dashboard works best when integrations related to user endpoint agents and SaaS applications is as complete as possible.

- [Jamf & CrowdStrike Sensor Activity](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/jamf-crowdstrike)

  Shows CrowdStrike sensor counts and non-responsive sensors. It compares JAMF enrolled devices to those both protected and not-protected by CrowdStrike, and reports missing JAMF-managed device encryption.

  > Prerequisite:
  >
  > This dashboard requires the following J1 integrations: CrowdStrike and JAMF. Some potential edits may be needed for the widget queries to accommodate integration names and the method and jamf_computer_group naming conventions you are using to distribute CrowdStrike sensor code. Select **Edit** for each widget and make the appropriate changes to match your system.

- [Jira Insights](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/jira-insights)

  Shows detailed information on Jira accounts, reporting on users, issues, and remediations.

  > Prerequisite:
  >
  > This dashboard requires the J1 Jira integration.

- [Network Security](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/network-security)

  This board contains several widgets:

  - A list of firewalls (e.g. network ACLs, security groups) allowing Internet access
  - A matrix table showing the ingress/egress access and allowed ports from/to an external network, including the internet
  - A matrix table showing the ingress/egress access and allowed ports between internal networks
  - A list of expired certificates
  - A list of DNS records not pointing to an internal resource
  - A list of domains/subdomains

- [Okta User Management](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/okta-user-management)

  Shows Okta users by current status, inactive users, and deprovisioned/inactive users with access to other accounts.

  > Prerequisite:
  >
  > This dashboard requires Okta and other user account services.

- [Resource Classification](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/resource-classification)

  Shows counts of documented risks from risk assessments based on their current status, and a listing of currently open risks.

  > Prerequisite:
  >
  > The risk records are ingested from either a specific Jira project, or can be entered directly into JupiterOne via the UI, API, or JSON upload.

- [Risk Register](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/risk-register)

  Shows a dynamically updating report of package dependencies in the software code repos and their corresponding licenses, which helpful to produce an open-source report for auditing.

  The dashboard can be shared with an auditor/customer/partner by generating a unique shareable link (similar to sharing a Google Doc).

  > Prerequisite:
  >
  > This dashboard requires integration with GitHub, GitLab, or Bitbucket. Additionally, because JupiterOne does not have access to code, a script to scan the dependencies is needed to capture the dependencies and licenses. An example script can be found [here](https://github.com/JupiterOne/secops-automation-examples/tree/master/npm-inventory).

- [Software Package Dependencies and Licenses](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/code-deps-licenses)

  Shows a dynamically updating report of package dependencies in the software code repos and their corresponding licenses, which is helpful to produce an open-source report for auditing.

  The dashboard can be shared with an auditor/customer/partner by generating a unique shareable link (similar to sharing a Google Doc).

  > Prerequisite:
  >
  > This dashboard requires integration with GitHub, GitLab, or Bitbucket. Additionally, because JupiterOne does not have access to code, a script to scan the dependencies is needed to capture the dependencies and licenses. An example script can be found [here](https://github.com/JupiterOne/secops-automation-examples/tree/master/npm-inventory).

- [Team Growth](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/team-growth)

  Shows total number of employees and the number of new team members added in the last 30/60/90 days.

  > Prerequisite:
  >
  > An integration to an identity provider or directory service, such as Okta, Azure AD, JumpCloud.

- [Team, Manager and Direct Reports](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/team-manager-direct-reports)

  This is an interactive dashboard that prompts you to enter an individual's email to get the person's peers/team members, manager, and direct reports.

  > Prerequisite:
  >
  > A J1 integration to an identity provider that is configured with a directory service with data related to people management. Integrations such as Google Workspace, Okta, Azure AD, JumpCloud, and HRIS integrations such as BambooHR.

- [User Access](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/user-access)

  Shows users across different environments/accounts, admin users, and shared/system user accounts.

  Within the Admin Users widget an additional query to find users that are assigned to roles which are tied to administrative IAM access policies is included. This is in addition to the first query that is finding users who are deemed to be administrators based on the type/role attribute directly on the user.

  > Prerequisite:
  >
  > This dashboard works best when integrations to different providers and accounts are as complete as possible.

- [User Endpoints](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/user-endpoints)

  Shows key metrics and status associated with user endpoints/devices and endpoint security agents.

  > Prerequisite:
  >
  > This dashboard requires J1 integration with endpoint protection agents such as Carbon Black, SentinelOne, CrowdStrike, Malwarebytes, Cisco AMP. Using the JupiterOne endpoint agents (powered by Stethoscope-app) can improve the richness of this dashboard as well.

- [User Training](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/user-training)

  Shows metrics and status related to security awareness training for endusers.

  > Prerequisite:
  >
  > This dashboard requires a J1 integration with a security awareness training provider, such as KnowBe4.

- [Vendor Management](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/vendor-mgmt)

  Shows metrics related to current vendors, and their validation state. This can be helpful to maintain a registry of vendors your company interacts with, and alert on newly discovered, unvalidated vendors.

  > Prerequisite:
  >
  > This dashboard requires one or more configured integrations, which create vendor assets. It also assumes you are using an IdP or SSO service (such as Google GSuite) that issues OAuth tokens against third-party vendor apps.

- [Vulnerability Reporting](https://github.com/JupiterOne/insights-dashboards/blob/main/src/boards/vuln-reporting)

  This dashboard presents multiple operational and reporting metrics to help with vulnerability management. It aggregates findings and risks across both infrastructure and application development, identifies the highest risk items by context, such as findings impacting production workloads and applications deployed to production.

  This dashboard also reports on vulnerability analytics and patterns -- Top 10 CVEs, Top 10 CWEs -- as well as workflow items such as Jira issues or records from other ticketing systems.

  > Prerequisite:
  >
  > This dashboard requires multiple configured J1 integrations to provide the following coverage as needed:
  >
  > - cloud infrastructure (AWS / Azure / GCP)
  > - application code repos (GitHub / GitLab / Bitbucket)
  > - infrastructure vulnerability scanners (AWS Inspector / Qualys / Tenable / etc.)
  > - code scanners (Snyk / Veracode / Rapid7 / etc.)