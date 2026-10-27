# PeptideLibrary Ruby SDK



The Ruby SDK for the PeptideLibrary API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.GetApiIndex` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/peptide-library-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/peptide-library-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-peptide-library-sdk", path: "./peptide-library-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "PeptideLibrary_sdk"

client = PeptideLibrarySDK.new({
  "apikey" => ENV["PEPTIDE_LIBRARY_APIKEY"],
})
```

### 3. Load a getapiindex

```ruby
begin
  # load returns the ENTITY — call data_get for the GetApiIndex record (raises on error).
  getapiindex = client.GetApiIndex.load()
  puts getapiindex.data_get
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  vendors = client.Vendor.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = PeptideLibrarySDK.test({
  "entity" => { "vendor" => { "test01" => { "id" => "test01" } } },
})

# list returns an Array of Vendor entities, one per mock record (raises on
# error); data_get reads each record.
vendors = client.Vendor.list()
vendors.each { |item| puts item.data_get }
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = PeptideLibrarySDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### PeptideLibrarySDK

```ruby
require_relative "PeptideLibrary_sdk"
client = PeptideLibrarySDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = PeptideLibrarySDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### PeptideLibrarySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`PeptideLibraryError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `get_api_index = client.GetApiIndex`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `documentation` | `String` | Absolute URL. |
| `endpoints` | `Array` |  |
| `name` | `String` |  |
| `openapi` | `String` | Absolute URL. |
| `release` | `String` |  |
| `version` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the GetApiIndex record (raises on error).
get_api_index = client.GetApiIndex.load()
```


### Meta

Create an instance: `meta = client.Meta`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `database` | `String` |  |
| `release` | `String` |  |
| `status` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Meta record (raises on error).
meta = client.Meta.load()
```


### Price

Create an instance: `price = client.Price`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `availability` | `String` |  |
| `currency` | `String` |  |
| `first_seen_at` | `Object` |  |
| `form` | `String` |  |
| `id` | `String` | Offer id. |
| `is_affiliate_link` | `Boolean` |  |
| `is_stale` | `Boolean` | True when not seen in the last 7 days. |
| `last_seen_at` | `Object` | When the price was last seen on the vendor's site. |
| `peptide` | `Hash` |  |
| `price` | `String` | Decimal amount as a string, never a float. |
| `price_changed_at` | `Object` |  |
| `price_per_mg` | `Object` |  |
| `price_per_unit` | `Object` |  |
| `product_id` | `String` |  |
| `product_name` | `String` | As the vendor lists it. |
| `product_page_url` | `String` | Peptide Library redirect to the vendor's page; logs the click. |
| `product_type` | `String` |  |
| `regular_price` | `Object` |  |
| `ships_to` | `Object` | Shipping to the `ships_to` destination you asked about; null when you didn't ask. |
| `strength` | `Hash` |  |
| `vendor` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Price record (raises on error).
price = client.Price.load({ "peptide" => "peptide" })
```

#### Example: List

```ruby
# list returns an Array of Price entities, one per record (raises on error).
prices = client.Price.list
prices.each { |item| puts item.data_get }
```


### Product

Create an instance: `product = client.Product`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_url` | `String` | Absolute URL. |
| `form` | `String` |  |
| `id` | `String` | Compound and form, e.g. |
| `in_stock_count` | `Integer` |  |
| `last_seen_at` | `Object` |  |
| `offer_count` | `Integer` |  |
| `offers` | `Object` | With the `pricing:read` scope; otherwise null. |
| `peptide` | `Hash` |  |
| `prices` | `Array` | Per currency, never converted or mixed. |
| `product_type` | `String` |  |
| `vendor_count` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Product record (raises on error).
product = client.Product.load({ "id" => "product_id" })
```

#### Example: List

```ruby
# list returns an Array of Product entities, one per record (raises on error).
products = client.Product.list
products.each { |item| puts item.data_get }
```


### Research

Create an instance: `research = client.Research`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `also_known_as` | `Array` |  |
| `api_url` | `String` | Absolute URL. |
| `approved_medicine` | `Boolean` | True only when the recorded FDA status is Approved. |
| `availability` | `Object` |  |
| `categories` | `Array` |  |
| `classification` | `Hash` |  |
| `clinical_evidence` | `Hash` |  |
| `conflict` | `Object` |  |
| `content` | `Array` |  |
| `content_reviewed_at` | `Object` |  |
| `content_total` | `Integer` |  |
| `description` | `String` |  |
| `development_stage` | `Object` |  |
| `evidence` | `Hash` |  |
| `fda_status` | `Object` |  |
| `id` | `String` |  |
| `label` | `String` |  |
| `last_reviewed` | `Object` |  |
| `library_classification` | `Object` |  |
| `limitations` | `Array` |  |
| `links` | `Hash` |  |
| `mechanism` | `Hash` |  |
| `mechanisms` | `Hash` |  |
| `name` | `String` |  |
| `note` | `String` |  |
| `notes` | `Array` |  |
| `peptide` | `Hash` |  |
| `peptide_count` | `Integer` |  |
| `peptide_total` | `Integer` |  |
| `peptides` | `Array` |  |
| `preclinical_evidence` | `Hash` |  |
| `properties` | `Hash` |  |
| `query` | `String` |  |
| `references` | `Array` |  |
| `regulatory` | `Hash` |  |
| `regulatory_evidence` | `Array` |  |
| `regulatory_status` | `String` | Regulatory class read from the profile's FDA status. |
| `regulatory_status_label` | `String` |  |
| `research_areas` | `Array` |  |
| `research_gaps` | `Array` | Evidence steps with no documented source in the profile. |
| `research_topics` | `Array` |  |
| `review` | `Hash` |  |
| `safety` | `Hash` |  |
| `secondary_reports` | `Hash` |  |
| `statement` | `Object` |  |
| `summary` | `Object` |  |
| `unavailable_sources` | `Array` |  |
| `url` | `String` | Absolute URL. |
| `wada_status` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Research record (raises on error).
research = client.Research.load({ "slug" => "slug" })
```

