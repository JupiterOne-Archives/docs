# Semaphore CI

## Semaphore CI + JupiterOne Integration Benefits

*   Visualize Semaphore CI account, jobs, pipelines, projects, and workflows in
    the JupiterOne graph.
*   Map Semaphore CI users to employees in your JupiterOne account.
*   Monitor changes to Semaphore CI users using JupiterOne alerts.

## How it Works

*   JupiterOne periodically fetches account, jobs, pipelines, projects, and
    workflows from Semaphore CI to update the graph.
*   Write JupiterOne queries to review and monitor updates to the graph, or
    leverage existing queries.
*   Configure alerts to take action when JupiterOne graph changes, or leverage
    existing alerts.

## Requirements

*   Semaphore CI uses token authorization.
*   JupiterOne requires an API token.
*   You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Semaphore CI

1.  In your organization, go to profile settings.
2.  Copy your API token

### In JupiterOne

1.  From the top navigation of the J1 Search homepage, select **Integrations**.
2.  Scroll to the **Semaphore CI** integration tile and click it.
3.  Click the **Add Configuration** button and configure the following settings:

*   Enter the **Account Name** by which you'd like to identify this Semaphore CI
    account in JupiterOne. Ingested entities will have this value stored in
    `tag.AccountName` when **Tag with Account Name** is checked.
*   Enter a **Description** that will further assist your team when identifying
    the integration instance.
*   Select a **Polling Interval** that you feel is sufficient for your monitoring
    needs. You may leave this as `DISABLED` and manually execute the integration.
*   Enter the **Semaphore CI API Token**, and your **Semaphore CI Organization
    Name** generated for use by JupiterOne.

4.  Click **Create Configuration** once all values are provided.

# How to Uninstall

1.  From the top navigation of the J1 Search homepage, select **Integrations**.
2.  Scroll to the **Semaphore CI** integration tile and click it.
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

| Resources | Entity `_type`       | Entity `_class` |
| --------- | -------------------- | --------------- |
| Account   | `semaphore_account`  | `Account`       |
| Job       | `semaphore_job`      | `Entity`        |
| Pipeline  | `semaphore_pipeline` | `Entity`        |
| Project   | `semaphore_project`  | `Project`       |
| Workflow  | `semaphore_workflow` | `Task`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `semaphore_account`   | **HAS**               | `semaphore_project`   |
| `semaphore_pipeline`  | **HAS**               | `semaphore_job`       |
| `semaphore_project`   | **HAS**               | `semaphore_pipeline`  |
| `semaphore_project`   | **HAS**               | `semaphore_workflow`  |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->

<!-- {J1_DOCUMENTATION_MARKER_END} -->
 
<!--  jupiterOneDocVersion=1-0-0 -->