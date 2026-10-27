# PeptideLibrary Lua SDK Reference

Complete API reference for the PeptideLibrary Lua SDK.


## PeptideLibrarySDK

### Constructor

```lua
local sdk = require("peptide-library_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `GetApiIndex(data)`

Create a new `GetApiIndex` entity instance. Pass `nil` for no initial data.

#### `Meta(data)`

Create a new `Meta` entity instance. Pass `nil` for no initial data.

#### `Price(data)`

Create a new `Price` entity instance. Pass `nil` for no initial data.

#### `Product(data)`

Create a new `Product` entity instance. Pass `nil` for no initial data.

#### `Research(data)`

Create a new `Research` entity instance. Pass `nil` for no initial data.

#### `ResearchStatistic(data)`

Create a new `ResearchStatistic` entity instance. Pass `nil` for no initial data.

#### `Study(data)`

Create a new `Study` entity instance. Pass `nil` for no initial data.

#### `Vendor(data)`

Create a new `Vendor` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## GetApiIndexEntity

```lua
local get_api_index = client:GetApiIndex(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | `string` | Yes | Absolute URL. |
| `endpoints` | `table` | Yes |  |
| `name` | `string` | Yes |  |
| `openapi` | `string` | Yes | Absolute URL. |
| `release` | `string` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:GetApiIndex():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetApiIndexEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MetaEntity

```lua
local meta = client:Meta(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `database` | `string` | Yes |  |
| `release` | `string` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Meta():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MetaEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PriceEntity

```lua
local price = client:Price(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability` | `string` | Yes |  |
| `currency` | `string` | Yes |  |
| `first_seen_at` | `any` | Yes |  |
| `form` | `string` | Yes |  |
| `id` | `string` | Yes | Offer id. |
| `is_affiliate_link` | `boolean` | Yes |  |
| `is_stale` | `boolean` | Yes | True when not seen in the last 7 days. |
| `last_seen_at` | `any` | Yes | When the price was last seen on the vendor's site. |
| `peptide` | `table` | Yes |  |
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
| `strength` | `table` | Yes |  |
| `vendor` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Price():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Price():load({ peptide = "peptide" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PriceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProductEntity

```lua
local product = client:Product(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_url` | `string` | Yes | Absolute URL. |
| `form` | `string` | Yes |  |
| `id` | `string` | Yes | Compound and form, e.g. |
| `in_stock_count` | `number` | Yes |  |
| `last_seen_at` | `any` | Yes |  |
| `offer_count` | `number` | Yes |  |
| `offers` | `any` | Yes | With the `pricing:read` scope; otherwise null. |
| `peptide` | `table` | Yes |  |
| `prices` | `table` | Yes | Per currency, never converted or mixed. |
| `product_type` | `string` | Yes |  |
| `vendor_count` | `number` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Product():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Product():load({ id = "product_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ResearchEntity

```lua
local research = client:Research(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `also_known_as` | `table` | Yes |  |
| `api_url` | `string` | Yes | Absolute URL. |
| `approved_medicine` | `boolean` | Yes | True only when the recorded FDA status is Approved. |
| `availability` | `any` | Yes |  |
| `categories` | `table` | Yes |  |
| `classification` | `table` | Yes |  |
| `clinical_evidence` | `table` | Yes |  |
| `conflict` | `any` | Yes |  |
| `content` | `table` | Yes |  |
| `content_reviewed_at` | `any` | Yes |  |
| `content_total` | `number` | Yes |  |
| `description` | `string` | Yes |  |
| `development_stage` | `any` | Yes |  |
| `evidence` | `table` | Yes |  |
| `fda_status` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `label` | `string` | Yes |  |
| `last_reviewed` | `any` | Yes |  |
| `library_classification` | `any` | Yes |  |
| `limitations` | `table` | Yes |  |
| `links` | `table` | Yes |  |
| `mechanism` | `table` | Yes |  |
| `mechanisms` | `table` | Yes |  |
| `name` | `string` | Yes |  |
| `note` | `string` | Yes |  |
| `notes` | `table` | Yes |  |
| `peptide` | `table` | Yes |  |
| `peptide_count` | `number` | Yes |  |
| `peptide_total` | `number` | Yes |  |
| `peptides` | `table` | Yes |  |
| `preclinical_evidence` | `table` | Yes |  |
| `properties` | `table` | Yes |  |
| `query` | `string` | Yes |  |
| `references` | `table` | Yes |  |
| `regulatory` | `table` | Yes |  |
| `regulatory_evidence` | `table` | Yes |  |
| `regulatory_status` | `string` | Yes | Regulatory class read from the profile's FDA status. |
| `regulatory_status_label` | `string` | Yes |  |
| `research_areas` | `table` | Yes |  |
| `research_gaps` | `table` | Yes | Evidence steps with no documented source in the profile. |
| `research_topics` | `table` | Yes |  |
| `review` | `table` | Yes |  |
| `safety` | `table` | Yes |  |
| `secondary_reports` | `table` | Yes |  |
| `statement` | `any` | Yes |  |
| `summary` | `any` | Yes |  |
| `unavailable_sources` | `table` | Yes |  |
| `url` | `string` | Yes | Absolute URL. |
| `wada_status` | `any` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Research():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Research():load({ slug = "slug" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResearchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ResearchStatisticEntity

```lua
local research_statistic = client:ResearchStatistic(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `by_year` | `table` | Yes |  |
| `categories` | `table` | Yes |  |
| `chart_url` | `any` | Yes |  |
| `citation` | `string` | Yes |  |
| `columns` | `table` | Yes |  |
| `definition` | `string` | Yes |  |
| `denominator` | `number|nil` | Yes |  |
| `denominator_definition` | `string|nil` | Yes |  |
| `description` | `string` | Yes |  |
| `detail` | `any` | Yes | Rankings (array of rows) or comparison detail (object); null when none. |
| `doi` | `string|nil` | Yes |  |
| `doi_url` | `any` | Yes |  |
| `embed_url` | `string` | Yes | Absolute URL. |
| `evidence_class` | `string` | Yes |  |
| `filters` | `table` | Yes |  |
| `first_pub_date` | `string` | Yes |  |
| `flags` | `table` | Yes | Caveats: partial_year, small_baseline, high_unclassified, whole_months_only, no_denominator. |
| `groups` | `table` | Yes |  |
| `how_to_read` | `string` | Yes |  |
| `id` | `string` | Yes | `pmid-` + the PubMed id. |
| `is_peptide` | `boolean` | Yes |  |
| `journal` | `string|nil` | Yes |  |
| `key_publications` | `table` | Yes |  |
| `kind` | `string` | Yes |  |
| `label` | `string` | Yes |  |
| `license` | `table` | Yes |  |
| `limitations` | `table` | Yes |  |
| `mesh_roots` | `table` | Yes |  |
| `methodology_url` | `string` | Yes | Absolute URL. |
| `metric` | `string` | Yes |  |
| `min_baseline` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `numerator` | `number|nil` | Yes |  |
| `numerator_definition` | `string|nil` | Yes |  |
| `open_access` | `boolean|nil` | Yes |  |
| `origin` | `string|nil` | Yes |  |
| `partial_year` | `number` | Yes | The cutoff year, which is incomplete. |
| `peptide` | `table` | Yes |  |
| `peptide_ids` | `table` | Yes |  |
| `permalink` | `string` | Yes | Absolute URL. |
| `pmid` | `string` | Yes |  |
| `png_url` | `string` | Yes | Absolute URL. |
| `publications` | `any` | Yes |  |
| `published_at` | `string` | Yes |  |
| `pubmed_url` | `string` | Yes | Absolute URL. |
| `query` | `string|nil` | Yes | The exact Europe PMC query behind the counts. |
| `regulatory` | `string|nil` | Yes |  |
| `research_url` | `string` | Yes | Absolute URL. |
| `rows` | `table` | Yes |  |
| `section` | `number` | Yes | State of Peptide Research section that uses it. |
| `slug` | `string` | Yes |  |
| `snapshot` | `table` | Yes |  |
| `source` | `string` | Yes |  |
| `study_type` | `string` | Yes |  |
| `study_types` | `table` | Yes |  |
| `subtitle` | `string` | Yes |  |
| `svg_url` | `string` | Yes | Absolute URL. |
| `tier` | `string` | Yes | `counts_only`: yearly counts only (a very large, general literature); `excluded`: a blend or comparison entry. |
| `tier_reason` | `string|nil` | Yes |  |
| `title` | `string` | Yes |  |
| `totals` | `any` | Yes |  |
| `trials` | `any` | Yes |  |
| `unit` | `string` | Yes |  |
| `url` | `string` | Yes | Absolute URL. |
| `value` | `number|nil` | Yes |  |
| `version` | `number` | Yes |  |
| `versions` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:ResearchStatistic():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ResearchStatistic():load({ id = "research_statistic_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResearchStatisticEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StudyEntity

```lua
local study = client:Study(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analog_compound` | `boolean` | Yes | Research on a related compound, not this one. |
| `authors` | `string` | Yes | Not stored by Peptide Library. |
| `citations` | `table` | Yes |  |
| `cited_by` | `table` | Yes |  |
| `doi` | `string|nil` | Yes |  |
| `evidence_classification` | `string` | Yes |  |
| `evidence_classification_label` | `string` | Yes |  |
| `id` | `string` | Yes | Stable id from the study's identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none. |
| `journal` | `string` | Yes | Not stored by Peptide Library. |
| `limitations` | `table` | Yes |  |
| `nct_id` | `string|nil` | Yes |  |
| `pmid` | `string|nil` | Yes |  |
| `population` | `any` | Yes |  |
| `publication_year` | `any` | Yes |  |
| `research_model` | `string` | Yes |  |
| `sample_size` | `any` | Yes |  |
| `source_url` | `any` | Yes |  |
| `study_type` | `any` | Yes |  |
| `summary` | `any` | Yes | The finding as summarised by Peptide Library editors (dose figures removed). |
| `title` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Study():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Study():load({ id = "study_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StudyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VendorEntity

```lua
local vendor = client:Vendor(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `about` | `table` | Yes |  |
| `api_url` | `string` | Yes | Absolute URL. |
| `catalog` | `table` | Yes |  |
| `country` | `any` | Yes |  |
| `description` | `string|nil` | Yes |  |
| `id` | `string` | Yes | Stable vendor id. |
| `logo_url` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `product_categories` | `table` | Yes |  |
| `profile_url` | `string` | Yes | Absolute URL. |
| `rating` | `table` | Yes |  |
| `region` | `string|nil` | Yes |  |
| `reviews` | `table` | Yes |  |
| `shipping` | `table` | Yes |  |
| `slug` | `string` | Yes |  |
| `sources` | `table` | Yes |  |
| `website_url` | `string` | Yes | Peptide Library link to the vendor's site (may be an affiliate link). |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Vendor():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Vendor():load({ id = "vendor_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VendorEntity` instance with the same client and
options.

#### `get_name() -> string`

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

```lua
local client = sdk.new({
  feature = {
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
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

