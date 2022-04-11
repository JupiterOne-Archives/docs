# Integration with JupiterOne

## Sentry + JupiterOne Integration Benefits

- Visualize Sentry services, teams, and users in the JupiterOne graph.
- Map Sentry users to employees in your JupiterOne account.
- Monitor changes to Sentry users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches organizations, projects, teams, and users from
  Sentry to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- JupiterOne requires an Auth Token. You need sufficient access in Sentry to
  create an Auth Token with the following scopes:
  - `member:read`
  - `org:read`
  - `project:read`
  - `team:read`
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Sentry

[Sentry API Documentation](https://docs.sentry.io/api/auth/)

[Generate am Auth Token](https://sentry.io/settings/account/api/auth-tokens/)

1. Navigate to the Auth Tokens page in Sentry Settings.
2. Select **Create New Token** in the top right corner.
3. Select `project:read`, `team:read`, `org:read`, and `member:read` and then
   click **Create Token**.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Sentry** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Sentry account
  in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Auth Token** generated for use by JupiterOne in the Sentry steps
  above.
- Enter Sentry organization slug in the **Organization** field. This is the URL
  safe version of your organization and can be found in your Sentry URL at
  _sentry.io/organizations/`organization-slug`/..._

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

TODO: Awaiting final completion of this section out later once the final method
of authentication has been fully implemented. TODO: List specific actions that
must be taken to uninstall the integration. Many of the following steps will be
reusable; take care to be sure they remain accurate.

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Sentry** integration tile and click it.
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

| Resources    | Entity `_type`        | Entity `_class` |
| ------------ | --------------------- | --------------- |
| Member       | `sentry_member`       | `User`          |
| Organization | `sentry_organization` | `Account`       |
| Project      | `sentry_project`      | `Project`       |
| Team         | `sentry_team`         | `UserGroup`     |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `sentry_organization` | **HAS**               | `sentry_member`       |
| `sentry_organization` | **HAS**               | `sentry_project`      |
| `sentry_organization` | **HAS**               | `sentry_team`         |
| `sentry_team`         | **ASSIGNED**          | `sentry_project`      |
| `sentry_team`         | **HAS**               | `sentry_member`       |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
