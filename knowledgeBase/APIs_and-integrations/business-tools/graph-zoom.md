# Zoom

## Zoom + JupiterOne Integration Benefits

- Visualize Zoom user, user settings, roles, and groups in the JupiterOne graph.
- Map Zoom users to employees in your JupiterOne account.
- Monitor changes to ingested Zoom resources using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches user, user settings, roles, and groups from
  Zoom to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- Zoom supports the Server-to-Server OAuth2 Client Credential flow. A Zoom pro
  account is optional but is highly recommended.
- You must have the Zoom owner role to install the integration.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Zoom

1. In the Zoom App Marketplace, go to the Develop dropdown menu in the top-right
   corner and select [Build App](https://marketplace.zoom.us/develop/create).
2. In the Choose Your App window, click **Create** under the Server-to-Server
   OAuth type. If you do not see this OAuth type, contact your Zoom
   administrator to be given permission for the Server-to-Server OAuth type.
3. Enter an app name and app type to begin creation. Your app configuration page
   opens for the new app.
4. Take note of your `Account ID`, `Client ID`, and `Client secret` and enter
   them in the .env file.
5. Enter the required information for the app credentials, information, feature,
   scopes sections and so on. Zoom promptd you if any required fields are
   omitted.
6. In the Scopes section, add `group:read:admin`, `role:read:admin`,
   `user:read:admin`, and `account:read:admin`. If you cannot or choose not to
   provide all the listed scopes, the steps requiring the missing scopes is
   disabled.
7. On the final screen after you have provided all the required information has
   been provided, click`Activate your app` to complete the app creation.

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Zoom** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:
   - Enter the **Account Name** by which you'd like to identify this Zoom
     account in JupiterOne. Ingested entities will have this value stored in
     `tag.AccountName` when **Tag with Account Name** is checked.
   - Enter a **Description** that will further assist your team when identifying
     the integration instance.
   - Select a **Polling Interval** that you feel is sufficient for your
     monitoring needs. You may leave this as `DISABLED` and manually execute the
     integration.
   - Enter the **Account ID**, **Client ID**, **Client Secret**, and **Scoopes**
     generated for use by JupiterOne.
4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Zoom** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

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
