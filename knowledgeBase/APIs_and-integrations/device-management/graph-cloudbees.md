# CloudBees

## CloudBees CI + JupiterOne Integration Benefits

- Visualize CloudBees CI users, groups, roles, and account in the JupiterOne
  graph.
- Map CloudBees CI users to employees in your JupiterOne account.
- Monitor changes to CloudBees CI users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches users, groups, roles, and account from
  CloudBees CI to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- You must have a deployed CloudBees CI Operations Center
- CloudBees CI supports Basic Authentication.
- You must have permission in JupiterOne to install new integrations.

## Permissions

This integration will only work if the user credentials provided have
administrator-level permissions.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In CloudBees CI

1. Create a user account
2. Take note of the login credentials which will latter be used for request
   authentication.

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **CloudBees CI** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this CloudBees CI
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **User ID**, **API key**, and **Hostname** for use by JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **CloudBees CI** integration tile and click it.
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

| Resources | Entity `_type`      | Entity `_class` |
| --------- | ------------------- | --------------- |
| Account   | `cloudbees_account` | `Account`       |
| Role      | `cloudbees_role`    | `AccessRole`    |
| User      | `cloudbees_user`    | `User`          |
| UserGroup | `cloudbees_group`   | `UserGroup`     |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `cloudbees_account`   | **HAS**               | `cloudbees_group`     |
| `cloudbees_account`   | **HAS**               | `cloudbees_role`      |
| `cloudbees_account`   | **HAS**               | `cloudbees_user`      |
| `cloudbees_group`     | **ASSIGNED**          | `cloudbees_role`      |
| `cloudbees_group`     | **HAS**               | `cloudbees_user`      |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
