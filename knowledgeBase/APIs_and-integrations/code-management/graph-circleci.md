# CircleCI

## CircleCI + JupiterOne Integration Benefits

- Visualize CircleCI users, user groups, pipelines and projects in the
  JupiterOne graph.
- Map CircleCI users to employees in your JupiterOne account.
- Monitor changes to CircleCI users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches users, user groups, pipelines and projects
  from CircleCI to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- CircleCI supports basic authorization.
- JupiterOne requires a REST API key. You need permission to create a user in
  CircleCI that will be used to obtain the API key.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In CircleCI

1. Sign-up for a CircleCI account.
2. Link a VCS provider (Github/Bitbucket).
3. Take note of the provided domain.
4. In the dashboard, go to User Settings > Personal API Tokens.
5. Generate an API token.

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **CircleCI** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this CircleCI
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API key**, **Login** and **User id** for use by JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **CircleCI** integration tile and click it.
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

| Resources | Entity `_type`        | Entity `_class` |
| --------- | --------------------- | --------------- |
| Account   | `circleci_account`    | `Account`       |
| Pipeline  | `circleci_pipeline`   | `Configuration` |
| Project   | `circleci_project`    | `Repository`    |
| User      | `circleci_user`       | `User`          |
| UserGroup | `circleci_user_group` | `Group`         |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `circleci_account`    | **HAS**               | `circleci_user`       |
| `circleci_account`    | **HAS**               | `circleci_user_group` |
| `circleci_project`    | **HAS**               | `circleci_pipeline`   |
| `circleci_user_group` | **HAS**               | `circleci_project`    |
| `circleci_user_group` | **HAS**               | `circleci_user`       |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
