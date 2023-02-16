# Example Data Security J1QL Queries

## Show all resources without a data classification tag {}?

```j1ql
Find (Host|DataStore) with classification = undefined
```

Returns a count instead:

```j1ql
Find (Host|DataStore) with classification = undefined as e return count(e)
```

## Show all resources without a data classification tag in VPC with tag {}?

Filter by a tag on the VPC:

```j1ql
Find (Host|DataStore|Workload) with classification = undefined
  that relates to aws_vpc with tag.{tagName} = '{tagValue}'
```

Filter by vpcId or name:

```j1ql
Find (Host|DataStore|Workload) with classification = undefined
  that relates to aws_vpc with vpcId='{vpcId}' or name='{name}'
```

## What are all the resources without encryption with data security tag '{restricted}'?

```j1ql
Find DataStore with encrypted!=true and classification='restricted'
```

Sometimes it is also interesting to find unencrypted data that is non-public:

```j1ql
Find DataStore with encrypted!=true and classification!='Public'
```

## Aggregating Math Functions in the RETURN Clause

This query feature allows you to combine and deduplicate multiple scalar values into a single listing for a column/alias. You can combine multiple (defined) properties into a single property without having to choose to return one property or another.

```
FIND jira_issue WITH resolvedOn != undefined AND createdOn != undefined AS i 
RETURN AVG(i.resolvedOn - i.createdOn / 86400000) as 'Average Days to Close'
```



