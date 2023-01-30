# JupiterOne Rate Limiting

Rate limiting is a technique to limit network traffic to avoid exhausting system resources. 

Rate limits are described in terms of tokens and the token-replenishment rate. Various actions performed using the JupiterOne public API deplete tokens and tokens are replenished at a predictable rate. If there are insufficient tokens to perform an action, then you receive a *rate exceeded* (`429` HTTP response code) error. The rate limits are only when actions are performed using the public API. Scheduled or background activity (compliance report evaluation, rule evaluation, and so on) does not deplete tokens.

JupiterOne has public API rate limits in:

- GraphQL API mutations/queries
- J1QL queries

The rate-limited APIs return the following headers to control request back-off and throttling: 

- **RateLimit-Limit**: The quota of the currently most-limited bucket, such as the maximum quota of the bucket with the fewest remaining, concatenated with the quota and time window (in seconds) of each applicable bucket. For example, 1000, 10000; window=60, 1000; window=60.

- **RateLimit-Remaining**: Whichever bucket is the closest to being full. This is the maximum number of invocations minus the number that are currently counted against the limit. This means it is the largest amount of further invocations that could be executed without being rejected by rate-limiting at the moment of the request.
- **RateLimit-Reset**: If no further invocations were made against any limits, this is the number of seconds remaining until **all** buckets that apply against the invocation would be entirely emptied. This means it is the greatest amount among all times-to-empty for applicable limits.
- **RateLimit-Requested**: This is a custom header specified because of the concurrency model of GraphQL and the way J1 counts multiple invocations from a single GraphQL request. This response header is an integer that returns the number of invocations that were counted in the request, regardless of whether the request was served or dropped due to quotas.

**Example**:
In this use case:

- An account is permitted 10,000 invocations per 60 seconds.
- In the last 60 seconds, there have been 9,900 invocations in the account.
- A token is permitted 1,000 invocations per 60 seconds.
- In the last 60 seconds, there have been 800 invocations using the token.
- A new request using the token that would be counted as 50 invocations is now being processed.

The number of tentative invocations to be counted is added as RateLimit-Requested:
RateLimit-Requested: 50

The request should be permitted, since pre-request the account limit has 100 remaining and the token limit has 200 remaining. After the request, the account limit has 50 remaining and the token limit has 150 remaining. Since the account limit is closer, it is used for RateLimit-Remaining and RateLimit-Limit headers.

RateLimit-Remaining: 50
RateLimit-Limit: 10000, 1000;window=60, 10000;window=60

Supposing no other requests come in, it will take 9950/(10000/60) == 59.7 seconds for the account limit to clear, and it will take the token limit 800/(1000/60) == 48 seconds to clear. J1 returns the greater number, rounded strictly *up*, i.e. Math.ceil (see IETF proposal – sub-second precision is disallowed).

RateLimit-Reset: 60

**Example**

In this use case:

- An account is permitted 10,000 invocations per 60 seconds.
- In the last 60 seconds, there have been 9,900 invocations in the account.
- A token is permitted 1,000 invocations per 60 seconds.
- In the last 60 seconds, there have been 995 invocations using the token.
- A new request using the token that would be counted as 50 invocations is now being processed.

The number of tentative invocations to be counted is added as RateLimit-Requested:
RateLimit-Requested: 50

Because the token bucket has insufficient remaining invocations, the request should be dropped. Since the entire request is dropped, J1 does not count these invocations against the quota and, therefore, J1 uses the pre-request numbers for the Remaining and Limit headers. The currently limiting bucket is the token bucket, which has 5 invocations remaining. The consumer can see that their request received 429 because 50 > 5:
RateLimit-Remaining: 5
RateLimit-Limit: 1000, 1000;window=60, 10000;window=60

Supposing no other requests come in, it will take 9900/(10000/60) == 59.4 seconds for the account limit to clear, and it will take the token limit 995/(1000/60) == 59.7 seconds to clear. J1 returns the greater number, rounded strictly *up*, i.e. Math.ceil (see IETF proposal – sub-second precision is disallowed).

RateLimit-Reset: 60



## GraphQL API Rate Limiting

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



