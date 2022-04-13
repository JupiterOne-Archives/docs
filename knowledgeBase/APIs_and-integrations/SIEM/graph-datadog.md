# Datadog Integration with JupiterOne

## Datadog + JupiterOne Integration Benefits

- Visualize Datadog services, teams, and users in the JupiterOne graph.
- Map Datadog users to employees in your JupiterOne account.
- Monitor changes to Datadog users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches services, teams, and users from Datadog to
  update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- Datadog supports authentication via an API key and an application key.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Datadog

1. Register for a Datadog account.
2. Create an API key by going to
   https://app.datadoghq.com/organization-settings/api-keys. (click on 'New Key'
   at the top right corner). The account must have the "Datadog Admin Role" to
   be able to generate an API key.
3. Create an application key by going to
   https://app.datadoghq.com/organization-settings/application-keys. (click on
   'New Key' at the top right corner). An account with any role can generate
   application key.
4. Take note of these credentials and supply them to the integration's
   [.env file](../env.example).

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Datadog** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Datadog
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- {{additional provider-specific settings}} Enter the **Datadog API Key**
  generated for use by JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Datadog** integration tile and click it.
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

| Resources | Entity `_type`    | Entity `_class` |
| --------- | ----------------- | --------------- |
| Account   | `datadog_account` | `User`          |
| Role      | `datadog_role`    | `AccessRole`    |
| User      | `datadog_user`    | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `datadog_account`     | **HAS**               | `datadog_role`        |
| `datadog_account`     | **HAS**               | `datadog_user`        |
| `datadog_user`        | **ASSIGNED**          | `datadog_role`        |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
