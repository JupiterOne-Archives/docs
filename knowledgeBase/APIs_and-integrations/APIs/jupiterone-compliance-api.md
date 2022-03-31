# Compliance API Endpoints

The following article contains a list of compliance actions from the JupiterOne UI that a user can perform via the graphql API endpoint. 

See the [JupiterOne Platform API](./jupiterone-api.md) for an introduction to the JupiterOne API.

### Some key things to note:

- Most of the compliance related data is exposed in one large GraphQL graph.  The sections in this document will break down the API by object, but they are usually accessed at the same GraphQL resolver.
- In order to see the full GraphQL graph, perform [introspection](https://graphql.org/learn/introspection/) on the public API.

**Base URL**: `https://api.us.jupiterone.io`

**Method**: `POST`

**Endpoint for compliance operations**: `/graphql`

**Rate Limits**: Rate limiting is enforced based on your account tier. A `429` HTTP response code indicates the limit has been reached. The API does not currently return any rate limit headers.

## List Frameworks

This query retrieves a list of all frameworks (benchmarks, compliance standards, questionnaires) that have been added to your JupiterOne account, along with any metadata about them.  Note, this does not retrieve the entire framework model, only the base properties of a framework.

**Query**

```graphql
query ListFrameworks() {
  complianceFrameworks() {
    benchmarks {
      id
      createTimestamp
      lastUpdatedTimestamp
      name
      version
      frameworkType
      webLink
      scopeFilters {
        keys
        values
      }
      lastEvaluationTimestamp
    }
    standards {
      id
      createTimestamp
      lastUpdatedTimestamp
      name
      version
      frameworkType
      webLink
      scopeFilters {
        keys
        values
      }
      lastEvaluationTimestamp
    }
    questionnaires {
      id
      createTimestamp
      lastUpdatedTimestamp
      name
      version
      frameworkType
      webLink
      scopeFilters {
        keys
        values
      }
      lastEvaluationTimestamp
    }
  }
}
```

## Get Framework

Retrieves the full ComplianceFramework model by id. Includes details such as overall summary, nested groups and framework items, linked controls, and more.

**Variables**

- `input`: ComplianceFrameworkInput
    - `id` - The unique identifier for this resource
**Query**

```graphql
query ComplianceFramework($input: ComplianceFrameworkInput!) {
  complianceFramework(input: $input) {
    id
    createTimestamp
    lastUpdatedTimestamp
    name
    version
    frameworkType
    webLink
    scopeFilters
    lastEvaluationTimestamp
    isApplicableForThisUser
    summaryConfig {
      showPoliciesAndProcedures
      showEvidence
      showGapAnalysis
      showAuditTracking
    }
    summary {
      id
      totalFrameworkItems
      applicableFrameworkItems
      compliantPercentageSummary {
        id
        overallCompliantPercentage
        compliantPercentageExcludingPoliciesAndProcedures
      }
      evidenceCollectionSummary {
        id
        hasEvidence
        hasInternalEvidenceCollected
        hasExternalEvidenceAttached
        hasQuestionnaireAnswer
      }
      gapAnalysisSummary {
        id
        fulfilled
        gapDetected
        warning
        unknown
      }
      policyItemLinkSummary {
        id
        hasLinkedPolicyItem
      }
    }
    groups {
      id
      frameworkItems {
        id
        evidence {
          questionEvaluations {
            id
          }
          notes {
            id
          }
          questionnaireAnswer {
            id
          }
          links {
            id
          }
          externalUploadEvidences {
            id
            externalUploadId
            externalUpload {
              id
            }
          }
        }

        libraryItems {
          inheritedEvidenceLibraryItems {
            id
            policyItemId
            linkedPolicyItem {
              id
              linkedPolicy {
                id
              }
            }
            evidence {
              questionEvaluations {
                id
              }
              notes {
                id
              }
              questionnaireAnswer {
                id
              }
              links {
                id
              }
              externalUploadEvidences {
                id
                externalUploadId
                externalUpload {
                  id
                }
              }
            }
          }
          ignoredEvidenceLibraryItems {
            id
            policyItemId
            linkedPolicyItem {
              id
              linkedPolicy {
                id
              }
            }
          }
        }
      }
    }
  }
}
```

## Create Framework from Template

This query is used to create an empty framework (no groups or framework items). Visit the 
[security-policy-templates project](https://github.com/JupiterOne/security-policy-templates/tree/master/templates/standards) for templated JSON frameworks.

**Variables**

- `name`: The human readable name of this compliance framework - Example: HIPPA
- `version`: The version of this compliance framework - Example: 2013 or v.1.2
- `frameworkType`: `BENCHMARK`, `QUESTIONNAIRE`, or `STANDARD`
- `webLink`: An external web link to the framework's definition
- `scopeFilters`:
    - `key`: Key to filter the graph results by
    - `values`: Array of values to include in the graph results

**Query**

```graphql
mutation CreateFramework($input: CreateComplianceFrameworkInput!) {
  createComplianceFramework(input: $input) {
    id
    createTimestamp
    lastUpdatedTimestamp
    name
    version
    frameworkType
    webLink
    scopeFilters {
      keys
      values
    }
    lastEvaluationTimestamp
  }
}
```

## Import Framework from Template

This query is used to import a framework from JupiterOne's predefined templates. Visit the 
[security-policy-templates project](https://github.com/JupiterOne/security-policy-templates/tree/master/templates/standards) for templated JSON frameworks.

**Variables**

- `complianceFrameworkName`: The name of the framework to import
      - These names can be found either in the [security-policy-templates project](https://github.com/JupiterOne/security-policy-templates/tree/master/templates/standards) or as an output of the `ImportableComplianceFrameworkTemplates` query.

**Query**

```graphql
mutation ImportFrameworkByName($input: ImportComplianceFrameworkByNameInput!) {
  importComplianceFrameworkByName(input: $input) {
    id
    createTimestamp
    lastUpdatedTimestamp
    name
    version
    frameworkType
    webLink
    scopeFilters {
      keys
      values
    }
    lastEvaluationTimestamp
  }
}
```

## Import Framework from JSON

This query is used to import a framework via raw JSON.  The JSON must adhere to the structure defined in the 
[security-policy-templates project](https://github.com/JupiterOne/security-policy-templates/tree/master/templates/standards).

**Variables**

- `complianceFrameworkJsonString`: The JSON string to import

**Query**

```graphql
mutation ImportFramework($input: ImportComplianceFrameworkInput!) {
  importComplianceFramework(input: $input) {
    id
    createTimestamp
    lastUpdatedTimestamp
    name
    version
    frameworkType
    webLink
    scopeFilters {
      keys
      values
    }
    lastEvaluationTimestamp
  }
}
```

## Update Review Configurations

The following queries are used to update the review configuration of a framework, group, or frameworkItem. Each query requires the ID of the framework you are updating as well as an input variable object, which includes a list of owner emails, the review frequency, and the origin of action links (the domain of your JupiterOne account).

**Variables**

- `frameworkId`: The unique identifier for the framework, returned by the `List frameworks` query.
- `input`: The input variable is used to capture additional values, including: the origin of the action link, the owner(s) of the review configuration, and the review frequency. See an example below.

```json
"input": {
  "actionLink": "https://apps.us.jupiterone.io/compliance/{frameworkId}/{frameworkItemId?}",
  "owners": [
    "example@jupiterone.com"
  ],
  "reviewFrequency": "SIXTY_DAYS"
}
```

- `actionLink`: A link to the item you are configuring this review for
- `owners`: A list of email accounts that have an associated user in JupiterOne.  
- `reviewFrequency`: The frequency that owners will be prompted to review the framework. Valid options include: `WEEKLY`, `MONTHLY`, `SIXTY_DAYS`, `ONE_HUNDRED_EIGHTY_DAYS`, `ANNUALLY`

### Set/Update Review Configurations - Framework

```graphql
mutation SetReviewConfigurationsForComplianceFramework($frameworkId: ID!, $input: SetComplianceReviewConfigurationInput!) {
  setReviewConfigurationsForComplianceFramework(frameworkId: $frameworkId, input: $input)
}
```

### Set/Update Review Configurations - Group

**Additional Variables**

- `groupId`: The unique identifier for the group to set this configuration for

**Mutation**

```graphql
mutation SetReviewConfigurationsForComplianceGroup($groupId: ID!, $input: ConfigureRecurringComplianceReviewInput!) {
  setReviewConfigurationsForComplianceGroup(groupId: $groupId, input: $input)
}
```

### Set/Update Review Configurations - FrameworkItem

**Additional Variables**

- `frameworkItemId`: The unique identifier for the framework item to set this configuration for

**Mutation**

```graphql
mutation SetReviewConfigurationForComplianceFrameworkItem($frameworkItemId: ID!, $input: ConfigureRecurringComplianceReviewInput!) {
  setReviewConfigurationForComplianceFrameworkItem(frameworkItemId: $frameworkItemId, input: $input)
}
```


## List Controls (Library ITems)

Controls (called "Library Items" in our internal data model) are reusable objects of compliance data that live outside the context of a framework.  They can be linked to different frameworkItems to provide additional evidence.

**Variables**

- `input`
    - `filter` - `ACCOUNT` | `FRAMEWORK_ITEM`
    - `frameworkItemId` - When filtering by FRAMEWORK_ITEM, this is the uuid identifier to filter by
    - `returnAllPages` - Returns all pages of data and ignores any pagination options
    - `cursor` - Cursor for pagination
    - `limit` - Pagination page size limit, defaults to 50

**Query**

```graphql
query ComplianceLibraryItemMetadatas($input: ComplianceLibraryItemMetadatasInput!) {
  complianceLibraryItemMetadatas(input: $input) {
    items {
      id
      name
      description
      ref
      displayCategory
      policyItemId
      webLink
      linkedPolicyItem {
        id
        ref
        name
        isAdopted
        linkedPolicy {
          id
          ref
          name
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
```

## Get Control with Evidence and associated Framework Items

This query exposes more data on top of the base `ComplianceLibraryItemMetadatas` object.  Any information you will need about a control should be exposed via this query.

**Variables**

- `input`
    - `id` - Unique identifier of the library item to fetch

**Query**

```graphql
query ComplianceControl($input: ComplianceLibraryItemInput!) {
  complianceLibraryItem(input: $input) {
    id
    name
    description
    ref
    displayCategory
    policyItemId
    webLink
    linkedPolicyItem {
      id
      ref
      name
      isAdopted
      linkedPolicy {
        id
        ref
        name
      }
    }
    frameworkItemMetadatas {
      id
      frameworkId
      name
      description
      displayCategory
      auditStatus
      webLink
      evaluationProgress
      lastEvaluationTimestamp
      ref
      frameworkMetadata {
        id
        createTimestamp
        lastUpdatedTimestamp
        name
        version
        frameworkType
        webLink
        scopeFilters
      }
    }
    evidence {
      allEvidence {
        id
        evidenceType

        ... on ComplianceQuestionEvaluation {
          questionId
          evaluationResult
          lastUpdatedTimestamp
          results {
            name
            query
            rawResultKey
            recordCount
          }
        }

        ... on ComplianceNote {
          creatorUserId
          body
          createTimestamp
          name
        }

        ... on ComplianceLink {
          creatorUserId
          description
          linkUrl
          createTimestamp
          name
        }

        ... on ExternalUploadEvidence {
          lastUpdatedTimestamp
          creatorUserId
          body
          externalUploadId
          createTimestamp
        }
      }

      questionEvaluations {
        id
        questionId
        lastUpdatedTimestamp
        evidenceType
        evaluationResult
        results {
          name
          query
          rawResultKey
          recordCount
        }
      }

      notes {
        id
        evidenceType
        creatorUserId
        body
        createTimestamp
        name
      }

      links {
        id
        evidenceType
        creatorUserId
        description
        linkUrl
        createTimestamp
        name
      }

      externalUploadEvidences {
        id
        evidenceType
        creatorUserId
        body
        externalUploadId
        createTimestamp
        lastUpdatedTimestamp
      }
    }
  }
}
```

## Create Control

This query is used to create a control.

**Variables**

- `input`
    - `name` - The human readable name for this compliance library item - Example: Acceptable Use of End User Computing
    - `description` - Any other relevant information for this compliance library item
    - `ref` - Human readable identifier used in question/policy mapping operations - Example: cp-access-aws
    - `webLink` - An external web link to this library item's definition

**Query**

```graphql
query ComplianceControl($input: CreateComplianceLibraryItemInput!) {
  createComplianceLibraryItem(input: $input) {
    id
    name
    description
    ref
    displayCategory
    policyItemId
    webLink
    linkedPolicyItem {
      id
      ref
      name
      isAdopted
      linkedPolicy {
        id
        ref
        name
      }
    }
}
```