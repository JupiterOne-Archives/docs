# Integration with JupiterOne

## Hubspot + JupiterOne Integration Benefits

- Visualize Hubspot owners, roles, and companies in the JupiterOne graph.
- Map Hubspot owners to employees in your JupiterOne account.
- Monitor changes to Hubspot owners, roles, and companies using JupiterOne
  alerts.

## How it Works

- JupiterOne periodically fetches owners, roles, and companies from Hubspot to
  update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- Hubspot supports both OAuth and API keys. But for this integration, we only
  support OAuth.
- To create an OAuth account, you need to have a developer account. You can see
  hubspot's
  [OAuth Quickstart Guide](https://developers.hubspot.com/docs/api/oauth-quickstart-guide)
  for reference.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Hubspot

Taken from
[OAuth Quickstart Guide](https://developers.hubspot.com/docs/api/oauth-quickstart-guide):

Before you can start using OAuth with HubSpot, you'll need to have:

- A developer account
- An app associated with your developer account
- A HubSpot account to install your app in (you can use an existing account or
  create a test account)

### In JupiterOne

On `./oauth-server`

1. Generate a `.env` from `.env.example`
2. Input the required fields from your Hubspot account to the `./oath-server`'s
   `.env`
3. Run the server and authorize your application
4. Record the generated OAuth key

On `graph-hubspot`

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Hubspot** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Hubspot
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **OAuth Access Token** generated for use by JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Hubspot** integration tile and click it.
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

| Resources       | Entity `_type`    | Entity `_class` |
| --------------- | ----------------- | --------------- |
| HubSpot Account | `hubspot_account` | `Account`       |
| HubSpot Company | `hubspot_company` | `Organization`  |
| HubSpot Role    | `hubspot_role`    | `AccessRole`    |
| HubSpot User    | `hubspot_user`    | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `hubspot_account`     | **HAS**               | `hubspot_company`     |
| `hubspot_account`     | **HAS**               | `hubspot_role`        |
| `hubspot_account`     | **HAS**               | `hubspot_user`        |
| `hubspot_user`        | **ASSIGNED**          | `hubspot_role`        |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
