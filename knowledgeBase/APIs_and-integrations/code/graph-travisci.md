# TravisCI Integration with JupiterOne

## Travis CI + JupiterOne Integration Benefits

*   Visualize Travis CI repositories in the JupiterOne graph.
*   Map Travis CI users to employees in your JupiterOne account.
*   Monitor changes to Travis CI users using JupiterOne alerts.

## How it Works

*   JupiterOne periodically fetches repositories from Travis CI to update the
    graph.
*   Write JupiterOne queries to review and monitor updates to the graph, or
    leverage existing queries.
*   Configure alerts to take action when JupiterOne graph changes, or leverage
    existing alerts.

## Requirements

*   Travis CI requires a GitHub account to sign up. You must be an admin for any
    of the repositories you want to integrate with Travis CI.
*   JupiterOne requires an API Token generated from Travis CI.
*   You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Travis CI

1.  Create a user account
2.  Take note of the login credentials which will latter be used for request
    authentication.

### In JupiterOne

TODO: List specific actions that must be taken in JupiterOne. Many of the
following steps will be reusable; take care to be sure they remain accurate.

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Travis CI** integration tile and click it.
3.  Click the **Add Configuration** button and configure the following settings:

*   Enter the **Account Name** by which you'd like to identify this Travis CI
    account in JupiterOne. Ingested entities will have this value stored in
    `tag.AccountName` when **Tag with Account Name** is checked.
*   Enter a **Description** that will further assist your team when identifying
    the integration instance.
*   Select a **Polling Interval** that you feel is sufficient for your monitoring
    needs. You may leave this as `DISABLED` and manually execute the integration.
*   Enter the **Token** and **Hostname** generated for use by JupiterOne.

4.  Click **Create Configuration** once all values are provided.

# How to Uninstall

TODO: List specific actions that must be taken to uninstall the integration.
Many of the following steps will be reusable; take care to be sure they remain
accurate.

1.  From the configuration **Gear Icon**, select **Integrations**.
2.  Scroll to the **Travis CI** integration tile and click it.
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

| Resources | Entity `_type`      | Entity `_class` |
| --------- | ------------------- | --------------- |
| Account   | `travisci_account`  | `Account`       |
| CodeRepo  | `travisci_coderepo` | `CodeRepo`      |
| User      | `travisci_user`     | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `travisci_account`    | **IS**                | `travisci_user`       |
| `travisci_user`       | **CREATED**           | `travisci_coderepo`   |
| `travisci_user`       | **USES**              | `travisci_coderepo`   |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->

<!-- {J1_DOCUMENTATION_MARKER_END} -->
 
<!--  jupiterOneDocVersion=1-0-0 -->