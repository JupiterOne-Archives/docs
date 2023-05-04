

# JupiterOne Alert Rule Schema

A rule uses the results of one or more queries to execute one or more actions.
The basic alert workflows are described here:
[JupiterOne Alert Rule configuration documentation](https://support.jupiterone.io/hc/en-us/articles/360022720474-6-9-Alerts-and-Alert-Rules).
You can also directly edit the JSON that defines a rule for more advanced
workflow execution.

## Configuring a Rule

1. Navigate to the JupiterOne alert rule configuration page
   (https://apps.us.jupiterone.io/alerts/rules)
2. Click **Create Rule**
3. Click **Advanced Editor (JSON)** to open the advanced rule editor.

JSON Example:

```json
{
  "name": "unencrypted-critical-data-stores",
  "description": "Unencrypted data store with classification label of 'critical' or 'sensitive' or 'confidential' or 'restricted'",
  "version": 1,
  "specVersion": 1,
  "pollingInterval": "ONE_DAY",
  "question": {
    "queries": [
      {
        "name": "query0",
        "query": "Find DataStore with classification=('critical' or 'sensitive' or 'confidential' or 'restricted') and encrypted!=true",
        "version": "v1"
      }
    ]
  },
  "operations": [
    {
      "when": {
        "type": "FILTER",
        "condition": "{{queries.query0.total > 0}}"
      },
      "actions": [
        {
          "type": "CREATE_ALERT"
        }
      ]
    }
  ],
  "outputs": ["queries.query0.total", "alertLevel"]
}
```

You can also configure rules to include deleted data in the results. For
example:

```json
  // ...
  "question": {
    "queries": [
      {
        "name": "query0",
        "query": "Find DataStore with classification='critical' and encrypted=false as d return d.tag.AccountName as Account, d.displayName as UnencryptedDataStores, d._type as Type, d.encrypted as Encrypted",
        "version": "v1",
        "includeDeleted": true
      },
      {
        "name": "query1",
        "query": "...",
        "version": "v1",
        "includeDeleted": false
      },
      {
        "name": "query2",
        "query": "...",
        "version": "v1"
      }
    ]
  },
  // ...
}
```

## Rule Properties

| Property                          | Type              | Description                                                                                                                                                                 |
| --------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                              | `string`          | Auto-generated, globally unique ID of each rule.                                                                                                                            |
| `version`                         | `number`          | Current version of the rule. Incremented each time the rule is updated.                                                                                                     |
| `name`                            | `string`          | Name of the rule, which is unique to each account.                                                                                                                          |
| `description`                     | `string`          | Optional description of the rule.                                                                                                                                           |
| `specVersion`                     | `number`          | Rule evaluation version in the case of breaking changes. This should always be `1`.                                                                                         |
| `pollingInterval`                 | `PollingInterval` | Optional frequency of automated rule evaluation. Defaults to `ONE_DAY`.                                                                                                     |
| `question`                        | `Question`        | Contains properties related to queries used in the rule evaluation.                                                                                                         |
| `questionId`                      | `string`          | A known unique ID for a question in the question library.                                                                                                                   |
| `operations`                      | `RuleOperation[]` | Actions that are executed when a corresponding condition is met.                                                                                                            |
| `templates`                       | `object`          | Optional key/value pairs of template name to template.                                                                                                                      |
| `outputs`                         | `string[]`        | Names of properties that can be used throughout the rule evaluation process and will be included in each record of a rule evaluation (for example, `queries.query0.total`). |
| `notifyOnFailure`                 | `boolean`         | Will send a notification to stakeholders (account admins, assigned users) if the rule query or any of its actions does not succeed.                                         |
| `triggerActionsOnNewEntitiesOnly` | `boolean`         | Will only trigger actions to be run when entities that did not exist during the previous rule evaluation appear in the question results.                                    |

### Type: PollingInterval

Enumeration of the scheduled frequencies on which rules will automatically be evaluated.
Possible values are `DISABLED`, `THIRTY_MINUTES`, `ONE_HOUR`, `FOUR_HOURS`, `EIGHT_HOURS`, `TWELVE_HOURS`, `ONE_DAY`, and `ONE_WEEK`.

### Type: RuleOperation

A `RuleOperation` is a single `condition` and series of `action`s that are
executed when the `condition` is met.

| Property  | Type                                               | Description                                                                              |
| --------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `when`    | `RuleOperationCondition\|RuleOperationCondition[]` | Type of conditional used to determine whether the associated actions should be executed. |
| `actions` | `RuleOperationAction[]`                            | Actions that should be executed when the `when` conditions have been met.                |

### Type: Question

A Question contains a collection of named queries that should be executed during
the rule evaluation process and whose responses can be used in any
`RuleOperation`.

| Property  | Type              | Description                                                         |
| --------- | ----------------- | ------------------------------------------------------------------- |
| `queries` | `QuestionQuery[]` | The collection of queries that are used during the rule evaluation. |

### Type: QuestionQuery

A named query that should be executed during the rule evaluation process and
whose responses can be used in any `RuleOperation`.

| Property         | Type      | Description                                                                                                                                                                                                                                 |
| ---------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`           | `string`  | Optional name to assign the query that will be used when referencing query data in `RuleOperation`s. If not provided, the query name is automatically assigned based on the index in the `queries` array (for example, `query0`, `query1`). |
| `query`          | `string`  | JupiterOne query to execute.                                                                                                                                                                                                                |
| `version`        | `string`  | JupiterOne query language execution version (for example, `v1`).                                                                                                                                                                            |
| `includeDeleted` | `boolean` | Whether deleted data should be considered for the specific query (defaults to `false`).                                                                                                                                                     |

### Type: RuleOperationCondition

The condition that determines whether the associated actions should be executed.
The type of `RuleOperationCondition` is determined using the `type` property.

#### Type: FilterRuleOperationCondition

| Property    | Type     | Description                                                       |
| ----------- | -------- | ----------------------------------------------------------------- |
| `type`      | `string` | Rule operation condition type: `FILTER`.                          |
| `condition` | `string` | Template condition (for example, `{{queries.query0.total > 0}}`). |

### Type: RuleOperationAction

Action that is executed when a corresponding condition is met. The type of
`RuleOperationAction` is determined using the `type` property.

---

#### Action: `SET_PROPERTY`

> Includes a property that can be used in rule evaluation input.

| Property         | Type     | Description                                  |
| ---------------- | -------- | -------------------------------------------- | -------- | -------------------------------------------- |
| `type`           | `string` | Rule operation action type: `SET_PROPERTY.`  |          |                                              |
| `targetProperty` | `string` | Property to include in the evaluation input. |          |                                              |
| `targetValue`    | `number  | string                                       | boolean` | Property to include in the evaluation input. |

Example:

```json
{
  "type": "SET_PROPERTY",
  "targetProperty": "alertLevel",
  "targetValue": "CRITICAL"
}
```

---

#### Action: `CREATE_ALERT`

> Creates a JupiterOne alert that is visible in J1 Alerts.

| Property | Type     | Description                                |
| -------- | -------- | ------------------------------------------ |
| `type`   | `string` | Rule operation action type: `CREATE_ALERT` |

Example:

```json
{
  "type": "CREATE_ALERT"
}
```

---

#### Action: `TAG_ENTITIES`

> Adds queryable tag values to result entities.

| Property     | Type       | Description                                        |
| ------------ | ---------- | -------------------------------------------------- |
| `type`       | `string`   | Rule operation action type: `TAG_ENTITIES `.          |
| `entities` | `obj[]` | Array of result entities with J1 metadata. Generally a direct reference to a query result set, e.g. `{{queries.query0.data}}`  |
| `tags`       | `obj[]`   | Array of objects containing `name` and `value` properties specifying tags to add. The `value` can be any JSON primitive. |

Note:
> Depending on result count, tags may take up to 10 minutes after rule evaluation completes to be available for query.

Example:

```json
{
  "type": "TAG_ENTITIES",
  "entities": "{{queries.query0.data}}",
  "tags": [ { "name": "myTag", "value":"tag-value" } ]
}
```

---

#### Action: `SEND_EMAIL`

> Sends an email to a list of recipients with details related to alerts that are
> created during the rule evaluation.

| Property     | Type       | Description                                        |
| ------------ | ---------- | -------------------------------------------------- |
| `type`       | `string`   | Rule operation action type: `SEND_EMAIL`.          |
| `recipients` | `string[]` | Email addresses of the recipients of this alert.   |
| `body`       | `string`   | Optional additional body information of the email. |

Example:

```json
{
  "type": "SEND_EMAIL",
  "body": "Number of items above threshold: {{queries.query0.total}}",
  "recipients": ["recipient@example.com"]
}
```

###### Multiple Queries in a Rule

You can pass multiple queries into an alert rule that allows each query to output its results into the same, single alert.

> Note the `when` condition in the example below will invoke actions if either query returns results.

This example shows multiple queries sending out an email alert to multiple recipients:

```json
{
  "name": "Multiple Queries in a Rule",
  "description": "",
  "version": 1,
  "specVersion": 1,
  "pollingInterval": "ONE_WEEK",
  "templates": {
    "tempMap": "Project: {{item.Project}}, ProjectFindings: {{item.ProjectFindings}}, RepoFindings: {{item.RepoFindings}}"
  },
  "outputs": [
    "alertLevel"
  ],
  "question": {
    "queries": [
      {
        "name": "query0",
        "query": "Find CodeRepo THAT RELATES TO Project with repoName!=undefined as p THAT HAS Finding as f RETURN p.repoName as Project, count(f) as ProjectFindings",
        "version": "v1",
        "includeDeleted": false
      },
      {
        "name": "query1",
        "query": "Find Project with repoName!=undefined THAT RELATES TO CodeRepo as p THAT HAS Finding as f RETURN p.displayName as Project, count(f) as RepoFindings",
        "version": "v1",
        "includeDeleted": false
      }
    ]
  },
  "operations": [
    {
      "when": {
        "type": "FILTER",
        "specVersion": 1,
        "condition": [
          "OR",
          [
            "queries.query0.total",
            ">",
            0
          ],
          [
            "queries.query1.total",
            ">",
            0
          ]
        ]
      },
      "actions": [
        {
          "targetValue": "INFO",
          "type": "SET_PROPERTY",
          "targetProperty": "alertLevel"
        },
        {
          "type": "CREATE_ALERT"
        },
        {
          "type": "SEND_EMAIL",
          "body": "Affected Items: <br><br>* {{ queries.query0.data  | mapTemplate('tempMap') | join('<br>* ') }} / <br>* {{ queries.query1.data | mapTemplate('tempMap') | join('<br>* ') }}",
          "recipients": [
            "person1@example.com",
            "person2@example.com",
            "person3@example.com"
          ]
        }
      ]
    }
  ],
  "tags": []
}
```

---

#### Action `CREATE_JIRA_TICKET`

> Creates a Jira ticket using a specific JupiterOne Jira integration
> configuration.

| Property                | Type     | Description                                                                                              |
| ----------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `type`                  | `string` | Rule operation action type: `CREATE_JIRA_TICKET.`                                                        |
| `integrationInstanceId` | `string` | The `id` of the JupiterOne Jira integration that should be used to create the ticket.                    |
| `entityClass`           | `string` | The `class` of the new ticket entity that should be created in JupiterOne. (for example,`Vulnerability`) |
| `project`               | `string` | The unique Jira project ID that the ticket is created in.                                                |
| `summary`               | `string` | Summary of the Jira ticket. Used as the ticket title.                                                    |
| `issueType`             | `string` | The Jira issue type (for example, `Task`).                                                               |
| `additionalFields`      | `object` | Optional additional fields that are passed directly to the Jira API. (see table below for details)       |

#### Jira Description Field

The `description` field can have a raw string value or be passed as depicted in
these examples as Jira
[ADF](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/).
**NOTE**: string in either the `text` or `description` keys supports markdown
syntax.

#### Other/custom Additional Fields

Fields passed into `additionalFields` will be passed directly to the Jira API
and as such should match the required input format of each field type.
This table outlines some of the common field types and their value formats.
Please use the
[Official Jira Rest API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/)
for more information.

| Field Type Label | Schema Type     | Input Format                         | Example                                                                   |
| ---------------- | --------------- | ------------------------------------ | ------------------------------------------------------------------------- |
| Text             | textfield       | String value                         | `"Value of Field"`                                                        |
| Number           | number          | Number value                         | `2`                                                                       |
| Select           | select          | Object with value key                | `{ "value": "Select Option Label"}`                                       |
| MultiSelect      | multiselect     | Array of string values               | `["Option 1", "Option 2"]`                                                |
| MultiCheckBoxes  | multicheckboxes | Array of Objects with value keys     | `[{ "value": "Option 1" }, { "value": "Option 2"}]`                       |
| UserPicker       | userpicker      | Object with accountId                | `{ "accountId": "userInternalId" }`                                       |
| MultiUserPicker  | multiuserpicker | Array of Objects with accountId keys | `[{ "accountId": "user1InternalId" }, { "accountId": "user2InternalId"}]` |

Example:

```json
{
  "type": "CREATE_JIRA_TICKET",
  "integrationInstanceId": "<JIRA_INTEGRATION_INSTANCE_ID>",
  "entityClass": "Vulnerability",
  "project": "81198",
  "summary": "Ticket summary",
  "issueType": "Task",
  "additionalFields": {
    "custom_text": "field_value",
    "custom_number": 2,
    "custom_select": {
      "value": "Select Option Label"
    },
    "custom_multi_select": ["Option 1", "Option 2"],
    "custom_multi_checkboxes": [
      {
        "value": "Option 1"
      },
      {
        "value": "Option 2"
      }
    ],
    "custom_user_picker": {
      "accountId": "usersInternalId"
    },
    "custom_multi_user_picker": [
      {
        "accountId": "user1InternalId"
      },
      {
        "accountId": "user2InternalId"
      }
    ],
    "description": {
      "type": "doc",
      "version": 1,
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Jira description here! **Full Markdown Supported Text**"
            }
          ]
        }
      ]
    }
  }
}
```

This example shows multiple queries sending results to Jira to create a single
Jira issue:

```json
{
  "name": "Multiple Queries in a Rule to Jira Example",
  "description": "Multiple queries can be composed into a Jira Alert",
  "version": 1,
  "specVersion": 1,
  "pollingInterval": "ONE_DAY",
  "templates": {
    "projectInfo": "Project: {{item.Project}}, ProjectFindings: {{item.ProjectFindings}}, RepoFindings: {{item.RepoFindings}}"
  },
  "outputs": [
    "alertLevel"
  ],
  "question": {
    "queries": [
      {
        "name": "query0",
        "query": "Find CodeRepo THAT RELATES TO Project with repoName!=undefined as p THAT HAS Finding as f RETURN p.repoName as Project, count(f) as ProjectFindings",
        "version": "v1",
        "includeDeleted": false
      },
      {
        "name": "query1",
        "query": "Find Project with repoName!=undefined THAT RELATES TO CodeRepo as p THAT HAS Finding as f RETURN p.displayName as Project, count(f) as RepoFindings",
        "version": "v1",
        "includeDeleted": false
      }
    ]
  },
  "operations": [
    {
      "when": {
        "type": "FILTER",
        "specVersion": 1,
        "condition": [
          "OR",
          [
            "queries.query0.total",
            ">",
            0
          ],
          [
            "queries.query1.total",
            ">",
            0
          ]
        ]
      },
      "actions": [
        {
          "targetValue": "INFO",
          "type": "SET_PROPERTY",
          "targetProperty": "alertLevel"
        },
        {
          "type": "CREATE_ALERT",
        },
        {
          "summary": ": {{queries.query0.total}}",
          "issueType": "Task",
          "entityClass": "Finding",
          "integrationInstanceId": "<JIRA_INTEGRATION_INSTANCE_ID>",
          "additionalFields": {
            "description": {
              "type": "doc",
              "version": 1,
              "content": [
                {
                  "type": "paragraph",
                  "content": [
                    {
                      "type": "text",
                      "text": "{{alertWebLink}}\n\n**Affected Items:**\n\n* {{ queries.query0.data | mapTemplate('projectInfo') | join('\n* ') }} \n\n***************\n\n {{ queries.query1.data | mapTemplate('projectInfo') | join('\n* ') }}"
                    }
                  ]
                }
              ]
            }
          },
          "project": "CT",
          "type": "CREATE_JIRA_TICKET"
        }
      ]
    }
  ],
  "tags": []
}
```

If your query returns multiple results, you can run a second query using the
results of the first query to create a Jira ticket for each item in the first
query results. You do this by
[editing the advanced JSON of the alert rule](##configuring-a-rule) to use the
`FOR_EACH_ITEM` action type.

It is not recommended that you use this action type if your results sizes are very large.
This example limits the number of possible Jira tickets created to a maximum of 100, and sends an email when the limit is exceeded.

For example:

```json
{
  "name": "Unencrypted critical data stores",
  "description": "",
  "specVersion": 1,
  "pollingInterval": "ONE_WEEK",
  "question": {
    "queries": [
      {
        "name": "query0",
        "query": "Find DataStore with classification='critical' and encrypted=false",
        "version": "v1",
        "includeDeleted": false
      }
    ]
  },
  "operations": [
    {
      "when": {
        "type": "FILTER",
        "specVersion": 1,
        "condition": ["AND", ["queries.query0.total", ">", 0], ["queries.query0.total", "<=", 100]]
      },
      "actions": [
        {
          "type": "SET_PROPERTY",
          "targetValue": "CRITICAL",
          "targetProperty": "alertLevel"
        },
        {
          "type": "CREATE_ALERT"
        },
        {
          "itemRef": "obj",
          "type": "FOR_EACH_ITEM",
          "items": "{{queries.query0.data}}",
          "actions": [
            {
              "type": "CREATE_JIRA_TICKET",
              "summary": "{{alertRuleDescription}}",
              "issueType": "",
              "entityClass": "{{ obj.entity._type | join(',') }}",
              "integrationInstanceId": "{{ obj.entity._integrationInstanceId }}",
              "additionalFields": {
                "description": {
                  "type": "doc",
                  "version": 1,
                  "content": [
                    {
                      "type": "paragraph",
                      "content": [
                        {
                          "type": "text",
                          "text": "{{alertWebLink}}\n\n**Affected Items:**\n\n* {{obj.properties.webLink}}"
                        }
                      ]
                    }
                  ]
                }
              },
              "project": "{{param.MySpecialProject}}"
            }
          ]
        }
      ]
    }, {
      "when": {
        "type": "FILTER",
        "specVersion": 1,
        "condition": ["queries.query0.total", ">", 100]
      },
      "actions": [
        {
          "type": "SET_PROPERTY",
          "targetValue": "CRITICAL",
          "targetProperty": "alertLevel"
        },
        {
          "type": "CREATE_ALERT"
        },
        {
          "type": "SEND_EMAIL",
          "body": "The alert rule {{alertRuleName}} has {{queries.query0.total}} results. Please review the results in the JupiterOne app: {{alertWebLink}}.",
          "recipients": ["emergency@example.com"],
        }
      ]
    }
  ],
  "outputs": ["alertLevel"],
  "templates": {}
}
```

---

#### Action: `FOR_EACH_ITEM`

> Runs a set of actions for each item in a list. This list can be query results, or a composed list of items.

| Property                | Type     | Description                                                                     |
| ----------------------- | -------- | ------------------------------------------------------------------------------- |
| `type`                  | `string` | Rule operation action type: `FOR_EACH_ITEM`.                                    |
| `itemRef`               | `string` | Optional name of the item reference to use in the templates. Defaults to `item` |
| `items`                 | `string` | The list of items to iterate over. Can be a template (see example).             |
| `actions`               | `array`  | The actions to run for each item.                                               |

Examples:

```json
// will call POST https://example.com with the body { "name": "John Doe", "webLink": "https://apps.<region>.jupiterone.io/asset/reference/link" }
// for each user in the query results, e.g. `Find User`
{
  "type": "FOR_EACH_ITEM",
  "itemRef": "user",
  "items": "{{queries.query0.data}}",
  "actions": [
    {
      "type": "WEBHOOK",
      "method": "POST",
      "url": "https://example.com",
      "body": {
        "name": "{{user.properties.name}}",
        "webLink": "{{user.properties.webLink}}"
      },
    }
  ]
}
```

---

#### Action: `JUPITERONE_QUERY`

> Runs a JupiterOne query and stores the results on the `queries` template parameter with a given `name`.
> It is recommended that you only use this action within a `FOR_EACH_ITEM` action.
> Including it in normal `operations` actions is not recommended, as you can retrieve results you want with the normal `question` queries.

| Property                | Type     | Description                                                                 |
| ----------------------- | -------- | --------------------------------------------------------------------------- |
| `type`                  | `string` | Rule operation action type: `JUPITERONE_QUERY`.                             |
| `query`                 | `string` | The JupiterOne query to run.                                                |
| `name`                  | `string` | The name of the query result to store.                                      |

Example:

```json
//
{
  "type": "FOR_EACH_ITEM",
  "itemRef": "user",
  "items": "{{queries.query0.data}}",
  "actions": [
    // JUPITERONE_QUERY actions always run first in order to enable the use of the results in the templates
    // of other actions in a FOR_EACH_ITEM action
    {
      "type": "JUPITERONE_QUERY",
      "query": "Find Account with email='{{user.properties.email}}'",
      "name": "accountsOwnedByUserQuery"
    },
    {
      "type": "WEBHOOK",
      "method": "POST",
      "url": "https://example.com",
      "body": {
        "name": "{{user.properties.displayName}}",
        "accounts": "{{queries.accountsOwnedByUserQuery.data | mapProperty('displayName')}}"
      }
    }
  ]
}

