# J1QL Query Rate Limiting

J1QL queries executed via the [J1 public API](./jupiterone-api.md) are rate-limited separately from [GraphQL API invocations](./rate-limiting.md). Each J1QL query consumes one request token. All queries executed via the J1 public API count towards the rate limit. This count includes user-initiated application queries (such as search and J1 Insights) and queries via the J1 public API. You should incorporate retry with backoff in response to rate-limiting responses from the J1 API.

#### **Account Rate Limit for J1QL Queries**

- Default limit: 120 tokens/120 seconds
- Enterprise limit (available on request): 60 tokens/60 seconds
- Request for approval: 120 tokens/60 seconds
- Enterprise customers are eligible for a rate limit increase up to 120 tokens/60 seconds, subject to usage analysis and approval.  Contact your J1 TSE to request an increase.



