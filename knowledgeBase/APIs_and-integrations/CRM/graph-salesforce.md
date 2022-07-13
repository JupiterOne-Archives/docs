# Salesforce Integration with JupiterOne

## Salesforce + JupiterOne Integration Benefits

*   Visualize Salesforce users, roles, groups, policies, and permissions in the
    JupiterOne graph.
*   Map Salesforce users to employees in your JupiterOne account.
*   Monitor changes to Salesforce users using JupiterOne alerts.

## How it Works

*   JupiterOne periodically fetches users, roles, groups, policies, and
    permissions from Salesforce to update the graph.
*   Write JupiterOne queries to review and monitor updates to the graph, or
    leverage existing queries.
*   Configure alerts to take action when JupiterOne graph changes, or leverage
    existing alerts.

## Requirements

*   JupiterOne is a Salesforce Connected App that will require a user authorized
    to grant access to your Salesforce org’s data.
*   You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### Salesforce Account Creation (if you already have a Salesforce developer account you can omit this step)

1.  Navigate to the Salesforce developer account creation page or go to https://developer.salesforce.com/signup (note this must be a developer account. The integration does not run if you create a generic salesforce account).


### In JupiterOne

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Salesforce** integration tile and click it.
3.  Click the **Add Configuration** button and configure the following settings:

*   Enter the **Account Name** by which you'd like to identify this Salesforce
    account in JupiterOne. Ingested entities will have this value stored in
    `tag.AccountName` when **Tag with Account Name** is checked.
*   Enter a **Description** that will further assist your team when identifying
    the integration instance.
*   Select a **Polling Interval** that you feel is sufficient for your monitoring
    needs. You may leave this as `DISABLED` and manually execute the integration.

4.  Click **Create Configuration** after you have provided all the values. When you have entered the relevant form information, submitting the form
    redirects you to Salesforce to authorize the requested scopes. Click "Begin Authorization" to be redirected to Salesforce. From there, log in with your Salesforce developer account username and password.

6.  You may be directed back to JupiterOne to sign in again. After signing in you are at the Salesforce Integration page again and your integration can now run.

# How to Uninstall

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Salesforce** integration tile and click it.
3.  Identify and click the **integration to delete**.
4.  Click the **trash can** icon.
5.  Click **Remove** to delete the integration.

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

| Resources     | Entity `_type`              | Entity `_class` |
| ------------- | --------------------------- | --------------- |
| Group         | `salesforce_group`          | `Group`         |
| PermissionSet | `salesforce_permission_set` | `AccessPolicy`  |
| Profile       | `salesforce_profile`        | `Account`       |
| User          | `salesforce_user`           | `User`          |
| UserRole      | `salesforce_user_role`      | `AccessRole`    |

### Relationships

The following relationships are created:

| Source Entity `_type`  | Relationship `_class` | Target Entity `_type`       |
| ---------------------- | --------------------- | --------------------------- |
| `salesforce_group`     | **ASSIGNED**          | `salesforce_user_role`      |
| `salesforce_group`     | **HAS**               | `salesforce_group`          |
| `salesforce_group`     | **HAS**               | `salesforce_user`           |
| `salesforce_profile`   | **HAS**               | `salesforce_permission_set` |
| `salesforce_user`      | **ASSIGNED**          | `salesforce_permission_set` |
| `salesforce_user`      | **ASSIGNED**          | `salesforce_user_role`      |
| `salesforce_user`      | **HAS**               | `salesforce_profile`        |
| `salesforce_user_role` | **CONTAINS**          | `salesforce_user_role`      |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->

<!-- {J1_DOCUMENTATION_MARKER_END} -->
 
<!--  jupiterOneDocVersion=1-1-0 -->
