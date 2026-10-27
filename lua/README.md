# PeptideLibrary Lua SDK



The Lua SDK for the PeptideLibrary API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:GetApiIndex()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/peptide-library-sdk/tags)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("peptide-library_sdk")

local client = sdk.new({
  apikey = os.getenv("PEPTIDE_LIBRARY_APIKEY"),
})
```

### 3. Load a getapiindex

`load` returns the entity; `data_get()` reads its record.

```lua
local getapiindex, err = client:GetApiIndex():load()
if err then error(err) end
for k, val in pairs(getapiindex:data_get()) do print(k, val) end
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local vendors, err = client:Vendor():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Vendor():list()
-- result is an array of entities, one per mock record; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### PeptideLibrarySDK

```lua
local sdk = require("peptide-library_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### PeptideLibrarySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria, and return it. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria, one per record. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity, whose `data_get()` reads its record (a `table`) |
| `list` | an array (`table`) of entities, one per record |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local get_api_index, err = client:GetApiIndex():load()
    if err then error(err) end
    -- get_api_index is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local get_api_index = client:GetApiIndex(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `documentation` | `string` | Absolute URL. |
| `endpoints` | `table` |  |
| `name` | `string` |  |
| `openapi` | `string` | Absolute URL. |
| `release` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```lua
local get_api_index, err = client:GetApiIndex():load()
```


### Meta

Create an instance: `local meta = client:Meta(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `database` | `string` |  |
| `release` | `string` |  |
| `status` | `string` |  |

#### Example: Load

```lua
local meta, err = client:Meta():load()
```


### Price

Create an instance: `local price = client:Price(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `availability` | `string` |  |
| `currency` | `string` |  |
| `first_seen_at` | `any` |  |
| `form` | `string` |  |
| `id` | `string` | Offer id. |
| `is_affiliate_link` | `boolean` |  |
| `is_stale` | `boolean` | True when not seen in the last 7 days. |
| `last_seen_at` | `any` | When the price was last seen on the vendor's site. |
| `peptide` | `table` |  |
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
| `strength` | `table` |  |
| `vendor` | `table` |  |

#### Example: Load

```lua
local price, err = client:Price():load({ peptide = "peptide" })
```

#### Example: List

```lua
local prices, err = client:Price():list()
```


### Product

Create an instance: `local product = client:Product(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_url` | `string` | Absolute URL. |
| `form` | `string` |  |
| `id` | `string` | Compound and form, e.g. |
| `in_stock_count` | `number` |  |
| `last_seen_at` | `any` |  |
| `offer_count` | `number` |  |
| `offers` | `any` | With the `pricing:read` scope; otherwise null. |
| `peptide` | `table` |  |
| `prices` | `table` | Per currency, never converted or mixed. |
| `product_type` | `string` |  |
| `vendor_count` | `number` |  |

#### Example: Load

```lua
local product, err = client:Product():load({ id = "product_id" })
```

#### Example: List

```lua
local products, err = client:Product():list()
```


### Research

Create an instance: `local research = client:Research(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `also_known_as` | `table` |  |
| `api_url` | `string` | Absolute URL. |
| `approved_medicine` | `boolean` | True only when the recorded FDA status is Approved. |
| `availability` | `any` |  |
| `categories` | `table` |  |
| `classification` | `table` |  |
| `clinical_evidence` | `table` |  |
| `conflict` | `any` |  |
| `content` | `table` |  |
| `content_reviewed_at` | `any` |  |
| `content_total` | `number` |  |
| `description` | `string` |  |
| `development_stage` | `any` |  |
| `evidence` | `table` |  |
| `fda_status` | `any` |  |
| `id` | `string` |  |
| `label` | `string` |  |
| `last_reviewed` | `any` |  |
| `library_classification` | `any` |  |
| `limitations` | `table` |  |
| `links` | `table` |  |
| `mechanism` | `table` |  |
| `mechanisms` | `table` |  |
| `name` | `string` |  |
| `note` | `string` |  |
| `notes` | `table` |  |
| `peptide` | `table` |  |
| `peptide_count` | `number` |  |
| `peptide_total` | `number` |  |
| `peptides` | `table` |  |
| `preclinical_evidence` | `table` |  |
| `properties` | `table` |  |
| `query` | `string` |  |
| `references` | `table` |  |
| `regulatory` | `table` |  |
| `regulatory_evidence` | `table` |  |
| `regulatory_status` | `string` | Regulatory class read from the profile's FDA status. |
| `regulatory_status_label` | `string` |  |
| `research_areas` | `table` |  |
| `research_gaps` | `table` | Evidence steps with no documented source in the profile. |
| `research_topics` | `table` |  |
| `review` | `table` |  |
| `safety` | `table` |  |
| `secondary_reports` | `table` |  |
| `statement` | `any` |  |
| `summary` | `any` |  |
| `unavailable_sources` | `table` |  |
| `url` | `string` | Absolute URL. |
| `wada_status` | `any` |  |

#### Example: Load

```lua
local research, err = client:Research():load({ slug = "slug" })
```

#### Example: List

```lua
local researchs, err = client:Research():list()
```


### ResearchStatistic

Create an instance: `local research_statistic = client:ResearchStatistic(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `by_year` | `table` |  |
| `categories` | `table` |  |
| `chart_url` | `any` |  |
| `citation` | `string` |  |
| `columns` | `table` |  |
| `definition` | `string` |  |
| `denominator` | `number|nil` |  |
| `denominator_definition` | `string|nil` |  |
| `description` | `string` |  |
| `detail` | `any` | Rankings (array of rows) or comparison detail (object); null when none. |
| `doi` | `string|nil` |  |
| `doi_url` | `any` |  |
| `embed_url` | `string` | Absolute URL. |
| `evidence_class` | `string` |  |
| `filters` | `table` |  |
| `first_pub_date` | `string` |  |
| `flags` | `table` | Caveats: partial_year, small_baseline, high_unclassified, whole_months_only, no_denominator. |
| `groups` | `table` |  |
| `how_to_read` | `string` |  |
| `id` | `string` | `pmid-` + the PubMed id. |
| `is_peptide` | `boolean` |  |
| `journal` | `string|nil` |  |
| `key_publications` | `table` |  |
| `kind` | `string` |  |
| `label` | `string` |  |
| `license` | `table` |  |
| `limitations` | `table` |  |
| `mesh_roots` | `table` |  |
| `methodology_url` | `string` | Absolute URL. |
| `metric` | `string` |  |
| `min_baseline` | `any` |  |
| `name` | `string` |  |
| `numerator` | `number|nil` |  |
| `numerator_definition` | `string|nil` |  |
| `open_access` | `boolean|nil` |  |
| `origin` | `string|nil` |  |
| `partial_year` | `number` | The cutoff year, which is incomplete. |
| `peptide` | `table` |  |
| `peptide_ids` | `table` |  |
| `permalink` | `string` | Absolute URL. |
| `pmid` | `string` |  |
| `png_url` | `string` | Absolute URL. |
| `publications` | `any` |  |
| `published_at` | `string` |  |
| `pubmed_url` | `string` | Absolute URL. |
| `query` | `string|nil` | The exact Europe PMC query behind the counts. |
| `regulatory` | `string|nil` |  |
| `research_url` | `string` | Absolute URL. |
| `rows` | `table` |  |
| `section` | `number` | State of Peptide Research section that uses it. |
| `slug` | `string` |  |
| `snapshot` | `table` |  |
| `source` | `string` |  |
| `study_type` | `string` |  |
| `study_types` | `table` |  |
| `subtitle` | `string` |  |
| `svg_url` | `string` | Absolute URL. |
| `tier` | `string` | `counts_only`: yearly counts only (a very large, general literature); `excluded`: a blend or comparison entry. |
| `tier_reason` | `string|nil` |  |
| `title` | `string` |  |
| `totals` | `any` |  |
| `trials` | `any` |  |
| `unit` | `string` |  |
| `url` | `string` | Absolute URL. |
| `value` | `number|nil` |  |
| `version` | `number` |  |
| `versions` | `table` |  |

#### Example: Load

```lua
local research_statistic, err = client:ResearchStatistic():load({ id = "research_statistic_id" })
```

#### Example: List

```lua
local research_statistics, err = client:ResearchStatistic():list()
```


### Study

Create an instance: `local study = client:Study(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analog_compound` | `boolean` | Research on a related compound, not this one. |
| `authors` | `string` | Not stored by Peptide Library. |
| `citations` | `table` |  |
| `cited_by` | `table` |  |
| `doi` | `string|nil` |  |
| `evidence_classification` | `string` |  |
| `evidence_classification_label` | `string` |  |
| `id` | `string` | Stable id from the study's identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none. |
| `journal` | `string` | Not stored by Peptide Library. |
| `limitations` | `table` |  |
| `nct_id` | `string|nil` |  |
| `pmid` | `string|nil` |  |
| `population` | `any` |  |
| `publication_year` | `any` |  |
| `research_model` | `string` |  |
| `sample_size` | `any` |  |
| `source_url` | `any` |  |
| `study_type` | `any` |  |
| `summary` | `any` | The finding as summarised by Peptide Library editors (dose figures removed). |
| `title` | `string` |  |

#### Example: Load

```lua
local study, err = client:Study():load({ id = "study_id" })
```

#### Example: List

```lua
local studys, err = client:Study():list()
```


### Vendor

Create an instance: `local vendor = client:Vendor(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `about` | `table` |  |
| `api_url` | `string` | Absolute URL. |
| `catalog` | `table` |  |
| `country` | `any` |  |
| `description` | `string|nil` |  |
| `id` | `string` | Stable vendor id. |
| `logo_url` | `any` |  |
| `name` | `string` |  |
| `product_categories` | `table` |  |
| `profile_url` | `string` | Absolute URL. |
| `rating` | `table` |  |
| `region` | `string|nil` |  |
| `reviews` | `table` |  |
| `shipping` | `table` |  |
| `slug` | `string` |  |
| `sources` | `table` |  |
| `website_url` | `string` | Peptide Library link to the vendor's site (may be an affiliate link). |

#### Example: Load

```lua
local vendor, err = client:Vendor():load({ id = "vendor_id" })
```

#### Example: List

```lua
local vendors, err = client:Vendor():list()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── peptide-library_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`peptide-library_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local vendor = client:Vendor()
vendor:list()

-- vendor:data_get() now returns the vendor data from the last list
-- vendor:match_get() returns the last match criteria
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
