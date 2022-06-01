# Orca Integration with JupiterOne

## Orca Security + JupiterOne Integration Benefits

*   Visualize Orca Security services, groups, and users in the JupiterOne graph.
*   Map Orca Security users to employees in your JupiterOne account.
*   Monitor changes to Orca Security users using JupiterOne alerts.

## How it Works

*   JupiterOne periodically fetches services, groups, and users from Orca Security
    to update the graph.
*   Write JupiterOne queries to review and monitor updates to the graph, or
    leverage existing queries.
*   Configure alerts to take action when JupiterOne graph changes, or leverage
    existing alerts.

## Requirements

*   JupiterOne requires a REST API key. You need permission to create a user in
    Orca Security that will be used to obtain the API key.
*   You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Orca Security

1.  Log in to [Orca dashboard](https://app.orcasecurity.io) and navigate to
    [integrations](https://app.orcasecurity.io/integrations).
2.  Click the **Manage Keys** button to create a new Orca API token.
3.  Click "Generate A New Key" and make sure to supply it as the ENV variable
    (CLIENT\_SECRET=\[token you've just generated]).
4.  Next, you also need to supply the account email as the ENV variable
    (CLIENT\_EMAIL=\[the email you've used for authenticating]).

### In JupiterOne

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Orca Security** integration tile and click it.
3.  Click the **Add Configuration** button and configure the following settings:

*   Enter the **Account Name** by which you'd like to identify this Orca Security
    account in JupiterOne. Ingested entities will have this value stored in
    `tag.AccountName` when **Tag with Account Name** is checked.
*   Enter a **Description** that will further assist your team when identifying
    the integration instance.
*   Select a **Polling Interval** that you feel is sufficient for your monitoring
    needs. You may leave this as `DISABLED` and manually execute the integration.
*   {{additional provider-specific settings}} Enter the **Orca Security API Key**
    generated for use by JupiterOne.

4.  Click **Create Configuration** once all values are provided.

# How to Uninstall

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Orca Security** integration tile and click it.
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

| Resources | Entity `_type` | Entity `_class` |
| --------- | -------------- | --------------- |
| Account   | `orca_account` | `Account`       |
| Role      | `orca_role`    | `AccessRole`    |
| User      | `orca_user`    | `User`          |
| UserGroup | `orca_group`   | `UserGroup`     |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `orca_account`        | **HAS**               | `orca_group`          |
| `orca_account`        | **HAS**               | `orca_user`           |
| `orca_group`          | **HAS**               | `orca_user`           |
| `orca_user`           | **ASSIGNED**          | `orca_role`           |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->

<!-- {J1_DOCUMENTATION_MARKER_END} -->
 
<!--  jupiterOneDocVersion=1-0-0 -->