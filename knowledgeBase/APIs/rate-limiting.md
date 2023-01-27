# JupiterOne Rate Limiting

Rate limiting is a technique to limit network traffic to avoid exhausting system resources. 

Rate limits are described in terms of tokens and the token-replenishment rate. Various actions performed using the JupiterOne public API deplete tokens and tokens are replenished at a predictable rate. If there are insufficient tokens to perform an action, then you receive a *rate exceeded* (`429` HTTP response code) error. The rate limits are only when actions are performed using the public API. Scheduled or background activity (compliance report evaluation, rule evaluation, and so on) does not deplete tokens.

 The JupiterOne platform has public API rate limits in the following areas:

- GraphQL API mutations/queries
- J1QL queries

## GraphQL API rate limiting

Each GraphQL request can contain multiple mutations/queries and each individual mutation/query utilizes one *token*. To avoid a single end-user/client from depleting all tokens and impairing other clients, we apply hierarchical rate limiting at the *client level* and *account level*. The client limit is configured to have a lower number of max tokens to better support fairness across multiple clients within a single account.

Each unique authenticated session or API token/key is considered to be a single client. It is possible for the same user to log in multiple times in different web browsers and each of these sessions is considered a unique client. Furthermore, if multiple API tokens are being used to send requests, then each API token is considered a unique client.

#### Account Rate Limit for GraphQL Mutations/Queries

- 2000 tokens per 2-minute period
  - At any given time, there are a maximum of 2000 available tokens, which is the burst limit across the entire organization account.
  - It takes two minutes to fully replenish 2000 tokens.
  - JupiterOne discards mutations/queries when the rate exceeds 2000 tokens per 2-minute period.
  - **Average rate allowed:** 16.67 GraphQL mutations/queries per second.
  - **Configurable:**  JupiterOne can adjust this rate limit on your behalf. Contact your J1 administrator.

#### Client Rate Limit for GraphQL Mutations/Queries

- `1000 tokens per 1-minute period`
  - At any given time, there are a maximum of 1000 available tokens, which is the burst limit per client.
  - It takes 1 minute to fully replenish 1000 tokens.
  - JupiterOne discards invocations when the rate exceeds 1000 tokens per 1-minute period.
  - **Average rate allowed:** 16.67 GraphQL mutations/queries per second.
  - **Configurable:** API token creator can adjust the rate limit when creating a token.

## J1QL Query Rate Limiting

J1QL queries executed via the J1 public API are rate-limited separately from GraphQL API invocations. Each J1QL query uses one token. All queries executed via the J1 public API count towards the rate limit. This count includes user-initiated application queries (such as search and J1 Insights) and queries via the J1 public API.

#### **Account Rate Limit for J1QL Queries:**

- `120 tokens per 1-minute period`
  - At any time, there are a maximum of 120 tokens available for J1QL queries.
  - JupiterOne declines queries when the rate exceeds 120 tokens per 1-minute period.
  - **Average rate allowed:** 2 J1QL queries per second.
  - **Configurable:** JupiterOne can adjust this rate limit on your behalf. Contact your J1 administrator.