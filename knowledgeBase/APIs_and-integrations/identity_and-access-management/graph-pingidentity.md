# Ping Identity Integration with JupiterOne

## Ping Identity + JupiterOne Integration Benefits

*   Visualize Ping Identity users, groups, applications, and roles in the
    JupiterOne graph.
*   Map Ping Identity users to employees in your JupiterOne account.
*   Monitor changes to Ping Identity users using JupiterOne alerts.

## How it Works

*   JupiterOne periodically fetches users, groups, applications, and roles from
    Ping Identity to update the graph.
*   Write JupiterOne queries to review and monitor updates to the graph, or
    leverage existing queries.
*   Configure alerts to take action when JupiterOne graph changes, or leverage
    existing alerts.

## Requirements

*   JupiterOne requires an access key key. You need permission to create a worker
    application in Ping Identity that will be used to obtain the API key.
*   You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Ping Identity

1.  [Create an application connection](https://apidocs.pingidentity.com/pingone/devguide/v1/api/#create-an-application-connection)
    1.  Click Connections.
    2.  Click + Add Application.
    3.  Select the Worker application type.
    4.  Click Configure.
    5.  Create the application profile by entering the following information:
        *   Application name. A unique identifier for the application.
        *   Description (optional). A brief characterization of the application.
        *   Icon (optional). A pictorial representation of the application. Use a
            file up to 1MB in JPG, JPEG, GIF, or PNG format.
    6.  Click Save and Close.
    7.  The Applications page shows the new application. To view the application's
        access token, you must enable the new application:
    8.  Click the Enable toggle switch at the right. The toggle switch shows green
        to indicate that the new application is enabled.
2.  [Get an access token](https://apidocs.pingidentity.com/pingone/devguide/v1/api/#create-an-application-connection)
    1.  Click the application's details icon (located to the right of the
        enable/disable button).
    2.  Click the Configuration tab.
    3.  Click Get Access Token.
    4.  From the Access Token window, click Copy Access Token to copy the access
        token.
3.  [Get your environment ID from the Admin Console](https://apidocs.pingidentity.com/pingone/devguide/v1/api/#:\~:text=get%20your%20environment%20ID%20from%20the%20Admin%20Console)
    1.  Click Settings.
    2.  Click Environment.
    3.  Click Properties.

### In JupiterOne

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Ping Identity** integration tile and click it.
3.  Click the **Add Configuration** button and configure the following settings:

*   Enter the **Account Name** by which you'd like to identify this Ping Identity
    account in JupiterOne. Ingested entities will have this value stored in
    `tag.AccountName` when **Tag with Account Name** is checked.
*   Enter a **Description** that will further assist your team when identifying
    the integration instance.
*   Select a **Polling Interval** that you feel is sufficient for your monitoring
    needs. You may leave this as `DISABLED` and manually execute the integration.
*   Enter the **AccessToken**, **Environment ID**, and **Location** generated for
    use by JupiterOne.

4.  Click **Create Configuration** once all values are provided.

# Permissions

The worker application must have READ permissions of the ingested resources
namely: USER, ROLES, GROUP, APPLICATION, and ENVIRONMENT.

# How to Uninstall

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Ping Identity** integration tile and click it.
3.  Identify and click the **integration to delete**.
4.  Click the **trash can** icon.
5.  Click the **Remove** button to delete the integration.

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

| Resources   | Entity `_type`        | Entity `_class` |
| ----------- | --------------------- | --------------- |
| Account     | `pingone_account`     | `Account`       |
| Application | `pingone_application` | `Application`   |
| Role        | `pingone_role`        | `AccessRole`    |
| User        | `pingone_user`        | `User`          |
| UserGroup   | `pingone_group`       | `UserGroup`     |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `pingone_account`     | **HAS**               | `pingone_application` |
| `pingone_account`     | **HAS**               | `pingone_group`       |
| `pingone_account`     | **HAS**               | `pingone_role`        |
| `pingone_account`     | **HAS**               | `pingone_user`        |
| `pingone_application` | **ASSIGNED**          | `pingone_role`        |
| `pingone_group`       | **HAS**               | `pingone_group`       |
| `pingone_group`       | **HAS**               | `pingone_user`        |
| `pingone_user`        | **ASSIGNED**          | `pingone_role`        |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->

<!-- {J1_DOCUMENTATION_MARKER_END} -->
 
<!--  jupiterOneDocVersion=1-0-0 -->