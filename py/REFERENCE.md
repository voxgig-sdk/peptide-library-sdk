# PeptideLibrary Python SDK Reference

Complete API reference for the PeptideLibrary Python SDK.


## PeptideLibrarySDK

### Constructor

```python
from peptidelibrary_sdk import PeptideLibrarySDK

client = PeptideLibrarySDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PeptideLibrarySDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = PeptideLibrarySDK.test()
```


### Instance Methods

#### `GetApiIndex(data=None)`

Create a new `GetApiIndexEntity` instance. Pass `None` for no initial data.

#### `Meta(data=None)`

Create a new `MetaEntity` instance. Pass `None` for no initial data.

#### `Price(data=None)`

Create a new `PriceEntity` instance. Pass `None` for no initial data.

#### `Product(data=None)`

Create a new `ProductEntity` instance. Pass `None` for no initial data.

#### `Research(data=None)`

Create a new `ResearchEntity` instance. Pass `None` for no initial data.

#### `ResearchStatistic(data=None)`

Create a new `ResearchStatisticEntity` instance. Pass `None` for no initial data.

#### `Study(data=None)`

Create a new `StudyEntity` instance. Pass `None` for no initial data.

#### `Vendor(data=None)`

Create a new `VendorEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## GetApiIndexEntity

```python
get_api_index = client.GetApiIndex()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | `str` | Yes | Absolute URL. |
| `endpoints` | `list` | Yes |  |
| `name` | `str` | Yes |  |
| `openapi` | `str` | Yes | Absolute URL. |
| `release` | `str` | Yes |  |
| `version` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> GetApiIndexEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.GetApiIndex().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetApiIndexEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MetaEntity

```python
meta = client.Meta()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `database` | `str` | Yes |  |
| `release` | `str` | Yes |  |
| `status` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> MetaEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Meta().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MetaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PriceEntity

```python
price = client.Price()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability` | `str` | Yes |  |
| `currency` | `str` | Yes |  |
| `first_seen_at` | `Any` | Yes |  |
| `form` | `str` | Yes |  |
| `id` | `str` | Yes | Offer id. |
| `is_affiliate_link` | `bool` | Yes |  |
| `is_stale` | `bool` | Yes | True when not seen in the last 7 days. |
| `last_seen_at` | `Any` | Yes | When the price was last seen on the vendor's site. |
| `peptide` | `dict` | Yes |  |
| `price` | `str` | Yes | Decimal amount as a string, never a float. |
| `price_changed_at` | `Any` | Yes |  |
| `price_per_mg` | `Any` | Yes |  |
| `price_per_unit` | `Any` | Yes |  |
| `product_id` | `str` | Yes |  |
| `product_name` | `str` | Yes | As the vendor lists it. |
| `product_page_url` | `str` | Yes | Peptide Library redirect to the vendor's page; logs the click. |
| `product_type` | `str` | Yes |  |
| `regular_price` | `Any` | Yes |  |
| `ships_to` | `Any` | Yes | Shipping to the `ships_to` destination you asked about; null when you didn't ask. |
| `strength` | `dict` | Yes |  |
| `vendor` | `dict` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PriceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Price().list()
for price in results:
    print(price.data_get())
```

#### `load(reqmatch, ctrl=None) -> PriceEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Price().load({"peptide": "peptide"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PriceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProductEntity

```python
product = client.Product()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_url` | `str` | Yes | Absolute URL. |
| `form` | `str` | Yes |  |
| `id` | `str` | Yes | Compound and form, e.g. |
| `in_stock_count` | `int` | Yes |  |
| `last_seen_at` | `Any` | Yes |  |
| `offer_count` | `int` | Yes |  |
| `offers` | `Any` | Yes | With the `pricing:read` scope; otherwise null. |
| `peptide` | `dict` | Yes |  |
| `prices` | `list` | Yes | Per currency, never converted or mixed. |
| `product_type` | `str` | Yes |  |
| `vendor_count` | `int` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ProductEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Product().list()
for product in results:
    print(product.data_get())