```

---

#### Action: `SEND_SLACK_MESSAGE`

> Sends a Slack message to a given Slack webhook URL.

| Property                | Type     | Description                                                                              |
| ----------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `integrationInstanceId` | `string` | The `id` of the JupiterOne Jira integration used to create the ticket.                   |
| `type`                  | `string` | Rule operation action type: `SEND_SLACK_MESSAGE`.                                        |
| `channels`              | `string` | A string or list of strings beginning with a `#` to denote Slack channels to send to.    |
| `webhookUrl`            | `string` | Webhook URL for the account/channel that this message should be delivered to.            |
| `severity`              | `string` | Optional severity of this alert that determined the color of the message shown in Slack. |

**NOTE**: By default, the color of the alert in Slack is derived from the value
of the `alertLevel` that is created in a `SET_PROPERTY` action. You can override
the color of the alert using the `severity` property.

Example:

After you have configured the integration, copy the integration ID from the
integration instance page, which looks similar to
`d1549f40-b9fd-447a-bec5-4360c9ca7e8c`.

1. Configure a rule with the `SEND_SLACK_MESSAGE` action and specify the
   `integrationInstanceId` with the unique identifier of the integration and
   `channels` denoting the destinations. The following is an example alert rule
   configuration with the `SEND_SLACK_MESSAGE` action:

