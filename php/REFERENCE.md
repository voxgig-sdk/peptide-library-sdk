# PeptideLibrary PHP SDK Reference

Complete API reference for the PeptideLibrary PHP SDK.


## PeptideLibrarySDK

### Constructor

```php
require_once __DIR__ . '/peptidelibrary_sdk.php';

$client = new PeptideLibrarySDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PeptideLibrarySDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = PeptideLibrarySDK::test();
```


### Instance Methods

#### `GetApiIndex($data = null)`

Create a new `GetApiIndexEntity` instance. Pass `null` for no initial data.

#### `Meta($data = null)`

Create a new `MetaEntity` instance. Pass `null` for no initial data.

#### `Price($data = null)`

Create a new `PriceEntity` instance. Pass `null` for no initial data.

#### `Product($data = null)`

Create a new `ProductEntity` instance. Pass `null` for no initial data.

#### `Research($data = null)`

Create a new `ResearchEntity` instance. Pass `null` for no initial data.

#### `ResearchStatistic($data = null)`

Create a new `ResearchStatisticEntity` instance. Pass `null` for no initial data.

#### `Study($data = null)`

Create a new `StudyEntity` instance. Pass `null` for no initial data.

#### `Vendor($data = null)`

Create a new `VendorEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): PeptideLibraryUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## GetApiIndexEntity

```php
$get_api_index = $client->GetApiIndex();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | `string` | Yes | Absolute URL. |
| `endpoints` | `array` | Yes |  |
| `name` | `string` | Yes |  |
| `openapi` | `string` | Yes | Absolute URL. |
| `release` | `string` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->GetApiIndex()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GetApiIndexEntity`

Create a new `GetApiIndexEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MetaEntity

```php
$meta = $client->Meta();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `database` | `string` | Yes |  |
| `release` | `string` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Meta()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MetaEntity`

Create a new `MetaEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PriceEntity

```php
$price = $client->Price();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability` | `string` | Yes |  |
| `currency` | `string` | Yes |  |
| `first_seen_at` | `mixed` | Yes |  |
| `form` | `string` | Yes |  |
| `id` | `string` | Yes | Offer id. |
| `is_affiliate_link` | `bool` | Yes |  |
| `is_stale` | `bool` | Yes | True when not seen in the last 7 days. |
| `last_seen_at` | `mixed` | Yes | When the price was last seen on the vendor's site. |
| `peptide` | `array` | Yes |  |
| `price` | `string` | Yes | Decimal amount as a string, never a float. |
| `price_changed_at` | `mixed` | Yes |  |
| `price_per_mg` | `mixed` | Yes |  |
| `price_per_unit` | `mixed` | Yes |  |
| `product_id` | `string` | Yes |  |
| `product_name` | `string` | Yes | As the vendor lists it. |
| `product_page_url` | `string` | Yes | Peptide Library redirect to the vendor's page; logs the click. |
| `product_type` | `string` | Yes |  |
| `regular_price` | `mixed` | Yes |  |
| `ships_to` | `mixed` | Yes | Shipping to the `ships_to` destination you asked about; null when you didn't ask. |
| `strength` | `array` | Yes |  |
| `vendor` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Price()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Price()->load(["peptide" => "peptide"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PriceEntity`

Create a new `PriceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProductEntity

```php
$product = $client->Product();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_url` | `string` | Yes | Absolute URL. |
| `form` | `string` | Yes |  |
| `id` | `string` | Yes | Compound and form, e.g. |
| `in_stock_count` | `int` | Yes |  |
| `last_seen_at` | `mixed` | Yes |  |
| `offer_count` | `int` | Yes |  |
| `offers` | `mixed` | Yes | With the `pricing:read` scope; otherwise null. |
| `peptide` | `array` | Yes |  |
| `prices` | `array` | Yes | Per currency, never converted or mixed. |
| `product_type` | `string` | Yes |  |
| `vendor_count` | `int` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Product()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Product()->load(["id" => "product_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProductEntity`

