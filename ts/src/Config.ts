
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'PeptideLibrary',
        slug: "peptide-library",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "now": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.peptidelibrary.app/v1",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        get_api_index: {
        },
  
        meta: {
        },
  
        price: {
        },
  
        product: {
        },
  
        research: {
        },
  
        research_statistic: {
        },
  
        study: {
        },
  
        vendor: {
        },
  
    }
  }


  entity = {
    "get_api_index": {
      "fields": [
        {
          "name": "documentation",
          "title": "Documentation",
          "type": "`$STRING`",
          "req": true,
          "short": "Absolute URL."
        },
        {
          "name": "endpoints",
          "title": "Endpoints",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "openapi",
          "title": "Openapi",
          "type": "`$STRING`",
          "req": true,
          "short": "Absolute URL."
        },
        {
          "name": "release",
          "title": "Release",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "version",
          "title": "Version",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "name": "get_api_index",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/",
              "segments": [],
              "parts": [],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "meta": {
      "fields": [
        {
          "name": "database",
          "title": "Database",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "release",
          "title": "Release",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "name": "meta",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/health",
              "segments": [
                {
                  "lit": "health"
                }
              ],
              "parts": [
                "health"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.meta`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "price": {
      "fields": [
        {
          "name": "availability",
          "title": "Availability",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "currency",
          "title": "Currency",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "first_seen_at",
          "title": "First Seen At",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "form",
          "title": "Form",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "Offer id."
        },
        {
          "name": "is_affiliate_link",
          "title": "Is Affiliate Link",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "is_stale",
          "title": "Is Stale",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "True when not seen in the last 7 days."
        },
        {
          "name": "last_seen_at",
          "title": "Last Seen At",
          "type": "`$ANY`",
          "req": true,
          "short": "When the price was last seen on the vendor's site."
        },
        {
          "name": "peptide",
          "title": "Peptide",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "price",
          "title": "Price",
          "type": "`$STRING`",
          "req": true,
          "short": "Decimal amount as a string, never a float."
        },
        {
          "name": "price_changed_at",
          "title": "Price Changed At",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "price_per_mg",
          "title": "Price Per Mg",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "price_per_unit",
          "title": "Price Per Unit",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "product_id",
          "title": "Product Id",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "product_name",
          "title": "Product Name",
          "type": "`$STRING`",
          "req": true,
          "short": "As the vendor lists it."
        },
        {
          "name": "product_page_url",
          "title": "Product Page Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Peptide Library redirect to the vendor's page; logs the click."
        },
        {
          "name": "product_type",
          "title": "Product Type",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "regular_price",
          "title": "Regular Price",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "ships_to",
          "title": "Ships To",
          "type": "`$ANY`",
          "req": true,
          "short": "Shipping to the `ships_to` destination you asked about; null when you didn't ask."
        },
        {
          "name": "strength",
          "title": "Strength",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "vendor",
          "title": "Vendor",
          "type": "`$OBJECT`",
          "req": true
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "price",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/prices",
              "segments": [
                {
                  "lit": "prices"
                }
              ],
              "parts": [
                "prices"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "category",
                    "orig": "category",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "peptides"
                  },
                  {
                    "name": "currency",
                    "orig": "currency",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "USD",
                    "field": true
                  },
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "field",
                    "orig": "fields",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "id,product_id,product_name"
                  },
                  {
                    "name": "form",
                    "orig": "form",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "vial",
                    "field": true
                  },
                  {
                    "name": "in_stock",
                    "orig": "in_stock",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 20
                  },
                  {
                    "name": "peptide",
                    "orig": "peptide",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "bpc-157",
                    "field": true
                  },
                  {
                    "name": "price_max",
                    "orig": "price_max",
                    "type": "`$NUMBER`",
                    "kind": "query"
                  },
                  {
                    "name": "price_min",
                    "orig": "price_min",
                    "type": "`$NUMBER`",
                    "kind": "query"
                  },
                  {
                    "name": "product",
                    "orig": "product",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "ships_to",
                    "orig": "ships_to",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "US",
                    "field": true
                  },
                  {
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "strength_max_mg",
                    "orig": "strength_max_mg",
                    "type": "`$NUMBER`",
                    "kind": "query"
                  },
                  {
                    "name": "strength_min_mg",
                    "orig": "strength_min_mg",
                    "type": "`$NUMBER`",
                    "kind": "query"
                  },
                  {
                    "name": "vendor",
                    "orig": "vendor",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/prices/compare",
              "segments": [
                {
                  "lit": "prices"
                },
                {
                  "lit": "compare"
                }
              ],
              "parts": [
                "prices",
                "compare"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "currency",
                    "orig": "currency",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "form",
                    "orig": "form",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "in_stock",
                    "orig": "in_stock",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "peptide",
                    "orig": "peptide",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "bpc-157",
                    "field": true
                  },
                  {
                    "name": "ships_to",
                    "orig": "ships_to",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "US",
                    "field": true
                  }
                ]
              },
              "select": {
                "$action": "compare",
                "exist": [
                  "peptide"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "product": {
      "fields": [
        {
          "name": "api_url",
          "title": "Api Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Absolute URL."
        },
        {
          "name": "form",
          "title": "Form",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "Compound and form, e.g."
        },
        {
          "name": "in_stock_count",
          "title": "In Stock Count",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "last_seen_at",
          "title": "Last Seen At",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "offer_count",
          "title": "Offer Count",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "offers",
          "title": "Offers",
          "type": "`$ANY`",
          "req": true,
          "short": "With the `pricing:read` scope; otherwise null."
        },
        {
          "name": "peptide",
          "title": "Peptide",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "prices",
          "title": "Prices",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Per currency, never converted or mixed."
        },
        {
          "name": "product_type",
          "title": "Product Type",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "vendor_count",
          "title": "Vendor Count",
          "type": "`$INTEGER`",
          "req": true
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "product",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/products",
              "segments": [
                {
                  "lit": "products"
                }
              ],
              "parts": [
                "products"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "category",
                    "orig": "category",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "peptides"
                  },
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "field",
                    "orig": "fields",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "id,peptide,form"
                  },
                  {
                    "name": "form",
                    "orig": "form",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "vial",
                    "field": true
                  },
                  {
                    "name": "in_stock",
                    "orig": "in_stock",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 20
                  },
                  {
                    "name": "peptide",
                    "orig": "peptide",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "bpc-157",
                    "field": true
                  },
                  {
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "ships_to",
                    "orig": "ships_to",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "US"
                  },
                  {
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "vendor",
                    "orig": "vendor",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/products/{id}",
              "segments": [
                {
                  "lit": "products"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "products",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "bpc-157::vial"
                  }
                ],
                "query": [
                  {
                    "name": "ships_to",
                    "orig": "ships_to",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "US"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "research": {
      "fields": [
        {
          "name": "also_known_as",
          "title": "Also Known As",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "api_url",
          "title": "Api Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Absolute URL."
        },
        {
          "name": "approved_medicine",
          "title": "Approved Medicine",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "True only when the recorded FDA status is Approved."
        },
        {
          "name": "availability",
          "title": "Availability",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "categories",
          "title": "Categories",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "classification",
          "title": "Classification",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "clinical_evidence",
          "title": "Clinical Evidence",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "conflict",
          "title": "Conflict",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "content",
          "title": "Content",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "content_reviewed_at",
          "title": "Content Reviewed At",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "content_total",
          "title": "Content Total",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "development_stage",
          "title": "Development Stage",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "evidence",
          "title": "Evidence",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "fda_status",
          "title": "Fda Status",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "label",
          "title": "Label",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "last_reviewed",
          "title": "Last Reviewed",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "library_classification",
          "title": "Library Classification",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "limitations",
          "title": "Limitations",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "links",
          "title": "Links",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "mechanism",
          "title": "Mechanism",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "mechanisms",
          "title": "Mechanisms",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "note",
          "title": "Note",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "notes",
          "title": "Notes",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "peptide",
          "title": "Peptide",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "peptide_count",
          "title": "Peptide Count",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "peptide_total",
          "title": "Peptide Total",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "peptides",
          "title": "Peptides",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "preclinical_evidence",
          "title": "Preclinical Evidence",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "properties",
          "title": "Properties",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "query",
          "title": "Query",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "references",
          "title": "References",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "regulatory",
          "title": "Regulatory",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "regulatory_evidence",
          "title": "Regulatory Evidence",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "regulatory_status",
          "title": "Regulatory Status",
          "type": "`$STRING`",
          "req": true,
          "short": "Regulatory class read from the profile's FDA status."
        },
        {
          "name": "regulatory_status_label",
          "title": "Regulatory Status Label",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "research_areas",
          "title": "Research Areas",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "research_gaps",
          "title": "Research Gaps",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Evidence steps with no documented source in the profile."
        },
        {
          "name": "research_topics",
          "title": "Research Topics",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "review",
          "title": "Review",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "safety",
          "title": "Safety",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "secondary_reports",
          "title": "Secondary Reports",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "statement",
          "title": "Statement",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "summary",
          "title": "Summary",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "unavailable_sources",
          "title": "Unavailable Sources",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Absolute URL."
        },
        {
          "name": "wada_status",
          "title": "Wada Status",
          "type": "`$ANY`",
          "req": true
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "research",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/categories",
              "segments": [
                {
                  "lit": "categories"
                }
              ],
              "parts": [
                "categories"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/peptides",
              "segments": [
                {
                  "lit": "peptides"
                }
              ],
              "parts": [
                "peptides"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "category",
                    "orig": "category",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "evidence_level",
                    "orig": "evidence_level",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "field",
                    "orig": "fields",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "id,name,also_known_as"
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 20
                  },
                  {
                    "name": "regulatory_status",
                    "orig": "regulatory_status",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "research_area",
                    "orig": "research_area",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "bpc"
                  },
                  {
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/research-areas",
              "segments": [
                {
                  "lit": "research-areas"
                }
              ],
              "parts": [
                "research-areas"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 20
                  },
                  {
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/search",
              "segments": [
                {
                  "lit": "search"
                }
              ],
              "parts": [
                "search"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 10
                  },
                  {
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "glp-1"
                  },
                  {
                    "name": "type",
                    "orig": "types",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "q"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/peptides/{slug}",
              "segments": [
                {
                  "lit": "peptides"
                },
                {
                  "var": "slug"
                }
              ],
              "parts": [
                "peptides",
                "{slug}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "slug",
                    "orig": "slug",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "bpc-157"
                  }
                ]
              },
              "select": {
                "exist": [
                  "slug"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/peptides/{slug}/research",
              "segments": [
                {
                  "lit": "peptides"
                },
                {
                  "var": "slug"
                },
                {
                  "lit": "research"
                }
              ],
              "parts": [
                "peptides",
                "{slug}",
                "research"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "slug",
                    "orig": "slug",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "bpc-157"
                  }
                ]
              },
              "select": {
                "exist": [
                  "slug"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/regulatory-status/{slug}",
              "segments": [
                {
                  "lit": "regulatory-status"
                },
                {
                  "var": "slug"
                }
              ],
              "parts": [
                "regulatory-status",
                "{slug}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "slug",
                    "orig": "slug",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "bpc-157"
                  }
                ]
              },
              "select": {
                "exist": [
                  "slug"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "research_statistic": {
      "fields": [
        {
          "name": "by_year",
          "title": "By Year",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "categories",
          "title": "Categories",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "chart_url",
          "title": "Chart Url",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "citation",
          "title": "Citation",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "columns",
          "title": "Columns",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "definition",
          "title": "Definition",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "denominator",
          "title": "Denominator",
          "type": [
            "`$ONE`",
            [
              "`$NUMBER`",
              "`$NULL`"
            ]
          ],
          "req": true
        },
        {
          "name": "denominator_definition",
          "title": "Denominator Definition",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "detail",
          "title": "Detail",
          "type": "`$ANY`",
          "req": true,
          "short": "Rankings (array of rows) or comparison detail (object); null when none."
        },
        {
          "name": "doi",
          "title": "Doi",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true
        },
        {
          "name": "doi_url",
          "title": "Doi Url",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "embed_url",
          "title": "Embed Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Absolute URL."
        },
        {
          "name": "evidence_class",
          "title": "Evidence Class",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "filters",
          "title": "Filters",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "first_pub_date",
          "title": "First Pub Date",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "flags",
          "title": "Flags",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Caveats: partial_year, small_baseline, high_unclassified, whole_months_only, no_denominator."
        },
        {
          "name": "groups",
          "title": "Groups",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "how_to_read",
          "title": "How To Read",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "`pmid-` + the PubMed id."
        },
        {
          "name": "is_peptide",
          "title": "Is Peptide",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "journal",
          "title": "Journal",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true
        },
        {
          "name": "key_publications",
          "title": "Key Publications",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "kind",
          "title": "Kind",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "label",
          "title": "Label",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "license",
          "title": "License",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "limitations",
          "title": "Limitations",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "mesh_roots",
          "title": "Mesh Roots",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "methodology_url",
          "title": "Methodology Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Absolute URL."
        },
        {
          "name": "metric",
          "title": "Metric",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "min_baseline",
          "title": "Min Baseline",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "numerator",
          "title": "Numerator",
          "type": [
            "`$ONE`",
            [
              "`$NUMBER`",
              "`$NULL`"
            ]
          ],
          "req": true
        },
        {
          "name": "numerator_definition",
          "title": "Numerator Definition",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true
        },
        {
          "name": "open_access",
          "title": "Open Access",
          "type": [
            "`$ONE`",
            [
              "`$BOOLEAN`",
              "`$NULL`"
            ]
          ],
          "req": true
        },
        {
          "name": "origin",
          "title": "Origin",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true
        },
        {
          "name": "partial_year",
          "title": "Partial Year",
          "type": "`$INTEGER`",
          "req": true,
          "short": "The cutoff year, which is incomplete."
        },
        {
          "name": "peptide",
          "title": "Peptide",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "peptide_ids",
          "title": "Peptide Ids",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "permalink",
          "title": "Permalink",
          "type": "`$STRING`",
          "req": true,
          "short": "Absolute URL."
        },
        {
          "name": "pmid",
          "title": "Pmid",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "png_url",
          "title": "Png Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Absolute URL."
        },
        {
          "name": "publications",
          "title": "Publications",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "published_at",
          "title": "Published At",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "pubmed_url",
          "title": "Pubmed Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Absolute URL."
        },
        {
          "name": "query",
          "title": "Query",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The exact Europe PMC query behind the counts."
        },
        {
          "name": "regulatory",
          "title": "Regulatory",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true
        },
        {
          "name": "research_url",
          "title": "Research Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Absolute URL."
        },
        {
          "name": "rows",
          "title": "Rows",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "section",
          "title": "Section",
          "type": "`$INTEGER`",
          "req": true,
          "short": "State of Peptide Research section that uses it."
        },
        {
          "name": "slug",
          "title": "Slug",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "snapshot",
          "title": "Snapshot",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "source",
          "title": "Source",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "study_type",
          "title": "Study Type",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "study_types",
          "title": "Study Types",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "subtitle",
          "title": "Subtitle",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "svg_url",
          "title": "Svg Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Absolute URL."
        },
        {
          "name": "tier",
          "title": "Tier",
          "type": "`$STRING`",
          "req": true,
          "short": "`counts_only`: yearly counts only (a very large, general literature); `excluded`: a blend or comparison entry."
        },
        {
          "name": "tier_reason",
          "title": "Tier Reason",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "totals",
          "title": "Totals",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "trials",
          "title": "Trials",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "unit",
          "title": "Unit",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Absolute URL."
        },
        {
          "name": "value",
          "title": "Value",
          "type": [
            "`$ONE`",
            [
              "`$NUMBER`",
              "`$NULL`"
            ]
          ],
          "req": true
        },
        {
          "name": "version",
          "title": "Version",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "versions",
          "title": "Versions",
          "type": "`$ARRAY`",
          "req": true
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "research_statistic",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/research/categories",
              "segments": [
                {
                  "lit": "research"
                },
                {
                  "lit": "categories"
                }
              ],
              "parts": [
                "research",
                "categories"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "version",
                    "orig": "version",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "latest",
                    "field": true
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/research/datasets",
              "segments": [
                {
                  "lit": "research"
                },
                {
                  "lit": "datasets"
                }
              ],
              "parts": [
                "research",
                "datasets"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/research/publications",
              "segments": [
                {
                  "lit": "research"
                },
                {
                  "lit": "publications"
                }
              ],
              "parts": [
                "research",
                "publications"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "category",
                    "orig": "category",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "evidence_class",
                    "orig": "evidence_class",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "field",
                    "orig": "fields",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "id,pmid,doi"
                  },
                  {
                    "name": "group",
                    "orig": "group",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "glp1"
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 25
                  },
                  {
                    "name": "peptide",
                    "orig": "peptide",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "semaglutide",
                    "field": true
                  },
                  {
                    "name": "regulatory",
                    "orig": "regulatory",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "study_type",
                    "orig": "study_type",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "version",
                    "orig": "version",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "latest",
                    "field": true
                  },
                  {
                    "name": "year",
                    "orig": "year",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/research/reports",
              "segments": [
                {
                  "lit": "research"
                },
                {
                  "lit": "reports"
                }
              ],
              "parts": [
                "research",
                "reports"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/research/statistics",
              "segments": [
                {
                  "lit": "research"
                },
                {
                  "lit": "statistics"
                }
              ],
              "parts": [
                "research",
                "statistics"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 50
                  },
                  {
                    "name": "section",
                    "orig": "section",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "version",
                    "orig": "version",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "latest",
                    "field": true
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/research/charts/{id}",
              "segments": [
                {
                  "lit": "research"
                },
                {
                  "lit": "charts"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "research",
                "charts",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "publications-by-year"
                  }
                ],
                "query": [
                  {
                    "name": "version",
                    "orig": "version",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "latest",
                    "field": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/research/statistics/{id}",
              "segments": [
                {
                  "lit": "research"
                },
                {
                  "lit": "statistics"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "research",
                "statistics",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "total_publications"
                  }
                ],
                "query": [
                  {
                    "name": "version",
                    "orig": "version",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "latest",
                    "field": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/research/trends",
              "segments": [
                {
                  "lit": "research"
                },
                {
                  "lit": "trends"
                }
              ],
              "parts": [
                "research",
                "trends"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "category",
                    "orig": "category",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "evidence_class",
                    "orig": "evidence_class",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "from_year",
                    "orig": "from_year",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "group",
                    "orig": "group",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "glp1"
                  },
                  {
                    "name": "metric",
                    "orig": "metric",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "publications_by_year",
                    "field": true
                  },
                  {
                    "name": "peptide",
                    "orig": "peptide",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "semaglutide",
                    "field": true
                  },
                  {
                    "name": "regulatory",
                    "orig": "regulatory",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "study_type",
                    "orig": "study_type",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "to_year",
                    "orig": "to_year",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "version",
                    "orig": "version",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "latest",
                    "field": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "metric"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/research/peptides/{slug}/statistics",
              "segments": [
                {
                  "lit": "research"
                },
                {
                  "lit": "peptides"
                },
                {
                  "var": "slug"
                },
                {
                  "lit": "statistics"
                }
              ],
              "parts": [
                "research",
                "peptides",
                "{slug}",
                "statistics"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "slug",
                    "orig": "slug",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "bpc-157"
                  }
                ],
                "query": [
                  {
                    "name": "version",
                    "orig": "version",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "latest",
                    "field": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "slug"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "study": {
      "fields": [
        {
          "name": "analog_compound",
          "title": "Analog Compound",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Research on a related compound, not this one."
        },
        {
          "name": "authors",
          "title": "Authors",
          "type": "`$STRING`",
          "req": true,
          "short": "Not stored by Peptide Library."
        },
        {
          "name": "citations",
          "title": "Citations",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "cited_by",
          "title": "Cited By",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "doi",
          "title": "Doi",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true
        },
        {
          "name": "evidence_classification",
          "title": "Evidence Classification",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "evidence_classification_label",
          "title": "Evidence Classification Label",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "Stable id from the study's identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none."
        },
        {
          "name": "journal",
          "title": "Journal",
          "type": "`$STRING`",
          "req": true,
          "short": "Not stored by Peptide Library."
        },
        {
          "name": "limitations",
          "title": "Limitations",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "nct_id",
          "title": "Nct Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true
        },
        {
          "name": "pmid",
          "title": "Pmid",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true
        },
        {
          "name": "population",
          "title": "Population",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "publication_year",
          "title": "Publication Year",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "research_model",
          "title": "Research Model",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "sample_size",
          "title": "Sample Size",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "source_url",
          "title": "Source Url",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "study_type",
          "title": "Study Type",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "summary",
          "title": "Summary",
          "type": "`$ANY`",
          "req": true,
          "short": "The finding as summarised by Peptide Library editors (dose figures removed)."
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "study",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/peptides/{slug}/studies",
              "segments": [
                {
                  "lit": "peptides"
                },
                {
                  "var": "slug"
                },
                {
                  "lit": "studies"
                }
              ],
              "parts": [
                "peptides",
                "{slug}",
                "studies"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "slug",
                    "orig": "slug",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "bpc-157"
                  }
                ]
              },
              "select": {
                "exist": [
                  "slug"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/studies",
              "segments": [
                {
                  "lit": "studies"
                }
              ],
              "parts": [
                "studies"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "evidence_classification",
                    "orig": "evidence_classification",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "human_controlled_trial",
                    "field": true
                  },
                  {
                    "name": "field",
                    "orig": "fields",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "id,title,publication_year"
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 20
                  },
                  {
                    "name": "peptide",
                    "orig": "peptide",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "semaglutide"
                  },
                  {
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "year_from",
                    "orig": "year_from",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "year_to",
                    "orig": "year_to",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/studies/{id}",
              "segments": [
                {
                  "lit": "studies"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "studies",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "pmid-33567185"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "vendor": {
      "fields": [
        {
          "name": "about",
          "title": "About",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "api_url",
          "title": "Api Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Absolute URL."
        },
        {
          "name": "catalog",
          "title": "Catalog",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "country",
          "title": "Country",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "description",
          "title": "Description",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "Stable vendor id."
        },
        {
          "name": "logo_url",
          "title": "Logo Url",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "product_categories",
          "title": "Product Categories",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "profile_url",
          "title": "Profile Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Absolute URL."
        },
        {
          "name": "rating",
          "title": "Rating",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "region",
          "title": "Region",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true
        },
        {
          "name": "reviews",
          "title": "Reviews",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "shipping",
          "title": "Shipping",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "slug",
          "title": "Slug",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "sources",
          "title": "Sources",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "website_url",
          "title": "Website Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Peptide Library link to the vendor's site (may be an affiliate link)."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "vendor",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/vendors/{id}/prices",
              "segments": [
                {
                  "lit": "vendors"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "prices"
                }
              ],
              "parts": [
                "vendors",
                "{id}",
                "prices"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "8"
                  }
                ],
                "query": [
                  {
                    "name": "category",
                    "orig": "category",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "peptides"
                  },
                  {
                    "name": "currency",
                    "orig": "currency",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "USD"
                  },
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "field",
                    "orig": "fields",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "id,product_id,product_name"
                  },
                  {
                    "name": "form",
                    "orig": "form",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "vial"
                  },
                  {
                    "name": "in_stock",
                    "orig": "in_stock",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 20
                  },
                  {
                    "name": "peptide",
                    "orig": "peptide",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "bpc-157"
                  },
                  {
                    "name": "price_max",
                    "orig": "price_max",
                    "type": "`$NUMBER`",
                    "kind": "query"
                  },
                  {
                    "name": "price_min",
                    "orig": "price_min",
                    "type": "`$NUMBER`",
                    "kind": "query"
                  },
                  {
                    "name": "product",
                    "orig": "product",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "ships_to",
                    "orig": "ships_to",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "US"
                  },
                  {
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "strength_max_mg",
                    "orig": "strength_max_mg",
                    "type": "`$NUMBER`",
                    "kind": "query"
                  },
                  {
                    "name": "strength_min_mg",
                    "orig": "strength_min_mg",
                    "type": "`$NUMBER`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "$action": "price",
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/vendors/{id}/products",
              "segments": [
                {
                  "lit": "vendors"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "products"
                }
              ],
              "parts": [
                "vendors",
                "{id}",
                "products"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "8"
                  }
                ],
                "query": [
                  {
                    "name": "category",
                    "orig": "category",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "peptides"
                  },
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "field",
                    "orig": "fields",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "id,peptide,form"
                  },
                  {
                    "name": "form",
                    "orig": "form",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "vial"
                  },
                  {
                    "name": "in_stock",
                    "orig": "in_stock",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 20
                  },
                  {
                    "name": "peptide",
                    "orig": "peptide",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "bpc-157"
                  },
                  {
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "ships_to",
                    "orig": "ships_to",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "US"
                  },
                  {
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "$action": "product",
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/vendors",
              "segments": [
                {
                  "lit": "vendors"
                }
              ],
              "parts": [
                "vendors"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "US",
                    "field": true
                  },
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "field",
                    "orig": "fields",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "id,slug,name"
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 20
                  },
                  {
                    "name": "min_rating",
                    "orig": "min_rating",
                    "type": "`$NUMBER`",
                    "kind": "query"
                  },
                  {
                    "name": "peptide",
                    "orig": "peptide",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "product_category",
                    "orig": "product_category",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "ships_to",
                    "orig": "ships_to",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "US"
                  },
                  {
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/vendors/{id}",
              "segments": [
                {
                  "lit": "vendors"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "vendors",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "8"
                  }
                ],
                "query": [
                  {
                    "name": "ships_to",
                    "orig": "ships_to",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "US"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/vendors/compare",
              "segments": [
                {
                  "lit": "vendors"
                },
                {
                  "lit": "compare"
                }
              ],
              "parts": [
                "vendors",
                "compare"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "ids",
                    "orig": "ids",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "8,13"
                  },
                  {
                    "name": "ships_to",
                    "orig": "ships_to",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "US"
                  }
                ]
              },
              "select": {
                "$action": "compare",
                "exist": [
                  "ids"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/vendors/{id}/shipping",
              "segments": [
                {
                  "lit": "vendors"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "shipping"
                }
              ],
              "parts": [
                "vendors",
                "{id}",
                "shipping"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "8"
                  }
                ],
                "query": [
                  {
                    "name": "ships_to",
                    "orig": "ships_to",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "US"
                  }
                ]
              },
              "select": {
                "$action": "shipping",
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