**NOTE**: For the JupiterOne Slack bot to deliver messages to a private Slack
channel, the JupiterOne Slack bot must be a member of that private channel.

```json
{
  "id": "83136d41-23d0-415c-8726-84363d5a8a30",
  "name": "acm-cert-expiry",
  "description": null,
  "version": 1,
  "specVersion": 1,
  "notifyOnFailure": null,
  "triggerActionsOnNewEntitiesOnly": null,
  "pollingInterval": "ONE_DAY",
  "templates": {},
  "outputs": [
    "alertLevel"
  ],
  "question": {
    "queries": [
      {
        "query": "Find aws_acm_certificate with inUse = true and expiresOn > date.now and expiresOn < date.now + 30days",
        "name": "query0",
        "version": "v1",
        "includeDeleted": false
      }
    ]
  },
  "questionId": null,
  "operations": [
    {
      "when": {
        "type": "FILTER",
        "specVersion": 1,
        "condition": [
          "AND",
          [
            "queries.query0.total",
            ">",
            0
          ]
        ]
      },
      "actions": [
        {
          "targetValue": "CRITICAL",
          "id": "e1d40781-831f-43bf-b813-b28b6f2218ef",
          "type": "SET_PROPERTY",
          "targetProperty": "alertLevel"
        },
        {
          "type": "CREATE_ALERT",
          "id": "a3a32646-db5c-4c18-89be-c02798cd84c4"
        },
        {
          "integrationInstanceId": "8d677b84-c32e-45d3-9b46-902912a00304",
          "id": "c1a3a9bc-7c4f-4eba-afff-528f9cbd2ff1",
          "type": "SEND_SLACK_MESSAGE",
          "body": "*Affected Items:* \n\n- {{queries.query0.data|mapProperty('displayName')|join('\n- ')}}",
          "channels": []
        }
      ]
    }
  ],
  "state": null,
  "tags": []
```

