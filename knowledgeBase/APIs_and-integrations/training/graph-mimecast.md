# Mimecast

## Mimecast + JupiterOne Integration Benefits

*   Visualize Mimecast account, users, domains, and awareness training campaigns,
    along with their relationships.
*   Map domains to account owning them
*   Map users to domains
*   Map awarenss training campaigns to enrolled users, and owning account
*   Monitor campaign status, or a specific user's participate across multiple
    campaigns using your JupiterOne account

## How it Works

*   JupiterOne periodically fetches account, domains, users, awareness training
    campaigns, and their participants from Mimecast to update the graph.
*   Write JupiterOne queries to review and monitor updates to the graph, or
    leverage existing queries.
*   Configure alerts to take action when JupiterOne graph changes, or leverage
    existing alerts.

## Requirements

You must have **admin access** to your Mimecast account, as you will need to
create an Application Integration.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Mimecast

In the Mimecast admin console:

*   go to Administration -> Services -> API and Platform Integrations
*   go to the `Your Application Integrations` category
*   click on `Add API Application` or click on an existing enabled Application in
    this section
*   here you will be able to view the `Application ID` and `Application Key`,
    which you will need for authentication.
*   If you have not already generated keys, do so now by clicking the
    `Create Keys` option
*   Save the contents of the `accessKey` and `secretKey` generated. They will be
    needed for authentication

### In JupiterOne

1.  From the top navigation of the J1 Search homepage, select **Integrations**.
2.  Scroll to the **Mimecast** integration tile and click it.
3.  Click the **Add Configuration** button and configure the following settings:

*   Enter the **Account Name** by which you'd like to identify this Mimecast
    account in JupiterOne. Ingested entities will have this value stored in
    `tag.AccountName` when **Tag with Account Name** is checked
*   Enter a **Description** that will further assist your team when identifying
    the integration instance.
*   Select a **Polling Interval** that you feel is sufficient for your monitoring
    needs. You may leave this as `DISABLED` and manually execute the integration.
*   Enter the **Application ID**, **Application Key**, **accessKey**, and
    **secretKey** generated for use by JupiterOne.

4.  Click **Create Configuration** once all values are provided.

# How to Uninstall

1.  From the top navigation of the J1 Search homepage, select **Integrations**.
2.  Scroll to the **Mimecast** integration tile and click it.
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

| Resources           | Entity `_type`                | Entity `_class` |
| ------------------- | ----------------------------- | --------------- |
| Account             | `mimecast_account`            | `Account`       |
| Awareness\_Campaign | `mimecast_awareness_campaign` | `Training`      |
| Domain              | `mimecast_domain`             | `Domain`        |
| User                | `mimecast_user`               | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type`         |
| --------------------- | --------------------- | ----------------------------- |
| `mimecast_account`    | **HAS**               | `mimecast_awareness_campaign` |
| `mimecast_account`    | **HAS**               | `mimecast_domain`             |
| `mimecast_domain`     | **HAS**               | `mimecast_user`               |
| `mimecast_user`       | **ASSIGNED**          | `mimecast_awareness_campaign` |
| `mimecast_user`       | **COMPLETED**         | `mimecast_awareness_campaign` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->

<!-- {J1_DOCUMENTATION_MARKER_END} -->
 
<!--  jupiterOneDocVersion=1-1-1 -->