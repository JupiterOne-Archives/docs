# Asana

## Asana + JupiterOne Integration Benefits

- Visualize Asana workspaces, teams, users, projects, and project memberships in
  the JupiterOne graph.
- Map Asana users to employees in your JupiterOne account.
- Monitor changes to Asana users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches workspaces, teams, users, projects, and
  project memberships from Asana to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- Asana supports the OAuth2 Client Credential flow. You must have a
  Administrator user account.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Asana

1. [Setup OAuth](https://developers.asana.com/docs/oauth)
   1. Register Application, you can use [oauth-server](../oauth-server/) for
      this.
   2. Take note of the client ID and secret.
2. Get Access Token
   - From the setup OAuth server, you can obtain access token.
     1. Start the oauth server.
     2. Once you access on the browser, there should be a link to
        `Get Asana OAuth token`. Click on it.
     3. You may be redirected to Asana requesting to authorize the application.
     4. Once the server is authorized, you will be redirected and automatically
        receive the access and refresh token.
   - Alternatively, you can manually generate a
     [personal access token](https://developers.asana.com/docs/personal-access-token).

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Asana** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Asana account
  in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Access Token** generated for use by JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Asana** integration tile and click it.
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

| Resources          | Entity `_type`             | Entity `_class` |
| ------------------ | -------------------------- | --------------- |
| Account            | `asana_account`            | `Account`       |
| Project            | `asana_project`            | `Project`       |
| Project Membership | `asana_project_membership` | `AccessRole`    |
| Team               | `asana_team`               | `Team`          |
| User               | `asana_user`               | `User`          |
| Workspace          | `asana_workspace`          | `Organization`  |

### Relationships

The following relationships are created:

| Source Entity `_type`      | Relationship `_class` | Target Entity `_type`      |
| -------------------------- | --------------------- | -------------------------- |
| `asana_account`            | **HAS**               | `asana_workspace`          |
| `asana_project`            | **HAS**               | `asana_project_membership` |
| `asana_project_membership` | **ALLOWS**            | `asana_project`            |
| `asana_team`               | **ASSIGNED**          | `asana_project`            |
| `asana_team`               | **HAS**               | `asana_user`               |
| `asana_user`               | **ASSIGNED**          | `asana_project_membership` |
| `asana_user`               | **OWNS**              | `asana_project`            |
| `asana_workspace`          | **HAS**               | `asana_project`            |
| `asana_workspace`          | **HAS**               | `asana_team`               |
| `asana_workspace`          | **HAS**               | `asana_user`               |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
