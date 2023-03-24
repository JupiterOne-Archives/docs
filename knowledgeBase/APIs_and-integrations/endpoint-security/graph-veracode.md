# Veracode

## Veracode + JupiterOne Integration Benefits

- Visualize Veracode application scan results, CWEs, and findings in the
  JupiterOne graph.
- Map Veracode findings to a code repo, project, or application in your
  JupiterOne account.
- Monitor Veracode CWEs and findings within J1 Alerts.
- Monitor changes to Veracode application scans (known as assessments in j1)
  using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches Veracode application scan (assessment)
  results, CWEs, and findings to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to reduce the noise of findings.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- You must have administrator access in Veracode to create the least-privledged
  access
  [API service account](https://docs.veracode.com/r/c_about_veracode_accounts)
  that the integration uses.

## Support

If you need help with this integration, contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Veracode

The integration instance configuration requires the customer's API ID and secret
key to authenticate requests to the Veracode REST APIs. To do this in a
least-privledged access manner, do the following:

1.  Using a Veracode account with admin permissions, create an
    [API service account](https://docs.veracode.com/r/c_about_veracode_accounts)

- At the time of this writing, user creation can be done by clicking the
  Settings button (top-right) => Admin => Add New User.
- Be sure to select the `Non-Human User` checkbox, and enter an email you have
  access to. You will log in as the integration to generate keys scoped to the
  limited permission set
- In `Access Settings`, enable the `Results API` option.
- Enter a username, first/last name of your choice. We recommend it clearly
  indicates that the user is being used for a JupiterOne Integration,
- Be sure to have `Login Enabled` set to `Yes`. Setting to `No` does not send
  your email an activation link.

2.  After activating your integration's API Service Account and setting your
    password, log in as the integration.

- Be sure to verify you are logged in as the integration by going to the
  `Your Account` page in the veracode UI.

3.  Generate your API keys for the integration.

- Select the user icon in the top-right (same place you find the `Your Account`
  button).
- Select `API Credentials` => `Generate API Credentials`.
- Copy your API Id and secret key contents (note that this only displays once at
  generation).

4.  Note that by default, your keys expire after one year. If you have expired
    keys, re-generate and update your integration in JupiterOne.

### In JupiterOne

1.  From the top navigation of the J1 Search homepage, select **Integrations**.
2.  Scroll to and click the **Veracode** integration tile.
3.  Click **Add Configuration** and configure the following settings:

- Enter the **Account Name** by which you want to identify this Veracode account
  in JupiterOne. Ingested entities store the value `tag.AccountName` when **Tag
  with Account Name** is selected.
- Enter a **Description** that helps your team identify the integration
  instance.
- Select a **Polling Interval** that is sufficient for your monitoring
  requirements. You can leave this as `DISABLED` and manually execute the
  integration.
- Enter the **API ID** used to authenticate with Veracode.
- Enter the **API Secret** used to authenticate with Veracode.

4.  Click **Create Configuration** after you have entered all values.

# How to Uninstall

1.  From the top navigation of the J1 Search homepage, select **Integrations**.
2.  Scroll to and click the **{{provider}}** integration.
3.  Identify and click the **integration to delete**.
4.  Click the **trash can** icon.
5.  Click the **Remove** button to delete the integration.
6.  We recommend you revoke the API keys for the `API Service Account` you
    created in Veracode.

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

| Resources  | Entity `_type`        | Entity `_class` |
| ---------- | --------------------- | --------------- |
| Account    | `veracode_account`    | `Account`       |
| Assessment | `veracode_assessment` | `Assessment`    |
| Finding    | `veracode_finding`    | `Finding`       |
| Project    | `veracode_project`    | `Project`       |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `veracode_account`    | **HAS**               | `veracode_project`    |
| `veracode_assessment` | **IDENTIFIED**        | `veracode_finding`    |
| `veracode_project`    | **HAS**               | `veracode_assessment` |
| `veracode_project`    | **HAS**               | `veracode_finding`    |

### Mapped Relationships

The following mapped relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` | Direction |
| --------------------- | --------------------- | --------------------- | --------- |
| `veracode_finding`    | **EXPLOITS**          | `*cwe*`               | FORWARD   |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
