# Integration with JupiterOne

## Veracode + JupiterOne Integration Benefits

- Visualize Veracode Application Scan Results, cwes, and findings in the
  JupiterOne graph.
- Map Veracode findings to a code repo, project, or application in your
  JupiterOne account.
- Monitor Veracode cwes and findings within the alerts app.
- Monitor changes to Veracode Application Scans using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches Veracode Application Scan Results, cwes, and
  findings to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to reduce the noise of findings.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- You must have administrator access in Veracode in order to create the
  least-privledged access
  [API service account](https://docs.veracode.com/r/c_about_veracode_accounts)
  that the integration will use

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Veracode

The integration instance configuration requires the customer's API ID and secret
to authenticate requests to the Veracode REST APIs. To do this in a
least-privledged access manner, do the following:

1. Using a Veracode account with admin permissions, create an
   [Api service account](https://docs.veracode.com/r/c_about_veracode_accounts)

- At the time of this writing, user creation can be done in Settings Button (top
  right) => Admin => Add New User
- Be sure to check the `Non-Human User` checkbox, and enter an email you have
  access to. You will login as the integration to generate keys scoped to the
  limited permission set
- In `Access Settings` enable the `Results API` option
- Feel free to use any username, first/last name you see fit. We recommend it
  clearly indicate that the user is being used for a JupiterOne Integration
- Be sure to have `Login Enabled` set to `Yes`. Setting to `No` will not send
  your email an activation link.

2. After activating your integration's Api Service Account and setting your
   password, login as the integration

- Be sure to verify you are logged in as integration by going to the
  `Your Account` page in the veracode UI

3. Now generate your api keys for the integration

- Drag your mouse to your user icon in the top right (same place you find the
  `Your Account` button)
- Select `API Credentials` => `Generate API Credentials`
- Copy your Api Id and Secret contents (note that this only shows up once at
  generation)

4. Note that by default, your keys will expire after one year. If you have
   expired keys, re-generate and update your integration in JupiterOne.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Veracode** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Veracode
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API ID** used to authenticate with Veracode.
- Enter the **API Secret** used to authenticate with Veracode.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **{{provider}}** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.
6. We recommend you revoke the api keys for the `API Service Account` you
   created in Veracode

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

| Resources   | Entity `_type`         | Entity `_class` |
| ----------- | ---------------------- | --------------- |
| Account     | `veracode_account`     | `Account`       |
| Application | `veracode_application` | `Application`   |
| Finding     | `veracode_finding`     | `Finding`       |

### Relationships

The following relationships are created:

| Source Entity `_type`  | Relationship `_class` | Target Entity `_type`  |
| ---------------------- | --------------------- | ---------------------- |
| `veracode_account`     | **HAS**               | `veracode_application` |
| `veracode_application` | **IDENTIFIED**        | `veracode_finding`     |

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
