Oracle Cloud Infrastructure (OCI)

## Integration Benefits

- Visualize OCI compute instances, virtual machine hosts, domains, access
  policies, and users in the JupiterOne graph.
- Monitor changes to OCI entities using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches OCI resources via the OCI API in order to
  update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Prerequisites

- Access to an admin account in your OCI instance.
- JupiterOne requires a Private Key, Tenancy OCID, User OCID, Fingerprint,
  Region and Passcode (if used to generate the private key)
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, contact
[JupiterOne Support](https://support.jupiterone.io).

## How to Use This Integration

### In Oracle Cloud Infrastructure

1. Log into OCI as the root user or an admin user.
2. Click the user icon in the top right corner of the page then click "My
   profile"
3. Click "API Keys" under "Resources" on the left hand side of the screen
4. Click "Add API Key"
5. Either generate a new key pair, choose a public key or paste your public key
   then click add.
6. The configuration file preview will contain your user OCID, tenancy OCID,
   region and fingerprint you can then use to configure OCI in JupiterOne

### In JupiterOne

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll down to Oracle Cloud and click it.
3. Click **New Instance** and configure the following settings:

- Enter the account name by which you want to identify this OCI account in
  JupiterOne. Select **Tag with Account Name** to store this value in
  `tag.AccountName` of the ingested assets.
- Enter a description to help your team identify this instance of OCI.
- Select a polling interval that is sufficient for your monitoring requirements.
  You can leave this as `DISABLED` and manually execute the integration.
- Upload the Private Key
- Enter the Tenancy OCID, User OCID, Fingerprint and Region
- Optionally supply the Private Key Passphrase if your private key was generated
  with it.

4. Click **Create** after you have entered all the values.

# How to Uninstall

1. From the top navigation of the J1 Search homepage, select **Integrations**.
2. Scroll down to **{{provider}}** and click it.
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

| Resources       | Entity `_type`          | Entity `_class` |
| --------------- | ----------------------- | --------------- |
| Account         | `oci_compartment`       | `Account`       |
| ComputeInstance | `oci_compute_instance`  | `Host`          |
| DedicatedVMHost | `oci_dedicated_vm_host` | `Host`          |
| Domain          | `oci_domain`            | `Group`         |
| Group           | `oci_group`             | `UserGroup`     |
| Policy          | `oci_access_policy`     | `AccessPolicy`  |
| UseCase         | `oci_use_case`          | `AccessRole`    |
| User            | `oci_user`              | `User`          |

### Relationships

The following relationships are created:

| Source Entity `_type`   | Relationship `_class` | Target Entity `_type`   |
| ----------------------- | --------------------- | ----------------------- |
| `oci_access_policy`     | **HAS**               | `oci_use_case`          |
| `oci_compartment`       | **CONTAINS**          | `oci_compartment`       |
| `oci_compartment`       | **HAS**               | `oci_access_policy`     |
| `oci_compartment`       | **HAS**               | `oci_compute_instance`  |
| `oci_compartment`       | **HAS**               | `oci_dedicated_vm_host` |
| `oci_compartment`       | **HAS**               | `oci_domain`            |
| `oci_dedicated_vm_host` | **HAS**               | `oci_compute_instance`  |
| `oci_domain`            | **HAS**               | `oci_group`             |
| `oci_domain`            | **HAS**               | `oci_user`              |
| `oci_group`             | **HAS**               | `oci_user`              |
| `oci_use_case`          | **ASSIGNED**          | `oci_compartment`       |
| `oci_use_case`          | **ASSIGNED**          | `oci_group`             |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
