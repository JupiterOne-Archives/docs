# ServiceNow

## Integration Benefits

- Visualize your ServiceNow account, incidents, users, and usergroups in your
  JupiterOne account.
- See the relationships between your account and users or usergroups, usergroups
  and other usergroups or users, and incidents and users.
- Monitor changes to these ServiceNow entities using JupiterOne Alerts.
- Query for users in JupiterOne that have access to ServiceNow and that
  incidents they have been assigned.
- Get a detailed description of any part of your CMDB, and it's relationships
  with users

## How it Works

- JupiterOne periodically fetches account, incidents, users and usergroups from
  ServiceNow to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Support

If you need help with this integration, contact
[JupiterOne Support](https://support.jupiterone.io).

## Prerequisites

The JupiterOne ServiceNow integration is configured using your target ServiceNow
implementation's `hostname`, such as `my-company.service-now.com`.

The integration authenticates using Basic auth with `username` and `password`
for a read-only account. Whenever possible, we recommend creating a new user in
your ServiceNow implementation to be used strictly for authenticating with this
integration.

### In ServiceNow

In order to allow JupiterOne to fetch data from your ServiceNow account, we
recommend creating a new ServiceNow role with read-only access to your account
and assigning that read-only role to a dedicated ServiceNow user.

1. Follow the ServiceNow documentation to
   [create a new ServiceNow role](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/roles/task/t_CreateARole.html)
   called `jupiterone_reader`.

2. For each of the ServiceNow tables used in the JupiterOne <-> ServiceNow
   integration,
   [create a new access control rule (ACL)](https://docs.servicenow.com/bundle/rome-it-service-management/page/product/change-management/task/t_CreateNewACL.html)
   to allow access to the `jupiterone_reader` role with `Type: Record`,
   `Operation: Read`, and `Role: jupiterone_reader`. This should be enabled for
   the following tables (found in the `Name` field):

   - `sys_user`
   - `sys_user_group`
   - `sys_user_grmember`
   - `incident`
   - `sys_db_object`

3. Create a
   [new ServiceNow User](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/users-and-groups/task/t_CreateAUser.html)
   called `JupiterOne`. Make a note of the new username/password; you'll need it
   when configuring your integration in JupiterOne.

4. Open the `JupiterOne` user and
   [assign the `jupiterone_reader` role](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/users-and-groups/task/t_AssignARoleToAUser.html)
   to your newly created user. **Note**: if ingesting any part of the cmdb, also
   add the `cmdb_reader` role. See
   [this link](https://docs.servicenow.com/bundle/utah-platform-administration/page/administer/roles/reference/r_BaseSystemRoles.html)
   for more information.

5. (**OPTIONAL**) For JupiterOne users who wish to create ServiceNow incidents
   based on JupiterOne alert rules, we suggest creating a
   `jupiterone_incident_creator` role. Repeat steps 1, 2, and 4 above with the
   following parameters:

   **1. ServiceNow Role**: `name: jupiterone_incident_creator`

   **2. Access Control Rule (ACL)** : `Type:Record` , `Operation:Create` ,
   `Name(table):incident` , `Role:jupiterone_incident_creator`

   **4. Role Assignment**: Assign `jupiterone_incident_creator` role to
   `JupiterOne` user

## In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll down to **ServiceNow** and click it.
3. Click **Add Instance** and configure the following settings:

- Enter the Account Name by which you want to identify this ServiceNow account.
- Enter a Description to help your team identify the integration.
- Select a Polling Interval that is sufficient for your monitoring requirements.
  You can leave this as `DISABLED` and manually execute the integration.
- Enter the Hostname of your ServiceNow instance, e.g. j1.service-now.com.
- Enter the Username.
- Enter the password.
- Enable **Add AccountName Tag** to store the Account Name entered above in the
  tags of the ingested assets.
- Enable **Add Production Tag** to store the value Production in the tags of the
  ingested assets.
- Optionally add additional custom tags to be stored on the entities of this
  instance.

4. Click **Create** after you have entered all the values.

## How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll down to **ServiceNow** and click it.
3. Identify and click the **integration to delete**.
4. Click the Delete button.
5. Click **Yes, Delete** to confirm the deletion.

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

| Resources   | Entity `_type`            | Entity `_class` |
| ----------- | ------------------------- | --------------- |
| Account     | `service_now_account`     | `Account`       |
| CMDB Object | `service_now_cmdb_object` | `Configuration` |
| Incident    | `service_now_incident`    | `Incident`      |
| User        | `service_now_user`        | `User`          |
| User Group  | `service_now_group`       | `UserGroup`     |

### Relationships

The following relationships are created:

| Source Entity `_type`     | Relationship `_class` | Target Entity `_type`     |
| ------------------------- | --------------------- | ------------------------- |
| `service_now_account`     | **HAS**               | `service_now_group`       |
| `service_now_account`     | **HAS**               | `service_now_user`        |
| `service_now_cmdb_object` | **ASSIGNED**          | `service_now_user`        |
| `service_now_group`       | **HAS**               | `service_now_group`       |
| `service_now_group`       | **HAS**               | `service_now_user`        |
| `service_now_group`       | **MANAGES**           | `service_now_cmdb_object` |
| `service_now_incident`    | **ASSIGNED**          | `service_now_user`        |
| `service_now_user`        | **MANAGES**           | `service_now_cmdb_object` |
| `service_now_user`        | **OWNS**              | `service_now_cmdb_object` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