This example shows how to use a template in a Slack message.





---

#### Action: `WEBHOOK`

> Sends an HTTP request to a given endpoint.

| Property   | Type     | Description                                                                                                 |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `type`     | `string` | Rule operation action type: `WEBHOOK`                                                                       |
| `endpoint` | `string` | Webhook endpoint to send the request to.                                                                    |
| `method`   | `string` | HTTP method to use when making the request Allowed values: `POST`, `PUT`, `GET`, `HEAD`, `PATCH`, `DELETE`. |
| `body`     | `object` | Optional body data to include in the request. Can only be used with `POST`, `PUT`, and `PATCH`.             |
| `headers`  | `object` | Optional HTTP headers to include in the request.                                                            |

#### Webhook Reference Variables

You can reference the following variables via a template pattern (such as
_{{alertLevel}}_) inside the webhook action:

| Property               | Type     | Description                                  |
| ---------------------- | -------- | -------------------------------------------- |
| `alertLevel`           | `string` | Level of severity of the rule.               |
| `alertRuleName`        | `string` | Name of the alert rule.                      |
| `alertRuleId`          | `string` | Identifier for the alert in the J1 platform. |
| `alertRuleDescription` | `string` | Description saved in the rule.               |

Example:

```json
{
  "type": "WEBHOOK",
  "method": "POST",
  "body": {
    "myApiPayload": " {{alertLevel}} alert has been triggered: {{alertRuleName}} "
  },
  "headers": {
    "Authorization": "Bearer abc123"
  }
}
```

