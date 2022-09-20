# Cisco Panoptica Integration with JupiterOne

## Cisco Panoptica + JupiterOne Integration Benefits

*   Visualize your Cisco Panoptica account, clusters, containers, images, risks,
    users, and vulnerabilities in the JupiterOne graph.
*   Map Cicso Panoptica users to employees in your JupiterOne account.
*   Monitor changes to Cisco Panoptica users using JupiterOne alerts.

## How it Works

*   JupiterOne periodically fetches account, clusters, containers, images, risks,
    users, and vulnerabilities from Panoptica to update the graph.
*   Write JupiterOne queries to review and monitor updates to the graph, or
    leverage existing queries.
*   Configure alerts to take action when JupiterOne graph changes, or leverage
    existing alerts.

## Requirements

*   Panoptica supports [Escher Authentication](http://escherauth.io/). You must
    have a Administrator user account.
*   JupiterOne requires an Access Key and a Secret Key. You need permission to
    create a user in Panoptica that will be used to obtain the Access Key and a
    Secret Key.
*   You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Cisco Panoptica

[API & Secret keys](https://appsecurity.readme.io/docs/securecn-rest-api#api--secret-keys)

1.  Navigate to the System page, and then select MANAGE USERS.
2.  Click New User and then select Service User.
3.  Enter a name for the user. Leave the status as 'Active'.
4.  Click FINISH. Copy the values of Access Key and Secret Key, as they will be
    used later.

### In JupiterOne

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Cisco Panoptica** integration tile and click it.
3.  Click the **Add Configuration** button and configure the following settings:

*   Enter the **Account Name** by which you'd like to identify this Panoptica
    account in JupiterOne. Ingested entities will have this value stored in
    `tag.AccountName` when **Tag with Account Name** is checked.
*   Enter a **Description** that will further assist your team when identifying
    the integration instance.
*   Select a **Polling Interval** that you feel is sufficient for your monitoring
    needs. You may leave this as `DISABLED` and manually execute the integration.
*   Enter the **Access Key**, and **Secret Key** generated for use by JupiterOne.

4.  Click **Create Configuration** once all values are provided.

# How to Uninstall

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Cisco Panoptica** integration tile and click it.
3.  Identify and click the **integration to delete**.
4.  Click the **trash can** icon.
5.  Click the **Remove** button to delete the integration.

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

| Resources     | Entity `_type`            | Entity `_class` |
| ------------- | ------------------------- | --------------- |
| Account       | `panoptica_account`       | `Account`       |
| Cluster       | `panoptica_cluster`       | `Cluster`       |
| Container     | `panoptica_container`     | `Container`     |
| Image         | `panoptica_image`         | `Image`         |
| Risk          | `panoptica_risk`          | `Risk`          |
| User          | `panoptica_user`          | `User`          |
| Vulnerability | `panoptica_vulnerability` | `Vulnerability` |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type`     |
| --------------------- | --------------------- | ------------------------- |
| `panoptica_account`   | **HAS**               | `panoptica_cluster`       |
| `panoptica_account`   | **HAS**               | `panoptica_image`         |
| `panoptica_account`   | **HAS**               | `panoptica_user`          |
| `panoptica_cluster`   | **HAS**               | `panoptica_container`     |
| `panoptica_cluster`   | **HAS**               | `panoptica_risk`          |
| `panoptica_image`     | **HAS**               | `panoptica_vulnerability` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->

<!-- {J1_DOCUMENTATION_MARKER_END} -->
 
<!--  jupiterOneDocVersion=1-1-2 -->