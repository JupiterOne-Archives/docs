# Zendesk Integration with JupiterOne

## Zendesk + JupiterOne Integration Benefits

*   Visualize Zendesk account, groups, organizations, tickets and users in the
    JupiterOne graph.
*   Monitor changes to Zendesk resources using JupiterOne alerts.

## How it Works

*   JupiterOne periodically fetches account, groups, organizations, tickets and
    users from Zendesk to update the graph.
*   Write JupiterOne queries to review and monitor updates to the graph, or
    leverage existing queries.
*   Configure alerts to take action when JupiterOne graph changes, or leverage
    existing alerts.

## Requirements

*   Zendesk supports the OAuth2 Client Credential flow. You must have a
    Administrator user account.
*   You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Zendesk

1.  Register for a Zendesk account. A pro account is not required but some
    resources may not be ingested without it.

2.  Create an OAuth app by going to
    <https://subdomain.zendesk.com/admin/apps-integrations/apis/apis/oauth_clients>.
    (click on the 'Add OAuth Client' button)

3.  Enter '<http://localhost:5000/redirect>' as the redirect URL for OAuth.

4.  Generate an API token by going to
    <https://subdomain.zendesk.com/admin/apps-integrations/apis/apis/settings>.
    (click on the 'Add API Token' button)

5.  Take note of your `Client ID`, `Client Secret`, `Redirect URI` and
    `API token` and supply them to the
    [oauth server's .env file](../oauth-server/.env).

6.  The app is now ready. Proceed to authentication to generate your
    `ZENDESK_ACCESS_TOKEN`.

### In JupiterOne

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Zendesk** integration tile and click it.
3.  Click the **Add Configuration** button and configure the following settings:

*   Enter the **Account Name** by which you'd like to identify this Zendesk
    account in JupiterOne. Ingested entities will have this value stored in
    `tag.AccountName` when **Tag with Account Name** is checked.
*   Enter a **Description** that will further assist your team when identifying
    the integration instance.
*   Select a **Polling Interval** that you feel is sufficient for your monitoring
    needs. You may leave this as `DISABLED` and manually execute the integration.
*   {{additional provider-specific settings}} Enter the **Zendesk API Key**
    generated for use by JupiterOne.

4.  Click **Create Configuration** once all values are provided

# How to Uninstall

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Zendesk** integration tile and click it.
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
| Account      | `zendesk_account`      | `Account`       |
| Group        | `zendesk_group`        | `Group`         |
| Organization | `zendesk_organization` | `Organization`  |
| Ticket       | `zendesk_ticket`       | `Record`        |
| User         | `zendesk_user`         | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type`  | Relationship `_class` | Target Entity `_type`  |
| ---------------------- | --------------------- | ---------------------- |
| `zendesk_account`      | **HAS**               | `zendesk_organization` |
| `zendesk_group`        | **HAS**               | `zendesk_ticket`       |
| `zendesk_group`        | **HAS**               | `zendesk_user`         |
| `zendesk_organization` | **HAS**               | `zendesk_group`        |
| `zendesk_user`         | **ASSIGNED**          | `zendesk_ticket`       |
| `zendesk_user`         | **OPENED**            | `zendesk_ticket`       |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->

<!-- {J1_DOCUMENTATION_MARKER_END} -->
 
<!--  jupiterOneDocVersion=1-1-0 -->