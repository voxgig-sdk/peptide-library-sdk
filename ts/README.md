# PeptideLibrary TypeScript SDK



The TypeScript SDK for the PeptideLibrary API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.GetApiIndex()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/peptide-library-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/peptide-library-sdk
npm install ./peptide-library-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { PeptideLibrarySDK } from '@voxgig-sdk/peptide-library-sdk'

const client = new PeptideLibrarySDK({
  apikey: process.env.PEPTIDE_LIBRARY_APIKEY,
})
```

### 3. Load a getapiindex

`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const getapiindex = await client.GetApiIndex().load()
  console.log(getapiindex.data())
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const vendors = await client.Vendor().list()
  console.log(vendors.map((item) => item.data()))
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = PeptideLibrarySDK.test()

const vendors = await client.Vendor().list()
// vendors is an array of Vendor entities, one per mock record
console.log(vendors.map((vendor) => vendor.data()))
```

You can also use the instance method:

```ts
const client = new PeptideLibrarySDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Vendor()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new PeptideLibrarySDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### PeptideLibrarySDK

#### Constructor

```ts
new PeptideLibrarySDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `GetApiIndex(data?)` | `GetApiIndexEntity` | Create a GetApiIndex entity instance. |
| `Meta(data?)` | `MetaEntity` | Create a Meta entity instance. |
| `Price(data?)` | `PriceEntity` | Create a Price entity instance. |
| `Product(data?)` | `ProductEntity` | Create a Product entity instance. |
| `Research(data?)` | `ResearchEntity` | Create a Research entity instance. |
| `ResearchStatistic(data?)` | `ResearchStatisticEntity` | Create a ResearchStatistic entity instance. |
| `Study(data?)` | `StudyEntity` | Create a Study entity instance. |
| `Vendor(data?)` | `VendorEntity` | Create a Vendor entity instance. |
| `tester(testopts?, sdkopts?)` | `PeptideLibrarySDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `PeptideLibrarySDK.test(testopts?, sdkopts?)` | `PeptideLibrarySDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): PeptideLibrarySDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: load.

API path: `/`

#### Meta

| Field | Description |
| --- | --- |
| `database` |  |
| `release` |  |
| `status` |  |

Operations: load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

API path: `/vendors/{id}/prices`



## Entities


### GetApiIndex

Create an instance: `const get_api_index = client.GetApiIndex()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `documentation` | `string` | Absolute URL. |
| `endpoints` | `any[]` |  |
| `name` | `string` |  |
| `openapi` | `string` | Absolute URL. |
| `release` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```ts
const get_api_index = await client.GetApiIndex().load()
```


### Meta

Create an instance: `const meta = client.Meta()`

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

```ts
const meta = await client.Meta().load()
```


### Price

Create an instance: `const price = client.Price()`

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
| `peptide` | `Record<string, any>` |  |
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
| `strength` | `Record<string, any>` |  |
| `vendor` | `Record<string, any>` |  |

#### Example: Load

```ts
const price = await client.Price().load({ peptide: 'peptide' })
```

#### Example: List

```ts
const prices = await client.Price().list()
```


### Product

Create an instance: `const product = client.Product()`

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
| `peptide` | `Record<string, any>` |  |
| `prices` | `any[]` | Per currency, never converted or mixed. |
| `product_type` | `string` |  |
| `vendor_count` | `number` |  |

#### Example: Load

```ts
const product = await client.Product().load({ id: 'product_id' })
```

#### Example: List

```ts
const products = await client.Product().list()
```


### Research

