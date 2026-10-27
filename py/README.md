# PeptideLibrary Python SDK



The Python SDK for the PeptideLibrary API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.GetApiIndex()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/peptide-library-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from peptidelibrary_sdk import PeptideLibrarySDK

client = PeptideLibrarySDK({
    "apikey": os.environ.get("PEPTIDE_LIBRARY_APIKEY"),
})
```

### 3. Load a getapiindex

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    getapiindex = client.GetApiIndex().load()
    print(getapiindex.data_get())
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    vendors = client.Vendor().list()
    print([item.data_get() for item in vendors])
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = PeptideLibrarySDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
vendor = client.Vendor().list()
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = PeptideLibrarySDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### PeptideLibrarySDK

```python
from peptidelibrary_sdk import PeptideLibrarySDK

client = PeptideLibrarySDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = PeptideLibrarySDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### PeptideLibrarySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `GetApiIndex` | `(data) -> GetApiIndexEntity` | Create a GetApiIndex entity instance. |
| `Meta` | `(data) -> MetaEntity` | Create a Meta entity instance. |
| `Price` | `(data) -> PriceEntity` | Create a Price entity instance. |
| `Product` | `(data) -> ProductEntity` | Create a Product entity instance. |
| `Research` | `(data) -> ResearchEntity` | Create a Research entity instance. |
| `ResearchStatistic` | `(data) -> ResearchStatisticEntity` | Create a ResearchStatistic entity instance. |
| `Study` | `(data) -> StudyEntity` | Create a Study entity instance. |
| `Vendor` | `(data) -> VendorEntity` | Create a Vendor entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### GetApiIndex

| Field | Description |
| --- | --- |
| `documentation` | Absolute URL. |
| `endpoints` |  |
| `name` |  |
| `openapi` | Absolute URL. |
| `release` |  |
| `version` |  |

Operations: Load.

API path: `/`

#### Meta

| Field | Description |
| --- | --- |
| `database` |  |
| `release` |  |
| `status` |  |

Operations: Load.

API path: `/health`

#### Price

| Field | Description |
| --- | --- |
| `availability` |  |
| `currency` |  |
| `first_seen_at` |  |
| `form` |  |
| `id` | Offer id. |
| `is_affiliate_link` |  |
| `is_stale` | True when not seen in the last 7 days. |
| `last_seen_at` | When the price was last seen on the vendor's site. |
| `peptide` |  |
| `price` | Decimal amount as a string, never a float. |
| `price_changed_at` |  |
| `price_per_mg` |  |
| `price_per_unit` |  |
| `product_id` |  |
| `product_name` | As the vendor lists it. |
| `product_page_url` | Peptide Library redirect to the vendor's page; logs the click. |
| `product_type` |  |
| `regular_price` |  |
| `ships_to` | Shipping to the `ships_to` destination you asked about; null when you didn't ask. |
| `strength` |  |
| `vendor` |  |

Operations: List, Load.

API path: `/prices`

#### Product

| Field | Description |
| --- | --- |
| `api_url` | Absolute URL. |
| `form` |  |
| `id` | Compound and form, e.g. |
| `in_stock_count` |  |
| `last_seen_at` |  |
| `offer_count` |  |
| `offers` | With the `pricing:read` scope; otherwise null. |
| `peptide` |  |
| `prices` | Per currency, never converted or mixed. |
| `product_type` |  |
| `vendor_count` |  |

Operations: List, Load.

API path: `/products`

#### Research

| Field | Description |
| --- | --- |
| `also_known_as` |  |
| `api_url` | Absolute URL. |
| `approved_medicine` | True only when the recorded FDA status is Approved. |
| `availability` |  |
| `categories` |  |
| `classification` |  |
| `clinical_evidence` |  |
| `conflict` |  |
| `content` |  |
| `content_reviewed_at` |  |
| `content_total` |  |
| `description` |  |
| `development_stage` |  |
| `evidence` |  |
| `fda_status` |  |
| `id` |  |
| `label` |  |
| `last_reviewed` |  |
| `library_classification` |  |
| `limitations` |  |
| `links` |  |
| `mechanism` |  |
| `mechanisms` |  |
| `name` |  |
| `note` |  |
| `notes` |  |
| `peptide` |  |
| `peptide_count` |  |
| `peptide_total` |  |
| `peptides` |  |
| `preclinical_evidence` |  |
| `properties` |  |
| `query` |  |
| `references` |  |
| `regulatory` |  |
| `regulatory_evidence` |  |
| `regulatory_status` | Regulatory class read from the profile's FDA status. |
| `regulatory_status_label` |  |
| `research_areas` |  |
| `research_gaps` | Evidence steps with no documented source in the profile. |
| `research_topics` |  |
| `review` |  |
| `safety` |  |
| `secondary_reports` |  |
| `statement` |  |
| `summary` |  |
| `unavailable_sources` |  |
| `url` | Absolute URL. |
| `wada_status` |  |

