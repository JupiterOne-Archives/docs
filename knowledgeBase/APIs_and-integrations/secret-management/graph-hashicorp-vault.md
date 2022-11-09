# HashiCorp Vault Integration with JupiterOne

## HashiCorp Vault + JupiterOne Integration Benefits

- Visualize HashiCorp Vault users and secret engines in the JupiterOne graph.
- Map HashiCorp Vault users to employees in your JupiterOne account.
- Monitor changes to HashiCorp Vault users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches users and secret engines from HashiCorp Vault
  to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- This HashiCorp integration uses tokens for authentication. You must have the
  proper policies to for the engines you want to ingest.
- JupiterOne requires userpass credentials. You need permission to create a user
  in HashiCorp Vault.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

## Provider account setup

This integration can be used for both standalone (on-premise) Hashicorp Vault
and Hashicorp Vault Cloud offerings.

### In HashiCorp Vault

1. Provide the token to be used for the integration. If you're using Vault
   Enterprise, take note of the provided API
   [namespace](https://www.vaultproject.io/docs/enterprise/namespaces). The
   namespace is optional ENV field and is necessary for using Cloud offering.
2. Add the [policies](https://www.vaultproject.io/docs/concepts/policies)
   appropriate for the secret engines you're using.

## On Policies

### About token/account

The integration will attempt to fetch token details to build the root
entity/node. To allow for this to happen, the following role is needed:

```
path "auth/token/lookup-self" {
    capabilities = ["read"]
}
```

### About secret engines

In order for integration to be able to iterate through KV1, KV2 and Cubbyhole
engines, the `list` capability is necessary for the paths you wish to enable.

For example, if you've got KV1 enabled on path `my_kv1_path`, the following
policy rule should be defined for the token you'll use:

```
path "my_kv1_path/*" {
    capabilities = ["list"]
}
```

### About users

The integration can fetch all the users that exist in `userpass` authentication
method. If you'd like this, you need to make sure that `userpass` method of your
choosing (if you've got multiple) is defined in the policy assigned to the
token.

For example, if you've got `userpass` defined on path `my-userpass-1/` and
another `userpass` method defined on path `my-userpass-2/` and you'd like
integration to fetch all of their users, the following 2 rules would be
necessary:

```
# allows integration to detect this auth method
path "my-userpass-1/*" {
    capabilities = ["list"]
}

# allows integration to detect this auth method
path "my-userpass-2/*" {
    capabilities = ["list"]
}

# allows integration to access and read its users
path "auth/my-userpass-1/*" {
    capabilities = ["read", "list"]
}

# allows integration to access and read its users
path "auth/my-userpass-2/*" {
    capabilities = ["read", "list"]
}
```

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **HashiCorp Vault** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this HashiCorp
  Vault account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the relevant environment variables for use by JupiterOne.

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **HashiCorp Vault** integration tile and click it.
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

| Resources              | Entity `_type`                 | Entity `_class` |
| ---------------------- | ------------------------------ | --------------- |
| Account                | `hashicorp_vault_account`      | `Account`       |
| Authentication Backend | `hashicorp_vault_auth_backend` | `Service`       |
| Secret                 | `hashicorp_vault_secret`       | `Secret`        |
| Secret Engine          | `hashicorp_vault_engine`       | `Service`       |
| User                   | `hashicorp_vault_user`         | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type`          | Relationship `_class` | Target Entity `_type`          |
| ------------------------------ | --------------------- | ------------------------------ |
| `hashicorp_vault_account`      | **HAS**               | `hashicorp_vault_auth_backend` |
| `hashicorp_vault_account`      | **HAS**               | `hashicorp_vault_engine`       |
| `hashicorp_vault_account`      | **HAS**               | `hashicorp_vault_user`         |
| `hashicorp_vault_auth_backend` | **HAS**               | `hashicorp_vault_user`         |
| `hashicorp_vault_engine`       | **HAS**               | `hashicorp_vault_secret`       |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
