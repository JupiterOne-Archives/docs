# Cisco Secure Endpoint

## Cisco Secure Endpoint + JupiterOne Integration Benefits

- Visualize Cisco Secure Endpoint agents and the devices they protect in the
  JupiterOne graph.
- Map Cisco Secure Endpoint agents to devices and devices to the employee who is
  the owner.
- Monitor changes to Cisco Secure Endpoint endpoints using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches Cisco Secure Endpoint endpoints and the
  devices they protect to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires the endpoint hostname of the Cisco Secure Endpoint
  account. The API Client ID and Key are also required.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

The integration connects directly to [Cisco Secure Endpoint REST API][1] to
obtain endpoint protection and configuration information.

## In Cisco Secure Endpoint

To generate a Client ID and API Key:

- Log in to your **Secure Endpoint Console**.
- Go to **Accounts** > **API Credentials**.
- Click **New API Credentials** to generate the Client ID and secure API Key.

Valid API Endpoints include:

- `api.amp.cisco.com`
- `api.apjc.amp.cisco.com`
- `api.eu.amp.cisco.com`

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Cisco Secure Endpoint** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Cisco Secure
  Endpoint account in JupiterOne. Ingested entities will have this value stored
  in `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Endpoint Hostname** associated with your Cisco Secure Endpoint
  account.
- Enter the **API Client ID"** configured in your Cisco Secure Endpoint account.
- Enter the **API Key** associated with the Client ID, configured for read
  access.

4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Cisco Secure Endpoint** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

[1]: https://api-docs.amp.cisco.com/

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

| Resources     | Entity `_type`       | Entity `_class` |
| ------------- | -------------------- | --------------- |
| Account       | `cisco_amp_account`  | `Account`       |
| Computer      | `cisco_amp_endpoint` | `HostAgent`     |
| Finding       | `cisco_amp_finding`  | `Finding`       |
| Vulnerability | `cve`                | `Vulnerability` |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `cisco_amp_account`   | **HAS**               | `cisco_amp_endpoint`  |
| `cisco_amp_endpoint`  | **IDENTIFIED**        | `cisco_amp_finding`   |
| `cisco_amp_finding`   | **IS**                | `cve`                 |

### Mapped Relationships

The following mapped relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` | Direction |
| --------------------- | --------------------- | --------------------- | --------- |
| `cisco_amp_endpoint`  | **PROTECTS**          | `*user_endpoint*`     | FORWARD   |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