Operations: List, Load.

API path: `/categories`

#### ResearchStatistic

| Field | Description |
| --- | --- |
| `by_year` |  |
| `categories` |  |
| `chart_url` |  |
| `citation` |  |
| `columns` |  |
| `definition` |  |
| `denominator` |  |
| `denominator_definition` |  |
| `description` |  |
| `detail` | Rankings (array of rows) or comparison detail (object); null when none. |
| `doi` |  |
| `doi_url` |  |
| `embed_url` | Absolute URL. |
| `evidence_class` |  |
| `filters` |  |
| `first_pub_date` |  |
| `flags` | Caveats: partial_year, small_baseline, high_unclassified, whole_months_only, no_denominator. |
| `groups` |  |
| `how_to_read` |  |
| `id` | `pmid-` + the PubMed id. |
| `is_peptide` |  |
| `journal` |  |
| `key_publications` |  |
| `kind` |  |
| `label` |  |
| `license` |  |
| `limitations` |  |
| `mesh_roots` |  |
| `methodology_url` | Absolute URL. |
| `metric` |  |
| `min_baseline` |  |
| `name` |  |
| `numerator` |  |
| `numerator_definition` |  |
| `open_access` |  |
| `origin` |  |
| `partial_year` | The cutoff year, which is incomplete. |
| `peptide` |  |
| `peptide_ids` |  |
| `permalink` | Absolute URL. |
| `pmid` |  |
| `png_url` | Absolute URL. |
| `publications` |  |
| `published_at` |  |
| `pubmed_url` | Absolute URL. |
| `query` | The exact Europe PMC query behind the counts. |
| `regulatory` |  |
| `research_url` | Absolute URL. |
| `rows` |  |
| `section` | State of Peptide Research section that uses it. |
| `slug` |  |
| `snapshot` |  |
| `source` |  |
| `study_type` |  |
| `study_types` |  |
| `subtitle` |  |
| `svg_url` | Absolute URL. |
| `tier` | `counts_only`: yearly counts only (a very large, general literature); `excluded`: a blend or comparison entry. |
| `tier_reason` |  |
| `title` |  |
| `totals` |  |
| `trials` |  |
| `unit` |  |
| `url` | Absolute URL. |
| `value` |  |
| `version` |  |
| `versions` |  |

Operations: List, Load.

API path: `/research/categories`

#### Study

| Field | Description |
| --- | --- |
| `analog_compound` | Research on a related compound, not this one. |
| `authors` | Not stored by Peptide Library. |
| `citations` |  |
| `cited_by` |  |
| `doi` |  |
| `evidence_classification` |  |
| `evidence_classification_label` |  |
| `id` | Stable id from the study's identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none. |
| `journal` | Not stored by Peptide Library. |
| `limitations` |  |
| `nct_id` |  |
| `pmid` |  |
| `population` |  |
| `publication_year` |  |
| `research_model` |  |
| `sample_size` |  |
| `source_url` |  |
| `study_type` |  |
| `summary` | The finding as summarised by Peptide Library editors (dose figures removed). |
| `title` |  |

Operations: List, Load.

API path: `/peptides/{slug}/studies`

#### Vendor

| Field | Description |
| --- | --- |
| `about` |  |
| `api_url` | Absolute URL. |
| `catalog` |  |
| `country` |  |
| `description` |  |
| `id` | Stable vendor id. |
| `logo_url` |  |
| `name` |  |
| `product_categories` |  |
| `profile_url` | Absolute URL. |
| `rating` |  |
| `region` |  |
| `reviews` |  |
| `shipping` |  |
| `slug` |  |
| `sources` |  |
| `website_url` | Peptide Library link to the vendor's site (may be an affiliate link). |

Operations: List, Load.

API path: `/vendors/{id}/prices`



## Entities


### GetApiIndex

Create an instance: `get_api_index = client.GetApiIndex()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `documentation` | `str` | Absolute URL. |
| `endpoints` | `list` |  |
| `name` | `str` |  |
| `openapi` | `str` | Absolute URL. |
| `release` | `str` |  |
| `version` | `str` |  |

#### Example: Load

```python
get_api_index = client.GetApiIndex().load()
```


### Meta

Create an instance: `meta = client.Meta()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `database` | `str` |  |
| `release` | `str` |  |
| `status` | `str` |  |

#### Example: Load

```python
meta = client.Meta().load()
```


### Price

