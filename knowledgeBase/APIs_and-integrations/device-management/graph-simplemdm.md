# SimpleMDM Integration with JupiterOne

## SimpleMDM + JupiterOne Integration Benefits

*   Visualize SimpleMDM account, apps, devices, and users in the JupiterOne graph.
*   Map SimpleMDM users to employees in your JupiterOne account.
*   Monitor changes to SimpleMDM databases and users using JupiterOne alerts.

## How it Works

*   JupiterOne periodically fetches account, apps, devices, and users from
    SimpleMDM to update the graph.
*   Write JupiterOne queries to review and monitor updates to the graph, or
    leverage existing queries.
*   Configure alerts to take action when JupiterOne graph changes, or leverage
    existing alerts.

## Requirements

*   SimpleMDM supports token authorization.
*   JupiterOne requires an API key.
*   You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In SimpleMDM

1.  Sign-up for a SimpleMDM account

2.  In the dashboard, under Account, click API

3.  Click Add API Key

4.  Provide a name for the API Key

5.  Set the permission for the following roles `read` and `none` for the rest:

    *   Account
    *   Apps
    *   Devices

6.  Click Save

7.  Under Secret Access Key, click `reveal` and save the details. This will serve
    as your API Key

### In JupiterOne

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **SimpleMDM** integration tile and click it.
3.  Click the **Add Configuration** button and configure the following settings:

*   Enter the **Account Name** by which you'd like to identify this SimpleMDM
    account in JupiterOne. Ingested entities will have this value stored in
    `tag.AccountName` when **Tag with Account Name** is checked.
*   Enter a **Description** that will further assist your team when identifying
    the integration instance.
*   Select a **Polling Interval** that you feel is sufficient for your monitoring
    needs. You may leave this as `DISABLED` and manually execute the integration.
*   {{additional provider-specific settings}} Enter the **SimpleMDM API Key**
    generated for use by JupiterOne.

4.  Click **Create Configuration** once all values are provided.

# How to Uninstall

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **SimpleMDM** integration tile and click it.
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

| Resources   | Entity `_type`          | Entity `_class` |
| ----------- | ----------------------- | --------------- |
| Account     | `simplemdm_account`     | `Account`       |
| Application | `simplemdm_application` | `Application`   |
| Device      | `simplemdm_device`      | `Device`        |
| User        | `simplemdm_user`        | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type`   |
| --------------------- | --------------------- | ----------------------- |
| `simplemdm_account`   | **HAS**               | `simplemdm_application` |
| `simplemdm_account`   | **HAS**               | `simplemdm_device`      |
| `simplemdm_device`    | **HAS**               | `simplemdm_user`        |
| `simplemdm_device`    | **INSTALLED**         | `simplemdm_application` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->

<!-- {J1_DOCUMENTATION_MARKER_END} -->
 
<!--  jupiterOneDocVersion=1-1-0 -->