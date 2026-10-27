# PeptideLibrary Ruby SDK Reference

Complete API reference for the PeptideLibrary Ruby SDK.


## PeptideLibrarySDK

### Constructor

```ruby
require_relative 'PeptideLibrary_sdk'

client = PeptideLibrarySDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PeptideLibrarySDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = PeptideLibrarySDK.test
```


### Instance Methods

#### `GetApiIndex(data = nil)`

Create a new `GetApiIndex` entity instance. Pass `nil` for no initial data.

#### `Meta(data = nil)`

Create a new `Meta` entity instance. Pass `nil` for no initial data.

#### `Price(data = nil)`

Create a new `Price` entity instance. Pass `nil` for no initial data.

#### `Product(data = nil)`

Create a new `Product` entity instance. Pass `nil` for no initial data.

#### `Research(data = nil)`

Create a new `Research` entity instance. Pass `nil` for no initial data.

#### `ResearchStatistic(data = nil)`

Create a new `ResearchStatistic` entity instance. Pass `nil` for no initial data.

#### `Study(data = nil)`

Create a new `Study` entity instance. Pass `nil` for no initial data.

#### `Vendor(data = nil)`

Create a new `Vendor` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## GetApiIndexEntity

```ruby
get_api_index = client.GetApiIndex
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | `String` | Yes | Absolute URL. |
| `endpoints` | `Array` | Yes |  |
| `name` | `String` | Yes |  |
| `openapi` | `String` | Yes | Absolute URL. |
| `release` | `String` | Yes |  |
| `version` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.GetApiIndex.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GetApiIndexEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MetaEntity

```ruby
meta = client.Meta
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `database` | `String` | Yes |  |
| `release` | `String` | Yes |  |
| `status` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Meta.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MetaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PriceEntity