Create an instance: `price = client.Price()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `availability` | `str` |  |
| `currency` | `str` |  |
| `first_seen_at` | `Any` |  |
| `form` | `str` |  |
| `id` | `str` | Offer id. |
| `is_affiliate_link` | `bool` |  |
| `is_stale` | `bool` | True when not seen in the last 7 days. |
| `last_seen_at` | `Any` | When the price was last seen on the vendor's site. |
| `peptide` | `dict` |  |
| `price` | `str` | Decimal amount as a string, never a float. |
| `price_changed_at` | `Any` |  |
| `price_per_mg` | `Any` |  |
| `price_per_unit` | `Any` |  |
| `product_id` | `str` |  |
| `product_name` | `str` | As the vendor lists it. |
| `product_page_url` | `str` | Peptide Library redirect to the vendor's page; logs the click. |
| `product_type` | `str` |  |
| `regular_price` | `Any` |  |
| `ships_to` | `Any` | Shipping to the `ships_to` destination you asked about; null when you didn't ask. |
| `strength` | `dict` |  |
| `vendor` | `dict` |  |

#### Example: Load

```python
price = client.Price().load({"peptide": "peptide"})
```

#### Example: List

```python
prices = client.Price().list()
```


### Product

Create an instance: `product = client.Product()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_url` | `str` | Absolute URL. |
| `form` | `str` |  |
| `id` | `str` | Compound and form, e.g. |
| `in_stock_count` | `int` |  |
| `last_seen_at` | `Any` |  |
| `offer_count` | `int` |  |
| `offers` | `Any` | With the `pricing:read` scope; otherwise null. |
| `peptide` | `dict` |  |
| `prices` | `list` | Per currency, never converted or mixed. |
| `product_type` | `str` |  |
| `vendor_count` | `int` |  |

#### Example: Load

```python
product = client.Product().load({"id": "product_id"})
```

#### Example: List

```python
products = client.Product().list()
```


### Research

Create an instance: `research = client.Research()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `also_known_as` | `list` |  |
| `api_url` | `str` | Absolute URL. |
| `approved_medicine` | `bool` | True only when the recorded FDA status is Approved. |
| `availability` | `Any` |  |
| `categories` | `list` |  |
| `classification` | `dict` |  |
| `clinical_evidence` | `dict` |  |
| `conflict` | `Any` |  |
| `content` | `list` |  |
| `content_reviewed_at` | `Any` |  |
| `content_total` | `int` |  |
| `description` | `str` |  |
| `development_stage` | `Any` |  |
| `evidence` | `dict` |  |
| `fda_status` | `Any` |  |
| `id` | `str` |  |
| `label` | `str` |  |
| `last_reviewed` | `Any` |  |
| `library_classification` | `Any` |  |
| `limitations` | `list` |  |
| `links` | `dict` |  |
| `mechanism` | `dict` |  |
| `mechanisms` | `dict` |  |
| `name` | `str` |  |
| `note` | `str` |  |
| `notes` | `list` |  |
| `peptide` | `dict` |  |
| `peptide_count` | `int` |  |
| `peptide_total` | `int` |  |
| `peptides` | `list` |  |
| `preclinical_evidence` | `dict` |  |
| `properties` | `dict` |  |
| `query` | `str` |  |
| `references` | `list` |  |
| `regulatory` | `dict` |  |
| `regulatory_evidence` | `list` |  |
| `regulatory_status` | `str` | Regulatory class read from the profile's FDA status. |
| `regulatory_status_label` | `str` |  |
| `research_areas` | `list` |  |
| `research_gaps` | `list` | Evidence steps with no documented source in the profile. |
| `research_topics` | `list` |  |
| `review` | `dict` |  |
| `safety` | `dict` |  |
| `secondary_reports` | `dict` |  |
| `statement` | `Any` |  |
| `summary` | `Any` |  |
| `unavailable_sources` | `list` |  |
| `url` | `str` | Absolute URL. |
| `wada_status` | `Any` |  |

#### Example: Load

```python
research = client.Research().load({"slug": "slug"})
```

#### Example: List

```python
researchs = client.Research().list()
```


### ResearchStatistic

