# Using the Policy Builder CLI

Policy and procedure documents can be managed in code, checked into a Git repository, such that the Git Pull Request (PR) process can be leveraged for revisions and reviews.

JupiterOne provides a command line for this purpose. 

## Installing and Building

Run the following command to install and build the policies for the first time:

```bash
npm install -g @jupiterone/jupiter-policy-builder

mkdir my-company-policies
cd my-company-policies

psp build
```

You will be prompted for a few input, such as company name, to be included in your policy text.

When prompted to save the config to a file, enter `config.json` (or your custom path). This will allow you to reference the populated configurations the next time you'd like to rebuild the policies and procedures.

This will create the following contents in your current directory:

- `./templates`
- `./partials`
- `./docs`

For details of these files and their usage, see [JupiterOne Policies Structure](./policies-structure.md). 

## Editing and Rebuilding

To edit the policies and procedures, use the template files in `./templates` and re-run the `psp build` command. Do _not_ edit the `./docs` and `./partials` files directly as they will be overwritten on the next build.

```bash
psp build -t ./templates -c path/to/your/config.json
```

## Publishing

Run the following command to publish your policies and procedures to your JupiterOne account. You will need to [generate an API key](../APIs_and-integrations/APIs/api-key-access.md) for your user and the user needs to have policies admin permissions.

```bash
export J1_ACCOUNT=<your_j1_account_id>
export J1_API_KEY=<your_user_api_key>

psp publish -a $J1_ACCOUNT -k $J1_API_KEY -t ./templates -c ./config.json
```

## Advanced Options

For additional details and advanced options, see the README [here](https://github.com/JupiterOne/jupiter-policy-builder).
