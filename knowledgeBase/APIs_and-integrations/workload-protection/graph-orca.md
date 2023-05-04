# Orca

## Orca Security + JupiterOne Integration Benefits

- Visualize Orca Security assets, findings, roles, users and user groups in the JupiterOne graph.
- Map Orca Security users to employees and assets to other JupiterOne integrations to provide a more complete picture of your environment
- Monitor changes to Orca Security users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches assets, findings, roles, users and user groups from Orca Security
  to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- An Orca user that has permissions to create API Tokens.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Orca Security

1. Log into [Orca dashboard](https://app.orcasecurity.io) and navigate to
   [Settings / Modules / Integrations](https://app.orcasecurity.io/integrations)
2. Scroll down to the `SIEM/SOAR` section
3. Find the JupiterOne tile and press `CONFIGURE`
4. Enter a `Name` and `Description` (optional)
5. Select the `Internal Viewer` role. If a lesser role is provided, the
   integration will attempt to run as many steps as it is able to.
6. Select the desired unit `Scope`. To ingest all data from all units, select
   `All Cloud Accounts`
7. Press `CREATE TOKEN`
8. Copy the token value which appears to a safe location. It will be required in
   the next section. The token value will not be available after closing this
   screen.

NOTE: Legacy API Keys will continue to be supported until Orca removes support
for them.

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Orca Security** integration tile and click it.
3. Click the **Add Instance** button and configure the following settings:

   - Enter the **Account Name** by which you'd like to identify this Orca Security
     account in JupiterOne. Ingested entities will have this value stored in
     `tag.AccountName` when **Add AccountName Tag** is enabled.
   - Enter a **Description** that will further assist your team when identifying
     the integration instance.
   - Select a **Polling Interval** that you feel is sufficient for your monitoring
     needs. You may leave this as `DISABLED` and manually execute the integration.
   - Enter the **Orca Security Account Email** with the email address of the
     account used to generate the above API token.
   - Enter the **Orca Security API Key/Token** generated for use by JupiterOne.
   - Enter the **Orca API Base URL** for your Orca account.

4. Click **Create** once all values are provided.

# How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Orca Security** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **Delete** button.
5. Click the **Yes, Delete** button to confirm the deletion.

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

| Resources | Entity `_type`       | Entity `_class` |
| --------- | -------------------- | --------------- |
| Account   | `orca_account`       | `Account`       |
| Alert     | `orca_finding_alert` | `Finding`       |
| Asset     | `orca_asset`         | `Resource`      |
| Finding   | `orca_finding`       | `Finding`       |
| Role      | `orca_role`          | `AccessRole`    |
| User      | `orca_user`          | `User`          |
| UserGroup | `orca_group`         | `UserGroup`     |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `orca_account`        | **HAS**               | `orca_asset`          |
| `orca_account`        | **HAS**               | `orca_finding`        |
| `orca_account`        | **HAS**               | `orca_finding_alert`  |
| `orca_account`        | **HAS**               | `orca_group`          |
| `orca_account`        | **HAS**               | `orca_user`           |
| `orca_asset`          | **HAS**               | `orca_finding`        |
| `orca_finding`        | **IS**                | `cve`                 |
| `orca_group`          | **HAS**               | `orca_user`           |
| `orca_user`           | **ASSIGNED**          | `orca_role`           |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
