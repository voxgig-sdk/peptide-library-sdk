# PeptideLibrary Golang SDK Reference

Complete API reference for the PeptideLibrary Golang SDK.


## PeptideLibrarySDK

### Constructor

```go
func NewPeptideLibrarySDK(options map[string]any) *PeptideLibrarySDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *PeptideLibrarySDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *PeptideLibrarySDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `GetApiIndex(data map[string]any) PeptideLibraryEntity`

Create a new `GetApiIndex` entity instance. Pass `nil` for no initial data.

#### `Meta(data map[string]any) PeptideLibraryEntity`

Create a new `Meta` entity instance. Pass `nil` for no initial data.

#### `Price(data map[string]any) PeptideLibraryEntity`

Create a new `Price` entity instance. Pass `nil` for no initial data.

#### `Product(data map[string]any) PeptideLibraryEntity`

Create a new `Product` entity instance. Pass `nil` for no initial data.

#### `Research(data map[string]any) PeptideLibraryEntity`

Create a new `Research` entity instance. Pass `nil` for no initial data.

#### `ResearchStatistic(data map[string]any) PeptideLibraryEntity`

Create a new `ResearchStatistic` entity instance. Pass `nil` for no initial data.

#### `Study(data map[string]any) PeptideLibraryEntity`

Create a new `Study` entity instance. Pass `nil` for no initial data.

#### `Vendor(data map[string]any) PeptideLibraryEntity`

Create a new `Vendor` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## GetApiIndexEntity

```go
getApiIndex := client.GetApiIndex(nil)
fmt.Println(getApiIndex.GetName()) // "get_api_index"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | `string` | Yes | Absolute URL. |
| `endpoints` | `[]any` | Yes |  |
| `name` | `string` | Yes |  |
| `openapi` | `string` | Yes | Absolute URL. |
| `release` | `string` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.GetApiIndex(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GetApiIndexEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MetaEntity

```go
meta := client.Meta(nil)
fmt.Println(meta.GetName()) // "meta"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `database` | `string` | Yes |  |
| `release` | `string` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Meta(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MetaEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PriceEntity

```go
price := client.Price(nil)
fmt.Println(price.GetName()) // "price"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability` | `string` | Yes |  |
| `currency` | `string` | Yes |  |
| `first_seen_at` | `any` | Yes |  |
| `form` | `string` | Yes |  |
| `id` | `string` | Yes | Offer id. |
| `is_affiliate_link` | `bool` | Yes |  |
| `is_stale` | `bool` | Yes | True when not seen in the last 7 days. |
| `last_seen_at` | `any` | Yes | When the price was last seen on the vendor's site. |
| `peptide` | `map[string]any` | Yes |  |
| `price` | `string` | Yes | Decimal amount as a string, never a float. |
| `price_changed_at` | `any` | Yes |  |
| `price_per_mg` | `any` | Yes |  |
| `price_per_unit` | `any` | Yes |  |
| `product_id` | `string` | Yes |  |
| `product_name` | `string` | Yes | As the vendor lists it. |
| `product_page_url` | `string` | Yes | Peptide Library redirect to the vendor's page; logs the click. |
| `product_type` | `string` | Yes |  |
| `regular_price` | `any` | Yes |  |
| `ships_to` | `any` | Yes | Shipping to the `ships_to` destination you asked about; null when you didn't ask. |
| `strength` | `map[string]any` | Yes |  |
| `vendor` | `map[string]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Price(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Price(nil).Load(map[string]any{"peptide": "peptide"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PriceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProductEntity

```go
product := client.Product(nil)
fmt.Println(product.GetName()) // "product"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_url` | `string` | Yes | Absolute URL. |
| `form` | `string` | Yes |  |
| `id` | `string` | Yes | Compound and form, e.g. |
| `in_stock_count` | `int` | Yes |  |
| `last_seen_at` | `any` | Yes |  |
| `offer_count` | `int` | Yes |  |
| `offers` | `any` | Yes | With the `pricing:read` scope; otherwise null. |
| `peptide` | `map[string]any` | Yes |  |
| `prices` | `[]any` | Yes | Per currency, never converted or mixed. |
| `product_type` | `string` | Yes |  |
| `vendor_count` | `int` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Product(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Product(nil).Load(map[string]any{"id": "product_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProductEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ResearchEntity

```go
research := client.Research(nil)
fmt.Println(research.GetName()) // "research"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `also_known_as` | `[]any` | Yes |  |
| `api_url` | `string` | Yes | Absolute URL. |
| `approved_medicine` | `bool` | Yes | True only when the recorded FDA status is Approved. |
| `availability` | `any` | Yes |  |
| `categories` | `[]any` | Yes |  |
| `classification` | `map[string]any` | Yes |  |
| `clinical_evidence` | `map[string]any` | Yes |  |
| `conflict` | `any` | Yes |  |
| `content` | `[]any` | Yes |  |
| `content_reviewed_at` | `any` | Yes |  |
| `content_total` | `int` | Yes |  |
| `description` | `string` | Yes |  |
| `development_stage` | `any` | Yes |  |
| `evidence` | `map[string]any` | Yes |  |
| `fda_status` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `label` | `string` | Yes |  |
| `last_reviewed` | `any` | Yes |  |
| `library_classification` | `any` | Yes |  |
| `limitations` | `[]any` | Yes |  |
| `links` | `map[string]any` | Yes |  |
| `mechanism` | `map[string]any` | Yes |  |
| `mechanisms` | `map[string]any` | Yes |  |
| `name` | `string` | Yes |  |
| `note` | `string` | Yes |  |
| `notes` | `[]any` | Yes |  |
| `peptide` | `map[string]any` | Yes |  |
| `peptide_count` | `int` | Yes |  |
| `peptide_total` | `int` | Yes |  |
| `peptides` | `[]any` | Yes |  |
| `preclinical_evidence` | `map[string]any` | Yes |  |
| `properties` | `map[string]any` | Yes |  |
| `query` | `string` | Yes |  |
| `references` | `[]any` | Yes |  |
| `regulatory` | `map[string]any` | Yes |  |
| `regulatory_evidence` | `[]any` | Yes |  |
| `regulatory_status` | `string` | Yes | Regulatory class read from the profile's FDA status. |
| `regulatory_status_label` | `string` | Yes |  |
| `research_areas` | `[]any` | Yes |  |
| `research_gaps` | `[]any` | Yes | Evidence steps with no documented source in the profile. |
| `research_topics` | `[]any` | Yes |  |
| `review` | `map[string]any` | Yes |  |
| `safety` | `map[string]any` | Yes |  |
| `secondary_reports` | `map[string]any` | Yes |  |
| `statement` | `any` | Yes |  |
| `summary` | `any` | Yes |  |
| `unavailable_sources` | `[]any` | Yes |  |
| `url` | `string` | Yes | Absolute URL. |
| `wada_status` | `any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Research(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Research(nil).Load(map[string]any{"slug": "slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ResearchEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ResearchStatisticEntity

```go
researchStatistic := client.ResearchStatistic(nil)
fmt.Println(researchStatistic.GetName()) // "research_statistic"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `by_year` | `[]any` | Yes |  |
| `categories` | `[]any` | Yes |  |
| `chart_url` | `any` | Yes |  |
| `citation` | `string` | Yes |  |
| `columns` | `[]any` | Yes |  |
| `definition` | `string` | Yes |  |
| `denominator` | `any` | Yes |  |
| `denominator_definition` | `any` | Yes |  |
| `description` | `string` | Yes |  |
| `detail` | `any` | Yes | Rankings (array of rows) or comparison detail (object); null when none. |
| `doi` | `any` | Yes |  |
| `doi_url` | `any` | Yes |  |
| `embed_url` | `string` | Yes | Absolute URL. |
| `evidence_class` | `string` | Yes |  |
| `filters` | `map[string]any` | Yes |  |
| `first_pub_date` | `string` | Yes |  |
| `flags` | `[]any` | Yes | Caveats: partial_year, small_baseline, high_unclassified, whole_months_only, no_denominator. |
| `groups` | `[]any` | Yes |  |
| `how_to_read` | `string` | Yes |  |
| `id` | `string` | Yes | `pmid-` + the PubMed id. |
| `is_peptide` | `bool` | Yes |  |
| `journal` | `any` | Yes |  |
| `key_publications` | `[]any` | Yes |  |
| `kind` | `string` | Yes |  |
| `label` | `string` | Yes |  |
| `license` | `map[string]any` | Yes |  |
| `limitations` | `[]any` | Yes |  |
| `mesh_roots` | `[]any` | Yes |  |
| `methodology_url` | `string` | Yes | Absolute URL. |
| `metric` | `string` | Yes |  |
| `min_baseline` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `numerator` | `any` | Yes |  |
| `numerator_definition` | `any` | Yes |  |
| `open_access` | `any` | Yes |  |
| `origin` | `any` | Yes |  |
| `partial_year` | `int` | Yes | The cutoff year, which is incomplete. |
| `peptide` | `map[string]any` | Yes |  |
| `peptide_ids` | `[]any` | Yes |  |
| `permalink` | `string` | Yes | Absolute URL. |
| `pmid` | `string` | Yes |  |
| `png_url` | `string` | Yes | Absolute URL. |
| `publications` | `any` | Yes |  |
| `published_at` | `string` | Yes |  |
| `pubmed_url` | `string` | Yes | Absolute URL. |
| `query` | `any` | Yes | The exact Europe PMC query behind the counts. |
| `regulatory` | `any` | Yes |  |
| `research_url` | `string` | Yes | Absolute URL. |
| `rows` | `[]any` | Yes |  |
| `section` | `int` | Yes | State of Peptide Research section that uses it. |
| `slug` | `string` | Yes |  |
| `snapshot` | `map[string]any` | Yes |  |
| `source` | `string` | Yes |  |
| `study_type` | `string` | Yes |  |
| `study_types` | `[]any` | Yes |  |
| `subtitle` | `string` | Yes |  |
| `svg_url` | `string` | Yes | Absolute URL. |
| `tier` | `string` | Yes | `counts_only`: yearly counts only (a very large, general literature); `excluded`: a blend or comparison entry. |
| `tier_reason` | `any` | Yes |  |
| `title` | `string` | Yes |  |
| `totals` | `any` | Yes |  |
| `trials` | `any` | Yes |  |
| `unit` | `string` | Yes |  |
| `url` | `string` | Yes | Absolute URL. |
| `value` | `any` | Yes |  |
| `version` | `int` | Yes |  |
| `versions` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.ResearchStatistic(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.ResearchStatistic(nil).Load(map[string]any{"id": "research_statistic_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ResearchStatisticEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## StudyEntity

```go
study := client.Study(nil)
fmt.Println(study.GetName()) // "study"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analog_compound` | `bool` | Yes | Research on a related compound, not this one. |
| `authors` | `string` | Yes | Not stored by Peptide Library. |
| `citations` | `[]any` | Yes |  |
| `cited_by` | `[]any` | Yes |  |
| `doi` | `any` | Yes |  |
| `evidence_classification` | `string` | Yes |  |
| `evidence_classification_label` | `string` | Yes |  |
| `id` | `string` | Yes | Stable id from the study's identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none. |
| `journal` | `string` | Yes | Not stored by Peptide Library. |
| `limitations` | `[]any` | Yes |  |
| `nct_id` | `any` | Yes |  |
| `pmid` | `any` | Yes |  |
| `population` | `any` | Yes |  |
| `publication_year` | `any` | Yes |  |
| `research_model` | `string` | Yes |  |
| `sample_size` | `any` | Yes |  |
| `source_url` | `any` | Yes |  |
| `study_type` | `any` | Yes |  |
| `summary` | `any` | Yes | The finding as summarised by Peptide Library editors (dose figures removed). |
| `title` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Study(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Study(nil).Load(map[string]any{"id": "study_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StudyEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VendorEntity

```go
vendor := client.Vendor(nil)
fmt.Println(vendor.GetName()) // "vendor"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `about` | `map[string]any` | Yes |  |
| `api_url` | `string` | Yes | Absolute URL. |
| `catalog` | `map[string]any` | Yes |  |
| `country` | `any` | Yes |  |
| `description` | `any` | Yes |  |
| `id` | `string` | Yes | Stable vendor id. |
| `logo_url` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `product_categories` | `[]any` | Yes |  |
| `profile_url` | `string` | Yes | Absolute URL. |
| `rating` | `map[string]any` | Yes |  |
| `region` | `any` | Yes |  |
| `reviews` | `map[string]any` | Yes |  |
| `shipping` | `map[string]any` | Yes |  |
| `slug` | `string` | Yes |  |
| `sources` | `map[string]any` | Yes |  |
| `website_url` | `string` | Yes | Peptide Library link to the vendor's site (may be an affiliate link). |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Vendor(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Vendor(nil).Load(map[string]any{"id": "vendor_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VendorEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```go
client := sdk.NewPeptideLibrarySDK(map[string]any{
    "feature": map[string]any{
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

