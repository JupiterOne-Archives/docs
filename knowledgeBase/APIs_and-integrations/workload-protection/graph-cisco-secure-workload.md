# Cisco Secure Workload

## Cisco Secure Workload + JupiterOne Integration Benefits

- Visualize Cisco Secure Workload users, roles, and scopes in the JupiterOne
  graph.
- Map Cisco Secure Workload users to connected users in your JupiterOne account.
- Monitor changes to Cisco Secure Workload users, roles, and scopes using
  JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches users, roles, and scopes from Cisco Secure
  Workload to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to take action when JupiterOne graph changes.

## Requirements

- JupiterOne requires a REST API key. You will need an API Key with
  `Users, roles and scope management` and `Flow, workload and inventory APIs`
  permissions.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Cisco Secure Workload

1. [Generate a REST API key/API secret](https://www.cisco.com/c/en/us/td/docs/security/workload_security/secure_workload/openapi/csw_openapi_pointer.html)

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Cisco Secure Workload** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Cisco Secure
  Workload account in JupiterOne. Ingested entities will have this value stored
  in `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Cisco Secure Workload API Key/API Secret** generated for use by
  JupiterOne.
- Enter the **API URI** for your **Cisco Secure Workload** dashboard.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Cisco Secure Worklpaod** integration tile and click it.
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

| Resources              | Entity `_type`         | Entity `_class` |
| ---------------------- | ---------------------- | --------------- |
| Account                | `csw_account`          | `Account`       |
| Interface              | `csw_interface`        | `Application`   |
| Package                | `csw_package`          | `CodeModule`    |
| Policy                 | `csw_policy`           | `ControlPolicy` |
| Role                   | `csw_role`             | `AccessRole`    |
| Scope                  | `csw_scope`            | `Group`         |
| User                   | `csw_user`             | `User`          |
| Workload               | `csw_project`          | `Project`       |
| Workload Vulnerability | `csw_workload_finding` | `Finding`       |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type`  |
| --------------------- | --------------------- | ---------------------- |
| `csw_account`         | **HAS**               | `csw_policy`           |
| `csw_account`         | **HAS**               | `csw_role`             |
| `csw_account`         | **HAS**               | `csw_user`             |
| `csw_interface`       | **HAS**               | `csw_scope`            |
| `csw_package`         | **HAS**               | `csw_workload_finding` |
| `csw_policy`          | **HAS**               | `csw_scope`            |
| `csw_project`         | **HAS**               | `csw_interface`        |
| `csw_project`         | **HAS**               | `csw_package`          |
| `csw_project`         | **HAS**               | `csw_workload_finding` |
| `csw_role`            | **USES**              | `csw_scope`            |
| `csw_scope`           | **HAS**               | `csw_scope`            |
| `csw_user`            | **ASSIGNED**          | `csw_scope`            |
| `csw_user`            | **HAS**               | `csw_role`             |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