Create an instance: `const research = client.Research()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `also_known_as` | `any[]` |  |
| `api_url` | `string` | Absolute URL. |
| `approved_medicine` | `boolean` | True only when the recorded FDA status is Approved. |
| `availability` | `any` |  |
| `categories` | `any[]` |  |
| `classification` | `Record<string, any>` |  |
| `clinical_evidence` | `Record<string, any>` |  |
| `conflict` | `any` |  |
| `content` | `any[]` |  |
| `content_reviewed_at` | `any` |  |
| `content_total` | `number` |  |
| `description` | `string` |  |
| `development_stage` | `any` |  |
| `evidence` | `Record<string, any>` |  |
| `fda_status` | `any` |  |
| `id` | `string` |  |
| `label` | `string` |  |
| `last_reviewed` | `any` |  |
| `library_classification` | `any` |  |
| `limitations` | `any[]` |  |
| `links` | `Record<string, any>` |  |
| `mechanism` | `Record<string, any>` |  |
| `mechanisms` | `Record<string, any>` |  |
| `name` | `string` |  |
| `note` | `string` |  |
| `notes` | `any[]` |  |
| `peptide` | `Record<string, any>` |  |
| `peptide_count` | `number` |  |
| `peptide_total` | `number` |  |
| `peptides` | `any[]` |  |
| `preclinical_evidence` | `Record<string, any>` |  |
| `properties` | `Record<string, any>` |  |
| `query` | `string` |  |
| `references` | `any[]` |  |
| `regulatory` | `Record<string, any>` |  |
| `regulatory_evidence` | `any[]` |  |
| `regulatory_status` | `string` | Regulatory class read from the profile's FDA status. |
| `regulatory_status_label` | `string` |  |
| `research_areas` | `any[]` |  |
| `research_gaps` | `any[]` | Evidence steps with no documented source in the profile. |
| `research_topics` | `any[]` |  |
| `review` | `Record<string, any>` |  |
| `safety` | `Record<string, any>` |  |
| `secondary_reports` | `Record<string, any>` |  |
| `statement` | `any` |  |
| `summary` | `any` |  |
| `unavailable_sources` | `any[]` |  |
| `url` | `string` | Absolute URL. |
| `wada_status` | `any` |  |

#### Example: Load

```ts
const research = await client.Research().load({ slug: 'slug' })
```

#### Example: List

```ts
const researchs = await client.Research().list()
```


### ResearchStatistic

Create an instance: `const research_statistic = client.ResearchStatistic()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `by_year` | `any[]` |  |
| `categories` | `any[]` |  |
| `chart_url` | `any` |  |
| `citation` | `string` |  |
| `columns` | `any[]` |  |
| `definition` | `string` |  |
| `denominator` | `number | null` |  |
| `denominator_definition` | `string | null` |  |
| `description` | `string` |  |
| `detail` | `any` | Rankings (array of rows) or comparison detail (object); null when none. |
| `doi` | `string | null` |  |
| `doi_url` | `any` |  |
| `embed_url` | `string` | Absolute URL. |
| `evidence_class` | `string` |  |
| `filters` | `Record<string, any>` |  |
| `first_pub_date` | `string` |  |
| `flags` | `any[]` | Caveats: partial_year, small_baseline, high_unclassified, whole_months_only, no_denominator. |
| `groups` | `any[]` |  |
| `how_to_read` | `string` |  |
| `id` | `string` | `pmid-` + the PubMed id. |
| `is_peptide` | `boolean` |  |
| `journal` | `string | null` |  |
| `key_publications` | `any[]` |  |
| `kind` | `string` |  |
| `label` | `string` |  |
| `license` | `Record<string, any>` |  |
| `limitations` | `any[]` |  |
| `mesh_roots` | `any[]` |  |
| `methodology_url` | `string` | Absolute URL. |
| `metric` | `string` |  |
| `min_baseline` | `any` |  |
| `name` | `string` |  |
| `numerator` | `number | null` |  |
| `numerator_definition` | `string | null` |  |
| `open_access` | `boolean | null` |  |
| `origin` | `string | null` |  |
| `partial_year` | `number` | The cutoff year, which is incomplete. |
| `peptide` | `Record<string, any>` |  |
| `peptide_ids` | `any[]` |  |
| `permalink` | `string` | Absolute URL. |
| `pmid` | `string` |  |
| `png_url` | `string` | Absolute URL. |
| `publications` | `any` |  |
| `published_at` | `string` |  |
| `pubmed_url` | `string` | Absolute URL. |
| `query` | `string | null` | The exact Europe PMC query behind the counts. |
| `regulatory` | `string | null` |  |
| `research_url` | `string` | Absolute URL. |
| `rows` | `any[]` |  |
| `section` | `number` | State of Peptide Research section that uses it. |
| `slug` | `string` |  |
| `snapshot` | `Record<string, any>` |  |
| `source` | `string` |  |
| `study_type` | `string` |  |
| `study_types` | `any[]` |  |
| `subtitle` | `string` |  |
| `svg_url` | `string` | Absolute URL. |
| `tier` | `string` | `counts_only`: yearly counts only (a very large, general literature); `excluded`: a blend or comparison entry. |
| `tier_reason` | `string | null` |  |
| `title` | `string` |  |
| `totals` | `any` |  |
| `trials` | `any` |  |
| `unit` | `string` |  |
| `url` | `string` | Absolute URL. |
| `value` | `number | null` |  |
| `version` | `number` |  |
| `versions` | `any[]` |  |

#### Example: Load

```ts
const research_statistic = await client.ResearchStatistic().load({ id: 'research_statistic_id' })
```

#### Example: List

```ts
const research_statistics = await client.ResearchStatistic().list()
```


### Study

Create an instance: `const study = client.Study()`

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
| `citations` | `any[]` |  |
| `cited_by` | `any[]` |  |
| `doi` | `string | null` |  |
| `evidence_classification` | `string` |  |
| `evidence_classification_label` | `string` |  |
| `id` | `string` | Stable id from the study's identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none. |
| `journal` | `string` | Not stored by Peptide Library. |
| `limitations` | `any[]` |  |
| `nct_id` | `string | null` |  |
| `pmid` | `string | null` |  |
| `population` | `any` |  |
| `publication_year` | `any` |  |
| `research_model` | `string` |  |
| `sample_size` | `any` |  |
| `source_url` | `any` |  |
| `study_type` | `any` |  |
| `summary` | `any` | The finding as summarised by Peptide Library editors (dose figures removed). |
| `title` | `string` |  |

#### Example: Load

```ts
const study = await client.Study().load({ id: 'study_id' })
```

#### Example: List

```ts
const studys = await client.Study().list()
```


### Vendor

Create an instance: `const vendor = client.Vendor()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `about` | `Record<string, any>` |  |
| `api_url` | `string` | Absolute URL. |
| `catalog` | `Record<string, any>` |  |
| `country` | `any` |  |
| `description` | `string | null` |  |
| `id` | `string` | Stable vendor id. |
| `logo_url` | `any` |  |
| `name` | `string` |  |
| `product_categories` | `any[]` |  |
| `profile_url` | `string` | Absolute URL. |
| `rating` | `Record<string, any>` |  |
| `region` | `string | null` |  |
| `reviews` | `Record<string, any>` |  |
| `shipping` | `Record<string, any>` |  |
| `slug` | `string` |  |
| `sources` | `Record<string, any>` |  |
| `website_url` | `string` | Peptide Library link to the vendor's site (may be an affiliate link). |

#### Example: Load

```ts
const vendor = await client.Vendor().load({ id: 'vendor_id' })
```

#### Example: List

```ts
const vendors = await client.Vendor().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
peptide-library/
├── src/
│   ├── PeptideLibrarySDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { PeptideLibrarySDK } from '@voxgig-sdk/peptide-library-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const vendor = client.Vendor()
await vendor.list()

// vendor.data() now returns the vendor data from the last `list`
// vendor.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
