# Google Firebase

## Google Firebase + JupiterOne Integration Benefits

- Visualize Google Firebase projects and users in the JupiterOne graph.
- Map Google Firebase projects to users in your JupiterOne account.
- Monitor changes to Google Firebase projects and users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches projects and users from Google Firebase to
  update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- JupiterOne requires the contents of a Google Cloud service account key file
  with the correct API services enabled (see the **Integration Walkthrough**).
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Google Firebase

A
[Google Cloud service account](https://cloud.google.com/iam/docs/creating-managing-service-accounts)
and a
[Google Cloud service account key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys)
must be created in order to run the integration. The service account key is used
to authenticate on behalf of the integration's Google Cloud project and ingest
data into JupiterOne.

#### Creating a Google Firebase service account and service account key

1. Go to Project Settings
2. Go to Service Acounts tab
3. Click "Create Service Account"
4. After the service account is created, click "Generate new private key"
5. In the pop-up, click "Generate key"
6. Flatten the key and generate .env file by running

```bash
  yarn create-env-file ~/SERVICE_ACCOUNT_FILE_PATH_HERE.json
```

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Google Firebase** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Google
  Firebase account in JupiterOne. Ingested entities will have this value stored
  in `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the flattened **Google Firebase Service Account Key File** and generated
  for use by JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Google Firebase** integration tile and click it.
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

| Resources | Entity `_type`            | Entity `_class` |
| --------- | ------------------------- | --------------- |
| Account   | `google_firebase_account` | `Account`       |
| Project   | `google_firebase_project` | `Project`       |
| User      | `google_firebase_user`    | `User`          |
| Web App   | `google_firebase_webapp`  | `Application`   |

### Relationships

The following relationships are created:

| Source Entity `_type`     | Relationship `_class` | Target Entity `_type`     |
| ------------------------- | --------------------- | ------------------------- |
| `google_firebase_account` | **HAS**               | `google_firebase_project` |
| `google_firebase_project` | **HAS**               | `google_firebase_user`    |
| `google_firebase_project` | **HAS**               | `google_firebase_webapp`  |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
