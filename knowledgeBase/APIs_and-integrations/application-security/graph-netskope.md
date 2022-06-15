# Netskope Integration with JupiterOne

## Netskope + JupiterOne Integration Benefits

*   Visualize Netskope devices, users, user configurations, and app instances in
    the JupiterOne graph.
*   Map Netskope users to employees in your JupiterOne account.
*   Monitor changes to Netskope users using JupiterOne alerts.

## How it Works

*   JupiterOne periodically fetches devices, users, user configurations, and app
    instances from Netskope to update the graph.
*   Write JupiterOne queries to review and monitor updates to the graph, or
    leverage existing queries.
*   Configure alerts to take action when JupiterOne graph changes, or leverage
    existing alerts.

## Requirements

*   JupiterOne requires an API V1 Token. You need permission to create a user in
    Netskope that will be used to obtain the token. Alternatively, you can request
    this from your tenant admin.
*   You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Netskope

1.  [Generate an API V1 Token](https://docs.netskope.com/en/rest-api-v1-overview.html).
    You can also request this from the tenant admin.

### In JupiterOne

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Netskope** integration tile and click it.
3.  Click the **Add Configuration** button and configure the following settings:

*   Enter the **Account Name** by which you'd like to identify this {{provider}}
    account in JupiterOne. Ingested entities will have this value stored in
    `tag.AccountName` when **Tag with Account Name** is checked.
*   Enter a **Description** that will further assist your team when identifying
    the integration instance.
*   Select a **Polling Interval** that you feel is sufficient for your monitoring
    needs. You may leave this as `DISABLED` and manually execute the integration.
*   Enter the **Netskope API V1 Token** generated for use by JupiterOne.

1.  Click **Create Configuration** once all values are provided.

# How to Uninstall

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Netskope** integration tile and click it.
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

| Resources          | Entity `_type`                | Entity `_class` |
| ------------------ | ----------------------------- | --------------- |
| App Instance       | `netskope_app_instance`       | `Application`   |
| Device             | `netskope_device`             | `Device`        |
| Tenant             | `netskope_tenant`             | `Organization`  |
| User               | `netskope_user`               | `User`          |
| User Configuration | `netskope_user_configuration` | `Configuration` |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type`         |
| --------------------- | --------------------- | ----------------------------- |
| `netskope_device`     | **HAS**               | `netskope_user`               |
| `netskope_tenant`     | **HAS**               | `netskope_app_instance`       |
| `netskope_tenant`     | **HAS**               | `netskope_device`             |
| `netskope_user`       | **HAS**               | `netskope_user_configuration` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->

<!-- {J1_DOCUMENTATION_MARKER_END} -->
 
<!--  jupiterOneDocVersion=1-0-0 -->