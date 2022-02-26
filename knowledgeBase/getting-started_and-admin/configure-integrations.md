# Configure Managed Integrations

To get started using the JupiterOne (J1) platform, you must first pull your data into J1. The more data, the more powerful the J1 capabilities become.

There are multiple, managed integrations available, out-of-the-box, for turnkey configuration.

All integrations have a set of common configuration fields as well as those that are unique to the integration.

For each integration you configure you will need to provide:

* `Account Name` - an alias that uniquely identifies the configuration
* `Description` - a description of the configuration
* `Polling Interval` - determines how often the data will be ingested to J1.  The options are:
  * `DISABLED`  - the configuration only runs if manually triggered by a user or via API
  * `THIRTY_MINUTES`
  * `ONE_HOUR`
  * `FOUR_HOURS`
  * `EIGHT_HOURS`
  * `TWELVE_HOURS`
  * `ONE_DAY`
  * `ONE_WEEK`

Each integration will have a slightly different mechanism for authentication as required by the provider. For example, the AWS integration uses an IAM role and assume role trust policies for access. Other integrations may use an API key/token, OAuth, or Basic Auth.

Additional options are also available for each integration.  Common options include:

* `Tag with Account` - if you want data from this integration the `Account Name` of this configuration

* `Tag as Production` - adds a tag indicating this is production data

Depending on the integration there will may be other choices in the additional options section.

This video shows an example of how to configure an AWS integration.

![](../assets/j1-aws-config-720p.gif)

For details on other integrations, see the respective documentation under **Managed Integrations**.

## Other Data

In addition, you can upload data outside of these managed integrations using the JupiterOne [API client or CLI](../APIs_and-integrations/APIs/j1-client-and-cli.md). This feature allows you to centrally track, monitor, and visualize any of your data, such as on-premise systems and security and compliance artifacts!
