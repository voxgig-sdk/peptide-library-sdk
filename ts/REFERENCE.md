# PeptideLibrary TypeScript SDK Reference

Complete API reference for the PeptideLibrary TypeScript SDK.


## PeptideLibrarySDK

### Constructor

```ts
new PeptideLibrarySDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PeptideLibrarySDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = PeptideLibrarySDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `PeptideLibrarySDK` instance in test mode.


### Instance Methods

#### `GetApiIndex(data?: object)`

Create a new `GetApiIndex` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GetApiIndexEntity` instance.

#### `Meta(data?: object)`

Create a new `Meta` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MetaEntity` instance.

#### `Price(data?: object)`

Create a new `Price` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PriceEntity` instance.

#### `Product(data?: object)`

Create a new `Product` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProductEntity` instance.

#### `Research(data?: object)`

Create a new `Research` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ResearchEntity` instance.

#### `ResearchStatistic(data?: object)`

Create a new `ResearchStatistic` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ResearchStatisticEntity` instance.

#### `Study(data?: object)`

Create a new `Study` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StudyEntity` instance.

#### `Vendor(data?: object)`

Create a new `Vendor` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VendorEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `PeptideLibrarySDK.test()`.

**Returns:** `PeptideLibrarySDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## GetApiIndexEntity

```ts
const get_api_index = client.GetApiIndex()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | `string` | Yes | Absolute URL. |
| `endpoints` | `any[]` | Yes |  |
| `name` | `string` | Yes |  |
| `openapi` | `string` | Yes | Absolute URL. |
| `release` | `string` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.GetApiIndex().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GetApiIndexEntity` instance with the same client and
options.

#### `client()`

Return the parent `PeptideLibrarySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MetaEntity

```ts
const meta = client.Meta()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `database` | `string` | Yes |  |
| `release` | `string` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Meta().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MetaEntity` instance with the same client and
options.

#### `client()`

Return the parent `PeptideLibrarySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PriceEntity

```ts
const price = client.Price()
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
| `peptide` | `Record<string, any>` | Yes |  |
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
| `strength` | `Record<string, any>` | Yes |  |
| `vendor` | `Record<string, any>` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `compare` | `/prices/compare` | `client.Price().load({ $action: 'compare', ... })` |

An action returns that action's OWN response, which is not necessarily a
Price record — check the API definition for its shape.

```ts
const result = await client.Price().load({
  $action: 'compare',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Price().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Price().load({ peptide: 'peptide' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PriceEntity` instance with the same client and
options.

#### `client()`

