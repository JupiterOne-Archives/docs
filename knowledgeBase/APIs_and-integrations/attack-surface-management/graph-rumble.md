# Rumble

## Rumble + JupiterOne Integration Benefits

*   Visualize your Rumble organizations, users, and scanned assets and services in
    the JupiterOne graph.
*   Map Rumble users to employees in your JupiterOne account.
*   Monitor changes to Rumble users using JupiterOne alerts.
*   Discover which assets in your network are running a vulnerable OS

## How it Works

*   JupiterOne periodically fetches organizations, users, assets, and other
    entities from Rumble to update the graph.
*   Write JupiterOne queries to review and monitor updates to the graph, or
    leverage existing queries.
*   Configure alerts to take action when the JupiterOne graph changes, or leverage
    existing alerts.

## Requirements

*   JupiterOne integration requires a Rumble **Account API Key**. To generate an
    **Account API Key** you'll need:

    *   Rumble Enterprise License
    *   Administrator access

*   JupiterOne integration also requires an **Export Token** for each organization
    whose asset, services, and wireless data you want to include. To generate an
    **Export Token** you'll need:

    *   Admin access to the organization for which you want to generate an **Export
        Token**

*   You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

You'll need an **Account API Key** and administrator access to the account to
integrate with JupiterOne. You'll also need to generate **Export Tokens** for
all organizations whose data you want to ingest.

### In Rumble

**Account API Key Generation**

1.  Navigate to the [Rumble Console](https://console.rumble.run/).
2.  In the navigation bar, go to `Account`
3.  On the Account page under the Account API keys section, click "Generate API
    Key"
4.  A new **Account API Key** will be created. This key will be used in the next
    section.

**Export Token Generation**

You'll need to generate an export token for each organization whose assets,
services, and wireless data you want to include in the graph. The integration
will automatically collect these tokens if they are present. Organizations
without export tokens will not have assets, services, or wireless data ingested.

1.  Navigate to the [Rumble Console](https://console.rumble/run)
2.  In the navigation bar, go to `Organizations`
3.  Click on the organization in which you want to create an `Export Token`
4.  Press the **Generate Export Token** button.
5.  Repeat for all organizations whosse data you want to ingest.

### In JupiterOne

1.  From the top navigation of the J1 Search homepage, select **Integrations**.
2.  Scroll to the **Rumble** integration tile and click it.
3.  Click the **Add Configuration** button and configure the following settings:

*   Enter the **Account Name** by which you'd like to identify this Rumble account
    in JupiterOne. Ingested entities will have this value stored in
    `tag.AccountName` when **Tag with Account Name** is checked.
*   Enter a **Description** that will further assist your team when identifying
    the integration instance.
*   Select a **Polling Interval** that you feel is sufficient for your monitoring
    needs. You may leave this as `DISABLED` and manually execute the integration.
*   Enter the **Account API Key** generated for use by JupiterOne.

4.  Click **Create Configuration** once all values are provided.

# How to Uninstall

1.  From the top navigation of the J1 Search homepage, select **Integrations**.
2.  Scroll to the **Rumble** integration tile and click it.
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

| Resources    | Entity `_type`        | Entity `_class` |
| ------------ | --------------------- | --------------- |
| Account      | `rumble_account`      | `Account`       |
| Asset        | `rumble_asset`        | `Device`        |
| Organization | `rumble_organization` | `Organization`  |
| Site         | `rumble_site`         | `Site`          |
| User         | `rumble_user`         | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `rumble_account`      | **HAS**               | `rumble_organization` |
| `rumble_account`      | **HAS**               | `rumble_user`         |
| `rumble_organization` | **HAS**               | `rumble_site`         |
| `rumble_site`         | **HAS**               | `rumble_asset`        |
| `rumble_user`         | **ASSIGNED**          | `rumble_organization` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->

<!-- {J1_DOCUMENTATION_MARKER_END} -->
 
<!--  jupiterOneDocVersion=1-2-2 -->