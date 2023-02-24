# CyCognito

## CyCognito + JupiterOne Integration Benefits

- Visualize CyCognito ip, domain, certificate, web app, ip range assets and
  CyCognito issues in the JupiterOne graph.
- Monitor changes to CyCognito assets and issues using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches assets and issues from CyCognito to update the
  graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- JupiterOne requires a Access Token. You can request this from the admin if you
  already have an account.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In CyCognito

1. [Request an Access Token](https://example.com/docs/generating-api-keys)

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **CyCognito** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this CyCognito
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **CyCognito Access Token** generated for use by JupiterOne.

1. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **CyCognito** integration tile and click it.
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

| Resources   | Entity `_type`                | Entity `_class`       |
| ----------- | ----------------------------- | --------------------- |
| Account     | `cycognito_account`           | `Account`             |
| Certificate | `cycognito_asset_certificate` | `Certificate`         |
| Domain      | `cycognito_asset_domain`      | `Domain`              |
| IP          | `cycognito_asset_ip`          | `IpAddress`           |
| Issue       | `cycognito_issue`             | `Finding`             |
| Web App     | `cycognito_asset_web_app`     | `ApplicationEndpoint` |

### Relationships

The following relationships are created:

| Source Entity `_type`         | Relationship `_class` | Target Entity `_type`         |
| ----------------------------- | --------------------- | ----------------------------- |
| `cycognito_account`           | **HAS**               | `cycognito_asset_certificate` |
| `cycognito_account`           | **HAS**               | `cycognito_asset_domain`      |
| `cycognito_account`           | **HAS**               | `cycognito_asset_ip`          |
| `cycognito_account`           | **HAS**               | `cycognito_asset_web_app`     |
| `cycognito_account`           | **HAS**               | `cycognito_issue`             |
| `cycognito_asset_certificate` | **HAS**               | `cycognito_asset_domain`      |
| `cycognito_asset_certificate` | **HAS**               | `cycognito_asset_ip`          |
| `cycognito_asset_certificate` | **HAS**               | `cycognito_issue`             |
| `cycognito_asset_domain`      | **CONTAINS**          | `cycognito_asset_domain`      |
| `cycognito_asset_domain`      | **HAS**               | `cycognito_asset_ip`          |
| `cycognito_asset_domain`      | **HAS**               | `cycognito_issue`             |
| `cycognito_asset_ip`          | **HAS**               | `cycognito_asset_domain`      |
| `cycognito_asset_ip`          | **HAS**               | `cycognito_issue`             |
| `cycognito_asset_web_app`     | **HAS**               | `cycognito_issue`             |
| `cycognito_issue`             | **IS**                | `cve`                         |
| `cycognito_issue`             | **IS**                | `cyc`                         |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
