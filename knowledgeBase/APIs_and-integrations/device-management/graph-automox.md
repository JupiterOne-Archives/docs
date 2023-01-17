# Automox

## Automox + JupiterOne Integration Benefits

- Visualize Automox services, teams, and users in the JupiterOne graph.
- Map Automox users to employees in your JupiterOne account.
- Monitor changes to Automox users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches services, teams, and users from Automox to
  update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- Automox supports Bearer Authentication. You must have a Administrator user
  account.
- JupiterOne requires a REST API key. You need permission to create a user in
  Automox that will be used to obtain the API key.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Automox

1. Sign-up for a Automox account
2. Take note of the provided domain
3. In the kebab menu on the console, go to Keys.
4. Add an API key

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the Automox integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Automox
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
  Enter the **Automox API Key** generated for use by JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

TODO: List specific actions that must be taken to uninstall the integration.
Many of the following steps will be reusable; take care to be sure they remain
accurate.

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the Automox integration tile and click it.
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

| Resources    | Entity `_type`         | Entity `_class` |
| ------------ | ---------------------- | --------------- |
| Account      | `automox_account`      | `Account`       |
| Device       | `automox_device`       | `Device`        |
| Device Group | `automox_device_group` | `Group`         |
| User         | `automox_user`         | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type`  | Relationship `_class` | Target Entity `_type`  |
| ---------------------- | --------------------- | ---------------------- |
| `automox_account`      | **HAS**               | `automox_device`       |
| `automox_account`      | **HAS**               | `automox_device_group` |
| `automox_account`      | **HAS**               | `automox_user`         |
| `automox_device_group` | **HAS**               | `automox_device`       |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
