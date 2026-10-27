# PeptideLibrary PHP SDK



The PHP SDK for the PeptideLibrary API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->GetApiIndex()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/peptide-library-sdk/tags)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/peptide-library-sdk
composer config repositories.peptide-library-sdk path ./peptide-library-sdk/php
composer require voxgig-sdk/peptide-library-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'peptidelibrary_sdk.php';

$client = new PeptideLibrarySDK([
    "apikey" => getenv("PEPTIDE_LIBRARY_APIKEY"),
]);
```

### 3. Load a getapiindex

```php
try {
    // load() returns the ENTITY — call data_get() for the GetApiIndex record (throws on error).
    $getapiindex = $client->GetApiIndex()->load();
    print_r($getapiindex->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $vendors = $client->Vendor()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = PeptideLibrarySDK::test([
    "entity" => ["vendor" => ["test01" => ["id" => "test01"]]],
]);

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$vendor = $client->Vendor()->list();
print_r(array_map(fn($item) => $item->data_get(), $vendor));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new PeptideLibrarySDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
PEPTIDE_LIBRARY_TEST_LIVE=TRUE
PEPTIDE_LIBRARY_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### PeptideLibrarySDK

```php
require_once 'peptidelibrary_sdk.php';
$client = new PeptideLibrarySDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = PeptideLibrarySDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### PeptideLibrarySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `GetApiIndex` | `($data): GetApiIndexEntity` | Create a GetApiIndex entity instance. |
| `Meta` | `($data): MetaEntity` | Create a Meta entity instance. |
| `Price` | `($data): PriceEntity` | Create a Price entity instance. |
| `Product` | `($data): ProductEntity` | Create a Product entity instance. |
| `Research` | `($data): ResearchEntity` | Create a Research entity instance. |
| `ResearchStatistic` | `($data): ResearchStatisticEntity` | Create a ResearchStatistic entity instance. |
| `Study` | `($data): StudyEntity` | Create a Study entity instance. |
| `Vendor` | `($data): VendorEntity` | Create a Vendor entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): mixed` | Load a single entity by match criteria, and return it. |
| `list` | `(?array $reqmatch = null, $ctrl): mixed` | List entities matching the criteria (call with no argument to list all), one per record. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `array` of entities, one
per record; an entity's `data_get()` reads its record (an `array`). They
throw on error, so wrap calls in `try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$get_api_index = $client->GetApiIndex();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `documentation` | `string` | Absolute URL. |
| `endpoints` | `array` |  |
| `name` | `string` |  |
| `openapi` | `string` | Absolute URL. |
| `release` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the GetApiIndex record (throws on error).
$get_api_index = $client->GetApiIndex()->load();
```


### Meta

Create an instance: `$meta = $client->Meta();`

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

```php
// load() returns the ENTITY — call data_get() for the Meta record (throws on error).
$meta = $client->Meta()->load();
```


### Price

Create an instance: `$price = $client->Price();`

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
| `first_seen_at` | `mixed` |  |
| `form` | `string` |  |
| `id` | `string` | Offer id. |
| `is_affiliate_link` | `bool` |  |
| `is_stale` | `bool` | True when not seen in the last 7 days. |
| `last_seen_at` | `mixed` | When the price was last seen on the vendor's site. |
| `peptide` | `array` |  |
| `price` | `string` | Decimal amount as a string, never a float. |
| `price_changed_at` | `mixed` |  |
| `price_per_mg` | `mixed` |  |
| `price_per_unit` | `mixed` |  |
| `product_id` | `string` |  |
| `product_name` | `string` | As the vendor lists it. |
| `product_page_url` | `string` | Peptide Library redirect to the vendor's page; logs the click. |
| `product_type` | `string` |  |
| `regular_price` | `mixed` |  |
| `ships_to` | `mixed` | Shipping to the `ships_to` destination you asked about; null when you didn't ask. |
| `strength` | `array` |  |
| `vendor` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Price record (throws on error).
$price = $client->Price()->load(["peptide" => "peptide"]);
```

#### Example: List

```php
// list() returns an array of Price entities, one per record (throws on error).
$prices = $client->Price()->list();
```


### Product

Create an instance: `$product = $client->Product();`

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
| `in_stock_count` | `int` |  |
| `last_seen_at` | `mixed` |  |
| `offer_count` | `int` |  |
| `offers` | `mixed` | With the `pricing:read` scope; otherwise null. |
| `peptide` | `array` |  |
| `prices` | `array` | Per currency, never converted or mixed. |
| `product_type` | `string` |  |
| `vendor_count` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Product record (throws on error).
$product = $client->Product()->load(["id" => "product_id"]);
```

#### Example: List

```php
// list() returns an array of Product entities, one per record (throws on error).
$products = $client->Product()->list();
```


### Research

Create an instance: `$research = $client->Research();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `also_known_as` | `array` |  |
| `api_url` | `string` | Absolute URL. |
| `approved_medicine` | `bool` | True only when the recorded FDA status is Approved. |
| `availability` | `mixed` |  |
| `categories` | `array` |  |
| `classification` | `array` |  |
| `clinical_evidence` | `array` |  |
| `conflict` | `mixed` |  |
| `content` | `array` |  |
| `content_reviewed_at` | `mixed` |  |
| `content_total` | `int` |  |
| `description` | `string` |  |
| `development_stage` | `mixed` |  |
| `evidence` | `array` |  |
| `fda_status` | `mixed` |  |
| `id` | `string` |  |
| `label` | `string` |  |
| `last_reviewed` | `mixed` |  |
| `library_classification` | `mixed` |  |
| `limitations` | `array` |  |
| `links` | `array` |  |
| `mechanism` | `array` |  |
| `mechanisms` | `array` |  |
| `name` | `string` |  |
| `note` | `string` |  |
| `notes` | `array` |  |
| `peptide` | `array` |  |
| `peptide_count` | `int` |  |
| `peptide_total` | `int` |  |
| `peptides` | `array` |  |
| `preclinical_evidence` | `array` |  |
| `properties` | `array` |  |
| `query` | `string` |  |
| `references` | `array` |  |
| `regulatory` | `array` |  |
| `regulatory_evidence` | `array` |  |
| `regulatory_status` | `string` | Regulatory class read from the profile's FDA status. |
| `regulatory_status_label` | `string` |  |
| `research_areas` | `array` |  |
| `research_gaps` | `array` | Evidence steps with no documented source in the profile. |
| `research_topics` | `array` |  |
| `review` | `array` |  |
| `safety` | `array` |  |
| `secondary_reports` | `array` |  |
| `statement` | `mixed` |  |
| `summary` | `mixed` |  |
| `unavailable_sources` | `array` |  |
| `url` | `string` | Absolute URL. |
| `wada_status` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Research record (throws on error).
$research = $client->Research()->load(["slug" => "slug"]);
```

#### Example: List

```php
// list() returns an array of Research entities, one per record (throws on error).
$researchs = $client->Research()->list();
```


### ResearchStatistic

Create an instance: `$research_statistic = $client->ResearchStatistic();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `by_year` | `array` |  |
| `categories` | `array` |  |
| `chart_url` | `mixed` |  |
| `citation` | `string` |  |
| `columns` | `array` |  |
| `definition` | `string` |  |
| `denominator` | `mixed` |  |
| `denominator_definition` | `mixed` |  |
| `description` | `string` |  |
| `detail` | `mixed` | Rankings (array of rows) or comparison detail (object); null when none. |
| `doi` | `mixed` |  |
| `doi_url` | `mixed` |  |
| `embed_url` | `string` | Absolute URL. |
| `evidence_class` | `string` |  |
| `filters` | `array` |  |
| `first_pub_date` | `string` |  |
| `flags` | `array` | Caveats: partial_year, small_baseline, high_unclassified, whole_months_only, no_denominator. |
| `groups` | `array` |  |
| `how_to_read` | `string` |  |
| `id` | `string` | `pmid-` + the PubMed id. |
| `is_peptide` | `bool` |  |
| `journal` | `mixed` |  |
| `key_publications` | `array` |  |
| `kind` | `string` |  |
| `label` | `string` |  |
| `license` | `array` |  |
| `limitations` | `array` |  |
| `mesh_roots` | `array` |  |
| `methodology_url` | `string` | Absolute URL. |
| `metric` | `string` |  |
| `min_baseline` | `mixed` |  |
| `name` | `string` |  |
| `numerator` | `mixed` |  |
| `numerator_definition` | `mixed` |  |
| `open_access` | `mixed` |  |
| `origin` | `mixed` |  |
| `partial_year` | `int` | The cutoff year, which is incomplete. |
| `peptide` | `array` |  |
| `peptide_ids` | `array` |  |
| `permalink` | `string` | Absolute URL. |
| `pmid` | `string` |  |
| `png_url` | `string` | Absolute URL. |
| `publications` | `mixed` |  |
| `published_at` | `string` |  |
| `pubmed_url` | `string` | Absolute URL. |
| `query` | `mixed` | The exact Europe PMC query behind the counts. |
| `regulatory` | `mixed` |  |
| `research_url` | `string` | Absolute URL. |
| `rows` | `array` |  |
| `section` | `int` | State of Peptide Research section that uses it. |
| `slug` | `string` |  |
| `snapshot` | `array` |  |
| `source` | `string` |  |
| `study_type` | `string` |  |
| `study_types` | `array` |  |
| `subtitle` | `string` |  |
| `svg_url` | `string` | Absolute URL. |
| `tier` | `string` | `counts_only`: yearly counts only (a very large, general literature); `excluded`: a blend or comparison entry. |
| `tier_reason` | `mixed` |  |
| `title` | `string` |  |
| `totals` | `mixed` |  |
| `trials` | `mixed` |  |
| `unit` | `string` |  |
| `url` | `string` | Absolute URL. |
| `value` | `mixed` |  |
| `version` | `int` |  |
| `versions` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ResearchStatistic record (throws on error).
$research_statistic = $client->ResearchStatistic()->load(["id" => "research_statistic_id"]);
```

#### Example: List

```php
// list() returns an array of ResearchStatistic entities, one per record (throws on error).
$research_statistics = $client->ResearchStatistic()->list();
```


### Study

Create an instance: `$study = $client->Study();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analog_compound` | `bool` | Research on a related compound, not this one. |
| `authors` | `string` | Not stored by Peptide Library. |
| `citations` | `array` |  |
| `cited_by` | `array` |  |
| `doi` | `mixed` |  |
| `evidence_classification` | `string` |  |
| `evidence_classification_label` | `string` |  |
| `id` | `string` | Stable id from the study's identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none. |
| `journal` | `string` | Not stored by Peptide Library. |
| `limitations` | `array` |  |
| `nct_id` | `mixed` |  |
| `pmid` | `mixed` |  |
| `population` | `mixed` |  |
| `publication_year` | `mixed` |  |
| `research_model` | `string` |  |
| `sample_size` | `mixed` |  |
| `source_url` | `mixed` |  |
| `study_type` | `mixed` |  |
| `summary` | `mixed` | The finding as summarised by Peptide Library editors (dose figures removed). |
| `title` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Study record (throws on error).
$study = $client->Study()->load(["id" => "study_id"]);
```

#### Example: List

```php
// list() returns an array of Study entities, one per record (throws on error).
$studys = $client->Study()->list();
```


### Vendor

Create an instance: `$vendor = $client->Vendor();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `about` | `array` |  |
| `api_url` | `string` | Absolute URL. |
| `catalog` | `array` |  |
| `country` | `mixed` |  |
| `description` | `mixed` |  |
| `id` | `string` | Stable vendor id. |
| `logo_url` | `mixed` |  |
| `name` | `string` |  |
| `product_categories` | `array` |  |
| `profile_url` | `string` | Absolute URL. |
| `rating` | `array` |  |
| `region` | `mixed` |  |
| `reviews` | `array` |  |
| `shipping` | `array` |  |
| `slug` | `string` |  |
| `sources` | `array` |  |
| `website_url` | `string` | Peptide Library link to the vendor's site (may be an affiliate link). |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Vendor record (throws on error).
$vendor = $client->Vendor()->load(["id" => "vendor_id"]);
```

#### Example: List

```php
// list() returns an array of Vendor entities, one per record (throws on error).
$vendors = $client->Vendor()->list();
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── peptidelibrary_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`peptidelibrary_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$vendor = $client->Vendor();
$vendor->list();

// $vendor->data_get() now returns the vendor data from the last list
// $vendor->match_get() returns the last match criteria
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
