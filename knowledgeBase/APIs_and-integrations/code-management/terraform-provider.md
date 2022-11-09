# J1 Terraform Provider

Terraform relies on plugins called providers to interact with cloud providers, SaaS providers, and other APIs.

Terraform configurations must declare which providers they require so that Terraform can install and use them.

The JupiterOne Terraform provider makes resources available to interact with a JupiterOne API and manage your J1 account settings.

### Using the J1 Terraform Provider

Each Terraform module must declare which providers it requires, so that Terraform can install and use them. Provider requirements are declared in a `required_providers` block.

```terraform {
  required_providers {
    terraform-provider-jupiterone = {
      source  = "JupiterOne/terraform-provider-jupiterone"
      version = "~> 0.4.0"
    }
  }
}
```
The source code for the J1 provider is available at https://github.com/JupiterOne/terraform-provider-jupiterone.

#### Schema

Required values are:

- [`account_id`](https://registry.terraform.io/providers/JupiterOne/jupiterone/latest/docs#account_id): (string)  The JupiterOne account ID in which to create resources.
- [`api_key`](https://registry.terraform.io/providers/JupiterOne/jupiterone/latest/docs#api_key) :(string, case-sensitive) The API key used to make requests to the JupiterOne APIs.

[`region`](https://registry.terraform.io/providers/JupiterOne/jupiterone/latest/docs#region) (string) is optional.

#### Example:

```terraform
provider "jupiterone" {
  api_key = "${var.jupiterone_api_key}"
  account_id = "${var.jupiterone_account}"
}
```

