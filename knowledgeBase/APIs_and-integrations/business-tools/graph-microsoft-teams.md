# Microsoft Teams

## Microsoft Teams + JupiterOne Integration Benefits

*   Visualize Microsoft Teams users, teams and channels in the JupiterOne graph.
*   Map Microsoft Teams users to employees in your JupiterOne account.
*   Monitor changes to Microsoft Teams users using JupiterOne alerts.

## How it Works

*   JupiterOne periodically fetches users, teams and channels from Microsoft Teams
    to update the graph.
*   Write JupiterOne queries to review and monitor updates to the graph, or
    leverage existing queries.
*   Configure alerts to take action when JupiterOne graph changes, or leverage
    existing alerts.

## Requirements

*   JupiterOne requires a REST API key. You need permission to create a user in
    Microsoft Teams that will be used to obtain the API key.
*   You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Microsoft Teams

1.  Sign-up for at least a Microsoft 365 Business Standard account
2.  Take note of your provided Microsoft 365 credentials
3.  Sign in at portal.azure.com
4.  Go to app registrations and register for a new app
5.  Take note of client ID and tenant ID
6.  Go to Certificates and Secrets and register a secret for this client.
7.  Go to API permissions.
8.  Add permission for Microsoft Graph (application permission).
9.  Add the following permissions: Group.Read.All - allows getting the teams data
    TeamMember.Read.All - allows getting all the teams' members' data
    User.Read.All - allows getting user's data
10. Grant admin consent for all previously mentioned permissions for your
    organization

### In JupiterOne

1.  From the top navigation of the J1 Search homepage, select **Integrations**.
2.  Scroll to the **Microsoft Teams** integration tile and click it.
3.  Click the **Add Configuration** button and configure the following settings:

*   Enter the **Account Name** by which you'd like to identify this Microsoft
    Teams account in JupiterOne. Ingested entities will have this value stored in
    `tag.AccountName` when **Tag with Account Name** is checked.
*   Enter a **Description** that will further assist your team when identifying
    the integration instance.
*   Select a **Polling Interval** that you feel is sufficient for your monitoring
    needs. You may leave this as `DISABLED` and manually execute the integration.
*   {{additional provider-specific settings}} Enter the **Microsoft Teams API
    Key** generated for use by JupiterOne.

4.  Click **Create Configuration** once all values are provided.

# How to Uninstall

1.  From the top navigation of the J1 Search homepage, select **Integrations**.
2.  Scroll to the **Microsoft Teams** integration tile and click it.
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

| Resources | Entity `_type`            | Entity `_class` |
| --------- | ------------------------- | --------------- |
| Account   | `microsoft_teams_account` | `Account`       |
| Channel   | `microsoft_teams_channel` | `Channel`       |
| Team      | `microsoft_teams_team`    | `Group`         |
| User      | `microsoft_teams_user`    | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type`     | Relationship `_class` | Target Entity `_type`     |
| ------------------------- | --------------------- | ------------------------- |
| `microsoft_teams_account` | **HAS**               | `microsoft_teams_team`    |
| `microsoft_teams_account` | **HAS**               | `microsoft_teams_user`    |
| `microsoft_teams_team`    | **HAS**               | `microsoft_teams_channel` |
| `microsoft_teams_team`    | **HAS**               | `microsoft_teams_user`    |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->

<!-- {J1_DOCUMENTATION_MARKER_END} -->
 
<!--  jupiterOneDocVersion=1-0-0 -->