# Bitbucket

## Bitbucket + JupiterOne Integration Benefits

- Visualize Bitbucket workspaces, projects, repos, pull requests, groups, and
  users in the JupiterOne graph.
- Map Bitbucket users to employees in your JupiterOne account.
- Monitor changes to Bitbucket users using JupiterOne alerts.
- Track which Bitbucket users opened, reviewed, and approved Bitbucket pull
  requests.

## How it Works

- JupiterOne periodically fetches workspaces, projects, repos, groups, and users
  from Bitbucket to update the graph.
- Optionally, JupiterOne fetches pull requests from the last 24 hours, along
  with user activity on those PRs, and adds that information to the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- Bitbucket supports the OAuth2 Client Credential flow, so your Bitbucket
  workspace will need an OAuth consumer configured.
- JupiterOne requires the name of your Bitbucket workspace and the OAuth client
  key and secret from an OAuth consumer configured on that workspace.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In BitBucket

1. From your profile avatar in the bottom left, click on the workspace in the
   Recent workspaces list or click All workspaces to open an entire list from
   which to choose.
2. Click **Settings** on the left sidebar to open the Workspace settings.
3. Click OAuth consumers under Apps and features on the left navigation.
4. If you already have an OAuth consumer for this workspace, you can use it for
   JupiterOne also. However, Bitbucket enforces rate-limiting per OAuth
   consumer, so it may be wise to configure a new OAuth consumer specifically
   for JupiterOne's use. To configure a new OAuth consumer, click the **Add
   consumer** button.
5. Add a **Name** for this consumer. This only appears in your list of OAuth
   consumers for this workspace. For example, `JupiterOne integration`.
6. Add a **Callback URL**. This URL is not used for anything, but the OAuth 2
   authentication flow requires it, and it must be in URL format. For example,
   `https://jupiterone.com/`.
7. Check the box labeled **This is a private consumer**. This is required for
   the way the integration authenticates.
8. Set permissions for this consumer. The integration requires Read access to
   **Account**, **Projects**, and **Repositories**. If you plan to ingest pull
   requests into the JupiterOne graph, or think you might later, the integration
   also needs Read access to **Pull requests**.
9. Click **Save**. The system generates a key and a secret for you. Make a note
   of the client id and client secret, along with the name of the workspace to
   be accessed.

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll to the **Bitbucket** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Bitbucket
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Bitbucket Client Key** for your workspace.
- Enter the **Bitbucket Client Secret** for your workspace.
- Enter the **Bitbucket Workspace**, the name of your workspace.
- Optionally, set the **Bitbucket Ingest Pull Requests** field to false if you
  want to disable the ingestion of pull requests into the JupiterOne graph. By
  default, whenever the intergration is run, JupiterOne will ingest any PR
  created or modified in the last 24 hours.
- Optionally, set the **Bitbucket Enriched PRs** field to true to get additional
  information on each PR, such as who reviewed it. Note that this has
  performance implications, which is why it is disabled by default. See
  **Details on rate limiting** below.

4. Click **Create Configuration** once all values are provided.

### Details on pull request ingestion

Generally, when JupiterOne ingests data from an intregration, any entities not
ingested are deleted from the JupiterOne graph if they exist. For example, if a
Project gets deleted from your Bitbucket account, it will disappear from the
JupiterOne graph the next time the integration runs.

Since Pull Requests are only ingested from the last 24 hours (for performance
reasons), previous Pull Requests in the JupiterOne graph are not deleted. Even
if the PR is deleted from Bitbucket, the JupiterOne integration will have no way
of knowing if the PR was deleted or is merely untouched in the last 24 hours.

That said, if the Repo that owns that Pull Request is deleted from Bitbucket,
the JupiterOne graph will delete the Repo, and then it will delete any orphaned
Pull Request entities that were owned by it. This same "cascading delete" would
apply if higher-level objects (Projects, Workspaces) were deleted from your
Bitbucket account.

### Details on rate limiting

Bitbucket enforces a rate-limit of 1000 per hour per OAuth consumer, on API
calls related to Repositories and Pull Requests. JupiterOne ingestion exceeds
this rate, so you might see a rate-limit error on your account if your workspace
has enough data.

You can get around this limit by adding additional OAuth consumers to your
Bitbucket workspace, and then updating your JupiterOne Bitbucket integration
configuration to use a comma-delimited list of OAuth keys and secrets.

To do so, put the comma-delimited list of OAuth client keys in the **Bitbucket
Client Key** field of your integration configuration. Do the same for the
matching OAuth client secrets in the **Bitbucket Client Secret** field, being
careful to make sure the secrets are in the same order as the keys.

Note that the integration will attempt to validate all of the key/secret pairs
before starting ingestion, and throw an error if any of them is invalid.
Assuming they are all valid, the integration will automatically switch to each
new OAuth consumer sequentially when it encounters a Bitbucket rate limit, and
will not throw a rate-limit error unless is exhausts all OAuth consumers.

You can calculate the minimum number of API calls that count against this limit
as:

- If not ingesting Pull Requests: (#Repos)/10
- With Pull Requests (default status): (#Repos)/10 + (#PRs)/10 + (2\*#PRs)
- With Enriched PRs: (#Repos)/10 + (#PRs)/10 + (3\*#PRs)

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Bitbucket** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-integration document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER
DOCUMENTATION FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/master/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources              | Entity `_type`          | Entity `_class` |
| ---------------------- | ----------------------- | --------------- |
| Bitbucket Group        | `bitbucket_group`       | `UserGroup`     |
| Bitbucket Project      | `bitbucket_project`     | `Project`       |
| Bitbucket Pull Request | `bitbucket_pullrequest` | `Review`, `PR`  |
| Bitbucket Repo         | `bitbucket_repo`        | `CodeRepo`      |
| Bitbucket User         | `bitbucket_user`        | `User`          |
| Bitbucket Workspace    | `bitbucket_workspace`   | `Account`       |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type`   |
| --------------------- | --------------------- | ----------------------- |
| `bitbucket_group`     | **HAS**               | `bitbucket_user`        |
| `bitbucket_project`   | **HAS**               | `bitbucket_repo`        |
| `bitbucket_repo`      | **HAS**               | `bitbucket_pullrequest` |
| `bitbucket_user`      | **APPROVED**          | `bitbucket_pullrequest` |
| `bitbucket_user`      | **OPENED**            | `bitbucket_pullrequest` |
| `bitbucket_user`      | **OWNS**              | `bitbucket_group`       |
| `bitbucket_user`      | **REVIEWED**          | `bitbucket_pullrequest` |
| `bitbucket_workspace` | **HAS**               | `bitbucket_group`       |
| `bitbucket_workspace` | **HAS**               | `bitbucket_user`        |
| `bitbucket_workspace` | **OWNS**              | `bitbucket_project`     |
| `bitbucket_workspace` | **OWNS**              | `bitbucket_repo`        |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
