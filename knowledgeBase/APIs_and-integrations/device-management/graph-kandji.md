# Kandji Integration with JupiterOne

## Kandji + JupiterOne Integration Benefits

- Visualize Kandji devices and apps in the JupiterOne graph.
- Monitor changes to Kandji devices and apps using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches devices and apps from Kandji to update the
  graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- JupiterOne requires an Access Token and Organization API URL. You need
  permission to create a user in Kandji that will be used to obtain the Access
  Token and API URL.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Kandji

1. Login to your Kandji subdomain.

- This is usually in the format of `https://{subdomain}.kandji.io/`

2. Got to Settings > Access > API Token. If you don't see this, contact the
   server admin.
3. Click "Add Token"
4. Set a token name and description (optional). Once set, make sure to copy the
   API token. You won't be able to see this again.
5. Configure API permissions. The Kandji integration needs the following
   permissions.

- Device list `GET /devices`
- Device details `GET /devices/{device_id}/details`
- Application list `GET /devices/{device_id}/apps`

6. Once you are finished with configuration, you should be able to see the
   organization API URL under the API token section.
7. Use the organization API URL for `API_URL` and API token for `ACCESS_TOKEN`

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Kandji** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Kandji account
  in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Kandji Access Token** and **Kandji API URL** generated for use by
  JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Kandji** integration tile and click it.
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

| Resources | Entity `_type`   | Entity `_class` |
| --------- | ---------------- | --------------- |
| Account   | `kandji_account` | `Account`       |
| App       | `kandji_app`     | `Application`   |
| Device    | `kandji_device`  | `Device`        |
| User      | `kandji_user`    | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `kandji_account`      | **HAS**               | `kandji_device`       |
| `kandji_device`       | **HAS**               | `kandji_app`          |
| `kandji_device`       | **HAS**               | `kandji_user`         |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