##### Tines Trigger

If you opt to use a Tines alert action when you create a rule, J1 creates a
webhook with the Tines URL you provided and pushes the data to that endpoint.
You can use any of the [Tines APIs](https://www.tines.com/api/actions/create) to
configure the webhook action.

![](../assets/tines_webhook.gif)

---

#### Action: `PUBLISH_SNS_MESSAGE`

> Publishes a message to the specified SNS topic.

| Property                | Type     | Description                                                                                                                        |
| ----------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `type`                  | `string` | Rule operation action type: `PUBLISH_SNS_MESSAGE`.                                                                                 |
| `integrationInstanceId` | `string` | The ID of the AWS integration instance to use. The integration role must have `sns:Publish` permission.                            |
| `topicArn`              | `string` | The ARN of the SNS topic to publish the message to.                                                                                |
| `data`                  | `object` | User-provided data to include in the message. See [Operation Templating](#operationtemplating) for details on using variable data. |

Example:

```json
{
  "type": "PUBLISH_SNS_MESSAGE",
  "integrationInstanceId": "<AWS_INTEGRATION_INSTANCE_ID>",
  "topicArn": "arn:aws:sns:<REGION>:arn:aws:sns:<ACCOUNT_ID>:<SNS_TOPIC_NAME>",
  "data": {
    "query0Data": "{{queries.query0.data}}",
    "anotherCustomProperty": true
  }
}
```

```
!!! Note:
```

`data` is stringified in the payload. For example:

```js
{
  Sns: {
    Message: '{"data":{"query0Data": ..., "anotherCustomProperty": true}}';
  }
}
```

---

#### Action: `SEND_SQS_MESSAGE`

> Publishes a message to the specified SQS queue.

| Property                | Type     | Description                                                                                                                        |
| ----------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `type`                  | `string` | Rule operation action type: `SEND_SQS_MESSAGE`.                                                                                    |
| `integrationInstanceId` | `string` | The ID of the AWS integration instance to use. The integration role must have `sqs:SendMessage` permission.                        |
| `queueUrl`              | `string` | The URL of the SQS queue to publish the message to.                                                                                |
| `data`                  | `object` | User-provided data to include in the message. See [Operation Templating](#operationtemplating) for details on using variable data. |

Example:

```json
{
  "type": "SEND_SQS_MESSAGE",
  "integrationInstanceId": "<AWS_INTEGRATION_INSTANCE_ID>",
  "queueUrl": "https://sqs.<REGION>.amazonaws.com/<ACCOUNT_ID>/<SQS_QUEUE_NAME>",
  "data": {
    "query0Data": "{{queries.query0.data}}",
    "anotherCustomProperty": true
  }
}
```

!!! warning `data` is stringified in the payload. For example:

```js
{
  body: '{"data":{"query0Data": ..., "anotherCustomProperty": true}}';
}
```

## Operation Templating

You can use templates inside any property under the `operations` property on a
rule. The templates can contain a JavaScript-like syntax that automatically have
input variables injected for usage.

For example, `FilterRuleOperationCondition`s are often used with rules as the
condition for whether rule actions should be executed. You can use query
response data inside of the rule conditions:

```js
{
  "operations": [
    {
      "when": {
        "type": "FILTER",
        // Use the `.total` property from query named `query0`.
        "condition": "{{queries.query0.total > 0}}"
      },
      "actions": [
        {
          "type": "CREATE_ALERT"
        }
      ]
    }
  ]
}
```

You can use data from query results inside of rule operations by referencing the
`query.query0.data` property and custom templating transforms. For example:

```js
{
  "name": "lambda-function-settings-check-runtime-nodejs610",
  "description": "Node.js 6.10 is end of life (EOL) and should no longer be used.",
  "specVersion": 1,
  "pollingInterval": "ONE_DAY",
  "templates": {
    // The email template that we will use later
    "emailBody": "({{itemIndex+1}} of {{itemCount}}) [{{item.account}}] Function Name: {{item.functionName}}<br>"
  },
  "question": {
    "queries": [
      {
        "name": "query0",
        "query": "Find aws_lambda_function with runtime='nodejs6.10' as f return f.name as functionName, f.version as version, f.tag.AccountName as account, f.tag.Project as project order by account",
        "version": "v1"
      }
    ]
  },
  "operations": [
    {
      "when": {
        "type": "FILTER",
        "specVersion": 1,
        "condition": "{{queries.query0.total > 0}}"
      },
      "actions": [
        {
          "targetValue": "HIGH",
          "type": "SET_PROPERTY",
          "targetProperty": "alertLevel"
        },
        {
          "type": "CREATE_ALERT"
        },
        {
          "type": "SEND_EMAIL",
          // Reference the `query0` data and include it in a template
          "body": "Affected Functions: <br><br>{{ queries.query0.data | mapTemplate('emailBody') | join(' ') }}",
          "recipients": ["person1@example.com"]
        }
      ]
    }
  ],
  "outputs": ["queries.query0.total", "alertLevel"]
}
```

## Rule Evaluation Templating Language

You can create a template in any `RuleOperation` using the `{{...}}` syntax.
Inside the `{{...}}` is a JavaScript-like language that allows for powerful rule
evaluation functionality. Additionally, if the template contains exactly one
expression and nothing else, the original type of the computed value is
preserved. If multiple expressions are used, the entire value is casted to a
string.

The following is an example where the type `boolean` is preserved because there
is only a single expression:

```
{{true}}
```

The following is an example where the entire value would be cast to a string
because it contains multiple expressions:

```
{{age + 10}} is my age and my name is {{firstName + " " + lastName}}
```

All templating expressions support references to
[account parameters](#parametersinrules):

```
My name is {{param.myFirstName}} and I am {{age}}
```

### Unary Operators

| Operation | Symbol |
| --------- | :----: |
| Negate    |  `!`   |

### Binary Operators

| Operation        | Symbol |
| ---------------- | :----: | --- | --- |
| Add, Concat      |  `+`   |
| Subtract         |  `-`   |
| Multiply         |  `*`   |
| Divide           |  `/`   |
| Divide and floor |  `//`  |
| Modulus          |  `%`   |
| Power of         |  `^`   |
| Logical AND      |  `&&`  |
| Logical OR       |   `    |     | `   |

### Comparisons

| Comparison                 | Symbol |
| -------------------------- | :----: |
| Equal                      |  `==`  |
| Not equal                  |  `!=`  |
| Greater than               |  `>`   |
| Greater than or equal      |  `>=`  |
| Less than                  |  `<`   |
| Less than or equal         |  `<=`  |
| Element in array or string |  `in`  |

### Ternary operator

| Expression                          | Result |
| ----------------------------------- | ------ |
| `"" ? "Full" : "Empty"`             | Empty  |
| `"foo" in "foobar" ? "Yes" : "No"`  | Yes    |
| `{agent: "Archer"}.agent ?: "Kane"` | Archer |

### Native Types

| Type     |              Examples              |
| -------- | :--------------------------------: |
| Booleans |          `true`, `false`           |
| Strings  | `"Hello \"user\""`, `'Hey there!'` |
| Numerics |    `6`, `-7.2`, `5`, `-3.14159`    |
| Objects  |        `{hello: "world!"}`         |
| Arrays   |       `['hello', 'world!']`        |

### Groups

Grouping operations with parentheses:

| Expression                  | Result |
| ----------------------------| ------ |
| `(83 + 1) / 2`              | 42     |
| `1 < 3 && (4 > 2 || 2 > 4)` | true   |

## Custom Templating Transforms

Some custom transforms are exposed in the rule templating language. These are
functions that perform actions on an input, and can be chained together to
accomplish some powerful actions.

#### `mapTemplate(templateName: string)` Custom Transform

`mapTemplate` is separates and reuses templates inside of a rule. The transform
expects a single array and the first argument should be a string whose value
matches a template in rule `templates` object.

The `mapTemplate` transform exposes additional input variable to the template:

| Property    | Type     | Description                                  |
| ----------- | -------- | -------------------------------------------- |
| `item`      | `any`    | The individual item of this iteration.       |
| `itemCount` | `number` | The total count of items in the array.       |
| `itemIndex` | `number` | The index of the current `item` in the array |

!!! note The properties that are accessible on the `item` property are pulled
from the `properties` object and the `entity` object if the `item` matches the
schema for an entity.

Example operation:

```json
{
  "type": "SEND_EMAIL",
  // Reference the `query0` data and include it in a template
  "body": "{{ queries.query0.data | mapTemplate('emailBody') | join(' ') }}",
  "recipients": ["person1@example.com"]
}
```

Example `templates`:

```json
{
  "emailBody": "({{itemIndex+1}} of {{itemCount}}) [{{item.account}}] Function Name: {{item.somePropertyOnItem}}<br>"
}
```

#### `mapProperty(...properties: string)` Custom Transform

Allows for mapping individual properties from an array. You can supply a single
or multiple properties. The properties that are accessible are pulled from the
`properties` object and the `entity` object if the `item` matches the schema for
an entity. If the array that is being evaluated with `mapProperty` matches the
schema of an entity, the the rule evaluator attempts to pull properties passed
to `mapProperty` from the entity properties.

Example query data:

```json
{
  "query": "FIND Person",
  "data": [
    {
      "id": "",
      "entity": {
        "_createdOn": 1234
        // ...
      },
      "properties": {
        "firstName": "Jon"
        // ...
      }
    },
    {
      "id": "",
      "entity": {
        "_createdOn": 12345
        // ...
      },
      "properties": {
        "firstName": "Jane"
        // ...
      }
    }
  ]
}
```

This is an example of accessing `properties` data using `mapProperty` and the
above data:

```json
{
  "type": "SEND_EMAIL",
  // This would return: `Jon,Jane`
  "body": "{{ queries.query0.data | mapProperty('firstName') | join}}",
  "recipients": ["person1@example.com"]
}
```

This is an example accessing `entity` data using `mapProperty` and the above
data:

```json
{
  "type": "SEND_EMAIL",
  // This would return: `1234,12345`
  "body": "{{ queries.query0.data | mapProperty('_createdOn') | join}}",
  "recipients": ["person1@example.com"]
}
```

#### `merge(...data: array)` Custom Transform

Allows for merging 1 or more arrays together to create a new array of the
combined results. This transform does not perform any deduplication; all
elements of the input arrays are present in the output. This is usually used to
combine the results of two or more J1QL queries into a common set of query
results.

Example query configuration:

```json
{
  "queries": [
    {
      "query": "Find User with name ~=\"first.last\" as a RETURN a.displayName as DisplayName",
      "name": "query0",
      "version": "v1",
      "includeDeleted": false
    },
    {
      "query": "Find User with name ~=\"firstLast\" as b RETURN b.displayName as DisplayName",
      "name": "query1",
      "version": "v1",
      "includeDeleted": false
    }
  ]
}
```

This is an example of merging the results of these two queries together, and
getting the number of deduplicated total results.

```json
{
  "type": "SEND_EMAIL",
  "body": "Total Query Results: {{ queries.query0.data | merge(queries.query1.data) | uniquePropertyValues('displayName') | length}}",
  "recipients": ["person1@example.com"]
}
```

#### `join(separator?: string)` Custom Transform

This function is similar to the `Array.prototype.join` function in JavaScript.
It returns a new string by concatenating all of the elements in an array. If the
`separator`argument is not passed to `join`, the array elements are separated by
a comma, by default.

This transform is often used with `mapTemplate` or `mapProperty`.

Example:

```json
{
  "type": "SEND_EMAIL",
  "body": "{{ queries.query0.data | mapTemplate('emailBody') | join(' ') }}",
  "recipients": ["person1@example.com"]
}
```

Example of default if no `separator` is passed to `join`:

```json
{
  "type": "SEND_EMAIL",
  "body": "{{ queries.query0.data | mapTemplate('emailBody') | join }}",
  "recipients": ["person1@example.com"]
}
```

#### `uniquePropertyValues(propertyName: string)` Custom Transform

Creates a set of unique values for the given property name. The transform will
pull all properties from the `entity` and `properties` sub-properties to the top
level to try to access the passed in `propertyName`.

Example query data:

```json
{
  "query": "FIND Person",
  "data": [
    {
      "id": "1",
      "entity": {
        "_createdOn": 1234
        // ...
      },
      "properties": {
        "firstName": "Jon"
        // ...
      }
    },
    {
      "id": "2",
      "entity": {
        "_createdOn": 12345
        // ...
      },
      "properties": {
        "firstName": "Jane"
        // ...
      }
    },
    {
      "id": "3",
      "entity": {
        "_createdOn": 5555
        // ...
      },
      "properties": {
        "firstName": "Jon"
        // ...
      }
    },
  ]
}
```

This is an example of accessing deduplicating a property of an array of
entities:

```json
{
  "type": "SEND_EMAIL",
  // This would return: ["Jon","Jane"]
  "body": "{{ queries.query0.data | uniquePropertyValues('firstName') }}",
  "recipients": ["person1@example.com"]
}
```

### Common Templating Examples

Merging multiple query results to generate a unique set of values for a given
property printed on a new line

```js
{{ queries.query0.data | merge(queries.query1.data) | uniquePropertyValues('firstName') | join('\n') }}

// Will display something like:
//
// firstName1
// firstName2
// ...
```

Using a template to display multiple properties from a set of query results

```js
// In the templates definition
{
  "myTemplateName": "Property1: {{item.propertyName1}} - Property2: {{item.propertyName2}}"
}

// In your rule action
{{ queries.query0.data | mapProperty('propertyName1', 'propertyName2') | mapTemplate('myTemplateName') | join('\n') }}

// Will display something like:

// Property1: value1 - Property2 - value2
// Property1: value3 - Property2 - value4
// ...
```

Filtering a set of query results to a specific name and using a template for extra propoerties

```js
// In the templates definition
{
  "myTemplateName": "Property1: {{item.name}} - Property2: {{item.id}}"
}

// In your rule action
{{ queries.query0.data[.name == 'repository1'] | mapProperty('name', 'id') | mapTemplate('myTemplateName') | join('\n') }}

// Will display something like:

// repository1 - anIdForEntity1
// repository1 - anIdForEntity2
// repository1 - anIdForEntity3
// ...
```

## Filtering Collections

Collections, or arrays of objects, can be filtered by including a filter
expression in brackets. Properties of each collection can be referenced by
prefixing them with a leading dot. The result will be an array of the objects
for which the filter expression resulted in a truthy value.

Example context:

```js
{
  employees: [
    {first: 'Sterling', last: 'Archer', age: 36},
    {first: 'Malory', last: 'Archer', age: 75},
    {first: 'Lana', last: 'Kane', age: 33},
    {first: 'Cyril', last: 'Figgis', age: 45},
    {first: 'Cheryl', last: 'Tunt', age: 28}
  ],
  retireAge: 62
}
```

| Expression                                     | Result                                                                                |
| :--------------------------------------------- | :------------------------------------------------------------------------------------ |
| employees[.first == 'Sterling']                | [{first: 'Sterling', last: 'Archer', age: 36}]                                        |
| employees[.last == 'Tu' + 'nt'].first          | Cheryl                                                                                |
| employees[.age >= 30 && .age < 40]             | [{first: 'Sterling', last: 'Archer', age: 36},{first: 'Lana', last: 'Kane', age: 33}] |
| employees\[.age >= 30 && .age < 40][.age < 35] | [{first: 'Lana', last: 'Kane', age: 33}]                                              |
| employees[.age >= retireAge].first             | Malory                                                                                |

## Parameters in Rules

Rules support reference to parameter values stored at the account-level. These
parameters simplify the task of referencing long, sensitive, or widely reused
values in rules or queries. For example, the following action trigger is nearly
identical to [the slack webhook](#actionwebhook) example:

```json
{
  "type": "WEBHOOK",
  "method": "POST",
  "body": {
    "name": "Jon"
  },
  "headers": {
    "Authorization": "Bearer {{param.SlackAuthToken}}"
  }
}
```

This showcases a primary use case of parameter storage: a value that is long,
not human-readable, and may represent a sensitive value which should not be
leaked in the configuration.

`param.SlackAuthToken` invokes a parameter stored at the account level, which is
referenced when the rule is evaluated. These parameters are always referenced
with the preceding token `param.`. The subsequent string (without special
characters) identifies the name of a parameter.

Parameters are supported anywhere that
[Operation Templating](#operationtemplating) is supported, and the value of a
parameter can be any type of [native type](#nativetypes) with the **exclusion of
objects**, which support comparison _against_ parameters but cannot be the
contents of a parameter. Additionally, parameters can store lists of native
types, and template expressions can invoke parameter lists similarly to examples
above. For example, [using the email example](#actionsend_email), we can
parameterize the recipient list:

```json
{
  "type": "SEND_EMAIL",
  "body": "{{ queries.query0.data | mapTemplate('emailBody') | join(' ') }}",
  // a stored list of email strings:
  "recipients": "{{param.alertEmailRecipientList}}"
}
```

For more info on JupiterOne parameters,
[reference the documentation](../jupiterOne-data-model/parameters.md).
