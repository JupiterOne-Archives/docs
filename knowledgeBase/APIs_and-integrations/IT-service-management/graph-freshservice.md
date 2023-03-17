# Freshservice

## Freshservice + JupiterOne Integration Benefits

*   Visualize Freshservice account, agents, agent groups, agent roles and tickets
    in the JupiterOne graph.
*   Map Freshservice agents to employees in your JupiterOne account.
*   Monitor changes to Freshservice users using JupiterOne alerts.

## How it Works

*   JupiterOne periodically fetches account, agents, agent groups, agent roles and
    tickets from Freshservice to update the graph.
*   Write JupiterOne queries to review and monitor updates to the graph, or
    leverage existing queries.
*   Configure alerts to take action when JupiterOne graph changes, or leverage
    existing alerts.

## Requirements

*   Freshservice supports Basic Authorization.
*   JupiterOne requires a REST API key. You need permission to create a user in
    Freshservice that will be used to obtain the API key.
*   You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Freshservice

1.  Sign-up for a Freshservice account
2.  In the dashboard, click on your Profile > Profile Settings
3.  Get the API Key for the account

### In JupiterOne

1.  From the top navigation of the J1 Search homepage, select **Integrations**.
2.  Scroll to the **Freshservice** integration tile and click it.
3.  Click the **Add Configuration** button and configure the following settings:

*   Enter the **Account Name** by which you'd like to identify this Freshservice
    account in JupiterOne. Ingested entities will have this value stored in
    `tag.AccountName` when **Tag with Account Name** is checked.
*   Enter a **Description** that will further assist your team when identifying
    the integration instance.
*   Select a **Polling Interval** that you feel is sufficient for your monitoring
    needs. You may leave this as `DISABLED` and manually execute the integration.
*   {{additional provider-specific settings}} Enter the **Freshservice API Key**
    generated for use by JupiterOne.

4.  Click **Create Configuration** once all values are provided.

# How to Uninstall

1.  From the top navigation of the J1 Search homepage, select **Integrations**.
2.  Scroll to the **Freshservice** integration tile and click it.
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

| Resources   | Entity `_type`             | Entity `_class` |
| ----------- | -------------------------- | --------------- |
| Account     | `freshservice_account`     | `Account`       |
| Agent       | `freshservice_agent`       | `User`          |
| Agent Group | `freshservice_agent_group` | `Group`         |
| Agent Role  | `freshservice_agent_role`  | `AccessRole`    |
| Ticket      | `freshservice_ticket`      | `RecordEntity`  |

### Relationships

The following relationships are created:

| Source Entity `_type`      | Relationship `_class` | Target Entity `_type`      |
| -------------------------- | --------------------- | -------------------------- |
| `freshservice_account`     | **HAS**               | `freshservice_agent`       |
| `freshservice_account`     | **HAS**               | `freshservice_agent_group` |
| `freshservice_account`     | **HAS**               | `freshservice_agent_role`  |
| `freshservice_account`     | **HAS**               | `freshservice_ticket`      |
| `freshservice_agent_group` | **HAS**               | `freshservice_agent`       |
| `freshservice_agent_group` | **HAS**               | `freshservice_ticket`      |
| `freshservice_agent`       | **HAS**               | `freshservice_ticket`      |
| `freshservice_agent_role`  | **ASSIGNED**          | `freshservice_agent`       |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->

<!-- {J1_DOCUMENTATION_MARKER_END} -->
 
<!--  jupiterOneDocVersion=1-0-0 -->