# HackerOne

## Integration Benefits

- Visualize HackerOne programs and findings in the JupiterOne graph.
- Map findings to CVE or CWE

## How it Works

- JupiterOne periodically fetches findings from HackerOne to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Prerequisites

- HackerOne requires an API Key that can be found within the HackerOne UI.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, contact
[JupiterOne Support](https://support.jupiterone.io).

## How to Use This Integration

### In HackerOne

1. Once logged in, head to `Organization Settings` by clicking on the top nav.
2. Next, click `API Tokens` on the left hand side
3. Click the `Create API token`
4. Enter an identifier. This will be your `API Key Name`.
5. Check the program you want to grant access to.
6. Select `Standard` group permission.
7. Click `Create API token`.
8. Copy API Token, store in safe place in accordance with best practices.
9. Navigate to `Program Settings` via the top header
10. Take note of the program `Handle` found in the `Information` form.

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll down to **HackerOne** and click it.
3. Click **Add Configuration** and configure the following settings:
   - Enter the account name by which you want to identify this HackerOne account
     in JupiterOne. Select **Tag with Account Name** to store this value in
     `tag.AccountName` of the ingested assets.
   - Enter a description to help your team identify the integration.
   - Select a polling interval that is sufficient for your monitoring
     requirements. You can leave this as `DISABLED` and manually execute the
     integration.
   - Enter the HackerOne API Token Name generated for use in JupiterOne
   - Enter the HackerOne API Token generated for use in JupiterOne.
   - Enter the Program Handle found in previous section.
4. Click **Create Configuration** after you have entered all the values.

## How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll down to **HackerOne** and click it.
3. Identify and click the **integration to delete**.
4. Click the trash can icon.
5. Click **Remove** to delete the integration.

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

| Resources | Entity `_type`      | Entity `_class`         |
| --------- | ------------------- | ----------------------- |
| Finding   | `hackerone_report`  | `Finding`               |
| Service   | `hackerone_program` | `Service`, `Assessment` |

### Relationships

The following relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` |
| --------------------- | --------------------- | --------------------- |
| `hackerone_program`   | **HAS**               | `hackerone_report`    |

### Mapped Relationships

The following mapped relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` | Direction |
| --------------------- | --------------------- | --------------------- | --------- |
| `hackerone_report`    | **HAS**               | `*cwe*`               | FORWARD   |
| `hackerone_report`    | **HAS**               | `*cve*`               | FORWARD   |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
