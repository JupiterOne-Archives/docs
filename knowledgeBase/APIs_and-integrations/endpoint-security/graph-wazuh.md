# Wazuh

## Wazuh + JupiterOne Integration Benefits

- Visualize Wazuh endpoint agents and the devices they protect in the JupiterOne
  graph.
- Map endpoint agents to devices and devices to the employee who has or owns the
  device.
- Monitor changes to Wazuh endpoint agents and devices using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches Wazuh endpoint agents and devices to update
  the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires the Wazuh manager API base URL. JupiterOne also requires
  the username and password to authenticate with the API.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Wazuh

JupiterOne provides a managed integration with [Wazuh][1]. The integration
connects directly to Wazah Manager APIs to obtain agent information. Customers
authorize access to their self-hosted servers by providing the manager base URL
and a username and password to JupiterOne.

### In Wazuh Cloud

If you are using Wazuh Cloud, contact J1 Support to obtain a list of IPs for
Wazuh to whitelist. After you get the IP list, contact Wazuh Support to make
changes to your Wazuh Cloud account to expose the API.

After you have done this, the J1 integration can connect to your Wazuh Cloud
instance. Be sure to structure your MANAGER_URL in the J1 integration
configuration to be in the following format:
`https://${wauzhCloudEnvId}.cloud.wazuh.com/api/wazuh`

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Wazuh** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Wazuh account
  in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Manager URL**, or the Wazuh API base URL.
- Enter the **Username** used to authenticate with the Wazuh Manager.
- Enter the **Password** associated with the username.

4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Wazuh** integration tile and click it.
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

| Resources | Entity `_type`  | Entity `_class`      |
| --------- | --------------- | -------------------- |
| Account   | `wazuh_manager` | `Service`, `Control` |
| Agent     | `wazuh_agent`   | `HostAgent`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `wazuh_manager`       | **HAS**               | `wazuh_agent`         |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->

[1]: https://wazuh.com
