# Red Hat Quay

## Red Hat Quay + JupiterOne Integration Benefits

*   Visualize Red Hat Quay account, organization, organization members,
    repositories, and teams in the JupiterOne graph.
*   Map Red Hat Quay users to employees in your JupiterOne account.
*   Monitor changes to Red Hat Quay users using JupiterOne alerts.

## How it Works

*   JupiterOne periodically fetches account, organization, organization members,
    repositories, and teams from Red Hat Quay to update the graph.
*   Write JupiterOne queries to review and monitor updates to the graph, or
    leverage existing queries.
*   Configure alerts to take action when JupiterOne graph changes, or leverage
    existing alerts.

## Requirements

*   Red Hat Quay supports the OAuth2 Client Credential flow.
*   JupiterOne requires a Bearer token. You need permission to create an
    application in Red Hat Quay that will be used to obtain the API key.
*   You must have permission in JupiterOne to install new integrations.

## Permissions

Access token must have the `user:admin`, `org:admin`, `repo:read`, `user:read`
permissions

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Red Hat Quay

[Create and OAuth Access Token](https://access.redhat.com/documentation/en-us/red_hat_quay/3/html/red_hat_quay_api_guide/using_the_red_hat_quay_api#create_oauth_access_token)

1.  Log in to Red Hat Quay and select your Organization (or create a new one).
2.  Select the Applications icon from the left navigation.
3.  Select Create New Application and give the new application a name when
    prompted.
4.  Select the new application.
5.  Select Generate Token from the left navigation.
6.  Select the checkboxes to set the scope of the token and select Generate
    Access Token.
7.  Review the permissions you are allowing and select Authorize Application to
    approve it.
8.  Copy the newly generated token to use to access the API.

### In JupiterOne

1.  From the top navigation of the J1 Search homepage, select **Integrations**.
2.  Scroll to the **Red Hat Quay** integration tile and click it.
3.  Click the **Add Configuration** button and configure the following settings:

*   Enter the **Account Name** by which you'd like to identify this Red Hat Quay
    account in JupiterOne. Ingested entities will have this value stored in
    `tag.AccountName` when **Tag with Account Name** is checked.
*   Enter a **Description** that will further assist your team when identifying
    the integration instance.
*   Select a **Polling Interval** that you feel is sufficient for your monitoring
    needs. You may leave this as `DISABLED` and manually execute the integration.
*   Enter the **Hostname**, and **Red Hat Quay Access Token** generated for use by
    JupiterOne.

4.  Click **Create Configuration** once all values are provided.

# How to Uninstall

1.  From the top navigation of the J1 Search homepage, select **Integrations**.
2.  Scroll to the **Red Hat Quay** integration tile and click it.
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

| Resources          | Entity `_type`                     | Entity `_class` |
| ------------------ | ---------------------------------- | --------------- |
| Account            | `red_hat_quay_account`             | `Account`       |
| Organization       | `red_hat_quay_organization`        | `Organization`  |
| OrganizationMember | `red_hat_quay_organization_member` | `User`          |
| Repository         | `red_hat_quay_repository`          | `Repository`    |
| Team               | `red_hat_quay_team`                | `Team`          |

### Relationships

The following relationships are created:

| Source Entity `_type`       | Relationship `_class` | Target Entity `_type`              |
| --------------------------- | --------------------- | ---------------------------------- |
| `red_hat_quay_account`      | **HAS**               | `red_hat_quay_organization`        |
| `red_hat_quay_organization` | **HAS**               | `red_hat_quay_organization_member` |
| `red_hat_quay_organization` | **HAS**               | `red_hat_quay_repository`          |
| `red_hat_quay_organization` | **HAS**               | `red_hat_quay_team`                |
| `red_hat_quay_team`         | **HAS**               | `red_hat_quay_organization_member` |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->

<!-- {J1_DOCUMENTATION_MARKER_END} -->
 
<!--  jupiterOneDocVersion=1-0-0 -->