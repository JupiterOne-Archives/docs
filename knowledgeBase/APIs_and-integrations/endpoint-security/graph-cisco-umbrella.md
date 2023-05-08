# Cisco Umbrella

## Integration Benefits

- Visualize Cisco Umbrella networks, domains, destinations, users, and
  discovered applications in the JupiterOne graph.
- Map Cisco Umbrella users to employees in your JupiterOne account.
- Monitor changes to Cisco Umbrella entities using JupiterOne alerts.

## How it Works

- JupiterOne periodically ingests networks, domains, destinations, users, and
  discovered applications from Cisco Umbrella to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Prerequisites

- Cisco Umbrella supports the use of API keys to authenticate API requests. You
  need access to an account that has permissions to create a new API key.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, contact
[JupiterOne Support](https://support.jupiterone.io).

## How to Use This Integration

### In Cisco Umbrella

1. [Generate an API key](https://docs.umbrella.com/umbrella-user-guide/docs/add-umbrella-api-keys)
2. Provide the API key with the minimum scopes:

- Admin/Roles - Read-Only
- Admin/Users - Read-Only
- Deployments - Read-Only
- Policies/Destination Lists - Read-Only
- Policies/Destinations - Read-Only
- Reports/App Discovery - Read-Only

  NOTE: Future improvements may require additional scopes be added.

3. Record the API Key and Key Secret values.

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll down to **Cisco Umbrella** and click it.
3. Click **Add Configuration** and configure the following settings:

- Enter the account name by which you want to identify this Cisco Umbrella
  account in JupiterOne. Select **Tag with Account Name** to store this value in
  `tag.AccountName` of the ingested assets.
- Enter a description to help your team identify the integration.
- Select a polling interval that is sufficient for your monitoring requirements.
  You can leave this as `DISABLED` and manually execute the integration.
- Enter the Cisco Umbrella API key and Key Secret generated for use by
  JupiterOne.

4. Click **Create Configuration** after you have entered all the values.

## How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll down to **Cisco Umbrella** and click it.
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

| Resources            | Entity `_type`                        | Entity `_class`   |
| -------------------- | ------------------------------------- | ----------------- |
| Account              | `cisco_umbrella_account`              | `Account`         |
| Application          | `cisco_umbrella_application`          | `Application`     |
| Application Category | `cisco_umbrella_application_category` | `Group`           |
| Destination          | `cisco_umbrella_destination`          | `Record`          |
| Destination List     | `cisco_umbrella_destination_list`     | `Record`          |
| Domain               | `cisco_umbrella_domain`               | `Domain`          |
| Network              | `cisco_umbrella_network`              | `Network`         |
| Network Device       | `cisco_umbrella_network_device`       | `Device`          |
| Network Tunnel       | `cisco_umbrella_network_tunnel`       | `NetworkEndpoint` |
| Policy               | `cisco_umbrella_policy`               | `Policy`          |
| Site                 | `cisco_umbrella_site`                 | `Site`            |
| System Role          | `cisco_umbrella_role`                 | `AccessRole`      |
| System User          | `cisco_umbrella_user`                 | `User`            |
| Virtual Appliance    | `cisco_umbrella_virtual_appliance`    | `Gateway`         |

### Relationships

The following relationships are created:

| Source Entity `_type`              | Relationship `_class` | Target Entity `_type`                 |
| ---------------------------------- | --------------------- | ------------------------------------- |
| `cisco_umbrella_account`           | **HAS**               | `cisco_umbrella_application`          |
| `cisco_umbrella_account`           | **HAS**               | `cisco_umbrella_destination_list`     |
| `cisco_umbrella_account`           | **HAS**               | `cisco_umbrella_domain`               |
| `cisco_umbrella_account`           | **HAS**               | `cisco_umbrella_network`              |
| `cisco_umbrella_account`           | **HAS**               | `cisco_umbrella_network_device`       |
| `cisco_umbrella_account`           | **HAS**               | `cisco_umbrella_policy`               |
| `cisco_umbrella_account`           | **HAS**               | `cisco_umbrella_site`                 |
| `cisco_umbrella_account`           | **HAS**               | `cisco_umbrella_user`                 |
| `cisco_umbrella_application`       | **HAS**               | `cisco_umbrella_application_category` |
| `cisco_umbrella_destination_list`  | **HAS**               | `cisco_umbrella_destination`          |
| `cisco_umbrella_site`              | **HAS**               | `cisco_umbrella_network_tunnel`       |
| `cisco_umbrella_site`              | **HAS**               | `cisco_umbrella_virtual_appliance`    |
| `cisco_umbrella_user`              | **ASSIGNED**          | `cisco_umbrella_role`                 |
| `cisco_umbrella_virtual_appliance` | **USES**              | `cisco_umbrella_domain`               |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
