# LastPass

## LastPass + JupiterOne Integration Benefits

- Visualize LastPass users in the JupiterOne graph.
- Map LastPass users to employees in your JupiterOne account.
- Monitor changes to LastPass users using JupiterOne alerts.
- Monitor users' LastPass Master Password Strength, users' security score,
  users' usage and users' date of last password change.

## How it Works

- JupiterOne periodically fetches `users` from LastPass to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- JupiterOne requires a LastPass Company Id & Provisioning Hash. A LastPass
  admin user will be required to create the hash.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In LastPass

1. Locate your Company ID. After logging into
   [admin.lastpass.com](https://admin.lastpass.com), head to the Dashboard tab.
   Once there the Company ID (sometimes labeled Account number) is displayed at
   the top of the page.
2. Generate a Provisioning Hash. Go to Advanced > Enterprise API. Once on the
   dashboard, create a provisioning hash. Note: This value grants access to your
   data, keep it safe!

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **LastPass** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this LastPass
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Company ID** and **Provisioning Hash** that were obtained in the
  previous section.

4. Click **Create** once all values are provided.

# How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **LastPass** integration tile and click it.
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

| Resources | Entity `_type`     | Entity `_class` |
| --------- | ------------------ | --------------- |
| Account   | `lastpass_account` | `Account`       |
| User      | `lastpass_user`    | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `lastpass_account`    | **HAS**               | `lastpass_user`       |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