Create a new `ProductEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ResearchEntity

```php
$research = $client->Research();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `also_known_as` | `array` | Yes |  |
| `api_url` | `string` | Yes | Absolute URL. |
| `approved_medicine` | `bool` | Yes | True only when the recorded FDA status is Approved. |
| `availability` | `mixed` | Yes |  |
| `categories` | `array` | Yes |  |
| `classification` | `array` | Yes |  |
| `clinical_evidence` | `array` | Yes |  |
| `conflict` | `mixed` | Yes |  |
| `content` | `array` | Yes |  |
| `content_reviewed_at` | `mixed` | Yes |  |
| `content_total` | `int` | Yes |  |
| `description` | `string` | Yes |  |
| `development_stage` | `mixed` | Yes |  |
| `evidence` | `array` | Yes |  |
| `fda_status` | `mixed` | Yes |  |
| `id` | `string` | Yes |  |
| `label` | `string` | Yes |  |
| `last_reviewed` | `mixed` | Yes |  |
| `library_classification` | `mixed` | Yes |  |
| `limitations` | `array` | Yes |  |
| `links` | `array` | Yes |  |
| `mechanism` | `array` | Yes |  |
| `mechanisms` | `array` | Yes |  |
| `name` | `string` | Yes |  |
| `note` | `string` | Yes |  |
| `notes` | `array` | Yes |  |
| `peptide` | `array` | Yes |  |
| `peptide_count` | `int` | Yes |  |
| `peptide_total` | `int` | Yes |  |
| `peptides` | `array` | Yes |  |
| `preclinical_evidence` | `array` | Yes |  |
| `properties` | `array` | Yes |  |
| `query` | `string` | Yes |  |
| `references` | `array` | Yes |  |
| `regulatory` | `array` | Yes |  |
| `regulatory_evidence` | `array` | Yes |  |
| `regulatory_status` | `string` | Yes | Regulatory class read from the profile's FDA status. |
| `regulatory_status_label` | `string` | Yes |  |
| `research_areas` | `array` | Yes |  |
| `research_gaps` | `array` | Yes | Evidence steps with no documented source in the profile. |
| `research_topics` | `array` | Yes |  |
| `review` | `array` | Yes |  |
| `safety` | `array` | Yes |  |
| `secondary_reports` | `array` | Yes |  |
| `statement` | `mixed` | Yes |  |
| `summary` | `mixed` | Yes |  |
| `unavailable_sources` | `array` | Yes |  |
| `url` | `string` | Yes | Absolute URL. |
| `wada_status` | `mixed` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Research()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Research()->load(["slug" => "slug"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ResearchEntity`

Create a new `ResearchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ResearchStatisticEntity

```php
$research_statistic = $client->ResearchStatistic();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `by_year` | `array` | Yes |  |
| `categories` | `array` | Yes |  |
| `chart_url` | `mixed` | Yes |  |
| `citation` | `string` | Yes |  |
| `columns` | `array` | Yes |  |
| `definition` | `string` | Yes |  |
| `denominator` | `mixed` | Yes |  |
| `denominator_definition` | `mixed` | Yes |  |
| `description` | `string` | Yes |  |
| `detail` | `mixed` | Yes | Rankings (array of rows) or comparison detail (object); null when none. |
| `doi` | `mixed` | Yes |  |
| `doi_url` | `mixed` | Yes |  |
| `embed_url` | `string` | Yes | Absolute URL. |
| `evidence_class` | `string` | Yes |  |
| `filters` | `array` | Yes |  |
| `first_pub_date` | `string` | Yes |  |
| `flags` | `array` | Yes | Caveats: partial_year, small_baseline, high_unclassified, whole_months_only, no_denominator. |
| `groups` | `array` | Yes |  |
| `how_to_read` | `string` | Yes |  |
| `id` | `string` | Yes | `pmid-` + the PubMed id. |
| `is_peptide` | `bool` | Yes |  |
| `journal` | `mixed` | Yes |  |
| `key_publications` | `array` | Yes |  |
| `kind` | `string` | Yes |  |
| `label` | `string` | Yes |  |
| `license` | `array` | Yes |  |
| `limitations` | `array` | Yes |  |
| `mesh_roots` | `array` | Yes |  |
| `methodology_url` | `string` | Yes | Absolute URL. |
| `metric` | `string` | Yes |  |
| `min_baseline` | `mixed` | Yes |  |
| `name` | `string` | Yes |  |
| `numerator` | `mixed` | Yes |  |
| `numerator_definition` | `mixed` | Yes |  |
| `open_access` | `mixed` | Yes |  |
| `origin` | `mixed` | Yes |  |
| `partial_year` | `int` | Yes | The cutoff year, which is incomplete. |
| `peptide` | `array` | Yes |  |
| `peptide_ids` | `array` | Yes |  |
| `permalink` | `string` | Yes | Absolute URL. |
| `pmid` | `string` | Yes |  |
| `png_url` | `string` | Yes | Absolute URL. |
| `publications` | `mixed` | Yes |  |
| `published_at` | `string` | Yes |  |
| `pubmed_url` | `string` | Yes | Absolute URL. |
| `query` | `mixed` | Yes | The exact Europe PMC query behind the counts. |
| `regulatory` | `mixed` | Yes |  |
| `research_url` | `string` | Yes | Absolute URL. |
| `rows` | `array` | Yes |  |
| `section` | `int` | Yes | State of Peptide Research section that uses it. |
| `slug` | `string` | Yes |  |
| `snapshot` | `array` | Yes |  |
| `source` | `string` | Yes |  |
| `study_type` | `string` | Yes |  |
| `study_types` | `array` | Yes |  |
| `subtitle` | `string` | Yes |  |
| `svg_url` | `string` | Yes | Absolute URL. |
| `tier` | `string` | Yes | `counts_only`: yearly counts only (a very large, general literature); `excluded`: a blend or comparison entry. |
| `tier_reason` | `mixed` | Yes |  |
| `title` | `string` | Yes |  |
| `totals` | `mixed` | Yes |  |
| `trials` | `mixed` | Yes |  |
| `unit` | `string` | Yes |  |
| `url` | `string` | Yes | Absolute URL. |
| `value` | `mixed` | Yes |  |
| `version` | `int` | Yes |  |
| `versions` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ResearchStatistic()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ResearchStatistic()->load(["id" => "research_statistic_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ResearchStatisticEntity`

Create a new `ResearchStatisticEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StudyEntity

```php
$study = $client->Study();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analog_compound` | `bool` | Yes | Research on a related compound, not this one. |
| `authors` | `string` | Yes | Not stored by Peptide Library. |
| `citations` | `array` | Yes |  |
| `cited_by` | `array` | Yes |  |
| `doi` | `mixed` | Yes |  |
| `evidence_classification` | `string` | Yes |  |
| `evidence_classification_label` | `string` | Yes |  |
| `id` | `string` | Yes | Stable id from the study's identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none. |
| `journal` | `string` | Yes | Not stored by Peptide Library. |
| `limitations` | `array` | Yes |  |
| `nct_id` | `mixed` | Yes |  |
| `pmid` | `mixed` | Yes |  |
| `population` | `mixed` | Yes |  |
| `publication_year` | `mixed` | Yes |  |
| `research_model` | `string` | Yes |  |
| `sample_size` | `mixed` | Yes |  |
| `source_url` | `mixed` | Yes |  |
| `study_type` | `mixed` | Yes |  |
| `summary` | `mixed` | Yes | The finding as summarised by Peptide Library editors (dose figures removed). |
| `title` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Study()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Study()->load(["id" => "study_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StudyEntity`

Create a new `StudyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VendorEntity

```php
$vendor = $client->Vendor();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `about` | `array` | Yes |  |
| `api_url` | `string` | Yes | Absolute URL. |
| `catalog` | `array` | Yes |  |
| `country` | `mixed` | Yes |  |
| `description` | `mixed` | Yes |  |
| `id` | `string` | Yes | Stable vendor id. |
| `logo_url` | `mixed` | Yes |  |
| `name` | `string` | Yes |  |
| `product_categories` | `array` | Yes |  |
| `profile_url` | `string` | Yes | Absolute URL. |
| `rating` | `array` | Yes |  |
| `region` | `mixed` | Yes |  |
| `reviews` | `array` | Yes |  |
| `shipping` | `array` | Yes |  |
| `slug` | `string` | Yes |  |
| `sources` | `array` | Yes |  |
| `website_url` | `string` | Yes | Peptide Library link to the vendor's site (may be an affiliate link). |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Vendor()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Vendor()->load(["id" => "vendor_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VendorEntity`

Create a new `VendorEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new PeptideLibrarySDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

