# SonarCloud Integration with JupiterOne

## SonarCloud + JupiterOne Integration Benefits

- Visualize SonarCloud organizations, groups, users, projects and issues in the
  JupiterOne graph.
- Map SonarCloud users to employees in your JupiterOne account.
- Monitor changes to SonarCloud users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches organizations, groups, users, projects and
  issues from SonarCloud to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- JupiterOne requires a REST API key. You need permission to create a user in
  SonarCloud that will be used to obtain the API key.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In SonarCloud

1. Generate Token -
   [Generate an API token](https://sonarcloud.io/account/security)
2. Supply generated token as `CLIENT_SECRET` env field
3. Enter the organization name(s) (comma separated if plural) as
   `CLIENT_ORGANIZATIONS` env field that you wish to be ingested

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **SonarCloud** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this SonarCloud
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- {{additional provider-specific settings}} Enter the **SonarCloud API Key**
  generated for use by JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **SonarCloud** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-integration document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER
DOCUMENTATION FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/main/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources    | Entity `_type`            | Entity `_class` |
| ------------ | ------------------------- | --------------- |
| Issue        | `sonarcloud_issue`        | `Issue`         |
| Organization | `sonarcloud_organization` | `Organization`  |
| Project      | `sonarcloud_project`      | `Project`       |
| User         | `sonarcloud_user`         | `User`          |
| UserGroup    | `sonarcloud_group`        | `UserGroup`     |

### Relationships

The following relationships are created:

| Source Entity `_type`     | Relationship `_class` | Target Entity `_type` |
| ------------------------- | --------------------- | --------------------- |
| `sonarcloud_group`        | **HAS**               | `sonarcloud_user`     |
| `sonarcloud_organization` | **HAS**               | `sonarcloud_group`    |
| `sonarcloud_organization` | **HAS**               | `sonarcloud_project`  |
| `sonarcloud_project`      | **HAS**               | `sonarcloud_issue`    |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
