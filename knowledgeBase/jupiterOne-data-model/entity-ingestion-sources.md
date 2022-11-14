# JupiterOne Entity Ingestion Sources

JupiterOne has a standard set of labels that represent how any single entity is ingested into the JupiterOne graph. You can find this information on entities underneath the `Metadata` tab that exists within the entity drawer in the application and you can also filter against this information when you're querying JupiterOne by including the `_source` property in a `WITH` clause of a JupiterOne query. 

For example:

```
Which of my aws instances that were ingested by an integration use a data store?

FIND aws_instance
WITH _source = 'integration-managed'
THAT USES DataStore
RETURN TREE
```

## Labels of Ingestion Sources

`system-internal` - Entities that are created by an internal JupiterOne system that represents metadata about your JupiterOne instance. For example, users that have access to the JupiterOne software itself, compliance benchmarks, and alerts will likely have a `_source` value of `system-internal`. 

`integration-managed` - Entities that are created by integrations. For example, if you configure an AWS integration and that integration ingests information into the graph, the source of those entities will likely have a `_source` value of `integration-managed`.

`system-mapper` -  Entities that represent assets have not yet been ingested into the JupiterOne graph by an integration. In the JupiterOne data model, certain relationships can be inferred based the association certain entities have with each other. For example, it is reasonable to expect that an entity that represents a host agent (e.g. scanners from vendors like CrowdStrike, SentinelOne, etc.) must also be accompanied by a host (e.g. instances from a cloud service provider or a physical device that an employee uses to perform their work). Due to the timing of how integrations might execute or the information JupiterOne can retrieve from vendor solutions, certain entities that are used to create these relationships may not exist, resulting in a false representation of an organization's assets. In order to mitigate this problem, JupiterOne uses an entity with a `_source` value of `system-mapper` to represent that an asset actually does exist before other ingestion sources have had the opportunity to ingest it into the JupiterOne graph.

`api` - Entities that are created using the JupiterOne APIs will be given a `_source` value of `api`.

`sample-data` - Entities that are created using the sample data feature of JupiterOne will be given a `_source` value of `sample-data`.



