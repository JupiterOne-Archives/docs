# J1QL Query Rate Limiting

J1QL queries executed via the [J1 public API](./jupiterone-api.md) are rate-limited separately from [GraphQL API invocations](./rate-limiting.md). Each J1QL query uses one token. All queries executed via the J1 public API count towards the rate limit. This count includes user-initiated application queries (such as search and J1 Insights) and queries via the J1 public API.

#### **Account Rate Limit for J1QL Queries**

The default rate of J1QL queries is`120 tokens per 1-minute period`.

- At any time, there are a maximum of 120 tokens available for J1QL queries.
- JupiterOne declines queries when the rate exceeds 120 tokens per 1-minute period.
- **Average rate allowed:** 2 J1QL queries per second.
- **Configurable:** JupiterOne can adjust this rate limit on your behalf. Contact your J1 administrator.



