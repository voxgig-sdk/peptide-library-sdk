# PeptideLibrary Golang SDK



The Golang SDK for the PeptideLibrary API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.GetApiIndex(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/peptide-library-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/peptide-library-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/peptide-library-sdk/go=../peptide-library-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/peptide-library-sdk/go"
)

func main() {
    client := sdk.NewPeptideLibrarySDK(map[string]any{
        "apikey": os.Getenv("PEPTIDE_LIBRARY_APIKEY"),
    })

    // Load a single getApiIndex — the value is the entity; Data() reads its record.
    getApiIndex, err := client.GetApiIndex(nil).Load(nil, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(getApiIndex.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
vendors, err := client.Vendor(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = vendors
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

vendors, err := client.Vendor(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
// A []any of entities, one per mock record.
for _, item := range vendors.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewPeptideLibrarySDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
PEPTIDE_LIBRARY_TEST_LIVE=TRUE
PEPTIDE_LIBRARY_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewPeptideLibrarySDK

```go
func NewPeptideLibrarySDK(options map[string]any) *PeptideLibrarySDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *PeptideLibrarySDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### PeptideLibrarySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `GetApiIndex` | `(data map[string]any) PeptideLibraryEntity` | Create a GetApiIndex entity instance. |
| `Meta` | `(data map[string]any) PeptideLibraryEntity` | Create a Meta entity instance. |
| `Price` | `(data map[string]any) PeptideLibraryEntity` | Create a Price entity instance. |
| `Product` | `(data map[string]any) PeptideLibraryEntity` | Create a Product entity instance. |
| `Research` | `(data map[string]any) PeptideLibraryEntity` | Create a Research entity instance. |
| `ResearchStatistic` | `(data map[string]any) PeptideLibraryEntity` | Create a ResearchStatistic entity instance. |
| `Study` | `(data map[string]any) PeptideLibraryEntity` | Create a Study entity instance. |
| `Vendor` | `(data map[string]any) PeptideLibraryEntity` | Create a Vendor entity instance. |

### Entity interface (PeptideLibraryEntity)

All entities implement the `PeptideLibraryEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    getApiIndex, err := client.GetApiIndex(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // getApiIndex is the entity; getApiIndex.(sdk.Entity).Data() reads its record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### GetApiIndex

| Field | Description |
| --- | --- |
| `"documentation"` | Absolute URL. |
| `"endpoints"` |  |
| `"name"` |  |
| `"openapi"` | Absolute URL. |
| `"release"` |  |
| `"version"` |  |

Operations: Load.

API path: `/`

#### Meta

| Field | Description |
| --- | --- |
| `"database"` |  |
| `"release"` |  |
| `"status"` |  |

Operations: Load.

API path: `/health`

#### Price

| Field | Description |
| --- | --- |
| `"availability"` |  |
| `"currency"` |  |
| `"first_seen_at"` |  |
| `"form"` |  |
| `"id"` | Offer id. |
| `"is_affiliate_link"` |  |
| `"is_stale"` | True when not seen in the last 7 days. |
| `"last_seen_at"` | When the price was last seen on the vendor's site. |
| `"peptide"` |  |
| `"price"` | Decimal amount as a string, never a float. |
| `"price_changed_at"` |  |
| `"price_per_mg"` |  |
| `"price_per_unit"` |  |
| `"product_id"` |  |
| `"product_name"` | As the vendor lists it. |
| `"product_page_url"` | Peptide Library redirect to the vendor's page; logs the click. |
| `"product_type"` |  |
| `"regular_price"` |  |
| `"ships_to"` | Shipping to the `ships_to` destination you asked about; null when you didn't ask. |
| `"strength"` |  |
| `"vendor"` |  |

Operations: List, Load.

API path: `/prices`

#### Product

| Field | Description |
| --- | --- |
| `"api_url"` | Absolute URL. |
| `"form"` |  |
| `"id"` | Compound and form, e.g. |
| `"in_stock_count"` |  |
| `"last_seen_at"` |  |
| `"offer_count"` |  |
| `"offers"` | With the `pricing:read` scope; otherwise null. |
| `"peptide"` |  |
| `"prices"` | Per currency, never converted or mixed. |
| `"product_type"` |  |
| `"vendor_count"` |  |

Operations: List, Load.

API path: `/products`

#### Research

| Field | Description |
| --- | --- |
| `"also_known_as"` |  |
| `"api_url"` | Absolute URL. |
| `"approved_medicine"` | True only when the recorded FDA status is Approved. |
| `"availability"` |  |
| `"categories"` |  |
| `"classification"` |  |
| `"clinical_evidence"` |  |
| `"conflict"` |  |
| `"content"` |  |
| `"content_reviewed_at"` |  |
| `"content_total"` |  |
| `"description"` |  |
| `"development_stage"` |  |
| `"evidence"` |  |
| `"fda_status"` |  |
| `"id"` |  |
| `"label"` |  |
| `"last_reviewed"` |  |
| `"library_classification"` |  |
| `"limitations"` |  |
| `"links"` |  |
| `"mechanism"` |  |
| `"mechanisms"` |  |
| `"name"` |  |
| `"note"` |  |
| `"notes"` |  |
| `"peptide"` |  |
| `"peptide_count"` |  |
| `"peptide_total"` |  |
| `"peptides"` |  |
| `"preclinical_evidence"` |  |
| `"properties"` |  |
| `"query"` |  |
| `"references"` |  |
| `"regulatory"` |  |
| `"regulatory_evidence"` |  |
| `"regulatory_status"` | Regulatory class read from the profile's FDA status. |
| `"regulatory_status_label"` |  |
| `"research_areas"` |  |
| `"research_gaps"` | Evidence steps with no documented source in the profile. |
| `"research_topics"` |  |
| `"review"` |  |
| `"safety"` |  |
| `"secondary_reports"` |  |
| `"statement"` |  |
| `"summary"` |  |
| `"unavailable_sources"` |  |
| `"url"` | Absolute URL. |
| `"wada_status"` |  |

Operations: List, Load.

API path: `/categories`

#### ResearchStatistic

| Field | Description |
| --- | --- |
| `"by_year"` |  |
| `"categories"` |  |
| `"chart_url"` |  |
| `"citation"` |  |
| `"columns"` |  |
| `"definition"` |  |
| `"denominator"` |  |
| `"denominator_definition"` |  |
| `"description"` |  |
| `"detail"` | Rankings (array of rows) or comparison detail (object); null when none. |
| `"doi"` |  |
| `"doi_url"` |  |
| `"embed_url"` | Absolute URL. |
| `"evidence_class"` |  |
| `"filters"` |  |
| `"first_pub_date"` |  |
| `"flags"` | Caveats: partial_year, small_baseline, high_unclassified, whole_months_only, no_denominator. |
| `"groups"` |  |
| `"how_to_read"` |  |
| `"id"` | `pmid-` + the PubMed id. |
| `"is_peptide"` |  |
| `"journal"` |  |
| `"key_publications"` |  |
| `"kind"` |  |
| `"label"` |  |
| `"license"` |  |
| `"limitations"` |  |
| `"mesh_roots"` |  |
| `"methodology_url"` | Absolute URL. |
| `"metric"` |  |
| `"min_baseline"` |  |
| `"name"` |  |
| `"numerator"` |  |
| `"numerator_definition"` |  |
| `"open_access"` |  |
| `"origin"` |  |
| `"partial_year"` | The cutoff year, which is incomplete. |
| `"peptide"` |  |
| `"peptide_ids"` |  |
| `"permalink"` | Absolute URL. |
| `"pmid"` |  |
| `"png_url"` | Absolute URL. |
| `"publications"` |  |
| `"published_at"` |  |
| `"pubmed_url"` | Absolute URL. |
| `"query"` | The exact Europe PMC query behind the counts. |
| `"regulatory"` |  |
| `"research_url"` | Absolute URL. |
| `"rows"` |  |
| `"section"` | State of Peptide Research section that uses it. |
| `"slug"` |  |
| `"snapshot"` |  |
| `"source"` |  |
| `"study_type"` |  |
| `"study_types"` |  |
| `"subtitle"` |  |
| `"svg_url"` | Absolute URL. |
| `"tier"` | `counts_only`: yearly counts only (a very large, general literature); `excluded`: a blend or comparison entry. |
| `"tier_reason"` |  |
| `"title"` |  |
| `"totals"` |  |
| `"trials"` |  |
| `"unit"` |  |
| `"url"` | Absolute URL. |
| `"value"` |  |
| `"version"` |  |
| `"versions"` |  |

Operations: List, Load.

API path: `/research/categories`

#### Study

| Field | Description |
| --- | --- |
| `"analog_compound"` | Research on a related compound, not this one. |
| `"authors"` | Not stored by Peptide Library. |
| `"citations"` |  |
| `"cited_by"` |  |
| `"doi"` |  |
| `"evidence_classification"` |  |
| `"evidence_classification_label"` |  |
| `"id"` | Stable id from the study's identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none. |
| `"journal"` | Not stored by Peptide Library. |
| `"limitations"` |  |
| `"nct_id"` |  |
| `"pmid"` |  |
| `"population"` |  |
| `"publication_year"` |  |
| `"research_model"` |  |
| `"sample_size"` |  |
| `"source_url"` |  |
| `"study_type"` |  |
| `"summary"` | The finding as summarised by Peptide Library editors (dose figures removed). |
| `"title"` |  |

Operations: List, Load.

API path: `/peptides/{slug}/studies`

#### Vendor

| Field | Description |
| --- | --- |
| `"about"` |  |
| `"api_url"` | Absolute URL. |
| `"catalog"` |  |
| `"country"` |  |
| `"description"` |  |
| `"id"` | Stable vendor id. |
| `"logo_url"` |  |
| `"name"` |  |
| `"product_categories"` |  |
| `"profile_url"` | Absolute URL. |
| `"rating"` |  |
| `"region"` |  |
| `"reviews"` |  |
| `"shipping"` |  |
| `"slug"` |  |
| `"sources"` |  |
| `"website_url"` | Peptide Library link to the vendor's site (may be an affiliate link). |

Operations: List, Load.

API path: `/vendors/{id}/prices`



## Entities


### GetApiIndex

Create an instance: `getApiIndex := client.GetApiIndex(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `documentation` | `string` | Absolute URL. |
| `endpoints` | `[]any` |  |
| `name` | `string` |  |
| `openapi` | `string` | Absolute URL. |
| `release` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```go
getApiIndex, err := client.GetApiIndex(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(getApiIndex.(sdk.Entity).Data()) // the loaded entity's record
```


### Meta

Create an instance: `meta := client.Meta(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `database` | `string` |  |
| `release` | `string` |  |
| `status` | `string` |  |

#### Example: Load

```go
meta, err := client.Meta(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(meta.(sdk.Entity).Data()) // the loaded entity's record
```


### Price

Create an instance: `price := client.Price(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `availability` | `string` |  |
| `currency` | `string` |  |
| `first_seen_at` | `any` |  |
| `form` | `string` |  |
| `id` | `string` | Offer id. |
| `is_affiliate_link` | `bool` |  |
| `is_stale` | `bool` | True when not seen in the last 7 days. |
| `last_seen_at` | `any` | When the price was last seen on the vendor's site. |
| `peptide` | `map[string]any` |  |
| `price` | `string` | Decimal amount as a string, never a float. |
| `price_changed_at` | `any` |  |
| `price_per_mg` | `any` |  |
| `price_per_unit` | `any` |  |
| `product_id` | `string` |  |
| `product_name` | `string` | As the vendor lists it. |
| `product_page_url` | `string` | Peptide Library redirect to the vendor's page; logs the click. |
| `product_type` | `string` |  |
| `regular_price` | `any` |  |
| `ships_to` | `any` | Shipping to the `ships_to` destination you asked about; null when you didn't ask. |
| `strength` | `map[string]any` |  |
| `vendor` | `map[string]any` |  |

#### Example: Load

```go
price, err := client.Price(nil).Load(map[string]any{"peptide": "peptide"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(price.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
prices, err := client.Price(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range prices.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Product

Create an instance: `product := client.Product(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_url` | `string` | Absolute URL. |
| `form` | `string` |  |
| `id` | `string` | Compound and form, e.g. |
| `in_stock_count` | `int` |  |
| `last_seen_at` | `any` |  |
| `offer_count` | `int` |  |
| `offers` | `any` | With the `pricing:read` scope; otherwise null. |
| `peptide` | `map[string]any` |  |
| `prices` | `[]any` | Per currency, never converted or mixed. |
| `product_type` | `string` |  |
| `vendor_count` | `int` |  |

#### Example: Load

```go
product, err := client.Product(nil).Load(map[string]any{"id": "product_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(product.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
products, err := client.Product(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range products.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Research

Create an instance: `research := client.Research(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `also_known_as` | `[]any` |  |
| `api_url` | `string` | Absolute URL. |
| `approved_medicine` | `bool` | True only when the recorded FDA status is Approved. |
| `availability` | `any` |  |
| `categories` | `[]any` |  |
| `classification` | `map[string]any` |  |
| `clinical_evidence` | `map[string]any` |  |
| `conflict` | `any` |  |
| `content` | `[]any` |  |
| `content_reviewed_at` | `any` |  |
| `content_total` | `int` |  |
| `description` | `string` |  |
| `development_stage` | `any` |  |
| `evidence` | `map[string]any` |  |
| `fda_status` | `any` |  |
| `id` | `string` |  |
| `label` | `string` |  |
| `last_reviewed` | `any` |  |
| `library_classification` | `any` |  |
| `limitations` | `[]any` |  |
| `links` | `map[string]any` |  |
| `mechanism` | `map[string]any` |  |
| `mechanisms` | `map[string]any` |  |
| `name` | `string` |  |
| `note` | `string` |  |
| `notes` | `[]any` |  |
| `peptide` | `map[string]any` |  |
| `peptide_count` | `int` |  |
| `peptide_total` | `int` |  |
| `peptides` | `[]any` |  |
| `preclinical_evidence` | `map[string]any` |  |
| `properties` | `map[string]any` |  |
| `query` | `string` |  |
| `references` | `[]any` |  |
| `regulatory` | `map[string]any` |  |
| `regulatory_evidence` | `[]any` |  |
| `regulatory_status` | `string` | Regulatory class read from the profile's FDA status. |
| `regulatory_status_label` | `string` |  |
| `research_areas` | `[]any` |  |
| `research_gaps` | `[]any` | Evidence steps with no documented source in the profile. |
| `research_topics` | `[]any` |  |
| `review` | `map[string]any` |  |
| `safety` | `map[string]any` |  |
| `secondary_reports` | `map[string]any` |  |
| `statement` | `any` |  |
| `summary` | `any` |  |
| `unavailable_sources` | `[]any` |  |
| `url` | `string` | Absolute URL. |
| `wada_status` | `any` |  |

#### Example: Load

```go
research, err := client.Research(nil).Load(map[string]any{"slug": "slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(research.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
researchs, err := client.Research(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range researchs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### ResearchStatistic

Create an instance: `researchStatistic := client.ResearchStatistic(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `by_year` | `[]any` |  |
| `categories` | `[]any` |  |
| `chart_url` | `any` |  |
| `citation` | `string` |  |
| `columns` | `[]any` |  |
| `definition` | `string` |  |
| `denominator` | `any` |  |
| `denominator_definition` | `any` |  |
| `description` | `string` |  |
| `detail` | `any` | Rankings (array of rows) or comparison detail (object); null when none. |
| `doi` | `any` |  |
| `doi_url` | `any` |  |
| `embed_url` | `string` | Absolute URL. |
| `evidence_class` | `string` |  |
| `filters` | `map[string]any` |  |
| `first_pub_date` | `string` |  |
| `flags` | `[]any` | Caveats: partial_year, small_baseline, high_unclassified, whole_months_only, no_denominator. |
| `groups` | `[]any` |  |
| `how_to_read` | `string` |  |
| `id` | `string` | `pmid-` + the PubMed id. |
| `is_peptide` | `bool` |  |
| `journal` | `any` |  |
| `key_publications` | `[]any` |  |
| `kind` | `string` |  |
| `label` | `string` |  |
| `license` | `map[string]any` |  |
| `limitations` | `[]any` |  |
| `mesh_roots` | `[]any` |  |
| `methodology_url` | `string` | Absolute URL. |
| `metric` | `string` |  |
| `min_baseline` | `any` |  |
| `name` | `string` |  |
| `numerator` | `any` |  |
| `numerator_definition` | `any` |  |
| `open_access` | `any` |  |
| `origin` | `any` |  |
| `partial_year` | `int` | The cutoff year, which is incomplete. |
| `peptide` | `map[string]any` |  |
| `peptide_ids` | `[]any` |  |
| `permalink` | `string` | Absolute URL. |
| `pmid` | `string` |  |
| `png_url` | `string` | Absolute URL. |
| `publications` | `any` |  |
| `published_at` | `string` |  |
| `pubmed_url` | `string` | Absolute URL. |
| `query` | `any` | The exact Europe PMC query behind the counts. |
| `regulatory` | `any` |  |
| `research_url` | `string` | Absolute URL. |
| `rows` | `[]any` |  |
| `section` | `int` | State of Peptide Research section that uses it. |
| `slug` | `string` |  |
| `snapshot` | `map[string]any` |  |
| `source` | `string` |  |
| `study_type` | `string` |  |
| `study_types` | `[]any` |  |
| `subtitle` | `string` |  |
| `svg_url` | `string` | Absolute URL. |
| `tier` | `string` | `counts_only`: yearly counts only (a very large, general literature); `excluded`: a blend or comparison entry. |
| `tier_reason` | `any` |  |
| `title` | `string` |  |
| `totals` | `any` |  |
| `trials` | `any` |  |
| `unit` | `string` |  |
| `url` | `string` | Absolute URL. |
| `value` | `any` |  |
| `version` | `int` |  |
| `versions` | `[]any` |  |

#### Example: Load

```go
researchStatistic, err := client.ResearchStatistic(nil).Load(map[string]any{"id": "research_statistic_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(researchStatistic.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
researchStatistics, err := client.ResearchStatistic(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range researchStatistics.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Study

Create an instance: `study := client.Study(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analog_compound` | `bool` | Research on a related compound, not this one. |
| `authors` | `string` | Not stored by Peptide Library. |
| `citations` | `[]any` |  |
| `cited_by` | `[]any` |  |
| `doi` | `any` |  |
| `evidence_classification` | `string` |  |
| `evidence_classification_label` | `string` |  |
| `id` | `string` | Stable id from the study's identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none. |
| `journal` | `string` | Not stored by Peptide Library. |
| `limitations` | `[]any` |  |
| `nct_id` | `any` |  |
| `pmid` | `any` |  |
| `population` | `any` |  |
| `publication_year` | `any` |  |
| `research_model` | `string` |  |
| `sample_size` | `any` |  |
| `source_url` | `any` |  |
| `study_type` | `any` |  |
| `summary` | `any` | The finding as summarised by Peptide Library editors (dose figures removed). |
| `title` | `string` |  |

#### Example: Load

```go
study, err := client.Study(nil).Load(map[string]any{"id": "study_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(study.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
studys, err := client.Study(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range studys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Vendor

Create an instance: `vendor := client.Vendor(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `about` | `map[string]any` |  |
| `api_url` | `string` | Absolute URL. |
| `catalog` | `map[string]any` |  |
| `country` | `any` |  |
| `description` | `any` |  |
| `id` | `string` | Stable vendor id. |
| `logo_url` | `any` |  |
| `name` | `string` |  |
| `product_categories` | `[]any` |  |
| `profile_url` | `string` | Absolute URL. |
| `rating` | `map[string]any` |  |
| `region` | `any` |  |
| `reviews` | `map[string]any` |  |
| `shipping` | `map[string]any` |  |
| `slug` | `string` |  |
| `sources` | `map[string]any` |  |
| `website_url` | `string` | Peptide Library link to the vendor's site (may be an affiliate link). |

#### Example: Load

```go
vendor, err := client.Vendor(nil).Load(map[string]any{"id": "vendor_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(vendor.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
vendors, err := client.Vendor(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range vendors.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Open types

2 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `research_statistic` | `filters` | 4 | 1 level |
| `research_statistic` | `rows` | 4 | 2 levels |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/peptide-library-sdk/go/
├── peptide-library.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/peptide-library-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
vendor := client.Vendor(nil)
vendor.List(nil, nil)

// vendor.Data() now returns the vendor data from the last list
// vendor.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
