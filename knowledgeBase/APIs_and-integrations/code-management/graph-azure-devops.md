# Azure DevOps

## Azure DevOps + JupiterOne Integration Benefits

- Visualize Azure DevOps projects, teams, and users in the JupiterOne graph.
- Map Azure DevOps users to employees in your JupiterOne account.
- Monitor changes to Azure DevOps users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches projects, teams, and users from Azure DevOps
  to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when a JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- The Azure DevOps + JupiterOne integration uses a read-only, personal access
  token to ingest data from the Azure DevOps platform. You must have the
  necessary permissions to generate a personal access token in Azure DevOps.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, contact
[JupiterOne Support](https://support.jupiterone.io).

## How to Use the Integration

### In Azure DevOps

1. [Generate a Personal Access Token (PAT)](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate)
2. Grant the following permissions to your PAT:
   - Project and Team [read]
   - Work Items [read]

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll down to **Azure DevOps** and click it.
3. Click **Add Configuration** and configure the following settings:

- Enter the account name by which you want to identify this Azure DevOps account
  in JupiterOne. Select **Tag with Account Name** to store this value in
  `tag.AccountName` of the ingested assets.
- Enter a description to help your team identify the integration.
- Select a polling interval that is sufficient for your monitoring requirements.
  You can leave this as `DISABLED` and manually execute the integration.
- Enter your account URL (_Example: "https://dev.azure.com/jupiterone"_)
- Enter the personal access token generated for use by JupiterOne.

4. Click **Create Configuration** after you have entered all the values.

# How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll down to **Azure DevOps** and click it.
3. Identify and click the **integration to delete**.
4. Click the trash can icon.
5. Click **Remove** to delete the integration.

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

| Resources            | Entity `_type`           | Entity `_class` |
| -------------------- | ------------------------ | --------------- |
| ADO Project          | `azure_devops_project`   | `Project`       |
| ADO Team             | `azure_devops_team`      | `UserGroup`     |
| ADO User             | `azure_devops_user`      | `User`          |
| ADO WorkItem         | `azure_devops_work_item` | `Record`        |
| Azure Devops Account | `azure_devops_account`   | `Account`       |
| Repository           | `azure_devops_repo`      | `Repository`    |

### Relationships

The following relationships are created:

| Source Entity `_type`  | Relationship `_class` | Target Entity `_type`    |
| ---------------------- | --------------------- | ------------------------ |
| `azure_devops_account` | **HAS**               | `azure_devops_project`   |
| `azure_devops_account` | **HAS**               | `azure_devops_team`      |
| `azure_devops_account` | **HAS**               | `azure_devops_user`      |
| `azure_devops_project` | **HAS**               | `azure_devops_team`      |
| `azure_devops_project` | **HAS**               | `azure_devops_work_item` |
| `azure_devops_project` | **USES**              | `azure_devops_repo`      |
| `azure_devops_team`    | **HAS**               | `azure_devops_user`      |
| `azure_devops_user`    | **ASSIGNED**          | `azure_devops_work_item` |
| `azure_devops_user`    | **CREATED**           | `azure_devops_work_item` |

### Mapped Relationships

The following mapped relationships are created:

| Source Entity `_type`  | Relationship `_class` | Target Entity `_type` | Direction |
| ---------------------- | --------------------- | --------------------- | --------- |
| `azure_devops_project` | **USES**              | `*github_repo*`       | FORWARD   |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
