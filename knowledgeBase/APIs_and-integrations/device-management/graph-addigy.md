# Addigy Integration with JupiterOne

## Addigy + JupiterOne Integration Benefits

*   Visualize Addigy users, policies, and device agents in the JupiterOne graph.
*   Map Addigy users to employees in your JupiterOne account.
*   Monitor changes to Addigy device agents using JupiterOne alerts.

## How it Works

*   JupiterOne periodically fetches services, teams, and users from Addigy to
    update the graph.
*   Write JupiterOne queries to review and monitor updates to the graph, or
    leverage existing queries.
*   Configure alerts to take action when JupiterOne graph changes, or leverage
    existing alerts.

## Requirements

*   JupiterOne requires an API `client_id` and `client_secret`. You need
    permission to create a user in Addigy that will be used to obtain the id and
    secret. Jupiterone also needs `username` and `password` of an admin user to
    retrieve user information from the Addigy internal API.
*   You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Addigy

1.  [Generate a API client\_id and client\_secret](https://support.addigy.com/hc/en-us/articles/4403542544275)

### In JupiterOne

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Addigy** integration tile and click it.
3.  Click the **Add Configuration** button and configure the following settings:

*   Enter the **Account Name** by which you'd like to identify this {{provider}}
    account in JupiterOne. Ingested entities will have this value stored in
    `tag.AccountName` when **Tag with Account Name** is checked.
*   Enter a **Description** that will further assist your team when identifying
    the integration instance.
*   Select a **Polling Interval** that you feel is sufficient for your monitoring
    needs. You may leave this as `DISABLED` and manually execute the integration.
*   Enter the **Username** and **Password** used to authenticate with Addigy.
*   Enter the **client\_id** and **client\_secret** generated in previous steps.

4.  Click **Create Configuration** once all values are provided.

# How to Uninstall

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Addigy** integration tile and click it.
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

| Resources     | Entity `_type`     | Entity `_class` |
| ------------- | ------------------ | --------------- |
| Addigy Device | `addigy_hostagent` | `HostAgent`     |
| Addigy Policy | `addigy_policy`    | `Policy`        |
| Addigy User   | `addigy_user`      | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `addigy_hostagent`    | **HAS**               | `addigy_policy`       |
| `addigy_policy`       | **CONTAINS**          | `addigy_policy`       |
| `addigy_user`         | **HAS**               | `addigy_policy`       |

### Mapped Relationships

The following mapped relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` | Direction |
| --------------------- | --------------------- | --------------------- | --------- |
| `addigy_hostagent`    | **PROTECTS**          | `*user_endpoint*`     | FORWARD   |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->

<!-- {J1_DOCUMENTATION_MARKER_END} -->
 
<!--  jupiterOneDocVersion=1-0-2 -->