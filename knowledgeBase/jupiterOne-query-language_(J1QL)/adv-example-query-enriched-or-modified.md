## Query for Enriched and Modified Properties

J1QL (JupiterOne Query Language) uses the `@` prefix to query for any property that has been manually enriched/modified. Let's take this example:

```j1ql
Find * with 
  [@classification]!=undefined or 
  [@tag.Classification]!=undefined
```

If an `@` property exists, this means that manual edit has been done to the property.

You must use the `[]`  when querying with special characters like `@`.