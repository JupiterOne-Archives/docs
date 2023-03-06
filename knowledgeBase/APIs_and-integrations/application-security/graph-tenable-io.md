# Tenable.io

## Tenable.io + JupiterOne Integration Benefits

- Visualize Tenable.io users, scans, findings, reports, vulnerabilities, and
  container findings in the JupiterOne graph.
- Map Tenable.io users to employees in your JupiterOne account.
- Monitor Tenable vulnerabilities and findings within the alerts app.
- Monitor changes to Tenable.io users, scans, findings, reports,
  vulnerabilities, and container findings using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches Tenable.io users, scans, findings, agents, and
  vulnerabilities to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to reduce the noise of findings.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires an access key and secret key used to authenticate with
  Tenable.io.
- You must have the Tenable Administrator role for a successful integration.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Tenable.io

1. Make sure the account you use to integrate has the **Administrator** role.
2. Click the hamburger icon in the top left corner to open the left pane.
3. Navigate to **Settings**
4. Click **My Account**
5. On the left side, click **API Keys**
6. In the bottom right corner click **Generate**
7. Copy your Access Key and Secret Key into the respective fields in the
   JupiterOne Tenable.io integration setup.

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Tenable.io** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Tenable.io
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Access Key** used to authenticate with Tenable.io.
- Enter the **Secret Key** associated with the access key.

4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Tenable.io** integration tile and click it.
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

| Resources                  | Entity `_type`                       | Entity `_class` |
| -------------------------- | ------------------------------------ | --------------- |
| Account                    | `tenable_account`                    | `Account`       |
| Agent                      | `tenable_agent`                      | `HostAgent`     |
| Asset                      | `tenable_asset`                      | `Record`        |
| Container Finding          | `tenable_container_finding`          | `Finding`       |
| Container Image            | `tenable_container_image`            | `Image`         |
| Container Malware          | `tenable_container_malware`          | `Finding`       |
| Container Report           | `tenable_container_report`           | `Assessment`    |
| Container Repository       | `tenable_container_repository`       | `Repository`    |
| Container Unwanted Program | `tenable_container_unwanted_program` | `Finding`       |
| Service                    | `tenable_scanner`                    | `Service`       |
| User                       | `tenable_user`                       | `User`          |
| Vulnerability              | `tenable_vulnerability_finding`      | `Finding`       |

### Relationships

The following relationships are created:

| Source Entity `_type`          | Relationship `_class` | Target Entity `_type`                |
| ------------------------------ | --------------------- | ------------------------------------ |
| `tenable_account`              | **HAS**               | `tenable_agent`                      |
| `tenable_account`              | **HAS**               | `tenable_asset`                      |
| `tenable_account`              | **HAS**               | `tenable_container_image`            |
| `tenable_account`              | **HAS**               | `tenable_container_repository`       |
| `tenable_account`              | **HAS**               | `tenable_user`                       |
| `tenable_account`              | **PROVIDES**          | `tenable_scanner`                    |
| `tenable_asset`                | **HAS**               | `tenable_vulnerability_finding`      |
| `tenable_container_image`      | **HAS**               | `tenable_container_finding`          |
| `tenable_container_image`      | **HAS**               | `tenable_container_malware`          |
| `tenable_container_image`      | **HAS**               | `tenable_container_report`           |
| `tenable_container_image`      | **HAS**               | `tenable_container_unwanted_program` |
| `tenable_container_report`     | **IDENTIFIED**        | `tenable_container_finding`          |
| `tenable_container_report`     | **IDENTIFIED**        | `tenable_container_malware`          |
| `tenable_container_report`     | **IDENTIFIED**        | `tenable_container_unwanted_program` |
| `tenable_container_repository` | **HAS**               | `tenable_container_image`            |
| `tenable_scanner`              | **SCANS**             | `tenable_container_image`            |

### Mapped Relationships

The following mapped relationships are created:

| Source Entity `_type`           | Relationship `_class` | Target Entity `_type`       | Direction |
| ------------------------------- | --------------------- | --------------------------- | --------- |
| `tenable_asset`                 | **IS**                | `*aws_instance*`            | FORWARD   |
| `tenable_asset`                 | **IS**                | `*azure_vm*`                | FORWARD   |
| `tenable_asset`                 | **IS**                | `*google_compute_instance*` | FORWARD   |
| `tenable_vulnerability_finding` | **HAS**               | `*aws_instance*`            | REVERSE   |
| `tenable_vulnerability_finding` | **HAS**               | `*azure_vm*`                | REVERSE   |
| `tenable_vulnerability_finding` | **HAS**               | `*google_compute_instance*` | REVERSE   |
| `tenable_vulnerability_finding` | **IS**                | `*cve*`                     | FORWARD   |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