```ruby
price = client.Price
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability` | `String` | Yes |  |
| `currency` | `String` | Yes |  |
| `first_seen_at` | `Object` | Yes |  |
| `form` | `String` | Yes |  |
| `id` | `String` | Yes | Offer id. |
| `is_affiliate_link` | `Boolean` | Yes |  |
| `is_stale` | `Boolean` | Yes | True when not seen in the last 7 days. |
| `last_seen_at` | `Object` | Yes | When the price was last seen on the vendor's site. |
| `peptide` | `Hash` | Yes |  |
| `price` | `String` | Yes | Decimal amount as a string, never a float. |
| `price_changed_at` | `Object` | Yes |  |
| `price_per_mg` | `Object` | Yes |  |
| `price_per_unit` | `Object` | Yes |  |
| `product_id` | `String` | Yes |  |
| `product_name` | `String` | Yes | As the vendor lists it. |
| `product_page_url` | `String` | Yes | Peptide Library redirect to the vendor's page; logs the click. |
| `product_type` | `String` | Yes |  |
| `regular_price` | `Object` | Yes |  |
| `ships_to` | `Object` | Yes | Shipping to the `ships_to` destination you asked about; null when you didn't ask. |
| `strength` | `Hash` | Yes |  |
| `vendor` | `Hash` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Price.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Price.load({ "peptide" => "peptide" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PriceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProductEntity

```ruby
product = client.Product
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_url` | `String` | Yes | Absolute URL. |
| `form` | `String` | Yes |  |
| `id` | `String` | Yes | Compound and form, e.g. |
| `in_stock_count` | `Integer` | Yes |  |
| `last_seen_at` | `Object` | Yes |  |
| `offer_count` | `Integer` | Yes |  |
| `offers` | `Object` | Yes | With the `pricing:read` scope; otherwise null. |
| `peptide` | `Hash` | Yes |  |
| `prices` | `Array` | Yes | Per currency, never converted or mixed. |
| `product_type` | `String` | Yes |  |
| `vendor_count` | `Integer` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Product.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Product.load({ "id" => "product_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProductEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ResearchEntity

```ruby
research = client.Research
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `also_known_as` | `Array` | Yes |  |
| `api_url` | `String` | Yes | Absolute URL. |
| `approved_medicine` | `Boolean` | Yes | True only when the recorded FDA status is Approved. |
| `availability` | `Object` | Yes |  |
| `categories` | `Array` | Yes |  |
| `classification` | `Hash` | Yes |  |
| `clinical_evidence` | `Hash` | Yes |  |
| `conflict` | `Object` | Yes |  |
| `content` | `Array` | Yes |  |
| `content_reviewed_at` | `Object` | Yes |  |
| `content_total` | `Integer` | Yes |  |
| `description` | `String` | Yes |  |
| `development_stage` | `Object` | Yes |  |
| `evidence` | `Hash` | Yes |  |
| `fda_status` | `Object` | Yes |  |
| `id` | `String` | Yes |  |
| `label` | `String` | Yes |  |
| `last_reviewed` | `Object` | Yes |  |
| `library_classification` | `Object` | Yes |  |
| `limitations` | `Array` | Yes |  |
| `links` | `Hash` | Yes |  |
| `mechanism` | `Hash` | Yes |  |
| `mechanisms` | `Hash` | Yes |  |
| `name` | `String` | Yes |  |
| `note` | `String` | Yes |  |
| `notes` | `Array` | Yes |  |
| `peptide` | `Hash` | Yes |  |
| `peptide_count` | `Integer` | Yes |  |
| `peptide_total` | `Integer` | Yes |  |
| `peptides` | `Array` | Yes |  |
| `preclinical_evidence` | `Hash` | Yes |  |
| `properties` | `Hash` | Yes |  |
| `query` | `String` | Yes |  |
| `references` | `Array` | Yes |  |
| `regulatory` | `Hash` | Yes |  |
| `regulatory_evidence` | `Array` | Yes |  |
| `regulatory_status` | `String` | Yes | Regulatory class read from the profile's FDA status. |
| `regulatory_status_label` | `String` | Yes |  |
| `research_areas` | `Array` | Yes |  |
| `research_gaps` | `Array` | Yes | Evidence steps with no documented source in the profile. |
| `research_topics` | `Array` | Yes |  |
| `review` | `Hash` | Yes |  |
| `safety` | `Hash` | Yes |  |
| `secondary_reports` | `Hash` | Yes |  |
| `statement` | `Object` | Yes |  |
| `summary` | `Object` | Yes |  |
| `unavailable_sources` | `Array` | Yes |  |
| `url` | `String` | Yes | Absolute URL. |
| `wada_status` | `Object` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Research.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Research.load({ "slug" => "slug" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ResearchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ResearchStatisticEntity

```ruby
research_statistic = client.ResearchStatistic
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `by_year` | `Array` | Yes |  |
| `categories` | `Array` | Yes |  |
| `chart_url` | `Object` | Yes |  |
| `citation` | `String` | Yes |  |
| `columns` | `Array` | Yes |  |
| `definition` | `String` | Yes |  |
| `denominator` | `Object` | Yes |  |
| `denominator_definition` | `Object` | Yes |  |
| `description` | `String` | Yes |  |
| `detail` | `Object` | Yes | Rankings (array of rows) or comparison detail (object); null when none. |
| `doi` | `Object` | Yes |  |
| `doi_url` | `Object` | Yes |  |
| `embed_url` | `String` | Yes | Absolute URL. |
| `evidence_class` | `String` | Yes |  |
| `filters` | `Hash` | Yes |  |
| `first_pub_date` | `String` | Yes |  |
| `flags` | `Array` | Yes | Caveats: partial_year, small_baseline, high_unclassified, whole_months_only, no_denominator. |
| `groups` | `Array` | Yes |  |
| `how_to_read` | `String` | Yes |  |
| `id` | `String` | Yes | `pmid-` + the PubMed id. |
| `is_peptide` | `Boolean` | Yes |  |
| `journal` | `Object` | Yes |  |
| `key_publications` | `Array` | Yes |  |
| `kind` | `String` | Yes |  |
| `label` | `String` | Yes |  |
| `license` | `Hash` | Yes |  |
| `limitations` | `Array` | Yes |  |
| `mesh_roots` | `Array` | Yes |  |
| `methodology_url` | `String` | Yes | Absolute URL. |
| `metric` | `String` | Yes |  |
| `min_baseline` | `Object` | Yes |  |
| `name` | `String` | Yes |  |
| `numerator` | `Object` | Yes |  |
| `numerator_definition` | `Object` | Yes |  |
| `open_access` | `Object` | Yes |  |
| `origin` | `Object` | Yes |  |
| `partial_year` | `Integer` | Yes | The cutoff year, which is incomplete. |
| `peptide` | `Hash` | Yes |  |
| `peptide_ids` | `Array` | Yes |  |
| `permalink` | `String` | Yes | Absolute URL. |
| `pmid` | `String` | Yes |  |
| `png_url` | `String` | Yes | Absolute URL. |
| `publications` | `Object` | Yes |  |
| `published_at` | `String` | Yes |  |
| `pubmed_url` | `String` | Yes | Absolute URL. |
| `query` | `Object` | Yes | The exact Europe PMC query behind the counts. |
| `regulatory` | `Object` | Yes |  |
| `research_url` | `String` | Yes | Absolute URL. |
| `rows` | `Array` | Yes |  |
| `section` | `Integer` | Yes | State of Peptide Research section that uses it. |
| `slug` | `String` | Yes |  |
| `snapshot` | `Hash` | Yes |  |
| `source` | `String` | Yes |  |
| `study_type` | `String` | Yes |  |
| `study_types` | `Array` | Yes |  |
| `subtitle` | `String` | Yes |  |
| `svg_url` | `String` | Yes | Absolute URL. |
| `tier` | `String` | Yes | `counts_only`: yearly counts only (a very large, general literature); `excluded`: a blend or comparison entry. |
| `tier_reason` | `Object` | Yes |  |
| `title` | `String` | Yes |  |
| `totals` | `Object` | Yes |  |
| `trials` | `Object` | Yes |  |
| `unit` | `String` | Yes |  |
| `url` | `String` | Yes | Absolute URL. |
| `value` | `Object` | Yes |  |
| `version` | `Integer` | Yes |  |
| `versions` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.ResearchStatistic.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ResearchStatistic.load({ "id" => "research_statistic_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ResearchStatisticEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StudyEntity

```ruby
study = client.Study
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analog_compound` | `Boolean` | Yes | Research on a related compound, not this one. |
| `authors` | `String` | Yes | Not stored by Peptide Library. |
| `citations` | `Array` | Yes |  |
| `cited_by` | `Array` | Yes |  |
| `doi` | `Object` | Yes |  |
| `evidence_classification` | `String` | Yes |  |
| `evidence_classification_label` | `String` | Yes |  |
| `id` | `String` | Yes | Stable id from the study's identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none. |
| `journal` | `String` | Yes | Not stored by Peptide Library. |
| `limitations` | `Array` | Yes |  |
| `nct_id` | `Object` | Yes |  |
| `pmid` | `Object` | Yes |  |
| `population` | `Object` | Yes |  |
| `publication_year` | `Object` | Yes |  |
| `research_model` | `String` | Yes |  |
| `sample_size` | `Object` | Yes |  |
| `source_url` | `Object` | Yes |  |
| `study_type` | `Object` | Yes |  |
| `summary` | `Object` | Yes | The finding as summarised by Peptide Library editors (dose figures removed). |
| `title` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Study.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Study.load({ "id" => "study_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StudyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VendorEntity

```ruby
vendor = client.Vendor
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `about` | `Hash` | Yes |  |
| `api_url` | `String` | Yes | Absolute URL. |
| `catalog` | `Hash` | Yes |  |
| `country` | `Object` | Yes |  |
| `description` | `Object` | Yes |  |
| `id` | `String` | Yes | Stable vendor id. |
| `logo_url` | `Object` | Yes |  |
| `name` | `String` | Yes |  |
| `product_categories` | `Array` | Yes |  |
| `profile_url` | `String` | Yes | Absolute URL. |
| `rating` | `Hash` | Yes |  |
| `region` | `Object` | Yes |  |
| `reviews` | `Hash` | Yes |  |
| `shipping` | `Hash` | Yes |  |
| `slug` | `String` | Yes |  |
| `sources` | `Hash` | Yes |  |
| `website_url` | `String` | Yes | Peptide Library link to the vendor's site (may be an affiliate link). |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Vendor.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Vendor.load({ "id" => "vendor_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VendorEntity` instance with the same client and
options.

#### `get_name -> String`

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

```ruby
client = PeptideLibrarySDK.new({
  "feature" => {
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
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

