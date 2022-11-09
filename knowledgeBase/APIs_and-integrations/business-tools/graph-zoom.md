# Zoom Integration with JupiterOne

## Zoom + JupiterOne Integration Benefits

*   Visualize Zoom user, user settings, roles, and groups in the JupiterOne graph.
*   Map Zoom users to employees in your JupiterOne account.
*   Monitor changes to ingested Zoom resources using JupiterOne alerts.

## How it Works

*   JupiterOne periodically fetches user, user settings, roles, and groups from
    Zoom to update the graph.
*   Write JupiterOne queries to review and monitor updates to the graph, or
    leverage existing queries.
*   Configure alerts to take action when JupiterOne graph changes, or leverage
    existing alerts.

## Requirements

*   Zoom supports the OAuth2 Client Credential flow. A Zoom pro account is
    optional but is highly recommended.
*   You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Zoom

1.  Go to [Create App](https://marketplace.zoom.us/develop/create) page on Zoom
    Marketplace and click 'Create' under the OAuth app type.
2.  Enter an app name and choose the 'Account-level app' option. The publish app
    option will depend on your needs.
3.  Take note of your `Client ID` and your `Client secret` and supply it to the
    [oauth-server's .env](../oauth-server/README.md).
4.  Enter '<http://localhost:5000/redirect>' to the Redirect URL for OAuth.
5.  Add '<http://localhost:5000/redirect>' to the OAuth allow list.
6.  Supply the required information.
7.  On scopes, add `group:read:admin`, `role:read:admin`, and `user:read:admin`.
8.  The app is now ready. Proceed to authentication to generate your
    `ZOOM_ACCESS_TOKEN`.

### In JupiterOne

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Zoom** integration tile and click it.
3.  Click the **Add Configuration** button and configure the following settings:
    *   Enter the **Account Name** by which you'd like to identify this Zoom
        account in JupiterOne. Ingested entities will have this value stored in
        `tag.AccountName` when **Tag with Account Name** is checked.
    *   Enter a **Description** that will further assist your team when identifying
        the integration instance.
    *   Select a **Polling Interval** that you feel is sufficient for your
        monitoring needs. You may leave this as `DISABLED` and manually execute the
        integration.
    *   Enter the **Zoom API Key** generated for use by JupiterOne.
4.  Click **Create Configuration** once all values are provided.

# How to Uninstall

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Zoom** integration tile and click it.
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

| Resources | Entity `_type` | Entity `_class` |
| --------- | -------------- | --------------- |
| Account   | `zoom_account` | `Account`       |
| Group     | `zoom_group`   | `Group`         |
| Role      | `zoom_role`    | `AccessRole`    |
| User      | `zoom_user`    | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `zoom_account`        | **HAS**               | `zoom_group`          |
| `zoom_account`        | **HAS**               | `zoom_role`           |
| `zoom_account`        | **HAS**               | `zoom_user`           |
| `zoom_group`          | **HAS**               | `zoom_user`           |
| `zoom_user`           | **ASSIGNED**          | `zoom_role`           |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->

<!-- {J1_DOCUMENTATION_MARKER_END} -->
 
<!--  jupiterOneDocVersion=1-3-1 -->