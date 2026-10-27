"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "get_api_index",
        "accessor": "GetApiIndex",
        "op": "load",
        "method": "GET",
        "path": "/",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "data": {
                "name": "x",
                "version": "x",
                "release": "x",
                "documentation": "x",
                "openapi": "x",
                "endpoints": [
                    {
                        "method": "x",
                        "path": "x",
                        "scope": "research:read",
                        "auth": "optional"
                    }
                ]
            },
            "meta": {
                "api_version": "x",
                "request_id": "x",
                "retrieved_at": "x",
                "source": {
                    "name": "x",
                    "url": "x"
                },
                "disclaimer": "x",
                "notes": [
                    "x"
                ],
                "affiliate_disclosure": "x",
                "documentation": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "meta",
        "accessor": "Meta",
        "op": "load",
        "method": "GET",
        "path": "/health",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "data": {
                "status": "ok",
                "database": "ok",
                "release": "x"
            },
            "meta": {
                "api_version": "x",
                "request_id": "x",
                "retrieved_at": "x",
                "source": {
                    "name": "x",
                    "url": "x"
                },
                "disclaimer": "x",
                "notes": [
                    "x"
                ],
                "affiliate_disclosure": "x",
                "documentation": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "price",
        "accessor": "Price",
        "op": "list",
        "method": "GET",
        "path": "/prices",
        "args": [],
        "select": {
            "category": "peptides",
            "currency": "USD",
            "cursor": "v1",
            "field": "id,product_id,product_name",
            "form": "vial",
            "in_stock": "v1",
            "limit": 20,
            "peptide": "bpc-157",
            "price_max": "v1",
            "price_min": "v1",
            "product": "v1",
            "search": "v1",
            "ships_to": "US",
            "sort": "v1",
            "strength_max_mg": "v1",
            "strength_min_mg": "v1",
            "vendor": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "search",
            "peptide",
            "category",
            "form",
            "ships_to",
            "in_stock",
            "product",
            "currency",
            "price_min",
            "price_max",
            "strength_min_mg",
            "strength_max_mg",
            "sort",
            "vendor",
            "limit",
            "cursor",
            "fields"
        ],
        "queryArgs": [
            {
                "name": "category",
                "wire": "category"
            },
            {
                "name": "currency",
                "wire": "currency"
            },
            {
                "name": "cursor",
                "wire": "cursor"
            },
            {
                "name": "field",
                "wire": "fields"
            },
            {
                "name": "form",
                "wire": "form"
            },
            {
                "name": "in_stock",
                "wire": "in_stock"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "peptide",
                "wire": "peptide"
            },
            {
                "name": "price_max",
                "wire": "price_max"
            },
            {
                "name": "price_min",
                "wire": "price_min"
            },
            {
                "name": "product",
                "wire": "product"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "ships_to",
                "wire": "ships_to"
            },
            {
                "name": "sort",
                "wire": "sort"
            },
            {
                "name": "strength_max_mg",
                "wire": "strength_max_mg"
            },
            {
                "name": "strength_min_mg",
                "wire": "strength_min_mg"
            },
            {
                "name": "vendor",
                "wire": "vendor"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "product_id": "x",
                    "product_name": "x",
                    "peptide": {
                        "id": "x",
                        "name": "x",
                        "url": "x"
                    },
                    "vendor": {
                        "id": "x",
                        "name": "x",
                        "profile_url": "x"
                    },
                    "product_type": "peptides",
                    "form": "vial",
                    "strength": {
                        "listed": "x",
                        "mg": "x",
                        "mg_per_container": "x",
                        "basis": "x",
                        "containers": 1,
                        "units_per_package": 1,
                        "package_label": "x",
                        "volume_ml": "x",
                        "concentration_mg_ml": "x",
                        "sprays_per_container": 1,
                        "mg_per_spray": "x"
                    },
                    "price": "x",
                    "regular_price": "x",
                    "currency": "x",
                    "price_per_mg": "x",
                    "price_per_unit": "x",
                    "availability": "in_stock",
                    "ships_to": {
                        "destination": "x",
                        "status": "ships"
                    },
                    "last_seen_at": "x",
                    "is_stale": true,
                    "first_seen_at": "x",
                    "price_changed_at": "x",
                    "product_page_url": "x",
                    "is_affiliate_link": true
                }
            ],
            "pagination": {
                "next_cursor": "x",
                "has_more": true,
                "total": 1,
                "limit": 1
            },
            "meta": {
                "api_version": "x",
                "request_id": "x",
                "retrieved_at": "x",
                "source": {
                    "name": "x",
                    "url": "x"
                },
                "disclaimer": "x",
                "notes": [
                    "x"
                ],
                "affiliate_disclosure": "x",
                "documentation": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "price",
        "accessor": "Price",
        "op": "load",
        "method": "GET",
        "path": "/prices/compare",
        "action": "compare",
        "args": [],
        "select": {
            "peptide": "bpc-157",
            "currency": "v1",
            "form": "v1",
            "in_stock": "v1",
            "ships_to": "US"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "peptide",
            "form",
            "currency",
            "ships_to",
            "in_stock"
        ],
        "queryArgs": [
            {
                "name": "currency",
                "wire": "currency"
            },
            {
                "name": "form",
                "wire": "form"
            },
            {
                "name": "in_stock",
                "wire": "in_stock"
            },
            {
                "name": "peptide",
                "wire": "peptide"
            },
            {
                "name": "ships_to",
                "wire": "ships_to"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": {
                "peptide": {
                    "id": "x",
                    "name": "x",
                    "url": "x"
                },
                "groups": [
                    {
                        "product_id": "x",
                        "form": "vial",
                        "currency": "x",
                        "strength": "x",
                        "offer_count": 1,
                        "min_price": "x",
                        "max_price": "x",
                        "offers": [
                            {
                                "id": "x",
                                "product_id": "x",
                                "product_name": "x",
                                "peptide": {},
                                "vendor": {},
                                "product_type": "peptides",
                                "form": "vial",
                                "strength": {},
                                "price": "x",
                                "currency": "x",
                                "availability": "in_stock",
                                "is_stale": true,
                                "product_page_url": "x",
                                "is_affiliate_link": true
                            }
                        ]
                    }
                ],
                "note": "x"
            },
            "meta": {
                "api_version": "x",
                "request_id": "x",
                "retrieved_at": "x",
                "source": {
                    "name": "x",
                    "url": "x"
                },
                "disclaimer": "x",
                "notes": [
                    "x"
                ],
                "affiliate_disclosure": "x",
                "documentation": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "product",
        "accessor": "Product",
        "op": "list",
        "method": "GET",
        "path": "/products",
        "args": [],
        "select": {
            "category": "peptides",
            "cursor": "v1",
            "field": "id,peptide,form",
            "form": "vial",
            "in_stock": "v1",
            "limit": 20,
            "peptide": "bpc-157",
            "search": "v1",
            "ships_to": "US",
            "sort": "v1",
            "vendor": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "search",
            "peptide",
            "category",
            "form",
            "ships_to",
            "in_stock",
            "sort",
            "vendor",
            "limit",
            "cursor",
            "fields"
        ],
        "queryArgs": [
            {
                "name": "category",
                "wire": "category"
            },
            {
                "name": "cursor",
                "wire": "cursor"
            },
            {
                "name": "field",
                "wire": "fields"
            },
            {
                "name": "form",
                "wire": "form"
            },
            {
                "name": "in_stock",
                "wire": "in_stock"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "peptide",
                "wire": "peptide"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "ships_to",
                "wire": "ships_to"
            },
            {
                "name": "sort",
                "wire": "sort"
            },
            {
                "name": "vendor",
                "wire": "vendor"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "peptide": {
                        "id": "x",
                        "name": "x",
                        "url": "x"
                    },
                    "form": "vial",
                    "product_type": "peptides",
                    "offer_count": 1,
                    "vendor_count": 1,
                    "in_stock_count": 1,
                    "prices": [
                        {
                            "currency": "x",
                            "offer_count": 1,
                            "min_price": "x",
                            "max_price": "x",
                            "min_price_per_mg": "x",
                            "min_price_per_unit": "x"
                        }
                    ],
                    "last_seen_at": "x",
                    "api_url": "x"
                }
            ],
            "pagination": {
                "next_cursor": "x",
                "has_more": true,
                "total": 1,
                "limit": 1
            },
            "meta": {
                "api_version": "x",
                "request_id": "x",
                "retrieved_at": "x",
                "source": {
                    "name": "x",
                    "url": "x"
                },
                "disclaimer": "x",
                "notes": [
                    "x"
                ],
                "affiliate_disclosure": "x",
                "documentation": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "product",
        "accessor": "Product",
        "op": "load",
        "method": "GET",
        "path": "/products/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "bpc-157::vial"
            }
        ],
        "select": {
            "ships_to": "US"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "ships_to"
        ],
        "queryArgs": [
            {
                "name": "ships_to",
                "wire": "ships_to"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": {
                "id": "x",
                "peptide": {
                    "id": "x",
                    "name": "x",
                    "url": "x"
                },
                "form": "vial",
                "product_type": "peptides",
                "offer_count": 1,
                "vendor_count": 1,
                "in_stock_count": 1,
                "prices": [
                    {
                        "currency": "x",
                        "offer_count": 1,
                        "min_price": "x",
                        "max_price": "x",
                        "min_price_per_mg": "x",
                        "min_price_per_unit": "x"
                    }
                ],
                "last_seen_at": "x",
                "api_url": "x",
                "offers": [
                    {
                        "id": "x",
                        "product_id": "x",
                        "product_name": "x",
                        "peptide": {
                            "id": "x",
                            "name": "x",
                            "url": "x"
                        },
                        "vendor": {
                            "id": "x",
                            "name": "x",
                            "profile_url": "x"
                        },
                        "product_type": "peptides",
                        "form": "vial",
                        "strength": {
                            "listed": "x",
                            "basis": "x",
                            "package_label": "x"
                        },
                        "price": "x",
                        "regular_price": "x",
                        "currency": "x",
                        "price_per_mg": "x",
                        "price_per_unit": "x",
                        "availability": "in_stock",
                        "ships_to": {},
                        "last_seen_at": "x",
                        "is_stale": true,
                        "first_seen_at": "x",
                        "price_changed_at": "x",
                        "product_page_url": "x",
                        "is_affiliate_link": true
                    }
                ]
            },
            "meta": {
                "api_version": "x",
                "request_id": "x",
                "retrieved_at": "x",
                "source": {
                    "name": "x",
                    "url": "x"
                },
                "disclaimer": "x",
                "notes": [
                    "x"
                ],
                "affiliate_disclosure": "x",
                "documentation": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "research",
        "accessor": "Research",
        "op": "load",
        "method": "GET",
        "path": "/search",
        "args": [],
        "select": {
            "q": "glp-1",
            "limit": 10,
            "type": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "q",
            "types",
            "limit"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "q",
                "wire": "q"
            },
            {
                "name": "type",
                "wire": "types"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "data": {
                "query": "x",
                "peptides": [
                    {
                        "id": "x",
                        "name": "x",
                        "also_known_as": [
                            "x"
                        ],
                        "categories": [
                            {
                                "id": "x",
                                "label": "x"
                            }
                        ],
                        "summary": "x",
                        "research_topics": [
                            "x"
                        ],
                        "classification": "x",
                        "fda_status": "x",
                        "evidence": {
                            "reviewed": true,
                            "level": "x",
                            "level_label": "x"
                        },
                        "url": "x",
                        "regulatory_status": "approved",
                        "content_reviewed_at": "x",
                        "api_url": "x"
                    }
                ],
                "peptide_total": 1,
                "content": [
                    {
                        "type": "faq",
                        "source_label": "x",
                        "title": "x",
                        "snippet": "x",
                        "url": "x",
                        "peptide_id": "x",
                        "updated_at": "x"
                    }
                ],
                "content_total": 1,
                "unavailable_sources": [
                    "x"
                ]
            },
            "meta": {
                "api_version": "x",
                "request_id": "x",
                "retrieved_at": "x",
                "source": {
                    "name": "x",
                    "url": "x"
                },
                "disclaimer": "x",
                "notes": [
                    "x"
                ],
                "affiliate_disclosure": "x",
                "documentation": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "research_statistic",
        "accessor": "ResearchStatistic",
        "op": "load",
        "method": "GET",
        "path": "/research/trends",
        "args": [],
        "select": {
            "metric": "publications_by_year",
            "category": "v1",
            "evidence_class": "v1",
            "from_year": "v1",
            "group": "glp1",
            "peptide": "semaglutide",
            "regulatory": "v1",
            "study_type": "v1",
            "to_year": "v1",
            "version": "latest"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "metric",
            "peptide",
            "group",
            "category",
            "evidence_class",
            "study_type",
            "regulatory",
            "from_year",
            "to_year",
            "version"
        ],
        "queryArgs": [
            {
                "name": "category",
                "wire": "category"
            },
            {
                "name": "evidence_class",
                "wire": "evidence_class"
            },
            {
                "name": "from_year",
                "wire": "from_year"
            },
            {
                "name": "group",
                "wire": "group"
            },
            {
                "name": "metric",
                "wire": "metric"
            },
            {
                "name": "peptide",
                "wire": "peptide"
            },
            {
                "name": "regulatory",
                "wire": "regulatory"
            },
            {
                "name": "study_type",
                "wire": "study_type"
            },
            {
                "name": "to_year",
                "wire": "to_year"
            },
            {
                "name": "version",
                "wire": "version"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "data": {
                "metric": "x",
                "filters": {},
                "partial_year": 1,
                "rows": [
                    {}
                ],
                "snapshot": {
                    "version": "x",
                    "kind": "report",
                    "cutoff_date": "x",
                    "window_start": "x",
                    "published_at": "x",
                    "automated": true
                },
                "chart_url": "x"
            },
            "meta": {
                "api_version": "x",
                "request_id": "x",
                "retrieved_at": "x",
                "source": {
                    "name": "x",
                    "url": "x"
                },
                "disclaimer": "x",
                "notes": [
                    "x"
                ],
                "affiliate_disclosure": "x",
                "documentation": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "research_statistic",
        "accessor": "ResearchStatistic",
        "op": "load",
        "method": "GET",
        "path": "/research/peptides/{slug}/statistics",
        "args": [
            {
                "name": "slug",
                "wire": "slug",
                "value": "bpc-157"
            }
        ],
        "select": {
            "version": "latest"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "version"
        ],
        "queryArgs": [
            {
                "name": "version",
                "wire": "version"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "data": {
                "peptide": {
                    "id": "x",
                    "name": "x",
                    "url": "x"
                },
                "snapshot": {
                    "version": "x",
                    "kind": "report",
                    "cutoff_date": "x",
                    "window_start": "x",
                    "published_at": "x",
                    "automated": true
                },
                "tier": "records",
                "tier_reason": "x",
                "is_peptide": true,
                "origin": "x",
                "regulatory": "x",
                "groups": [
                    "x"
                ],
                "totals": {},
                "by_year": [
                    {}
                ],
                "study_types": [
                    {
                        "study_type": "x",
                        "count": 1
                    }
                ],
                "categories": [
                    {
                        "category": "x",
                        "count": 1
                    }
                ],
                "trials": {
                    "total": 1,
                    "completed_eligible": 1,
                    "completed_without_results": 1,
                    "by_phase": [
                        {
                            "phase": "x",
                            "count": 1
                        }
                    ],
                    "by_status": [
                        {
                            "status": "x",
                            "count": 1
                        }
                    ]
                },
                "key_publications": [
                    {
                        "id": "x",
                        "pmid": "x",
                        "doi": "x",
                        "title": "x",
                        "journal": "x",
                        "first_pub_date": "x",
                        "study_type": "x",
                        "evidence_class": "x",
                        "categories": [
                            "x"
                        ],
                        "peptide_ids": [
                            "x"
                        ],
                        "open_access": true,
                        "pubmed_url": "x",
                        "doi_url": "x"
                    }
                ],
                "limitations": [
                    {
                        "code": "x",
                        "text": "x"
                    }
                ],
                "query": "x",
                "research_url": "x"
            },
            "meta": {
                "api_version": "x",
                "request_id": "x",
                "retrieved_at": "x",
                "source": {
                    "name": "x",
                    "url": "x"
                },
                "disclaimer": "x",
                "notes": [
                    "x"
                ],
                "affiliate_disclosure": "x",
                "documentation": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "study",
        "accessor": "Study",
        "op": "list",
        "method": "GET",
        "path": "/peptides/{slug}/studies",
        "args": [
            {
                "name": "slug",
                "wire": "slug",
                "value": "bpc-157"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "title": "x",
                    "publication_year": 1,
                    "authors": "x",
                    "journal": "x",
                    "doi": "x",
                    "pmid": "x",
                    "nct_id": "x",
                    "study_type": "x",
                    "research_model": "human",
                    "population": "x",
                    "sample_size": 1,
                    "summary": "x",
                    "evidence_classification": "regulatory_label",
                    "evidence_classification_label": "x",
                    "analog_compound": true,
                    "limitations": [
                        "x"
                    ],
                    "source_url": "x"
                }
            ],
            "pagination": {
                "next_cursor": "x",
                "has_more": true,
                "total": 1,
                "limit": 1
            },
            "meta": {
                "api_version": "x",
                "request_id": "x",
                "retrieved_at": "x",
                "source": {
                    "name": "x",
                    "url": "x"
                },
                "disclaimer": "x",
                "notes": [
                    "x"
                ],
                "affiliate_disclosure": "x",
                "documentation": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "study",
        "accessor": "Study",
        "op": "list",
        "method": "GET",
        "path": "/studies",
        "args": [],
        "select": {
            "cursor": "v1",
            "evidence_classification": "human_controlled_trial",
            "field": "id,title,publication_year",
            "limit": 20,
            "peptide": "semaglutide",
            "search": "v1",
            "sort": "v1",
            "year_from": "v1",
            "year_to": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "peptide",
            "evidence_classification",
            "year_from",
            "year_to",
            "search",
            "sort",
            "limit",
            "cursor",
            "fields"
        ],
        "queryArgs": [
            {
                "name": "cursor",
                "wire": "cursor"
            },
            {
                "name": "evidence_classification",
                "wire": "evidence_classification"
            },
            {
                "name": "field",
                "wire": "fields"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "peptide",
                "wire": "peptide"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "sort",
                "wire": "sort"
            },
            {
                "name": "year_from",
                "wire": "year_from"
            },
            {
                "name": "year_to",
                "wire": "year_to"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "title": "x",
                    "publication_year": 1,
                    "authors": "x",
                    "journal": "x",
                    "doi": "x",
                    "pmid": "x",
                    "nct_id": "x",
                    "study_type": "x",
                    "research_model": "human",
                    "evidence_classification": "regulatory_label",
                    "evidence_classification_label": "x",
                    "source_url": "x",
                    "cited_by": [
                        {
                            "id": "x",
                            "name": "x",
                            "url": "x"
                        }
                    ]
                }
            ],
            "pagination": {
                "next_cursor": "x",
                "has_more": true,
                "total": 1,
                "limit": 1
            },
            "meta": {
                "api_version": "x",
                "request_id": "x",
                "retrieved_at": "x",
                "source": {
                    "name": "x",
                    "url": "x"
                },
                "disclaimer": "x",
                "notes": [
                    "x"
                ],
                "affiliate_disclosure": "x",
                "documentation": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "study",
        "accessor": "Study",
        "op": "load",
        "method": "GET",
        "path": "/studies/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "pmid-33567185"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "data": {
                "id": "x",
                "title": "x",
                "publication_year": 1,
                "authors": "x",
                "journal": "x",
                "doi": "x",
                "pmid": "x",
                "nct_id": "x",
                "study_type": "x",
                "research_model": "human",
                "evidence_classification": "regulatory_label",
                "evidence_classification_label": "x",
                "source_url": "x",
                "cited_by": [
                    {
                        "id": "x",
                        "name": "x",
                        "url": "x"
                    }
                ],
                "citations": [
                    {
                        "peptide": {
                            "id": "x",
                            "name": "x",
                            "url": "x"
                        },
                        "summary": "x",
                        "population": "x",
                        "sample_size": 1,
                        "analog_compound": true,
                        "limitations": [
                            "x"
                        ]
                    }
                ]
            },
            "meta": {
                "api_version": "x",
                "request_id": "x",
                "retrieved_at": "x",
                "source": {
                    "name": "x",
                    "url": "x"
                },
                "disclaimer": "x",
                "notes": [
                    "x"
                ],
                "affiliate_disclosure": "x",
                "documentation": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "vendor",
        "accessor": "Vendor",
        "op": "list",
        "method": "GET",
        "path": "/vendors/{id}/prices",
        "action": "price",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "8"
            }
        ],
        "select": {
            "category": "peptides",
            "currency": "USD",
            "cursor": "v1",
            "field": "id,product_id,product_name",
            "form": "vial",
            "in_stock": "v1",
            "limit": 20,
            "peptide": "bpc-157",
            "price_max": "v1",
            "price_min": "v1",
            "product": "v1",
            "search": "v1",
            "ships_to": "US",
            "sort": "v1",
            "strength_max_mg": "v1",
            "strength_min_mg": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "search",
            "peptide",
            "category",
            "form",
            "ships_to",
            "in_stock",
            "product",
            "currency",
            "price_min",
            "price_max",
            "strength_min_mg",
            "strength_max_mg",
            "sort",
            "limit",
            "cursor",
            "fields"
        ],
        "queryArgs": [
            {
                "name": "category",
                "wire": "category"
            },
            {
                "name": "currency",
                "wire": "currency"
            },
            {
                "name": "cursor",
                "wire": "cursor"
            },
            {
                "name": "field",
                "wire": "fields"
            },
            {
                "name": "form",
                "wire": "form"
            },
            {
                "name": "in_stock",
                "wire": "in_stock"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "peptide",
                "wire": "peptide"
            },
            {
                "name": "price_max",
                "wire": "price_max"
            },
            {
                "name": "price_min",
                "wire": "price_min"
            },
            {
                "name": "product",
                "wire": "product"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "ships_to",
                "wire": "ships_to"
            },
            {
                "name": "sort",
                "wire": "sort"
            },
            {
                "name": "strength_max_mg",
                "wire": "strength_max_mg"
            },
            {
                "name": "strength_min_mg",
                "wire": "strength_min_mg"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "product_id": "x",
                    "product_name": "x",
                    "peptide": {
                        "id": "x",
                        "name": "x",
                        "url": "x"
                    },
                    "vendor": {
                        "id": "x",
                        "name": "x",
                        "profile_url": "x"
                    },
                    "product_type": "peptides",
                    "form": "vial",
                    "strength": {
                        "listed": "x",
                        "mg": "x",
                        "mg_per_container": "x",
                        "basis": "x",
                        "containers": 1,
                        "units_per_package": 1,
                        "package_label": "x",
                        "volume_ml": "x",
                        "concentration_mg_ml": "x",
                        "sprays_per_container": 1,
                        "mg_per_spray": "x"
                    },
                    "price": "x",
                    "regular_price": "x",
                    "currency": "x",
                    "price_per_mg": "x",
                    "price_per_unit": "x",
                    "availability": "in_stock",
                    "ships_to": {
                        "destination": "x",
                        "status": "ships"
                    },
                    "last_seen_at": "x",
                    "is_stale": true,
                    "first_seen_at": "x",
                    "price_changed_at": "x",
                    "product_page_url": "x",
                    "is_affiliate_link": true
                }
            ],
            "pagination": {
                "next_cursor": "x",
                "has_more": true,
                "total": 1,
                "limit": 1
            },
            "meta": {
                "api_version": "x",
                "request_id": "x",
                "retrieved_at": "x",
                "source": {
                    "name": "x",
                    "url": "x"
                },
                "disclaimer": "x",
                "notes": [
                    "x"
                ],
                "affiliate_disclosure": "x",
                "documentation": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "vendor",
        "accessor": "Vendor",
        "op": "list",
        "method": "GET",
        "path": "/vendors/{id}/products",
        "action": "product",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "8"
            }
        ],
        "select": {
            "category": "peptides",
            "cursor": "v1",
            "field": "id,peptide,form",
            "form": "vial",
            "in_stock": "v1",
            "limit": 20,
            "peptide": "bpc-157",
            "search": "v1",
            "ships_to": "US",
            "sort": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "search",
            "peptide",
            "category",
            "form",
            "ships_to",
            "in_stock",
            "sort",
            "limit",
            "cursor",
            "fields"
        ],
        "queryArgs": [
            {
                "name": "category",
                "wire": "category"
            },
            {
                "name": "cursor",
                "wire": "cursor"
            },
            {
                "name": "field",
                "wire": "fields"
            },
            {
                "name": "form",
                "wire": "form"
            },
            {
                "name": "in_stock",
                "wire": "in_stock"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "peptide",
                "wire": "peptide"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "ships_to",
                "wire": "ships_to"
            },
            {
                "name": "sort",
                "wire": "sort"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "peptide": {
                        "id": "x",
                        "name": "x",
                        "url": "x"
                    },
                    "form": "vial",
                    "product_type": "peptides",
                    "offer_count": 1,
                    "vendor_count": 1,
                    "in_stock_count": 1,
                    "prices": [
                        {
                            "currency": "x",
                            "offer_count": 1,
                            "min_price": "x",
                            "max_price": "x",
                            "min_price_per_mg": "x",
                            "min_price_per_unit": "x"
                        }
                    ],
                    "last_seen_at": "x",
                    "api_url": "x"
                }
            ],
            "pagination": {
                "next_cursor": "x",
                "has_more": true,
                "total": 1,
                "limit": 1
            },
            "meta": {
                "api_version": "x",
                "request_id": "x",
                "retrieved_at": "x",
                "source": {
                    "name": "x",
                    "url": "x"
                },
                "disclaimer": "x",
                "notes": [
                    "x"
                ],
                "affiliate_disclosure": "x",
                "documentation": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "vendor",
        "accessor": "Vendor",
        "op": "list",
        "method": "GET",
        "path": "/vendors",
        "args": [],
        "select": {
            "country": "US",
            "cursor": "v1",
            "field": "id,slug,name",
            "limit": 20,
            "min_rating": "v1",
            "peptide": "v1",
            "product_category": "v1",
            "search": "v1",
            "ships_to": "US",
            "sort": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "search",
            "country",
            "ships_to",
            "product_category",
            "min_rating",
            "peptide",
            "sort",
            "limit",
            "cursor",
            "fields"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "cursor",
                "wire": "cursor"
            },
            {
                "name": "field",
                "wire": "fields"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "min_rating",
                "wire": "min_rating"
            },
            {
                "name": "peptide",
                "wire": "peptide"
            },
            {
                "name": "product_category",
                "wire": "product_category"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "ships_to",
                "wire": "ships_to"
            },
            {
                "name": "sort",
                "wire": "sort"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "x",
                    "slug": "x",
                    "name": "x",
                    "description": "x",
                    "logo_url": "x",
                    "country": "x",
                    "region": "x",
                    "website_url": "x",
                    "profile_url": "x",
                    "product_categories": [
                        "peptides"
                    ],
                    "rating": {
                        "average": 1,
                        "review_count": 1,
                        "verified_review_count": 1,
                        "method_url": "x"
                    },
                    "catalog": {
                        "status": "live",
                        "product_count": 1,
                        "in_stock_count": 1,
                        "peptide_count": 1,
                        "last_updated_at": "x"
                    },
                    "shipping": {
                        "ships_to": {
                            "destination": "x",
                            "status": "ships"
                        },
                        "coverage": "verified",
                        "ships_from": "x",
                        "free_shipping_threshold": "x",
                        "free_shipping_currency": "x",
                        "has_express": true,
                        "returns_window_days": 1
                    },
                    "api_url": "x"
                }
            ],
            "pagination": {
                "next_cursor": "x",
                "has_more": true,
                "total": 1,
                "limit": 1
            },
            "meta": {
                "api_version": "x",
                "request_id": "x",
                "retrieved_at": "x",
                "source": {
                    "name": "x",
                    "url": "x"
                },
                "disclaimer": "x",
                "notes": [
                    "x"
                ],
                "affiliate_disclosure": "x",
                "documentation": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "vendor",
        "accessor": "Vendor",
        "op": "load",
        "method": "GET",
        "path": "/vendors/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "8"
            }
        ],
        "select": {
            "ships_to": "US"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "ships_to"
        ],
        "queryArgs": [
            {
                "name": "ships_to",
                "wire": "ships_to"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": {
                "id": "x",
                "slug": "x",
                "name": "x",
                "description": "x",
                "logo_url": "x",
                "country": "x",
                "region": "x",
                "website_url": "x",
                "profile_url": "x",
                "product_categories": [
                    "peptides"
                ],
                "rating": {
                    "average": 1,
                    "review_count": 1,
                    "verified_review_count": 1,
                    "method_url": "x"
                },
                "catalog": {
                    "status": "live",
                    "product_count": 1,
                    "in_stock_count": 1,
                    "peptide_count": 1,
                    "last_updated_at": "x"
                },
                "shipping": {
                    "ships_to": {
                        "destination": "x",
                        "status": "ships"
                    },
                    "coverage": "verified",
                    "ships_from": "x",
                    "free_shipping_threshold": "x",
                    "free_shipping_currency": "x",
                    "has_express": true,
                    "returns_window_days": 1
                },
                "api_url": "x",
                "about": {
                    "legal_name": "x",
                    "year_founded": 1,
                    "support_url": "x"
                },
                "reviews": {
                    "count": 1,
                    "verified_count": 1,
                    "average": 1,
                    "distribution": {
                        "1": 1,
                        "2": 1,
                        "3": 1,
                        "4": 1,
                        "5": 1
                    },
                    "categories": {},
                    "last_review_at": "x"
                },
                "sources": {}
            },
            "meta": {
                "api_version": "x",
                "request_id": "x",
                "retrieved_at": "x",
                "source": {
                    "name": "x",
                    "url": "x"
                },
                "disclaimer": "x",
                "notes": [
                    "x"
                ],
                "affiliate_disclosure": "x",
                "documentation": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "vendor",
        "accessor": "Vendor",
        "op": "load",
        "method": "GET",
        "path": "/vendors/compare",
        "action": "compare",
        "args": [],
        "select": {
            "ids": "8,13",
            "ships_to": "US"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "ids",
            "ships_to"
        ],
        "queryArgs": [
            {
                "name": "ids",
                "wire": "ids"
            },
            {
                "name": "ships_to",
                "wire": "ships_to"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": {
                "vendors": [
                    {
                        "id": "x",
                        "slug": "x",
                        "name": "x",
                        "description": "x",
                        "logo_url": "x",
                        "country": "x",
                        "region": "x",
                        "website_url": "x",
                        "profile_url": "x",
                        "product_categories": [
                            "peptides"
                        ],
                        "rating": {
                            "average": 1,
                            "review_count": 1,
                            "verified_review_count": 1,
                            "method_url": "x"
                        },
                        "catalog": {
                            "status": "live",
                            "product_count": 1,
                            "in_stock_count": 1,
                            "peptide_count": 1,
                            "last_updated_at": "x"
                        },
                        "shipping": {
                            "ships_to": {},
                            "coverage": "verified",
                            "ships_from": "x",
                            "free_shipping_threshold": "x",
                            "free_shipping_currency": "x",
                            "has_express": true,
                            "returns_window_days": 1
                        },
                        "api_url": "x"
                    }
                ],
                "rows": [
                    {
                        "field": "x",
                        "label": "x",
                        "values": []
                    }
                ],
                "note": "x"
            },
            "meta": {
                "api_version": "x",
                "request_id": "x",
                "retrieved_at": "x",
                "source": {
                    "name": "x",
                    "url": "x"
                },
                "disclaimer": "x",
                "notes": [
                    "x"
                ],
                "affiliate_disclosure": "x",
                "documentation": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "vendor",
        "accessor": "Vendor",
        "op": "load",
        "method": "GET",
        "path": "/vendors/{id}/shipping",
        "action": "shipping",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "8"
            }
        ],
        "select": {
            "ships_to": "US"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "ships_to"
        ],
        "queryArgs": [
            {
                "name": "ships_to",
                "wire": "ships_to"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": {
                "vendor": {
                    "id": "x",
                    "name": "x",
                    "profile_url": "x"
                },
                "ships_to": {
                    "destination": "x",
                    "status": "ships"
                },
                "coverage": "verified",
                "destinations": [
                    "x"
                ],
                "excluded": [
                    "x"
                ],
                "ships_internationally": true,
                "ships_from": "x",
                "processing_time": "x",
                "methods": [
                    {
                        "name": "x",
                        "carrier": "x",
                        "speed": "x",
                        "regions": [
                            "x"
                        ],
                        "price": "x",
                        "currency": "x",
                        "free_over": "x",
                        "estimated_days_min": 1,
                        "estimated_days_max": 1,
                        "business_days": true,
                        "estimate_text": "x",
                        "source": "x",
                        "source_url": "x",
                        "verified_at": "x"
                    }
                ],
                "free_shipping": {
                    "threshold": "x",
                    "currency": "x",
                    "regions": [
                        "x"
                    ]
                },
                "returns": {
                    "window_days": 1,
                    "policy_url": "x",
                    "notes": "x"
                },
                "policy_url": "x",
                "last_verified_at": "x",
                "sources": {}
            },
            "meta": {
                "api_version": "x",
                "request_id": "x",
                "retrieved_at": "x",
                "source": {
                    "name": "x",
                    "url": "x"
                },
                "disclaimer": "x",
                "notes": [
                    "x"
                ],
                "affiliate_disclosure": "x",
                "documentation": "x"
            }
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map