Return the parent `PeptideLibrarySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProductEntity

```ts
const product = client.Product()
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
| `peptide` | `Record<string, any>` | Yes |  |
| `prices` | `any[]` | Yes | Per currency, never converted or mixed. |
| `product_type` | `string` | Yes |  |
| `vendor_count` | `number` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Product().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Product().load({ id: 'product_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProductEntity` instance with the same client and
options.

#### `client()`

Return the parent `PeptideLibrarySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ResearchEntity

```ts
const research = client.Research()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `also_known_as` | `any[]` | Yes |  |
| `api_url` | `string` | Yes | Absolute URL. |
| `approved_medicine` | `boolean` | Yes | True only when the recorded FDA status is Approved. |
| `availability` | `any` | Yes |  |
| `categories` | `any[]` | Yes |  |
| `classification` | `Record<string, any>` | Yes |  |
| `clinical_evidence` | `Record<string, any>` | Yes |  |
| `conflict` | `any` | Yes |  |
| `content` | `any[]` | Yes |  |
| `content_reviewed_at` | `any` | Yes |  |
| `content_total` | `number` | Yes |  |
| `description` | `string` | Yes |  |
| `development_stage` | `any` | Yes |  |
| `evidence` | `Record<string, any>` | Yes |  |
| `fda_status` | `any` | Yes |  |
| `id` | `string` | Yes |  |
| `label` | `string` | Yes |  |
| `last_reviewed` | `any` | Yes |  |
| `library_classification` | `any` | Yes |  |
| `limitations` | `any[]` | Yes |  |
| `links` | `Record<string, any>` | Yes |  |
| `mechanism` | `Record<string, any>` | Yes |  |
| `mechanisms` | `Record<string, any>` | Yes |  |
| `name` | `string` | Yes |  |
| `note` | `string` | Yes |  |
| `notes` | `any[]` | Yes |  |
| `peptide` | `Record<string, any>` | Yes |  |
| `peptide_count` | `number` | Yes |  |
| `peptide_total` | `number` | Yes |  |
| `peptides` | `any[]` | Yes |  |
| `preclinical_evidence` | `Record<string, any>` | Yes |  |
| `properties` | `Record<string, any>` | Yes |  |
| `query` | `string` | Yes |  |
| `references` | `any[]` | Yes |  |
| `regulatory` | `Record<string, any>` | Yes |  |
| `regulatory_evidence` | `any[]` | Yes |  |
| `regulatory_status` | `string` | Yes | Regulatory class read from the profile's FDA status. |
| `regulatory_status_label` | `string` | Yes |  |
| `research_areas` | `any[]` | Yes |  |
| `research_gaps` | `any[]` | Yes | Evidence steps with no documented source in the profile. |
| `research_topics` | `any[]` | Yes |  |
| `review` | `Record<string, any>` | Yes |  |
| `safety` | `Record<string, any>` | Yes |  |
| `secondary_reports` | `Record<string, any>` | Yes |  |
| `statement` | `any` | Yes |  |
| `summary` | `any` | Yes |  |
| `unavailable_sources` | `any[]` | Yes |  |
| `url` | `string` | Yes | Absolute URL. |
| `wada_status` | `any` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Research().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Research().load({ slug: 'slug' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ResearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `PeptideLibrarySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ResearchStatisticEntity

```ts
const research_statistic = client.ResearchStatistic()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `by_year` | `any[]` | Yes |  |
| `categories` | `any[]` | Yes |  |
| `chart_url` | `any` | Yes |  |
| `citation` | `string` | Yes |  |
| `columns` | `any[]` | Yes |  |
| `definition` | `string` | Yes |  |
| `denominator` | `number | null` | Yes |  |
| `denominator_definition` | `string | null` | Yes |  |
| `description` | `string` | Yes |  |
| `detail` | `any` | Yes | Rankings (array of rows) or comparison detail (object); null when none. |
| `doi` | `string | null` | Yes |  |
| `doi_url` | `any` | Yes |  |
| `embed_url` | `string` | Yes | Absolute URL. |
| `evidence_class` | `string` | Yes |  |
| `filters` | `Record<string, any>` | Yes |  |
| `first_pub_date` | `string` | Yes |  |
| `flags` | `any[]` | Yes | Caveats: partial_year, small_baseline, high_unclassified, whole_months_only, no_denominator. |
| `groups` | `any[]` | Yes |  |
| `how_to_read` | `string` | Yes |  |
| `id` | `string` | Yes | `pmid-` + the PubMed id. |
| `is_peptide` | `boolean` | Yes |  |
| `journal` | `string | null` | Yes |  |
| `key_publications` | `any[]` | Yes |  |
| `kind` | `string` | Yes |  |
| `label` | `string` | Yes |  |
| `license` | `Record<string, any>` | Yes |  |
| `limitations` | `any[]` | Yes |  |
| `mesh_roots` | `any[]` | Yes |  |
| `methodology_url` | `string` | Yes | Absolute URL. |
| `metric` | `string` | Yes |  |
| `min_baseline` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `numerator` | `number | null` | Yes |  |
| `numerator_definition` | `string | null` | Yes |  |
| `open_access` | `boolean | null` | Yes |  |
| `origin` | `string | null` | Yes |  |
| `partial_year` | `number` | Yes | The cutoff year, which is incomplete. |
| `peptide` | `Record<string, any>` | Yes |  |
| `peptide_ids` | `any[]` | Yes |  |
| `permalink` | `string` | Yes | Absolute URL. |
| `pmid` | `string` | Yes |  |
| `png_url` | `string` | Yes | Absolute URL. |
| `publications` | `any` | Yes |  |
| `published_at` | `string` | Yes |  |
| `pubmed_url` | `string` | Yes | Absolute URL. |
| `query` | `string | null` | Yes | The exact Europe PMC query behind the counts. |
| `regulatory` | `string | null` | Yes |  |
| `research_url` | `string` | Yes | Absolute URL. |
| `rows` | `any[]` | Yes |  |
| `section` | `number` | Yes | State of Peptide Research section that uses it. |
| `slug` | `string` | Yes |  |
| `snapshot` | `Record<string, any>` | Yes |  |
| `source` | `string` | Yes |  |
| `study_type` | `string` | Yes |  |
| `study_types` | `any[]` | Yes |  |
| `subtitle` | `string` | Yes |  |
| `svg_url` | `string` | Yes | Absolute URL. |
| `tier` | `string` | Yes | `counts_only`: yearly counts only (a very large, general literature); `excluded`: a blend or comparison entry. |
| `tier_reason` | `string | null` | Yes |  |
| `title` | `string` | Yes |  |
| `totals` | `any` | Yes |  |
| `trials` | `any` | Yes |  |
| `unit` | `string` | Yes |  |
| `url` | `string` | Yes | Absolute URL. |
| `value` | `number | null` | Yes |  |
| `version` | `number` | Yes |  |
| `versions` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ResearchStatistic().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ResearchStatistic().load({ id: 'research_statistic_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ResearchStatisticEntity` instance with the same client and
options.

#### `client()`

Return the parent `PeptideLibrarySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StudyEntity

```ts
const study = client.Study()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analog_compound` | `boolean` | Yes | Research on a related compound, not this one. |
| `authors` | `string` | Yes | Not stored by Peptide Library. |
| `citations` | `any[]` | Yes |  |
| `cited_by` | `any[]` | Yes |  |
| `doi` | `string | null` | Yes |  |
| `evidence_classification` | `string` | Yes |  |
| `evidence_classification_label` | `string` | Yes |  |
| `id` | `string` | Yes | Stable id from the study's identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none. |
| `journal` | `string` | Yes | Not stored by Peptide Library. |
| `limitations` | `any[]` | Yes |  |
| `nct_id` | `string | null` | Yes |  |
| `pmid` | `string | null` | Yes |  |
| `population` | `any` | Yes |  |
| `publication_year` | `any` | Yes |  |
| `research_model` | `string` | Yes |  |
| `sample_size` | `any` | Yes |  |
| `source_url` | `any` | Yes |  |
| `study_type` | `any` | Yes |  |
| `summary` | `any` | Yes | The finding as summarised by Peptide Library editors (dose figures removed). |
| `title` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Study().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Study().load({ id: 'study_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StudyEntity` instance with the same client and
options.

#### `client()`

Return the parent `PeptideLibrarySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VendorEntity

```ts
const vendor = client.Vendor()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `about` | `Record<string, any>` | Yes |  |
| `api_url` | `string` | Yes | Absolute URL. |
| `catalog` | `Record<string, any>` | Yes |  |
| `country` | `any` | Yes |  |
| `description` | `string | null` | Yes |  |
| `id` | `string` | Yes | Stable vendor id. |
| `logo_url` | `any` | Yes |  |
| `name` | `string` | Yes |  |
| `product_categories` | `any[]` | Yes |  |
| `profile_url` | `string` | Yes | Absolute URL. |
| `rating` | `Record<string, any>` | Yes |  |
| `region` | `string | null` | Yes |  |
| `reviews` | `Record<string, any>` | Yes |  |
| `shipping` | `Record<string, any>` | Yes |  |
| `slug` | `string` | Yes |  |
| `sources` | `Record<string, any>` | Yes |  |
| `website_url` | `string` | Yes | Peptide Library link to the vendor's site (may be an affiliate link). |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `price` | `/vendors/{id}/prices` | `client.Vendor().list({ $action: 'price', ... })` |
| `product` | `/vendors/{id}/products` | `client.Vendor().list({ $action: 'product', ... })` |
| `compare` | `/vendors/compare` | `client.Vendor().load({ $action: 'compare', ... })` |
| `shipping` | `/vendors/{id}/shipping` | `client.Vendor().load({ $action: 'shipping', ... })` |

An action returns that action's OWN response, which is not necessarily a
Vendor record — check the API definition for its shape.

```ts
const result = await client.Vendor().list({
  $action: 'price',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Vendor().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Vendor().load({ id: 'vendor_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VendorEntity` instance with the same client and
options.

#### `client()`

Return the parent `PeptideLibrarySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ts
const client = new PeptideLibrarySDK({
  feature: {
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
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

