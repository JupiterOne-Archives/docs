# Custom Integration

Custom integrations provide a way to add bespoke data to the JupiterOne
platform. Custom integrations are perfect: - Integrating with a provider that
does not have an integration with JupiterOne - Integrations that need access to
local systems or data - Executing integrations in your own environment

Custom integrations can be created with the help of the
[open source SDK](https://github.com/JupiterOne/sdk). For more information on
creating integrations see the
[README](https://github.com/JupiterOne/sdk/blob/main/README.md) for the SDK.

## Configuring a custom integration in JupiterOne

1. On the **Integrations** page in the JupiterOne app, click the "Custom"
   integration tile.
2. Provide an Account Name, Description, and any Tags, then click **Create**.
3. At the bottom of the page, click **New API Key**.
4. Copy the API key to use as the `JUPITERONE_API_KEY` later and copy the `id`
   of the instance to use as the `integrationInstanceId` later.

## Configuring the custom integration in your environment

In the directory where your custom integration is set up,
create a `.env` file. Add the following to your `.env` file from information
from the UI.

The `JUPITERONE_ACCOUNT` ID can found by going to the **Settings Icon** >
**Account Management** > **Account Id**. The `JUPITERONE_API_KEY` comes from the
API Key you generated earlier for the custom integration.

```
JUPITERONE_ACCOUNT=05bfb7f6-4dab-4102-bd90-5433b95fc9a9
JUPITERONE_API_KEY=ac323bcb
```

Then add any other configuration fields your integration needs to run or authenticate.

## Executing the integration

To execute a custom integration, run the following command. You can find the
`integrationInstanceId` from the top of the instance details page where you
generated the API key.

```sh
yarn j1-integration run -V --integrationInstanceId c6200b3a-df93-4a61-8ac3-079c96713058
```

This will start a new integration job, collect data, and upload it to the JupiterOne platform to be synchronized. It's recommended to use the `-V` flag when running jobs to disable entity schema validation.

Integration job information will be available in the UI just like a managed integration.

## Seeing the results

After your integration has completed and synchronization has finalized you can view the data your integration uploaded with the following J1QL Query. Just replace the id with the id of your custom instance.
```
FIND * with _integrationInstanceId = "c6200b3a-df93-4a61-8ac3-079c96713058" 
```