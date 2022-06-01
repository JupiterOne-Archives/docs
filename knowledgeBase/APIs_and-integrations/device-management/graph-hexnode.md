# Hexnode Integration with JupiterOne

## Hexnode + JupiterOne Integration Benefits

*   Visualize Hexnode account, users, user groups, devices, and device groups in
    the JupiterOne graph.
*   Map Hexnode users to employees in your JupiterOne account.
*   Monitor changes to Hexnode users using JupiterOne alerts.

## How it Works

*   JupiterOne periodically fetches services, users, user groups, devices, and
    device groups from Hexnode to update the graph.
*   Write JupiterOne queries to review and monitor updates to the graph, or
    leverage existing queries.
*   Configure alerts to take action when JupiterOne graph changes, or leverage
    existing alerts.

## Requirements

*   Hexnode supports basic authorization.
*   JupiterOne requires a REST API key.
*   You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Hexnode

1.  Sign-up for a Hexnode account
2.  In the dashboard, go to Admin > API.
3.  Select Enable API Access
4.  Generate an API key

### In JupiterOne

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Hexnode** integration tile and click it.
3.  Click the **Add Configuration** button and configure the following settings:

*   Enter the **Account Name** by which you'd like to identify this Hexnode
    account in JupiterOne. Ingested entities will have this value stored in
    `tag.AccountName` when **Tag with Account Name** is checked.
*   Enter a **Description** that will further assist your team when identifying
    the integration instance.
*   Select a **Polling Interval** that you feel is sufficient for your monitoring
    needs. You may leave this as `DISABLED` and manually execute the integration.
*   Enter the **Hexnode API Key** generated for use by JupiterOne.

4.  Click **Create Configuration** once all values are provided.

# How to Uninstall

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Hexnode** integration tile and click it.
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

| Resources    | Entity `_type`         | Entity `_class` |
| ------------ | ---------------------- | --------------- |
| Account      | `hexnode_account`      | `Account`       |
| Device       | `hexnode_device`       | `Device`        |
| Device Group | `hexnode_device_group` | `Group`         |
| User         | `hexnode_user`         | `User`          |
| User Group   | `hexnode_user_group`   | `Group`         |

### Relationships

The following relationships are created:

| Source Entity `_type`  | Relationship `_class` | Target Entity `_type`  |
| ---------------------- | --------------------- | ---------------------- |
| `hexnode_account`      | **HAS**               | `hexnode_device`       |
| `hexnode_account`      | **HAS**               | `hexnode_device_group` |
| `hexnode_account`      | **HAS**               | `hexnode_user`         |
| `hexnode_account`      | **HAS**               | `hexnode_user_group`   |
| `hexnode_device_group` | **HAS**               | `hexnode_device`       |
| `hexnode_user_group`   | **HAS**               | `hexnode_user`         |
| `hexnode_user`         | **HAS**               | `hexnode_device`       |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->

<!-- {J1_DOCUMENTATION_MARKER_END} -->
 
<!--  jupiterOneDocVersion=1-0-1 -->