Create an instance: `research_statistic = client.ResearchStatistic()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `by_year` | `list` |  |
| `categories` | `list` |  |
| `chart_url` | `Any` |  |
| `citation` | `str` |  |
| `columns` | `list` |  |
| `definition` | `str` |  |
| `denominator` | `float | None` |  |
| `denominator_definition` | `str | None` |  |
| `description` | `str` |  |
| `detail` | `Any` | Rankings (array of rows) or comparison detail (object); null when none. |
| `doi` | `str | None` |  |
| `doi_url` | `Any` |  |
| `embed_url` | `str` | Absolute URL. |
| `evidence_class` | `str` |  |
| `filters` | `dict` |  |
| `first_pub_date` | `str` |  |
| `flags` | `list` | Caveats: partial_year, small_baseline, high_unclassified, whole_months_only, no_denominator. |
| `groups` | `list` |  |
| `how_to_read` | `str` |  |
| `id` | `str` | `pmid-` + the PubMed id. |
| `is_peptide` | `bool` |  |
| `journal` | `str | None` |  |
| `key_publications` | `list` |  |
| `kind` | `str` |  |
| `label` | `str` |  |
| `license` | `dict` |  |
| `limitations` | `list` |  |
| `mesh_roots` | `list` |  |
| `methodology_url` | `str` | Absolute URL. |
| `metric` | `str` |  |
| `min_baseline` | `Any` |  |
| `name` | `str` |  |
| `numerator` | `float | None` |  |
| `numerator_definition` | `str | None` |  |
| `open_access` | `bool | None` |  |
| `origin` | `str | None` |  |
| `partial_year` | `int` | The cutoff year, which is incomplete. |
| `peptide` | `dict` |  |
| `peptide_ids` | `list` |  |
| `permalink` | `str` | Absolute URL. |
| `pmid` | `str` |  |
| `png_url` | `str` | Absolute URL. |
| `publications` | `Any` |  |
| `published_at` | `str` |  |
| `pubmed_url` | `str` | Absolute URL. |
| `query` | `str | None` | The exact Europe PMC query behind the counts. |
| `regulatory` | `str | None` |  |
| `research_url` | `str` | Absolute URL. |
| `rows` | `list` |  |
| `section` | `int` | State of Peptide Research section that uses it. |
| `slug` | `str` |  |
| `snapshot` | `dict` |  |
| `source` | `str` |  |
| `study_type` | `str` |  |
| `study_types` | `list` |  |
| `subtitle` | `str` |  |
| `svg_url` | `str` | Absolute URL. |
| `tier` | `str` | `counts_only`: yearly counts only (a very large, general literature); `excluded`: a blend or comparison entry. |
| `tier_reason` | `str | None` |  |
| `title` | `str` |  |
| `totals` | `Any` |  |
| `trials` | `Any` |  |
| `unit` | `str` |  |
| `url` | `str` | Absolute URL. |
| `value` | `float | None` |  |
| `version` | `int` |  |
| `versions` | `list` |  |

#### Example: Load

```python
research_statistic = client.ResearchStatistic().load({"id": "research_statistic_id"})
```

#### Example: List

```python
research_statistics = client.ResearchStatistic().list()
```


### Study

Create an instance: `study = client.Study()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analog_compound` | `bool` | Research on a related compound, not this one. |
| `authors` | `str` | Not stored by Peptide Library. |
| `citations` | `list` |  |
| `cited_by` | `list` |  |
| `doi` | `str | None` |  |
| `evidence_classification` | `str` |  |
| `evidence_classification_label` | `str` |  |
| `id` | `str` | Stable id from the study's identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none. |
| `journal` | `str` | Not stored by Peptide Library. |
| `limitations` | `list` |  |
| `nct_id` | `str | None` |  |
| `pmid` | `str | None` |  |
| `population` | `Any` |  |
| `publication_year` | `Any` |  |
| `research_model` | `str` |  |
| `sample_size` | `Any` |  |
| `source_url` | `Any` |  |
| `study_type` | `Any` |  |
| `summary` | `Any` | The finding as summarised by Peptide Library editors (dose figures removed). |
| `title` | `str` |  |

#### Example: Load

```python
study = client.Study().load({"id": "study_id"})
```

#### Example: List

```python
studys = client.Study().list()
```


### Vendor

Create an instance: `vendor = client.Vendor()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `about` | `dict` |  |
| `api_url` | `str` | Absolute URL. |
| `catalog` | `dict` |  |
| `country` | `Any` |  |
| `description` | `str | None` |  |
| `id` | `str` | Stable vendor id. |
| `logo_url` | `Any` |  |
| `name` | `str` |  |
| `product_categories` | `list` |  |
| `profile_url` | `str` | Absolute URL. |
| `rating` | `dict` |  |
| `region` | `str | None` |  |
| `reviews` | `dict` |  |
| `shipping` | `dict` |  |
| `slug` | `str` |  |
| `sources` | `dict` |  |
| `website_url` | `str` | Peptide Library link to the vendor's site (may be an affiliate link). |

#### Example: Load

```python
vendor = client.Vendor().load({"id": "vendor_id"})
```

#### Example: List

```python
vendors = client.Vendor().list()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── peptidelibrary_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`peptidelibrary_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
vendor = client.Vendor()
vendor.list()

# vendor.data_get() now returns the vendor data from the last list
# vendor.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
