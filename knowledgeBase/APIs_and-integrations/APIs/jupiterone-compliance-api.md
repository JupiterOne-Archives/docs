# Compliance API Endpoints

This article contains a list of compliance actions from the JupiterOne UI that a user can perform using the GraphQL API endpoint. 

See the [JupiterOne Platform API](./jupiterone-api.md) for an introduction to the JupiterOne API.

### Some key things to note:

- Most of the compliance-related data is exposed in one large GraphQL graph. The sections in this document break down the API by object, but you can access them at the same GraphQL resolver.
- To see the full GraphQL graph, perform [introspection](https://graphql.org/learn/introspection/) on the public API.

**Base URL**: `https://api.us.jupiterone.io`

**Method**: `POST`

**Endpoint for compliance operations**: `/graphql`

**Rate Limits**: Rate limiting is enforced based on your account tier. A `429` HTTP response code indicates the limit has been reached. The API does not currently return any rate limit headers.

## List Frameworks

This query retrieves a list of all frameworks (benchmarks, compliance standards, questionnaires) that were added to your JupiterOne account, as well as any metadata about them. Note, this query does not retrieve the entire framework model, only the base properties of a framework.

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

Retrieves the full ComplianceFramework model by ID. It includes details such as overall summary, nested groups and framework items, linked controls, and more.

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

This query creates an empty framework (no groups or framework items). See the 
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

This query imports a framework from the J1 predefined templates. See the 
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

This query imports a framework using raw JSON. The JSON must adhere to the structure defined in the 
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

The following queries update the review configuration of a framework, group, or frameworkItem. Each query requires the ID of the framework you are updating as well as an input variable object, which includes a list of owner emails, the review frequency, and the origin of action links (the domain of your JupiterOne account).

**Variables**

- `frameworkId`: The unique identifier for the framework, returned by the `List frameworks` query.
- `input`: The input variable captures additional values, including: the origin of the action link, the owner(s) of the review configuration, and the review frequency. For example:

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


## List Controls (Library Items)

Controls (called "Library Items" in our internal data model) are reusable objects of compliance data that exist outside the context of a framework. You can link the controls to different frameworkItems to provide additional evidence.

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

This query exposes more data on top of the base `ComplianceLibraryItemMetadatas` object. Any information you need about a control is exposed via this query.

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

This query creates a control.

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

## Get Requirement (Framework Item)
In the API, anywhere the term "Framework Item" is used, that corresponds to a Requirement in the JupiterOne UI.

**Variables**

- `input`
    - `id` - The ID of the requirement (framework item) to retrieve

**Query**

```graphql
query complianceFrameworkItem($input: ComplianceFrameworkItemInput!) {
  complianceFrameworkItem(input: $input) {
    id
    name
    description
    displayCategory
    ref
    evaluationProgress
    lastEvaluationTimestamp
    evaluationResult
    auditStatus
    groupId
    webLink
    summary {
      id
      hasLinkedPolicyItem
      evidenceCollectionSummary {
        id
        hasEvidence
        hasInternalEvidenceCollected
        hasExternalEvidenceAttached
        questionnaireAnswer
      }
    }
  }
}
```


## Gap Status
In the Compliance API, the "Gap Status" is exposed via the `evaluationResult` property on the following objects:

* Requirement (Framework Item)
* Control (Library Item)

The valid values of `evaluationResult` are

* `FULFILLED`
* `GAP_DETECTED`
* `NOT_APPLICABLE`
* `WARNING`
* `UNKNOWN`


## Evidence Collection

Evidence collection can be performed at the framework, requirement, or control level. In order to complete the process, three
actions must be taken in sequential order:

1. Kick off an EvidenceCollectionJob via API
2. Poll for the completion of the EvidenceCollectionJob
3. Use the completed EvidenceCollectionJob to receive an AWS s3 link to download its output


### Kick off an EvidenceCollectionJob via API

Each object type has a different GraphQL mutation to call to start its EvidenceCollectionJob.  Make sure
to use the correct mutation for the object type in question

#### Kick off Framework EvidenceCollectionJob

**Variables**

- `input`
    - `frameworkId` - The identifier of the framework to start an EvidenceCollectionJob for

**Mutation**

```graphql
  mutation startEvidenceCollectionJobforFramework(
    $input: StartEvidenceCollectionJobForFrameworkInput!
  ) {
    startEvidenceCollectionJobforFramework(input: $input) {
      id
      accountId
      userId
      frameworkId
      frameworkItemId
      libraryItemId
      status
      progress
      createTimestamp
      endTimestamp
    }
  }
```

#### Kick off Requirement EvidenceCollectionJob

**Variables**

- `input`
    - `frameworkItemId` - The identifier of the requirement(i.e. framework item) to start an EvidenceCollectionJob for

**Mutation**

```graphql
  mutation startEvidenceCollectionJobforFrameworkItem(
    $input: StartEvidenceCollectionJobForFrameworkItemInput!
  ) {
    startEvidenceCollectionJobforFrameworkItem(input: $input) {
      id
      accountId
      userId
      frameworkId
      frameworkItemId
      libraryItemId
      status
      progress
      createTimestamp
      endTimestamp
    }
  }
```

#### Kick off Control EvidenceCollectionJob

**Variables**

- `input`
    - `libraryItemId` - The identifier of the library item (i.e. Control) to start an EvidenceCollectionJob for

**Mutation**

```graphql
mutation startEvidenceCollectionJobforLibraryItem(
  $input: StartEvidenceCollectionJobForLibraryItemInput!
) {
  startEvidenceCollectionJobforLibraryItem(input: $input) {
    id
    accountId
    userId
    frameworkId
    frameworkItemId
    libraryItemId
    status
    progress
    createTimestamp
    endTimestamp
  }
}
```

### Poll for the completion of the EvidenceCollectionJob

When the job has completed, its `status` field will be set to `COMPLETED`

**Variables**

- `input`
    - `id` - The identifier of the EvidenceCollectionJob to fetch

**Query**

```graphql
query evidenceCollectionJob($input: EvidenceCollectionJobInput!) {
    evidenceCollectionJob(input: $input) {
      id
      accountId
      userId
      frameworkId
      frameworkItemId
      libraryItemId
      status
      progress
      createTimestamp
      endTimestamp
    }
  }
```

### Fetch AWS S3 Download Link from the Completed EvidenceCollectionJob

The returned `link` property will be an [AWS S3 Presigned URL](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html) that contains the zipped evidence file to download.  This URL will be valid for 2 hours.  In order to generate a new URL (if the timeout
is hit), just call the same query below again.

**Variables**

- `input`
    - `evidenceCollectionJobId` - The identifier of the EvidenceCollectionJob to get the download link for

**Query**

```graphql
query downloadLinkForEvidenceCollectionJob(
  $input: DownloadLinkForEvidenceCollectionJobInput!
) {
  downloadLinkForEvidenceCollectionJob(input: $input) {
    link
  }
}
```