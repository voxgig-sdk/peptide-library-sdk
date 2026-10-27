# Peptide Library API

> Peptide research data, scientific literature and vendor information from [Peptide Library](https://peptidelibrary.app).
>
> **Research and education only.** Research and educational information only. Not medical advice, and not a recommendation to buy or use any substance. Many of these compounds are not approved for human use. The API never returns dose figures, regimens, reconstitution or injection instructions.
>
> ## Authentication
> Research and study endpoints work without a key (limited per IP address). Vendor, product and price endpoints need an API key with the matching scope, sent as `Authorization: Bearer pl_live_…` (or `X-API-Key`). Create keys at https://peptidelibrary.app/developers/dashboard. Keep keys on your server: never put them in a browser or app bundle.
>
> Scopes: `research:read`, `studies:read`, `vendors:read`, `products:read`, `pricing:read`.
>
> ## Rate limits
> Keyed vendor, product and price requests count against your plan&#39;s per-minute and monthly limits (Free Developer: 60 per minute, 5,000 per month). Each response carries `RateLimit-Limit`, `RateLimit-Remaining` and `RateLimit-Reset`; over the limit you get **429** with `Retry-After`. Anonymous requests are limited per IP address.
>
> ## Conventions
> JSON envelopes: `&#123; data, pagination?, meta &#125;` and `&#123; error: &#123; code, message, request_id &#125; &#125;`. Lists use cursor pagination (`limit`, `cursor` → `pagination.next_cursor`). Timestamps are UTC ISO 8601; money is a decimal string in the listed currency, never converted. Research fields a profile doesn&#39;t document are the string `not_documented`; unknown vendor and price fields are `null`. Responses carry `ETag` (send `If-None-Match` for 304) and `X-Request-Id`.
>
> ## Prices and affiliate links
> Peptide Library may earn a commission when you buy through these links, at no cost to you. Commissions never affect which offers are listed or their order. Prices are as last seen on the vendor&#39;s site; check the vendor before relying on them. Offers come only from vendors whose prices Peptide Library may share, are matched to a library profile and were seen on the vendor&#39;s site in the last 30 days.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 8 entities and 31 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### GetApiIndex

Results: OK.

SDK operations: `load`.

Key fields to recognise:

- `documentation`: Absolute URL.
- `openapi`: Absolute URL.

### Meta

Results: OK.

SDK operations: `load`.

### Price

Results: OK.

SDK operations: `list`, `load`.

Key fields to recognise:

- `id`: Offer id.
- `is_stale`: True when not seen in the last 7 days.
- `last_seen_at`: When the price was last seen on the vendor&#39;s site.
- `price`: Decimal amount as a string, never a float.
- `product_name`: As the vendor lists it.

### Product

Results: OK.

SDK operations: `list`, `load`.

Key fields to recognise:

- `api_url`: Absolute URL.
- `id`: Compound and form, for example `bpc-157::vial`.
- `last_seen_at`: When the price was last seen on the vendor&#39;s site.
- `offers`: With the `pricing:read` scope; otherwise null.
- `prices`: Per currency, never converted or mixed.

### Research

Results: OK.

SDK operations: `list`, `load`.

Key fields to recognise:

- `api_url`: Absolute URL.
- `approved_medicine`: True only when the recorded FDA status is Approved.
- `id`: Stable id from the study&#39;s identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none.
- `regulatory_status`: Regulatory class read from the profile&#39;s FDA status.
- `research_gaps`: Evidence steps with no documented source in the profile.

### ResearchStatistic

Results: OK.

SDK operations: `list`, `load`.

Key fields to recognise:

- `detail`: Rankings (array of rows) or comparison detail (object); null when none.
- `embed_url`: Absolute URL.
- `flags`: Caveats: `partial_year`, `small_baseline`, `high_unclassified`, `whole_months_only`, `no_denominator`.
- `id`: `pmid-` + the PubMed id.
- `kind`: `report`: an editorially approved edition; `weekly`: the automated refresh behind the live dashboard.

### Study

Results: OK.

SDK operations: `list`, `load`.

Key fields to recognise:

- `analog_compound`: Research on a related compound, not this one.
- `authors`: Not stored by Peptide Library.
- `id`: Stable id from the study&#39;s identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none.
- `journal`: Not stored by Peptide Library.
- `summary`: The finding as summarised by Peptide Library editors (dose figures removed).

### Vendor

Results: OK.

SDK operations: `list`, `load`.

Key fields to recognise:

- `api_url`: Absolute URL.
- `id`: Offer id.
- `profile_url`: Absolute URL.
- `website_url`: Peptide Library link to the vendor&#39;s site (may be an affiliate link).

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| GetApiIndex | `load` | `GET /` | Not required |
| Meta | `load` | `GET /health` | Not required |
| Price | `list` | `GET /prices` | Required |
| Price | `load` | `GET /prices/compare` | Required |
| Product | `list` | `GET /products` | Required |
| Product | `load` | `GET /products/{id}` | Required |
| Research | `list` | `GET /categories` | Not required |
| Research | `list` | `GET /peptides` | Not required |
| Research | `list` | `GET /research-areas` | Not required |
| Research | `load` | `GET /search` | Not required |
| Research | `load` | `GET /peptides/{slug}` | Not required |
| Research | `load` | `GET /peptides/{slug}/research` | Not required |
| Research | `load` | `GET /regulatory-status/{slug}` | Not required |
| ResearchStatistic | `list` | `GET /research/categories` | Not required |
| ResearchStatistic | `list` | `GET /research/datasets` | Not required |
| ResearchStatistic | `list` | `GET /research/publications` | Not required |
| ResearchStatistic | `list` | `GET /research/reports` | Not required |
| ResearchStatistic | `list` | `GET /research/statistics` | Not required |
| ResearchStatistic | `load` | `GET /research/charts/{id}` | Not required |
| ResearchStatistic | `load` | `GET /research/statistics/{id}` | Not required |
| ResearchStatistic | `load` | `GET /research/trends` | Not required |
| ResearchStatistic | `load` | `GET /research/peptides/{slug}/statistics` | Not required |
| Study | `list` | `GET /peptides/{slug}/studies` | Not required |
| Study | `list` | `GET /studies` | Not required |
| Study | `load` | `GET /studies/{id}` | Not required |
| Vendor | `list` | `GET /vendors/{id}/prices` | Required |
| Vendor | `list` | `GET /vendors/{id}/products` | Required |
| Vendor | `list` | `GET /vendors` | Required |
| Vendor | `load` | `GET /vendors/{id}` | Required |
| Vendor | `load` | `GET /vendors/compare` | Required |
| Vendor | `load` | `GET /vendors/{id}/shipping` | Required |

## Connect to the API

- Production: `https://api.peptidelibrary.app/v1`
- Production (same API on the website host): `https://peptidelibrary.app/api/v1`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

API key from https://peptidelibrary.app/developers/dashboard, sent as `Authorization: Bearer pl_live_…`.

The same key in an `X-API-Key` header.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

A read request without required parameters or authentication is `GET /`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://api.peptidelibrary.app/v1/'
```

Inspect the response using the GetApiIndex reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `peptide-library_list`: List records for an entity. Supported entities: `price`, `product`, `research`, `research_statistic`, `study`, `vendor`.
- `peptide-library_load`: Load one record for an entity. Supported entities: `get_api_index`, `meta`, `price`, `product`, `research`, `research_statistic`, `study`, `vendor`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

