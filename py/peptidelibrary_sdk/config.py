# PeptideLibrary SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "PeptideLibrary",
            "slug": "peptide-library",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.peptidelibrary.app/v1",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "get_api_index": {},
                "meta": {},
                "price": {},
                "product": {},
                "research": {},
                "research_statistic": {},
                "study": {},
                "vendor": {},
            },
        },
        "entity": {
      "get_api_index": {
        "fields": [
          {
            "name": "documentation",
            "title": "Documentation",
            "type": "`$STRING`",
            "req": True,
            "short": "Absolute URL.",
          },
          {
            "name": "endpoints",
            "title": "Endpoints",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "openapi",
            "title": "Openapi",
            "type": "`$STRING`",
            "req": True,
            "short": "Absolute URL.",
          },
          {
            "name": "release",
            "title": "Release",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$STRING`",
            "req": True,
          },
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
                  "res": "`body.data`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "meta": {
        "fields": [
          {
            "name": "database",
            "title": "Database",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "release",
            "title": "Release",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
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
                    "lit": "health",
                  },
                ],
                "parts": [
                  "health",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.meta`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "price": {
        "fields": [
          {
            "name": "availability",
            "title": "Availability",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "currency",
            "title": "Currency",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "first_seen_at",
            "title": "First Seen At",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "form",
            "title": "Form",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Offer id.",
          },
          {
            "name": "is_affiliate_link",
            "title": "Is Affiliate Link",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "is_stale",
            "title": "Is Stale",
            "type": "`$BOOLEAN`",
            "req": True,
            "short": "True when not seen in the last 7 days.",
          },
          {
            "name": "last_seen_at",
            "title": "Last Seen At",
            "type": "`$ANY`",
            "req": True,
            "short": "When the price was last seen on the vendor's site.",
          },
          {
            "name": "peptide",
            "title": "Peptide",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "price",
            "title": "Price",
            "type": "`$STRING`",
            "req": True,
            "short": "Decimal amount as a string, never a float.",
          },
          {
            "name": "price_changed_at",
            "title": "Price Changed At",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "price_per_mg",
            "title": "Price Per Mg",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "price_per_unit",
            "title": "Price Per Unit",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "product_id",
            "title": "Product Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "product_name",
            "title": "Product Name",
            "type": "`$STRING`",
            "req": True,
            "short": "As the vendor lists it.",
          },
          {
            "name": "product_page_url",
            "title": "Product Page Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Peptide Library redirect to the vendor's page; logs the click.",
          },
          {
            "name": "product_type",
            "title": "Product Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "regular_price",
            "title": "Regular Price",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "ships_to",
            "title": "Ships To",
            "type": "`$ANY`",
            "req": True,
            "short": "Shipping to the `ships_to` destination you asked about; null when you didn't ask.",
          },
          {
            "name": "strength",
            "title": "Strength",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "vendor",
            "title": "Vendor",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "prices",
                  },
                ],
                "parts": [
                  "prices",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "peptides",
                    },
                    {
                      "name": "currency",
                      "orig": "currency",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "USD",
                      "field": True,
                    },
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "field",
                      "orig": "fields",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "id,product_id,product_name",
                    },
                    {
                      "name": "form",
                      "orig": "form",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "vial",
                      "field": True,
                    },
                    {
                      "name": "in_stock",
                      "orig": "in_stock",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "peptide",
                      "orig": "peptide",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "bpc-157",
                      "field": True,
                    },
                    {
                      "name": "price_max",
                      "orig": "price_max",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "price_min",
                      "orig": "price_min",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "product",
                      "orig": "product",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "ships_to",
                      "orig": "ships_to",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "US",
                      "field": True,
                    },
                    {
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "strength_max_mg",
                      "orig": "strength_max_mg",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "strength_min_mg",
                      "orig": "strength_min_mg",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "vendor",
                      "orig": "vendor",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "prices",
                  },
                  {
                    "lit": "compare",
                  },
                ],
                "parts": [
                  "prices",
                  "compare",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "currency",
                      "orig": "currency",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "form",
                      "orig": "form",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "in_stock",
                      "orig": "in_stock",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "peptide",
                      "orig": "peptide",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "bpc-157",
                      "field": True,
                    },
                    {
                      "name": "ships_to",
                      "orig": "ships_to",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "US",
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "$action": "compare",
                  "exist": [
                    "peptide",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "product": {
        "fields": [
          {
            "name": "api_url",
            "title": "Api Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Absolute URL.",
          },
          {
            "name": "form",
            "title": "Form",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Compound and form, e.g.",
          },
          {
            "name": "in_stock_count",
            "title": "In Stock Count",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "last_seen_at",
            "title": "Last Seen At",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "offer_count",
            "title": "Offer Count",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "offers",
            "title": "Offers",
            "type": "`$ANY`",
            "req": True,
            "short": "With the `pricing:read` scope; otherwise null.",
          },
          {
            "name": "peptide",
            "title": "Peptide",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "prices",
            "title": "Prices",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Per currency, never converted or mixed.",
          },
          {
            "name": "product_type",
            "title": "Product Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "vendor_count",
            "title": "Vendor Count",
            "type": "`$INTEGER`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "products",
                  },
                ],
                "parts": [
                  "products",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "peptides",
                    },
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "field",
                      "orig": "fields",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "id,peptide,form",
                    },
                    {
                      "name": "form",
                      "orig": "form",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "vial",
                      "field": True,
                    },
                    {
                      "name": "in_stock",
                      "orig": "in_stock",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "peptide",
                      "orig": "peptide",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "bpc-157",
                      "field": True,
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "ships_to",
                      "orig": "ships_to",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "US",
                    },
                    {
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "vendor",
                      "orig": "vendor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "products",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "products",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "bpc-157::vial",
                    },
                  ],
                  "query": [
                    {
                      "name": "ships_to",
                      "orig": "ships_to",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "US",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "research": {
        "fields": [
          {
            "name": "also_known_as",
            "title": "Also Known As",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "api_url",
            "title": "Api Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Absolute URL.",
          },
          {
            "name": "approved_medicine",
            "title": "Approved Medicine",
            "type": "`$BOOLEAN`",
            "req": True,
            "short": "True only when the recorded FDA status is Approved.",
          },
          {
            "name": "availability",
            "title": "Availability",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "categories",
            "title": "Categories",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "classification",
            "title": "Classification",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "clinical_evidence",
            "title": "Clinical Evidence",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "conflict",
            "title": "Conflict",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "content",
            "title": "Content",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "content_reviewed_at",
            "title": "Content Reviewed At",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "content_total",
            "title": "Content Total",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "development_stage",
            "title": "Development Stage",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "evidence",
            "title": "Evidence",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "fda_status",
            "title": "Fda Status",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "label",
            "title": "Label",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "last_reviewed",
            "title": "Last Reviewed",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "library_classification",
            "title": "Library Classification",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "limitations",
            "title": "Limitations",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "links",
            "title": "Links",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "mechanism",
            "title": "Mechanism",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "mechanisms",
            "title": "Mechanisms",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "note",
            "title": "Note",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "notes",
            "title": "Notes",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "peptide",
            "title": "Peptide",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "peptide_count",
            "title": "Peptide Count",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "peptide_total",
            "title": "Peptide Total",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "peptides",
            "title": "Peptides",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "preclinical_evidence",
            "title": "Preclinical Evidence",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "properties",
            "title": "Properties",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "query",
            "title": "Query",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "references",
            "title": "References",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "regulatory",
            "title": "Regulatory",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "regulatory_evidence",
            "title": "Regulatory Evidence",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "regulatory_status",
            "title": "Regulatory Status",
            "type": "`$STRING`",
            "req": True,
            "short": "Regulatory class read from the profile's FDA status.",
          },
          {
            "name": "regulatory_status_label",
            "title": "Regulatory Status Label",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "research_areas",
            "title": "Research Areas",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "research_gaps",
            "title": "Research Gaps",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Evidence steps with no documented source in the profile.",
          },
          {
            "name": "research_topics",
            "title": "Research Topics",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "review",
            "title": "Review",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "safety",
            "title": "Safety",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "secondary_reports",
            "title": "Secondary Reports",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "statement",
            "title": "Statement",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "summary",
            "title": "Summary",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "unavailable_sources",
            "title": "Unavailable Sources",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Absolute URL.",
          },
          {
            "name": "wada_status",
            "title": "Wada Status",
            "type": "`$ANY`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "categories",
                  },
                ],
                "parts": [
                  "categories",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/peptides",
                "segments": [
                  {
                    "lit": "peptides",
                  },
                ],
                "parts": [
                  "peptides",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "evidence_level",
                      "orig": "evidence_level",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "field",
                      "orig": "fields",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "id,name,also_known_as",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "regulatory_status",
                      "orig": "regulatory_status",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "research_area",
                      "orig": "research_area",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "bpc",
                    },
                    {
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/research-areas",
                "segments": [
                  {
                    "lit": "research-areas",
                  },
                ],
                "parts": [
                  "research-areas",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "search",
                  },
                ],
                "parts": [
                  "search",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "glp-1",
                    },
                    {
                      "name": "type",
                      "orig": "types",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "q",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/peptides/{slug}",
                "segments": [
                  {
                    "lit": "peptides",
                  },
                  {
                    "var": "slug",
                  },
                ],
                "parts": [
                  "peptides",
                  "{slug}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "slug",
                      "orig": "slug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "bpc-157",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/peptides/{slug}/research",
                "segments": [
                  {
                    "lit": "peptides",
                  },
                  {
                    "var": "slug",
                  },
                  {
                    "lit": "research",
                  },
                ],
                "parts": [
                  "peptides",
                  "{slug}",
                  "research",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "slug",
                      "orig": "slug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "bpc-157",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/regulatory-status/{slug}",
                "segments": [
                  {
                    "lit": "regulatory-status",
                  },
                  {
                    "var": "slug",
                  },
                ],
                "parts": [
                  "regulatory-status",
                  "{slug}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "slug",
                      "orig": "slug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "bpc-157",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "research_statistic": {
        "fields": [
          {
            "name": "by_year",
            "title": "By Year",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "categories",
            "title": "Categories",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "chart_url",
            "title": "Chart Url",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "citation",
            "title": "Citation",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "columns",
            "title": "Columns",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "definition",
            "title": "Definition",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "denominator",
            "title": "Denominator",
            "type": [
              "`$ONE`",
              [
                "`$NUMBER`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "denominator_definition",
            "title": "Denominator Definition",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "detail",
            "title": "Detail",
            "type": "`$ANY`",
            "req": True,
            "short": "Rankings (array of rows) or comparison detail (object); null when none.",
          },
          {
            "name": "doi",
            "title": "Doi",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "doi_url",
            "title": "Doi Url",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "embed_url",
            "title": "Embed Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Absolute URL.",
          },
          {
            "name": "evidence_class",
            "title": "Evidence Class",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "filters",
            "title": "Filters",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "first_pub_date",
            "title": "First Pub Date",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "flags",
            "title": "Flags",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Caveats: partial_year, small_baseline, high_unclassified, whole_months_only, no_denominator.",
          },
          {
            "name": "groups",
            "title": "Groups",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "how_to_read",
            "title": "How To Read",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "`pmid-` + the PubMed id.",
          },
          {
            "name": "is_peptide",
            "title": "Is Peptide",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "journal",
            "title": "Journal",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "key_publications",
            "title": "Key Publications",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "kind",
            "title": "Kind",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "label",
            "title": "Label",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "license",
            "title": "License",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "limitations",
            "title": "Limitations",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "mesh_roots",
            "title": "Mesh Roots",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "methodology_url",
            "title": "Methodology Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Absolute URL.",
          },
          {
            "name": "metric",
            "title": "Metric",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "min_baseline",
            "title": "Min Baseline",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "numerator",
            "title": "Numerator",
            "type": [
              "`$ONE`",
              [
                "`$NUMBER`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "numerator_definition",
            "title": "Numerator Definition",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "open_access",
            "title": "Open Access",
            "type": [
              "`$ONE`",
              [
                "`$BOOLEAN`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "origin",
            "title": "Origin",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "partial_year",
            "title": "Partial Year",
            "type": "`$INTEGER`",
            "req": True,
            "short": "The cutoff year, which is incomplete.",
          },
          {
            "name": "peptide",
            "title": "Peptide",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "peptide_ids",
            "title": "Peptide Ids",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "permalink",
            "title": "Permalink",
            "type": "`$STRING`",
            "req": True,
            "short": "Absolute URL.",
          },
          {
            "name": "pmid",
            "title": "Pmid",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "png_url",
            "title": "Png Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Absolute URL.",
          },
          {
            "name": "publications",
            "title": "Publications",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "published_at",
            "title": "Published At",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "pubmed_url",
            "title": "Pubmed Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Absolute URL.",
          },
          {
            "name": "query",
            "title": "Query",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
            "short": "The exact Europe PMC query behind the counts.",
          },
          {
            "name": "regulatory",
            "title": "Regulatory",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "research_url",
            "title": "Research Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Absolute URL.",
          },
          {
            "name": "rows",
            "title": "Rows",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "section",
            "title": "Section",
            "type": "`$INTEGER`",
            "req": True,
            "short": "State of Peptide Research section that uses it.",
          },
          {
            "name": "slug",
            "title": "Slug",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "snapshot",
            "title": "Snapshot",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "study_type",
            "title": "Study Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "study_types",
            "title": "Study Types",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "subtitle",
            "title": "Subtitle",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "svg_url",
            "title": "Svg Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Absolute URL.",
          },
          {
            "name": "tier",
            "title": "Tier",
            "type": "`$STRING`",
            "req": True,
            "short": "`counts_only`: yearly counts only (a very large, general literature); `excluded`: a blend or comparison entry.",
          },
          {
            "name": "tier_reason",
            "title": "Tier Reason",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "totals",
            "title": "Totals",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "trials",
            "title": "Trials",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "unit",
            "title": "Unit",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Absolute URL.",
          },
          {
            "name": "value",
            "title": "Value",
            "type": [
              "`$ONE`",
              [
                "`$NUMBER`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "versions",
            "title": "Versions",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "research",
                  },
                  {
                    "lit": "categories",
                  },
                ],
                "parts": [
                  "research",
                  "categories",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "version",
                      "orig": "version",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "latest",
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/research/datasets",
                "segments": [
                  {
                    "lit": "research",
                  },
                  {
                    "lit": "datasets",
                  },
                ],
                "parts": [
                  "research",
                  "datasets",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/research/publications",
                "segments": [
                  {
                    "lit": "research",
                  },
                  {
                    "lit": "publications",
                  },
                ],
                "parts": [
                  "research",
                  "publications",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "evidence_class",
                      "orig": "evidence_class",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "field",
                      "orig": "fields",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "id,pmid,doi",
                    },
                    {
                      "name": "group",
                      "orig": "group",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "glp1",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 25,
                    },
                    {
                      "name": "peptide",
                      "orig": "peptide",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "semaglutide",
                      "field": True,
                    },
                    {
                      "name": "regulatory",
                      "orig": "regulatory",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "study_type",
                      "orig": "study_type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "version",
                      "orig": "version",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "latest",
                      "field": True,
                    },
                    {
                      "name": "year",
                      "orig": "year",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/research/reports",
                "segments": [
                  {
                    "lit": "research",
                  },
                  {
                    "lit": "reports",
                  },
                ],
                "parts": [
                  "research",
                  "reports",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/research/statistics",
                "segments": [
                  {
                    "lit": "research",
                  },
                  {
                    "lit": "statistics",
                  },
                ],
                "parts": [
                  "research",
                  "statistics",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 50,
                    },
                    {
                      "name": "section",
                      "orig": "section",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "version",
                      "orig": "version",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "latest",
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "research",
                  },
                  {
                    "lit": "charts",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "research",
                  "charts",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "publications-by-year",
                    },
                  ],
                  "query": [
                    {
                      "name": "version",
                      "orig": "version",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "latest",
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/research/statistics/{id}",
                "segments": [
                  {
                    "lit": "research",
                  },
                  {
                    "lit": "statistics",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "research",
                  "statistics",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "total_publications",
                    },
                  ],
                  "query": [
                    {
                      "name": "version",
                      "orig": "version",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "latest",
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/research/trends",
                "segments": [
                  {
                    "lit": "research",
                  },
                  {
                    "lit": "trends",
                  },
                ],
                "parts": [
                  "research",
                  "trends",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "evidence_class",
                      "orig": "evidence_class",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "from_year",
                      "orig": "from_year",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "group",
                      "orig": "group",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "glp1",
                    },
                    {
                      "name": "metric",
                      "orig": "metric",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "publications_by_year",
                      "field": True,
                    },
                    {
                      "name": "peptide",
                      "orig": "peptide",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "semaglutide",
                      "field": True,
                    },
                    {
                      "name": "regulatory",
                      "orig": "regulatory",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "study_type",
                      "orig": "study_type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "to_year",
                      "orig": "to_year",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "version",
                      "orig": "version",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "latest",
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "metric",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/research/peptides/{slug}/statistics",
                "segments": [
                  {
                    "lit": "research",
                  },
                  {
                    "lit": "peptides",
                  },
                  {
                    "var": "slug",
                  },
                  {
                    "lit": "statistics",
                  },
                ],
                "parts": [
                  "research",
                  "peptides",
                  "{slug}",
                  "statistics",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "slug",
                      "orig": "slug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "bpc-157",
                    },
                  ],
                  "query": [
                    {
                      "name": "version",
                      "orig": "version",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "latest",
                      "field": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "study": {
        "fields": [
          {
            "name": "analog_compound",
            "title": "Analog Compound",
            "type": "`$BOOLEAN`",
            "req": True,
            "short": "Research on a related compound, not this one.",
          },
          {
            "name": "authors",
            "title": "Authors",
            "type": "`$STRING`",
            "req": True,
            "short": "Not stored by Peptide Library.",
          },
          {
            "name": "citations",
            "title": "Citations",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "cited_by",
            "title": "Cited By",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "doi",
            "title": "Doi",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "evidence_classification",
            "title": "Evidence Classification",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "evidence_classification_label",
            "title": "Evidence Classification Label",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Stable id from the study's identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none.",
          },
          {
            "name": "journal",
            "title": "Journal",
            "type": "`$STRING`",
            "req": True,
            "short": "Not stored by Peptide Library.",
          },
          {
            "name": "limitations",
            "title": "Limitations",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "nct_id",
            "title": "Nct Id",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "pmid",
            "title": "Pmid",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "population",
            "title": "Population",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "publication_year",
            "title": "Publication Year",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "research_model",
            "title": "Research Model",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "sample_size",
            "title": "Sample Size",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "source_url",
            "title": "Source Url",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "study_type",
            "title": "Study Type",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "summary",
            "title": "Summary",
            "type": "`$ANY`",
            "req": True,
            "short": "The finding as summarised by Peptide Library editors (dose figures removed).",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "peptides",
                  },
                  {
                    "var": "slug",
                  },
                  {
                    "lit": "studies",
                  },
                ],
                "parts": [
                  "peptides",
                  "{slug}",
                  "studies",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "slug",
                      "orig": "slug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "bpc-157",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "slug",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/studies",
                "segments": [
                  {
                    "lit": "studies",
                  },
                ],
                "parts": [
                  "studies",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "evidence_classification",
                      "orig": "evidence_classification",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "human_controlled_trial",
                      "field": True,
                    },
                    {
                      "name": "field",
                      "orig": "fields",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "id,title,publication_year",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "peptide",
                      "orig": "peptide",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "semaglutide",
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "year_from",
                      "orig": "year_from",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "year_to",
                      "orig": "year_to",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "studies",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "studies",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "pmid-33567185",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "vendor": {
        "fields": [
          {
            "name": "about",
            "title": "About",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "api_url",
            "title": "Api Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Absolute URL.",
          },
          {
            "name": "catalog",
            "title": "Catalog",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "country",
            "title": "Country",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "description",
            "title": "Description",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Stable vendor id.",
          },
          {
            "name": "logo_url",
            "title": "Logo Url",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "product_categories",
            "title": "Product Categories",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "profile_url",
            "title": "Profile Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Absolute URL.",
          },
          {
            "name": "rating",
            "title": "Rating",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "region",
            "title": "Region",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "req": True,
          },
          {
            "name": "reviews",
            "title": "Reviews",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "shipping",
            "title": "Shipping",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "slug",
            "title": "Slug",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "sources",
            "title": "Sources",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "website_url",
            "title": "Website Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Peptide Library link to the vendor's site (may be an affiliate link).",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "vendors",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "prices",
                  },
                ],
                "parts": [
                  "vendors",
                  "{id}",
                  "prices",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "8",
                    },
                  ],
                  "query": [
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "peptides",
                    },
                    {
                      "name": "currency",
                      "orig": "currency",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "USD",
                    },
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "field",
                      "orig": "fields",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "id,product_id,product_name",
                    },
                    {
                      "name": "form",
                      "orig": "form",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "vial",
                    },
                    {
                      "name": "in_stock",
                      "orig": "in_stock",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "peptide",
                      "orig": "peptide",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "bpc-157",
                    },
                    {
                      "name": "price_max",
                      "orig": "price_max",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "price_min",
                      "orig": "price_min",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "product",
                      "orig": "product",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "ships_to",
                      "orig": "ships_to",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "US",
                    },
                    {
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "strength_max_mg",
                      "orig": "strength_max_mg",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "strength_min_mg",
                      "orig": "strength_min_mg",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "price",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/vendors/{id}/products",
                "segments": [
                  {
                    "lit": "vendors",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "products",
                  },
                ],
                "parts": [
                  "vendors",
                  "{id}",
                  "products",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "8",
                    },
                  ],
                  "query": [
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "peptides",
                    },
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "field",
                      "orig": "fields",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "id,peptide,form",
                    },
                    {
                      "name": "form",
                      "orig": "form",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "vial",
                    },
                    {
                      "name": "in_stock",
                      "orig": "in_stock",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "peptide",
                      "orig": "peptide",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "bpc-157",
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "ships_to",
                      "orig": "ships_to",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "US",
                    },
                    {
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "product",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/vendors",
                "segments": [
                  {
                    "lit": "vendors",
                  },
                ],
                "parts": [
                  "vendors",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "US",
                      "field": True,
                    },
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "field",
                      "orig": "fields",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "id,slug,name",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "min_rating",
                      "orig": "min_rating",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "peptide",
                      "orig": "peptide",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "product_category",
                      "orig": "product_category",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "ships_to",
                      "orig": "ships_to",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "US",
                    },
                    {
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
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
                    "lit": "vendors",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "vendors",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "8",
                    },
                  ],
                  "query": [
                    {
                      "name": "ships_to",
                      "orig": "ships_to",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "US",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/vendors/compare",
                "segments": [
                  {
                    "lit": "vendors",
                  },
                  {
                    "lit": "compare",
                  },
                ],
                "parts": [
                  "vendors",
                  "compare",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "ids",
                      "orig": "ids",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "8,13",
                    },
                    {
                      "name": "ships_to",
                      "orig": "ships_to",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "US",
                    },
                  ],
                },
                "select": {
                  "$action": "compare",
                  "exist": [
                    "ids",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/vendors/{id}/shipping",
                "segments": [
                  {
                    "lit": "vendors",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "shipping",
                  },
                ],
                "parts": [
                  "vendors",
                  "{id}",
                  "shipping",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "8",
                    },
                  ],
                  "query": [
                    {
                      "name": "ships_to",
                      "orig": "ships_to",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "US",
                    },
                  ],
                },
                "select": {
                  "$action": "shipping",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