```

#### `load(reqmatch, ctrl=None) -> ProductEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Product().load({"id": "product_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ResearchEntity

```python
research = client.Research()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `also_known_as` | `list` | Yes |  |
| `api_url` | `str` | Yes | Absolute URL. |
| `approved_medicine` | `bool` | Yes | True only when the recorded FDA status is Approved. |
| `availability` | `Any` | Yes |  |
| `categories` | `list` | Yes |  |
| `classification` | `dict` | Yes |  |
| `clinical_evidence` | `dict` | Yes |  |
| `conflict` | `Any` | Yes |  |
| `content` | `list` | Yes |  |
| `content_reviewed_at` | `Any` | Yes |  |
| `content_total` | `int` | Yes |  |
| `description` | `str` | Yes |  |
| `development_stage` | `Any` | Yes |  |
| `evidence` | `dict` | Yes |  |
| `fda_status` | `Any` | Yes |  |
| `id` | `str` | Yes |  |
| `label` | `str` | Yes |  |
| `last_reviewed` | `Any` | Yes |  |
| `library_classification` | `Any` | Yes |  |
| `limitations` | `list` | Yes |  |
| `links` | `dict` | Yes |  |
| `mechanism` | `dict` | Yes |  |
| `mechanisms` | `dict` | Yes |  |
| `name` | `str` | Yes |  |
| `note` | `str` | Yes |  |
| `notes` | `list` | Yes |  |
| `peptide` | `dict` | Yes |  |
| `peptide_count` | `int` | Yes |  |
| `peptide_total` | `int` | Yes |  |
| `peptides` | `list` | Yes |  |
| `preclinical_evidence` | `dict` | Yes |  |
| `properties` | `dict` | Yes |  |
| `query` | `str` | Yes |  |
| `references` | `list` | Yes |  |
| `regulatory` | `dict` | Yes |  |
| `regulatory_evidence` | `list` | Yes |  |
| `regulatory_status` | `str` | Yes | Regulatory class read from the profile's FDA status. |
| `regulatory_status_label` | `str` | Yes |  |
| `research_areas` | `list` | Yes |  |
| `research_gaps` | `list` | Yes | Evidence steps with no documented source in the profile. |
| `research_topics` | `list` | Yes |  |
| `review` | `dict` | Yes |  |
| `safety` | `dict` | Yes |  |
| `secondary_reports` | `dict` | Yes |  |
| `statement` | `Any` | Yes |  |
| `summary` | `Any` | Yes |  |
| `unavailable_sources` | `list` | Yes |  |
| `url` | `str` | Yes | Absolute URL. |
| `wada_status` | `Any` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ResearchEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Research().list()
for research in results:
    print(research.data_get())
```

#### `load(reqmatch, ctrl=None) -> ResearchEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Research().load({"slug": "slug"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ResearchStatisticEntity

```python
research_statistic = client.ResearchStatistic()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `by_year` | `list` | Yes |  |
| `categories` | `list` | Yes |  |
| `chart_url` | `Any` | Yes |  |
| `citation` | `str` | Yes |  |
| `columns` | `list` | Yes |  |
| `definition` | `str` | Yes |  |
| `denominator` | `float | None` | Yes |  |
| `denominator_definition` | `str | None` | Yes |  |
| `description` | `str` | Yes |  |
| `detail` | `Any` | Yes | Rankings (array of rows) or comparison detail (object); null when none. |
| `doi` | `str | None` | Yes |  |
| `doi_url` | `Any` | Yes |  |
| `embed_url` | `str` | Yes | Absolute URL. |
| `evidence_class` | `str` | Yes |  |
| `filters` | `dict` | Yes |  |
| `first_pub_date` | `str` | Yes |  |
| `flags` | `list` | Yes | Caveats: partial_year, small_baseline, high_unclassified, whole_months_only, no_denominator. |
| `groups` | `list` | Yes |  |
| `how_to_read` | `str` | Yes |  |
| `id` | `str` | Yes | `pmid-` + the PubMed id. |
| `is_peptide` | `bool` | Yes |  |
| `journal` | `str | None` | Yes |  |
| `key_publications` | `list` | Yes |  |
| `kind` | `str` | Yes |  |
| `label` | `str` | Yes |  |
| `license` | `dict` | Yes |  |
| `limitations` | `list` | Yes |  |
| `mesh_roots` | `list` | Yes |  |
| `methodology_url` | `str` | Yes | Absolute URL. |
| `metric` | `str` | Yes |  |
| `min_baseline` | `Any` | Yes |  |
| `name` | `str` | Yes |  |
| `numerator` | `float | None` | Yes |  |
| `numerator_definition` | `str | None` | Yes |  |
| `open_access` | `bool | None` | Yes |  |
| `origin` | `str | None` | Yes |  |
| `partial_year` | `int` | Yes | The cutoff year, which is incomplete. |
| `peptide` | `dict` | Yes |  |
| `peptide_ids` | `list` | Yes |  |
| `permalink` | `str` | Yes | Absolute URL. |
| `pmid` | `str` | Yes |  |
| `png_url` | `str` | Yes | Absolute URL. |
| `publications` | `Any` | Yes |  |
| `published_at` | `str` | Yes |  |
| `pubmed_url` | `str` | Yes | Absolute URL. |
| `query` | `str | None` | Yes | The exact Europe PMC query behind the counts. |
| `regulatory` | `str | None` | Yes |  |
| `research_url` | `str` | Yes | Absolute URL. |
| `rows` | `list` | Yes |  |
| `section` | `int` | Yes | State of Peptide Research section that uses it. |
| `slug` | `str` | Yes |  |
| `snapshot` | `dict` | Yes |  |
| `source` | `str` | Yes |  |
| `study_type` | `str` | Yes |  |
| `study_types` | `list` | Yes |  |
| `subtitle` | `str` | Yes |  |
| `svg_url` | `str` | Yes | Absolute URL. |
| `tier` | `str` | Yes | `counts_only`: yearly counts only (a very large, general literature); `excluded`: a blend or comparison entry. |
| `tier_reason` | `str | None` | Yes |  |
| `title` | `str` | Yes |  |
| `totals` | `Any` | Yes |  |
| `trials` | `Any` | Yes |  |
| `unit` | `str` | Yes |  |
| `url` | `str` | Yes | Absolute URL. |
| `value` | `float | None` | Yes |  |
| `version` | `int` | Yes |  |
| `versions` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ResearchStatisticEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ResearchStatistic().list()
for research_statistic in results:
    print(research_statistic.data_get())
```

#### `load(reqmatch, ctrl=None) -> ResearchStatisticEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ResearchStatistic().load({"id": "research_statistic_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResearchStatisticEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StudyEntity

```python
study = client.Study()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analog_compound` | `bool` | Yes | Research on a related compound, not this one. |
| `authors` | `str` | Yes | Not stored by Peptide Library. |
| `citations` | `list` | Yes |  |
| `cited_by` | `list` | Yes |  |
| `doi` | `str | None` | Yes |  |
| `evidence_classification` | `str` | Yes |  |
| `evidence_classification_label` | `str` | Yes |  |
| `id` | `str` | Yes | Stable id from the study's identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none. |
| `journal` | `str` | Yes | Not stored by Peptide Library. |
| `limitations` | `list` | Yes |  |
| `nct_id` | `str | None` | Yes |  |
| `pmid` | `str | None` | Yes |  |
| `population` | `Any` | Yes |  |
| `publication_year` | `Any` | Yes |  |
| `research_model` | `str` | Yes |  |
| `sample_size` | `Any` | Yes |  |
| `source_url` | `Any` | Yes |  |
| `study_type` | `Any` | Yes |  |
| `summary` | `Any` | Yes | The finding as summarised by Peptide Library editors (dose figures removed). |
| `title` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[StudyEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Study().list()
for study in results:
    print(study.data_get())
```

#### `load(reqmatch, ctrl=None) -> StudyEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Study().load({"id": "study_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StudyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VendorEntity

```python
vendor = client.Vendor()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `about` | `dict` | Yes |  |
| `api_url` | `str` | Yes | Absolute URL. |
| `catalog` | `dict` | Yes |  |
| `country` | `Any` | Yes |  |
| `description` | `str | None` | Yes |  |
| `id` | `str` | Yes | Stable vendor id. |
| `logo_url` | `Any` | Yes |  |
| `name` | `str` | Yes |  |
| `product_categories` | `list` | Yes |  |
| `profile_url` | `str` | Yes | Absolute URL. |
| `rating` | `dict` | Yes |  |
| `region` | `str | None` | Yes |  |
| `reviews` | `dict` | Yes |  |
| `shipping` | `dict` | Yes |  |
| `slug` | `str` | Yes |  |
| `sources` | `dict` | Yes |  |
| `website_url` | `str` | Yes | Peptide Library link to the vendor's site (may be an affiliate link). |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[VendorEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Vendor().list()
for vendor in results:
    print(vendor.data_get())
```

#### `load(reqmatch, ctrl=None) -> VendorEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Vendor().load({"id": "vendor_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VendorEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = PeptideLibrarySDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

