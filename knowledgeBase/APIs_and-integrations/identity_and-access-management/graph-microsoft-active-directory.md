# Microsoft Active Directory

## Microsoft Active Directory + JupiterOne Integration Benefits

- Visualize Microsoft Active Directory users, groups, and devices in the
  JupiterOne graph.
- Monitor changes to Microsoft Active Directory users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches users, groups, and devices from Microsoft
  Active Directory to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- You must create an Microsoft Active Directory account capable of executing
  Active Directory read queries.
- You must open the LDAP port on your server to allow queries to be executed.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Microsoft Active Directory

1. Create an Active Directory user capable of executing read queries.

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Microsoft Active Directory** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Microsoft
  Active Directory account in JupiterOne. Ingested entities will have this value
  stored in `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- {{additional provider-specific settings}} Enter the **Microsoft Active
  Directory API Key** generated for use by JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Microsoft Active Directory** integration tile and click it.
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

| Resources | Entity `_type` | Entity `_class` |
| --------- | -------------- | --------------- |
| Account   | `ad_account`   | `Account`       |
| Device    | `ad_device`    | `Device`        |
| User      | `ad_user`      | `User`          |
| UserGroup | `ad_group`     | `UserGroup`     |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `ad_account`          | **HAS**               | `ad_device`           |
| `ad_account`          | **HAS**               | `ad_group`            |
| `ad_account`          | **HAS**               | `ad_user`             |
| `ad_group`            | **HAS**               | `ad_user`             |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
