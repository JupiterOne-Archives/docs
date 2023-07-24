# SCIM 2.0 Support in JupiterOne

JupiterOne supports SCIM 2.0 (System for Cross-domain Identity Management) following the protocol defined by the IETF. SCIM is an industry-standard protocol designed to simplify user identity management tasks in a multi-domain environment.

With SCIM 2.0 support, you can keep JupiterOne in sync with your identity provider by managing group membership, provisioning, and de-provisioning all through the IdP.

## Key Benefits of SCIM

- **Automated User Provisioning**: SCIM support allows administrators to automatically provision user accounts within JupiterOne when users are added to the identity provider. This eliminates the need for manual user account creation, reducing the chances of human errors and saving valuable time.

- **User Deprovisioning**: When a user is removed from the identity provider, SCIM ensures that the user's access to JupiterOne and associated resources is promptly revoked, maintaining security and compliance by preventing lingering access.

- **Real-time User Sync**: SCIM enables real-time synchronization of user identity information including group membership, ensuring that changes made in the identity provider are immediately reflected in JupiterOne. This ensures consistency and accuracy in user access control.

## Setting Up SCIM with Okta in JupiterOne
First confirm that your IdP supports SCIM 2.0 protocol. JupiterOne does not support SCIM 1.0. 

SAML SSO is required before setting up SCIM. Follow these steps to enable SP-initiated SSO.

JupiterOne SCIM supports authentication via API bearer token. J1 does not support basic auth or OAuth with SCIM. 
 
#### In JupiterOne
Login to JupiterOne as an administrator and [generate an Account API token](docs/api/authentication.md) with Administrator privileges. 

> Note: the max Time To Live for an API token is 365 days
The endpoint URL for JupiterOne SCIM is: `https://api.us.jupiterone.io/iam/scim/v2`.

#### In the Identity Provider
Once confirming support of SCIM 2.0 by your IdP, follow their SCIM setup instructions. 

:::note
NOTE: JupiterOne’s support of SCIM allows for Create/Read/Update/Delete actions from the Identity Provider (IdP) to JupiterOne. JuptierOne’s support of SCIM does not permit the reverse action of Create/Read/Update/Delete from JupiterOne to the Identity Provider.
:::

### Example: JupiterOne SCIM support through Okta

Following the [SCIM setup instructions](https://help.okta.com/en-us/Content/Topics/Apps/Apps_App_Integration_Wizard_SCIM.htm) from Okta: 

Log in to Okta (IdP) as an administrator and follow the steps in 
1. From the integration's settings page, choose the **Provisioning** tab. The SCIM connection settings appear under **Settings > Integration**.
2. Click **Edit**.
3. Specify the **SCIM connector base URL** of `https://api.us.jupiterone.io/iam/scim/v2` and the field name of the unique identifier for your users on your SCIM server. For JupiterOne this is the “email address” field.
4. Under **Supported provisioning actions**, choose the provisioning actions supported by your SCIM server.
    1. **Push New Users**
    2. **Push Profile Updates**
    3. **Push Groups**
    > NOTE: JupiterOne does not support “Import New Users and Profile Updates”
5. Use the **Authentication Mode** dropdown box to select **HTTP Header** as the mode to connect to JupiterOne SCIM.
    1. Input the **Account Bearer** token with administrator access previously generated.
    > Note: JupiterOne does not support basic authentication or Oauth with SCIM.