#### Example: List

```ruby
# list returns an Array of Research entities, one per record (raises on error).
researchs = client.Research.list
researchs.each { |item| puts item.data_get }
```


### ResearchStatistic

Create an instance: `research_statistic = client.ResearchStatistic`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `by_year` | `Array` |  |
| `categories` | `Array` |  |
| `chart_url` | `Object` |  |
| `citation` | `String` |  |
| `columns` | `Array` |  |
| `definition` | `String` |  |
| `denominator` | `Object` |  |
| `denominator_definition` | `Object` |  |
| `description` | `String` |  |
| `detail` | `Object` | Rankings (array of rows) or comparison detail (object); null when none. |
| `doi` | `Object` |  |
| `doi_url` | `Object` |  |
| `embed_url` | `String` | Absolute URL. |
| `evidence_class` | `String` |  |
| `filters` | `Hash` |  |
| `first_pub_date` | `String` |  |
| `flags` | `Array` | Caveats: partial_year, small_baseline, high_unclassified, whole_months_only, no_denominator. |
| `groups` | `Array` |  |
| `how_to_read` | `String` |  |
| `id` | `String` | `pmid-` + the PubMed id. |
| `is_peptide` | `Boolean` |  |
| `journal` | `Object` |  |
| `key_publications` | `Array` |  |
| `kind` | `String` |  |
| `label` | `String` |  |
| `license` | `Hash` |  |
| `limitations` | `Array` |  |
| `mesh_roots` | `Array` |  |
| `methodology_url` | `String` | Absolute URL. |
| `metric` | `String` |  |
| `min_baseline` | `Object` |  |
| `name` | `String` |  |
| `numerator` | `Object` |  |
| `numerator_definition` | `Object` |  |
| `open_access` | `Object` |  |
| `origin` | `Object` |  |
| `partial_year` | `Integer` | The cutoff year, which is incomplete. |
| `peptide` | `Hash` |  |
| `peptide_ids` | `Array` |  |
| `permalink` | `String` | Absolute URL. |
| `pmid` | `String` |  |
| `png_url` | `String` | Absolute URL. |
| `publications` | `Object` |  |
| `published_at` | `String` |  |
| `pubmed_url` | `String` | Absolute URL. |
| `query` | `Object` | The exact Europe PMC query behind the counts. |
| `regulatory` | `Object` |  |
| `research_url` | `String` | Absolute URL. |
| `rows` | `Array` |  |
| `section` | `Integer` | State of Peptide Research section that uses it. |
| `slug` | `String` |  |
| `snapshot` | `Hash` |  |
| `source` | `String` |  |
| `study_type` | `String` |  |
| `study_types` | `Array` |  |
| `subtitle` | `String` |  |
| `svg_url` | `String` | Absolute URL. |
| `tier` | `String` | `counts_only`: yearly counts only (a very large, general literature); `excluded`: a blend or comparison entry. |
| `tier_reason` | `Object` |  |
| `title` | `String` |  |
| `totals` | `Object` |  |
| `trials` | `Object` |  |
| `unit` | `String` |  |
| `url` | `String` | Absolute URL. |
| `value` | `Object` |  |
| `version` | `Integer` |  |
| `versions` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ResearchStatistic record (raises on error).
research_statistic = client.ResearchStatistic.load({ "id" => "research_statistic_id" })
```

#### Example: List

```ruby
# list returns an Array of ResearchStatistic entities, one per record (raises on error).
research_statistics = client.ResearchStatistic.list
research_statistics.each { |item| puts item.data_get }
```


### Study

Create an instance: `study = client.Study`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analog_compound` | `Boolean` | Research on a related compound, not this one. |
| `authors` | `String` | Not stored by Peptide Library. |
| `citations` | `Array` |  |
| `cited_by` | `Array` |  |
| `doi` | `Object` |  |
| `evidence_classification` | `String` |  |
| `evidence_classification_label` | `String` |  |
| `id` | `String` | Stable id from the study's identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none. |
| `journal` | `String` | Not stored by Peptide Library. |
| `limitations` | `Array` |  |
| `nct_id` | `Object` |  |
| `pmid` | `Object` |  |
| `population` | `Object` |  |
| `publication_year` | `Object` |  |
| `research_model` | `String` |  |
| `sample_size` | `Object` |  |
| `source_url` | `Object` |  |
| `study_type` | `Object` |  |
| `summary` | `Object` | The finding as summarised by Peptide Library editors (dose figures removed). |
| `title` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Study record (raises on error).
study = client.Study.load({ "id" => "study_id" })
```

#### Example: List

```ruby
# list returns an Array of Study entities, one per record (raises on error).
studys = client.Study.list
studys.each { |item| puts item.data_get }
```


### Vendor

Create an instance: `vendor = client.Vendor`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `about` | `Hash` |  |
| `api_url` | `String` | Absolute URL. |
| `catalog` | `Hash` |  |
| `country` | `Object` |  |
| `description` | `Object` |  |
| `id` | `String` | Stable vendor id. |
| `logo_url` | `Object` |  |
| `name` | `String` |  |
| `product_categories` | `Array` |  |
| `profile_url` | `String` | Absolute URL. |
| `rating` | `Hash` |  |
| `region` | `Object` |  |
| `reviews` | `Hash` |  |
| `shipping` | `Hash` |  |
| `slug` | `String` |  |
| `sources` | `Hash` |  |
| `website_url` | `String` | Peptide Library link to the vendor's site (may be an affiliate link). |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Vendor record (raises on error).
vendor = client.Vendor.load({ "id" => "vendor_id" })
```

#### Example: List

```ruby
# list returns an Array of Vendor entities, one per record (raises on error).
vendors = client.Vendor.list
vendors.each { |item| puts item.data_get }
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── PeptideLibrary_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`PeptideLibrary_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
vendor = client.Vendor
vendor.list()

# vendor.data_get now returns the vendor data from the last list
# vendor.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
