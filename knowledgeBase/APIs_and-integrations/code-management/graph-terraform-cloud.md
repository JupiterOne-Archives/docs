# Terraform Cloud

## Terraform Cloud + JupiterOne Integration Benefits

*   Visualize Terraform Cloud organizations, users, workspaces, and workspace
    resources in the JupiterOne graph.
*   Map Terraform Cloud users to employees in your JupiterOne account.
*   Monitor changes to Terraform Cloud users using JupiterOne alerts.

## How it Works

*   JupiterOne periodically fetches organizations, users, workspaces, and
    workspace resources from Terraform Cloud to update the graph.
*   Write JupiterOne queries to review and monitor updates to the graph.
*   Configure alerts to take action when JupiterOne graph changes.

## Requirements

*   Terraform Cloud supports authentication through a Bearer Token. You must have
    the appropriate API token.
*   You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Terraform Cloud

1.  Create a Terraform Cloud account.
2.  [Generate a Terraform Cloud authentication token](https://www.terraform.io/cloud-docs/api-docs#authentication).
3.  Enter the generated authentication token in the `API_KEY` field in .env.
4.  Enter the organization name you want the integration to ingest data from in
    the `ORGANIZATION_NAME` field in .env.

### In JupiterOne

1.  From the top navigation of the J1 Search homepage, select **Integrations**.
2.  Scroll to the **Terraform Cloud** integration tile and click it.
3.  Click the **Add Configuration** button.
4.  Enter the **Account Name** by which you'd like to identify this Terraform
    Cloud account in JupiterOne. Ingested entities will have this value stored in
    `tag.AccountName` when **Tag with Account Name** is checked.
5.  Enter a **Description** that will further assist your team when identifying
    the integration instance.
6.  Select a **Polling Interval** that you feel is sufficient for your monitoring
    needs. You may leave this as `DISABLED` and manually execute the integration.
7.  Enter the **Terraform Cloud Authentication Token** generated for use by
    JupiterOne.
8.  Click **Create Configuration** once all values are provided.

# How to Uninstall

1.  From the top navigation of the J1 Search homepage, select **Integrations**.
2.  Scroll to the **Terraform Cloud** integration tile and click it.
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

| Resources       | Entity `_type`           | Entity `_class` |
| --------------- | ------------------------ | --------------- |
| Account         | `tfe_account`            | `Account`       |
| Entitlement Set | `tfe_entitlement_set`    | `Entity`        |
| Organization    | `tfe_organization`       | `Organization`  |
| Resource        | `tfe_workspace_resource` | `Resource`      |
| Team            | `tfe_team`               | `Team`          |
| User            | `tfe_user`               | `User`          |
| Workspace       | `tfe_workspace`          | `Project`       |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type`    |
| --------------------- | --------------------- | ------------------------ |
| `tfe_account`         | **HAS**               | `tfe_organization`       |
| `tfe_organization`    | **HAS**               | `tfe_entitlement_set`    |
| `tfe_organization`    | **HAS**               | `tfe_team`               |
| `tfe_organization`    | **HAS**               | `tfe_user`               |
| `tfe_organization`    | **HAS**               | `tfe_workspace`          |
| `tfe_workspace`       | **HAS**               | `tfe_workspace_resource` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->

<!-- {J1_DOCUMENTATION_MARKER_END} -->
 
<!--  jupiterOneDocVersion=1-0-1 -->