# Databricks

## Databricks + JupiterOne Integration Benefits

- Visualize Databricks workspace's groups, users, and clusters in the JupiterOne
  graph.
- Map Databricks users to employees in your JupiterOne account.
- Monitor changes to ingested Databricks resources using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches groups, users, and clusters from Databricks to
  update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- JupiterOne requires a REST access token. You need permission to create a user
  in Databricks that will be used to obtain the API key.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Databricks

1. Go to [Databricks GCP dashboard](https://accounts.gcp.databricks.com/login)
   and log in.
2. In the [Workspaces section](https://accounts.gcp.databricks.com/workspaces),
   choose the workspace.
3. You will be able to see the URL on the following page that has the following
   format: https://[numbers].[number].gcp.databricks.com
4. Take note of it and supply it to the .env file. (Example,
   DATABRICKS_HOST=https://1122334455.6.gcp.databricks.com)
5. Next, click on that link to go to the workspace dashboard. Once there, click
   on the settings icon (bottom part of left side menu) and choose "User
   settings".
6. Click "Generate New Token", add comment/description, and press "Generate".
   Make sure to copy the token and supply it as the ENV variable
   (DATABRICKS_ACCESS_TOKEN=[token you've just generated])

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Databricks** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Databricks
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the Databricks **Host** and **Access Token** generated for use by
  JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Databricks** integration tile and click it.
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

| Resources | Entity `_type`         | Entity `_class` |
| --------- | ---------------------- | --------------- |
| Cluster   | `databricks_cluster`   | `Cluster`       |
| Group     | `databricks_group`     | `UserGroup`     |
| User      | `databricks_user`      | `User`          |
| Workspace | `databricks_workspace` | `Account`       |

### Relationships

The following relationships are created:

| Source Entity `_type`  | Relationship `_class` | Target Entity `_type` |
| ---------------------- | --------------------- | --------------------- |
| `databricks_group`     | **HAS**               | `databricks_user`     |
| `databricks_user`      | **CREATED**           | `databricks_cluster`  |
| `databricks_workspace` | **HAS**               | `databricks_cluster`  |
| `databricks_workspace` | **HAS**               | `databricks_group`    |

### Mapped Relationships

The following mapped relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` | Direction |
| --------------------- | --------------------- | --------------------- | --------- |
| `databricks_cluster`  | **IS**                | `*aws_instance*`      | FORWARD   |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
