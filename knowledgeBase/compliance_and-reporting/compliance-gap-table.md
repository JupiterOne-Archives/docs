# Compliance Gaps Table

JupiterOne provides a compliance gaps table for a direct view into the gaps across your environment that impact your compliance posture. The gaps table offers immediate insights into all gaps, across all frameworks, accounts, and entities in your environment, removing the need to look at various separate gaps in each individual framework. 

### Accessing the Gaps Table

By default, the gaps table is enabled in your environment and if you have access to J1 Compliance, you can view and interact with the gaps table. 

If you do not have access to J1 Compliance, you can have the gaps-only role, which provides access to the table. Your J1 administrator should add this role to an existing group, instead of creating a new group for gaps-only access. Gaps-only access enables you to perform open searches and queries for gaps without  interacting with the rest of Compliance. 

**Filtering on Results**

The table displays all gaps within your environment, along with the total count of affected entities, giving you the ability to identify the number of gaps and entities impacted. To address certain gaps, filter on one or more of the following

- Affected Frameworks: Frameworks within your environment with gaps. Only Frameworks with gaps are displayed.
- Integration Accounts: ?
- AWS Account ID: The AWS accounts in your environment with gaps. 
- Azure Subscription ID: The Azure accounts in your environment with gaps. 
- GCP Project ID: Google Cloud Platform accounts in your environment with gaps.

**Finding Affected Entities**

The Gaps view makes identifying affected entities easy so that you can take steps towards corrective action. For each gap, the affected entities are shown in the Gaps Detail tabs. There are two methods to finding all entities impacted. 

1. Run the Gaps query to see all entities From the main table, click Run query, which opens the search page with the query prepopulated. If filters are applied (such as affected frameworks, or accountIDs) they are included in the query. Once the query loads, you can export the findings to view all entities. 
2. Export entities for a single gap. Clicking in to a single gap, you can select the Affected entities tab to view all entities impacted by that gap. From this tab, click Export CSV to download the list of affected entities for the gap (e.g. Approved Software). 

Viewing Gaps in the Graph

For any one gap, you have the ability to view the gap and the associated problems in JupiterOne’s Graph. There are two options to open the Graph. Running the gaps query from the main Gaps table opens all gaps, from which you can drill down on certain gaps you want to open in Graph. Alternatively, you can open a single gap from the Gaps details by clicking View in the graph. 