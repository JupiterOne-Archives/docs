# Alibaba Cloud

## Alibaba Cloud + JupiterOne Integration Benefits

- Visualize Alibaba Cloud resources in the JupiterOne graph.
- Monitor visibility and governance of your Alibaba cloud environment by
  leveraging hundreds of out of the box queries. 
- Monitor changes to Alibaba Cloud users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches users and cloud resources from Alibaba Cloud
  to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when the JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- JupiterOne requires an Access and Secret Access Key for making requests to the
  Alibaba Cloud API.
  - You need permission to create a user with an Access and Secret Access key.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Alibaba Cloud

An Access Key ID and Access Key Secret is required for the integration to
interact with Alibaba Cloud's API. In order to obtain an Access Key ID/Secret
combination for the integration, an administrator of the Alibaba Cloud account
will need to create a new RAM user the integration can use. Additionally, the
user will need to have Read Only access to the account. To do so, the
administrator can:

1. Navigate to the RAM page in the Alibaba Cloud console.
2. Select `Create User`. We suggest the name of the user include `JupiterOne`.
3. Check the `Open API Access` option while creating the new user.
4. Obtain the Access Key ID/Secret combination that is generated.
5. Grant the new user the `ReadOnlyAccess` permission.

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Alibaba Cloud** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Alibaba Cloud
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the Alibaba Cloud **Access Key ID** and **Secret Access Key** generated
  for use by JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Alibaba Cloud** integration tile and click it.
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

| Resources         | Entity `_type`                    | Entity `_class`       |
| ----------------- | --------------------------------- | --------------------- |
| ALB Load Balancer | `alibaba_cloud_alb_load_balancer` | `Gateway`             |
| Autoscaling Group | `alibaba_cloud_autoscaling_group` | `Deployment`, `Group` |
| ECS Instance      | `alibaba_cloud_ecs_instance`      | `Host`                |
| NAT Gateway       | `alibaba_cloud_nat_gateway`       | `Gateway`             |
| OSS Bucket        | `alibaba_cloud_oss_bucket`        | `DataStore`           |
| OSS Object        | `alibaba_cloud_oss_object`        | `DataObject`          |
| RAM Group         | `alibaba_cloud_ram_group`         | `UserGroup`           |
| RAM Policy        | `alibaba_cloud_ram_policy`        | `Policy`              |
| RAM Role          | `alibaba_cloud_ram_role`          | `AccessRole`          |
| RAM User          | `alibaba_cloud_ram_user`          | `User`                |
| VPC               | `alibaba_cloud_vpc`               | `Network`             |
| VPN Gateway       | `alibaba_cloud_vpn_gateway`       | `Gateway`             |

### Relationships

The following relationships are created:

| Source Entity `_type`             | Relationship `_class` | Target Entity `_type`             |
| --------------------------------- | --------------------- | --------------------------------- |
| `alibaba_cloud_autoscaling_group` | **USES**              | `alibaba_cloud_vpc`               |
| `alibaba_cloud_oss_bucket`        | **HAS**               | `alibaba_cloud_oss_object`        |
| `alibaba_cloud_ram_group`         | **HAS**               | `alibaba_cloud_ram_user`          |
| `alibaba_cloud_ram_policy`        | **ASSIGNED**          | `alibaba_cloud_ram_group`         |
| `alibaba_cloud_ram_policy`        | **ASSIGNED**          | `alibaba_cloud_ram_role`          |
| `alibaba_cloud_ram_policy`        | **ASSIGNED**          | `alibaba_cloud_ram_user`          |
| `alibaba_cloud_vpc`               | **HAS**               | `alibaba_cloud_alb_load_balancer` |
| `alibaba_cloud_vpc`               | **HAS**               | `alibaba_cloud_ecs_instance`      |
| `alibaba_cloud_vpc`               | **HAS**               | `alibaba_cloud_nat_gateway`       |
| `alibaba_cloud_vpc`               | **HAS**               | `alibaba_cloud_vpn_gateway`       |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
