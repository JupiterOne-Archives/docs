# Esper

## Esper + JupiterOne Integration Benefits

- Visualize Esper enterprise, applications, devices, device groups in the
  JupiterOne graph.
- Map Esper users to employees in your JupiterOne account.
- Monitor changes to Esper users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches enterprise, applications, devices, device
  groups from Esper to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- Esper supports the OAuth2 Client Credential flow.
- JupiterOne requires an API access token for authentication.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Esper

[Generate a REST API key](https://console-docs.esper.io/api/generate.html#how-to-generate-an-api-key-from-the-console)

1. On the dashboard, go to 'API Key Management'
2. Click the 'Create Key' button
3. Enter an API key name, description is optional.
4. Click the 'Create Key' button
5. Take note of the generated API key

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Esper** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Esper account
  in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Esper Access Token**, **Esper Enterprise ID**, and **Esper
  Domain** generated for use by JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Esper** integration tile and click it.
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

| Resources    | Entity `_type`       | Entity `_class` |
| ------------ | -------------------- | --------------- |
| Account      | `esper_account`      | `Account`       |
| Application  | `esper_application`  | `Application`   |
| Device       | `esper_device`       | `Device`        |
| Device Group | `esper_device_group` | `Group`         |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `esper_account`       | **HAS**               | `esper_application`   |
| `esper_account`       | **HAS**               | `esper_device`        |
| `esper_account`       | **HAS**               | `esper_device_group`  |
| `esper_device_group`  | **HAS**               | `esper_device`        |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
