package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "PeptideLibrary",
			"slug": "peptide-library",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.peptidelibrary.app/v1",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"get_api_index": map[string]any{},
				"meta": map[string]any{},
				"price": map[string]any{},
				"product": map[string]any{},
				"research": map[string]any{},
				"research_statistic": map[string]any{},
				"study": map[string]any{},
				"vendor": map[string]any{},
			},
		},
		"entity": map[string]any{
			"get_api_index": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "documentation",
						"title": "Documentation",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute URL.",
					},
					map[string]any{
						"name": "endpoints",
						"title": "Endpoints",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "openapi",
						"title": "Openapi",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute URL.",
					},
					map[string]any{
						"name": "release",
						"title": "Release",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "get_api_index",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"segments": []any{},
								"parts": []any{},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"meta": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "database",
						"title": "Database",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "release",
						"title": "Release",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "meta",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/health",
								"segments": []any{
									map[string]any{
										"lit": "health",
									},
								},
								"parts": []any{
									"health",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.meta`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"price": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "availability",
						"title": "Availability",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "first_seen_at",
						"title": "First Seen At",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "form",
						"title": "Form",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Offer id.",
					},
					map[string]any{
						"name": "is_affiliate_link",
						"title": "Is Affiliate Link",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "is_stale",
						"title": "Is Stale",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "True when not seen in the last 7 days.",
					},
					map[string]any{
						"name": "last_seen_at",
						"title": "Last Seen At",
						"type": "`$ANY`",
						"req": true,
						"short": "When the price was last seen on the vendor's site.",
					},
					map[string]any{
						"name": "peptide",
						"title": "Peptide",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "price",
						"title": "Price",
						"type": "`$STRING`",
						"req": true,
						"short": "Decimal amount as a string, never a float.",
					},
					map[string]any{
						"name": "price_changed_at",
						"title": "Price Changed At",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "price_per_mg",
						"title": "Price Per Mg",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "price_per_unit",
						"title": "Price Per Unit",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "product_id",
						"title": "Product Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "product_name",
						"title": "Product Name",
						"type": "`$STRING`",
						"req": true,
						"short": "As the vendor lists it.",
					},
					map[string]any{
						"name": "product_page_url",
						"title": "Product Page Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Peptide Library redirect to the vendor's page; logs the click.",
					},
					map[string]any{
						"name": "product_type",
						"title": "Product Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "regular_price",
						"title": "Regular Price",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "ships_to",
						"title": "Ships To",
						"type": "`$ANY`",
						"req": true,
						"short": "Shipping to the `ships_to` destination you asked about; null when you didn't ask.",
					},
					map[string]any{
						"name": "strength",
						"title": "Strength",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "vendor",
						"title": "Vendor",
						"type": "`$OBJECT`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "price",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/prices",
								"segments": []any{
									map[string]any{
										"lit": "prices",
									},
								},
								"parts": []any{
									"prices",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
											"kind": "query",
											"example": "peptides",
										},
										map[string]any{
											"name": "currency",
											"orig": "currency",
											"type": "`$STRING`",
											"kind": "query",
											"example": "USD",
											"field": true,
										},
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "field",
											"orig": "fields",
											"type": "`$STRING`",
											"kind": "query",
											"example": "id,product_id,product_name",
										},
										map[string]any{
											"name": "form",
											"orig": "form",
											"type": "`$STRING`",
											"kind": "query",
											"example": "vial",
											"field": true,
										},
										map[string]any{
											"name": "in_stock",
											"orig": "in_stock",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "peptide",
											"orig": "peptide",
											"type": "`$STRING`",
											"kind": "query",
											"example": "bpc-157",
											"field": true,
										},
										map[string]any{
											"name": "price_max",
											"orig": "price_max",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "price_min",
											"orig": "price_min",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "product",
											"orig": "product",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "ships_to",
											"orig": "ships_to",
											"type": "`$STRING`",
											"kind": "query",
											"example": "US",
											"field": true,
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "strength_max_mg",
											"orig": "strength_max_mg",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "strength_min_mg",
											"orig": "strength_min_mg",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "vendor",
											"orig": "vendor",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/prices/compare",
								"segments": []any{
									map[string]any{
										"lit": "prices",
									},
									map[string]any{
										"lit": "compare",
									},
								},
								"parts": []any{
									"prices",
									"compare",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "currency",
											"orig": "currency",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "form",
											"orig": "form",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "in_stock",
											"orig": "in_stock",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "peptide",
											"orig": "peptide",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "bpc-157",
											"field": true,
										},
										map[string]any{
											"name": "ships_to",
											"orig": "ships_to",
											"type": "`$STRING`",
											"kind": "query",
											"example": "US",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "compare",
									"exist": []any{
										"peptide",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"product": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "api_url",
						"title": "Api Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute URL.",
					},
					map[string]any{
						"name": "form",
						"title": "Form",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Compound and form, e.g.",
					},
					map[string]any{
						"name": "in_stock_count",
						"title": "In Stock Count",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "last_seen_at",
						"title": "Last Seen At",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "offer_count",
						"title": "Offer Count",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "offers",
						"title": "Offers",
						"type": "`$ANY`",
						"req": true,
						"short": "With the `pricing:read` scope; otherwise null.",
					},
					map[string]any{
						"name": "peptide",
						"title": "Peptide",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "prices",
						"title": "Prices",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Per currency, never converted or mixed.",
					},
					map[string]any{
						"name": "product_type",
						"title": "Product Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "vendor_count",
						"title": "Vendor Count",
						"type": "`$INTEGER`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "product",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/products",
								"segments": []any{
									map[string]any{
										"lit": "products",
									},
								},
								"parts": []any{
									"products",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
											"kind": "query",
											"example": "peptides",
										},
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "field",
											"orig": "fields",
											"type": "`$STRING`",
											"kind": "query",
											"example": "id,peptide,form",
										},
										map[string]any{
											"name": "form",
											"orig": "form",
											"type": "`$STRING`",
											"kind": "query",
											"example": "vial",
											"field": true,
										},
										map[string]any{
											"name": "in_stock",
											"orig": "in_stock",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "peptide",
											"orig": "peptide",
											"type": "`$STRING`",
											"kind": "query",
											"example": "bpc-157",
											"field": true,
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "ships_to",
											"orig": "ships_to",
											"type": "`$STRING`",
											"kind": "query",
											"example": "US",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "vendor",
											"orig": "vendor",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/products/{id}",
								"segments": []any{
									map[string]any{
										"lit": "products",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"products",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "bpc-157::vial",
										},
									},
									"query": []any{
										map[string]any{
											"name": "ships_to",
											"orig": "ships_to",
											"type": "`$STRING`",
											"kind": "query",
											"example": "US",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"research": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "also_known_as",
						"title": "Also Known As",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "api_url",
						"title": "Api Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute URL.",
					},
					map[string]any{
						"name": "approved_medicine",
						"title": "Approved Medicine",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "True only when the recorded FDA status is Approved.",
					},
					map[string]any{
						"name": "availability",
						"title": "Availability",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "categories",
						"title": "Categories",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "classification",
						"title": "Classification",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "clinical_evidence",
						"title": "Clinical Evidence",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "conflict",
						"title": "Conflict",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "content",
						"title": "Content",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "content_reviewed_at",
						"title": "Content Reviewed At",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "content_total",
						"title": "Content Total",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "development_stage",
						"title": "Development Stage",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "evidence",
						"title": "Evidence",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "fda_status",
						"title": "Fda Status",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "label",
						"title": "Label",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "last_reviewed",
						"title": "Last Reviewed",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "library_classification",
						"title": "Library Classification",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "limitations",
						"title": "Limitations",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "links",
						"title": "Links",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "mechanism",
						"title": "Mechanism",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "mechanisms",
						"title": "Mechanisms",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "note",
						"title": "Note",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "notes",
						"title": "Notes",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "peptide",
						"title": "Peptide",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "peptide_count",
						"title": "Peptide Count",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "peptide_total",
						"title": "Peptide Total",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "peptides",
						"title": "Peptides",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "preclinical_evidence",
						"title": "Preclinical Evidence",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "properties",
						"title": "Properties",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "query",
						"title": "Query",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "references",
						"title": "References",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "regulatory",
						"title": "Regulatory",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "regulatory_evidence",
						"title": "Regulatory Evidence",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "regulatory_status",
						"title": "Regulatory Status",
						"type": "`$STRING`",
						"req": true,
						"short": "Regulatory class read from the profile's FDA status.",
					},
					map[string]any{
						"name": "regulatory_status_label",
						"title": "Regulatory Status Label",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "research_areas",
						"title": "Research Areas",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "research_gaps",
						"title": "Research Gaps",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Evidence steps with no documented source in the profile.",
					},
					map[string]any{
						"name": "research_topics",
						"title": "Research Topics",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "review",
						"title": "Review",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "safety",
						"title": "Safety",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "secondary_reports",
						"title": "Secondary Reports",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "statement",
						"title": "Statement",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "unavailable_sources",
						"title": "Unavailable Sources",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute URL.",
					},
					map[string]any{
						"name": "wada_status",
						"title": "Wada Status",
						"type": "`$ANY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "research",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/categories",
								"segments": []any{
									map[string]any{
										"lit": "categories",
									},
								},
								"parts": []any{
									"categories",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/peptides",
								"segments": []any{
									map[string]any{
										"lit": "peptides",
									},
								},
								"parts": []any{
									"peptides",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "evidence_level",
											"orig": "evidence_level",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "field",
											"orig": "fields",
											"type": "`$STRING`",
											"kind": "query",
											"example": "id,name,also_known_as",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "regulatory_status",
											"orig": "regulatory_status",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "research_area",
											"orig": "research_area",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
											"example": "bpc",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/research-areas",
								"segments": []any{
									map[string]any{
										"lit": "research-areas",
									},
								},
								"parts": []any{
									"research-areas",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/search",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "glp-1",
										},
										map[string]any{
											"name": "type",
											"orig": "types",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"q",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/peptides/{slug}",
								"segments": []any{
									map[string]any{
										"lit": "peptides",
									},
									map[string]any{
										"var": "slug",
									},
								},
								"parts": []any{
									"peptides",
									"{slug}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "slug",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "bpc-157",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/peptides/{slug}/research",
								"segments": []any{
									map[string]any{
										"lit": "peptides",
									},
									map[string]any{
										"var": "slug",
									},
									map[string]any{
										"lit": "research",
									},
								},
								"parts": []any{
									"peptides",
									"{slug}",
									"research",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "slug",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "bpc-157",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/regulatory-status/{slug}",
								"segments": []any{
									map[string]any{
										"lit": "regulatory-status",
									},
									map[string]any{
										"var": "slug",
									},
								},
								"parts": []any{
									"regulatory-status",
									"{slug}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "slug",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "bpc-157",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"research_statistic": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "by_year",
						"title": "By Year",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "categories",
						"title": "Categories",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "chart_url",
						"title": "Chart Url",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "citation",
						"title": "Citation",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "columns",
						"title": "Columns",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "definition",
						"title": "Definition",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "denominator",
						"title": "Denominator",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NUMBER`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "denominator_definition",
						"title": "Denominator Definition",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "detail",
						"title": "Detail",
						"type": "`$ANY`",
						"req": true,
						"short": "Rankings (array of rows) or comparison detail (object); null when none.",
					},
					map[string]any{
						"name": "doi",
						"title": "Doi",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "doi_url",
						"title": "Doi Url",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "embed_url",
						"title": "Embed Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute URL.",
					},
					map[string]any{
						"name": "evidence_class",
						"title": "Evidence Class",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "filters",
						"title": "Filters",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "first_pub_date",
						"title": "First Pub Date",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "flags",
						"title": "Flags",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Caveats: partial_year, small_baseline, high_unclassified, whole_months_only, no_denominator.",
					},
					map[string]any{
						"name": "groups",
						"title": "Groups",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "how_to_read",
						"title": "How To Read",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "`pmid-` + the PubMed id.",
					},
					map[string]any{
						"name": "is_peptide",
						"title": "Is Peptide",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "journal",
						"title": "Journal",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "key_publications",
						"title": "Key Publications",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "kind",
						"title": "Kind",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "label",
						"title": "Label",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "license",
						"title": "License",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "limitations",
						"title": "Limitations",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "mesh_roots",
						"title": "Mesh Roots",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "methodology_url",
						"title": "Methodology Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute URL.",
					},
					map[string]any{
						"name": "metric",
						"title": "Metric",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "min_baseline",
						"title": "Min Baseline",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "numerator",
						"title": "Numerator",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NUMBER`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "numerator_definition",
						"title": "Numerator Definition",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "open_access",
						"title": "Open Access",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$BOOLEAN`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "origin",
						"title": "Origin",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "partial_year",
						"title": "Partial Year",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The cutoff year, which is incomplete.",
					},
					map[string]any{
						"name": "peptide",
						"title": "Peptide",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "peptide_ids",
						"title": "Peptide Ids",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "permalink",
						"title": "Permalink",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute URL.",
					},
					map[string]any{
						"name": "pmid",
						"title": "Pmid",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "png_url",
						"title": "Png Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute URL.",
					},
					map[string]any{
						"name": "publications",
						"title": "Publications",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "published_at",
						"title": "Published At",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "pubmed_url",
						"title": "Pubmed Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute URL.",
					},
					map[string]any{
						"name": "query",
						"title": "Query",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The exact Europe PMC query behind the counts.",
					},
					map[string]any{
						"name": "regulatory",
						"title": "Regulatory",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "research_url",
						"title": "Research Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute URL.",
					},
					map[string]any{
						"name": "rows",
						"title": "Rows",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "section",
						"title": "Section",
						"type": "`$INTEGER`",
						"req": true,
						"short": "State of Peptide Research section that uses it.",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "snapshot",
						"title": "Snapshot",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "study_type",
						"title": "Study Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "study_types",
						"title": "Study Types",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "subtitle",
						"title": "Subtitle",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "svg_url",
						"title": "Svg Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute URL.",
					},
					map[string]any{
						"name": "tier",
						"title": "Tier",
						"type": "`$STRING`",
						"req": true,
						"short": "`counts_only`: yearly counts only (a very large, general literature); `excluded`: a blend or comparison entry.",
					},
					map[string]any{
						"name": "tier_reason",
						"title": "Tier Reason",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "totals",
						"title": "Totals",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "trials",
						"title": "Trials",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "unit",
						"title": "Unit",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute URL.",
					},
					map[string]any{
						"name": "value",
						"title": "Value",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NUMBER`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "versions",
						"title": "Versions",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "research_statistic",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/research/categories",
								"segments": []any{
									map[string]any{
										"lit": "research",
									},
									map[string]any{
										"lit": "categories",
									},
								},
								"parts": []any{
									"research",
									"categories",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "query",
											"example": "latest",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/research/datasets",
								"segments": []any{
									map[string]any{
										"lit": "research",
									},
									map[string]any{
										"lit": "datasets",
									},
								},
								"parts": []any{
									"research",
									"datasets",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/research/publications",
								"segments": []any{
									map[string]any{
										"lit": "research",
									},
									map[string]any{
										"lit": "publications",
									},
								},
								"parts": []any{
									"research",
									"publications",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "evidence_class",
											"orig": "evidence_class",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "field",
											"orig": "fields",
											"type": "`$STRING`",
											"kind": "query",
											"example": "id,pmid,doi",
										},
										map[string]any{
											"name": "group",
											"orig": "group",
											"type": "`$STRING`",
											"kind": "query",
											"example": "glp1",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 25,
										},
										map[string]any{
											"name": "peptide",
											"orig": "peptide",
											"type": "`$STRING`",
											"kind": "query",
											"example": "semaglutide",
											"field": true,
										},
										map[string]any{
											"name": "regulatory",
											"orig": "regulatory",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "study_type",
											"orig": "study_type",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "query",
											"example": "latest",
											"field": true,
										},
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/research/reports",
								"segments": []any{
									map[string]any{
										"lit": "research",
									},
									map[string]any{
										"lit": "reports",
									},
								},
								"parts": []any{
									"research",
									"reports",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/research/statistics",
								"segments": []any{
									map[string]any{
										"lit": "research",
									},
									map[string]any{
										"lit": "statistics",
									},
								},
								"parts": []any{
									"research",
									"statistics",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "section",
											"orig": "section",
											"type": "`$INTEGER`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "query",
											"example": "latest",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/research/charts/{id}",
								"segments": []any{
									map[string]any{
										"lit": "research",
									},
									map[string]any{
										"lit": "charts",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"research",
									"charts",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "publications-by-year",
										},
									},
									"query": []any{
										map[string]any{
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "query",
											"example": "latest",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/research/statistics/{id}",
								"segments": []any{
									map[string]any{
										"lit": "research",
									},
									map[string]any{
										"lit": "statistics",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"research",
									"statistics",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "total_publications",
										},
									},
									"query": []any{
										map[string]any{
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "query",
											"example": "latest",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/research/trends",
								"segments": []any{
									map[string]any{
										"lit": "research",
									},
									map[string]any{
										"lit": "trends",
									},
								},
								"parts": []any{
									"research",
									"trends",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "evidence_class",
											"orig": "evidence_class",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "from_year",
											"orig": "from_year",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "group",
											"orig": "group",
											"type": "`$STRING`",
											"kind": "query",
											"example": "glp1",
										},
										map[string]any{
											"name": "metric",
											"orig": "metric",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "publications_by_year",
											"field": true,
										},
										map[string]any{
											"name": "peptide",
											"orig": "peptide",
											"type": "`$STRING`",
											"kind": "query",
											"example": "semaglutide",
											"field": true,
										},
										map[string]any{
											"name": "regulatory",
											"orig": "regulatory",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "study_type",
											"orig": "study_type",
											"type": "`$STRING`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "to_year",
											"orig": "to_year",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "query",
											"example": "latest",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"metric",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/research/peptides/{slug}/statistics",
								"segments": []any{
									map[string]any{
										"lit": "research",
									},
									map[string]any{
										"lit": "peptides",
									},
									map[string]any{
										"var": "slug",
									},
									map[string]any{
										"lit": "statistics",
									},
								},
								"parts": []any{
									"research",
									"peptides",
									"{slug}",
									"statistics",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "slug",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "bpc-157",
										},
									},
									"query": []any{
										map[string]any{
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "query",
											"example": "latest",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"study": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "analog_compound",
						"title": "Analog Compound",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Research on a related compound, not this one.",
					},
					map[string]any{
						"name": "authors",
						"title": "Authors",
						"type": "`$STRING`",
						"req": true,
						"short": "Not stored by Peptide Library.",
					},
					map[string]any{
						"name": "citations",
						"title": "Citations",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "cited_by",
						"title": "Cited By",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "doi",
						"title": "Doi",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "evidence_classification",
						"title": "Evidence Classification",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "evidence_classification_label",
						"title": "Evidence Classification Label",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Stable id from the study's identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none.",
					},
					map[string]any{
						"name": "journal",
						"title": "Journal",
						"type": "`$STRING`",
						"req": true,
						"short": "Not stored by Peptide Library.",
					},
					map[string]any{
						"name": "limitations",
						"title": "Limitations",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "nct_id",
						"title": "Nct Id",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "pmid",
						"title": "Pmid",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "population",
						"title": "Population",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "publication_year",
						"title": "Publication Year",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "research_model",
						"title": "Research Model",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "sample_size",
						"title": "Sample Size",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "source_url",
						"title": "Source Url",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "study_type",
						"title": "Study Type",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": "`$ANY`",
						"req": true,
						"short": "The finding as summarised by Peptide Library editors (dose figures removed).",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "study",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/peptides/{slug}/studies",
								"segments": []any{
									map[string]any{
										"lit": "peptides",
									},
									map[string]any{
										"var": "slug",
									},
									map[string]any{
										"lit": "studies",
									},
								},
								"parts": []any{
									"peptides",
									"{slug}",
									"studies",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "slug",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "bpc-157",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/studies",
								"segments": []any{
									map[string]any{
										"lit": "studies",
									},
								},
								"parts": []any{
									"studies",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "evidence_classification",
											"orig": "evidence_classification",
											"type": "`$STRING`",
											"kind": "query",
											"example": "human_controlled_trial",
											"field": true,
										},
										map[string]any{
											"name": "field",
											"orig": "fields",
											"type": "`$STRING`",
											"kind": "query",
											"example": "id,title,publication_year",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "peptide",
											"orig": "peptide",
											"type": "`$STRING`",
											"kind": "query",
											"example": "semaglutide",
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "year_from",
											"orig": "year_from",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "year_to",
											"orig": "year_to",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/studies/{id}",
								"segments": []any{
									map[string]any{
										"lit": "studies",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"studies",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "pmid-33567185",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vendor": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "about",
						"title": "About",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "api_url",
						"title": "Api Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute URL.",
					},
					map[string]any{
						"name": "catalog",
						"title": "Catalog",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Stable vendor id.",
					},
					map[string]any{
						"name": "logo_url",
						"title": "Logo Url",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "product_categories",
						"title": "Product Categories",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "profile_url",
						"title": "Profile Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute URL.",
					},
					map[string]any{
						"name": "rating",
						"title": "Rating",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "region",
						"title": "Region",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "reviews",
						"title": "Reviews",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "shipping",
						"title": "Shipping",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "sources",
						"title": "Sources",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "website_url",
						"title": "Website Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Peptide Library link to the vendor's site (may be an affiliate link).",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vendor",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/vendors/{id}/prices",
								"segments": []any{
									map[string]any{
										"lit": "vendors",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "prices",
									},
								},
								"parts": []any{
									"vendors",
									"{id}",
									"prices",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "8",
										},
									},
									"query": []any{
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
											"kind": "query",
											"example": "peptides",
										},
										map[string]any{
											"name": "currency",
											"orig": "currency",
											"type": "`$STRING`",
											"kind": "query",
											"example": "USD",
										},
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "field",
											"orig": "fields",
											"type": "`$STRING`",
											"kind": "query",
											"example": "id,product_id,product_name",
										},
										map[string]any{
											"name": "form",
											"orig": "form",
											"type": "`$STRING`",
											"kind": "query",
											"example": "vial",
										},
										map[string]any{
											"name": "in_stock",
											"orig": "in_stock",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "peptide",
											"orig": "peptide",
											"type": "`$STRING`",
											"kind": "query",
											"example": "bpc-157",
										},
										map[string]any{
											"name": "price_max",
											"orig": "price_max",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "price_min",
											"orig": "price_min",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "product",
											"orig": "product",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "ships_to",
											"orig": "ships_to",
											"type": "`$STRING`",
											"kind": "query",
											"example": "US",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "strength_max_mg",
											"orig": "strength_max_mg",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "strength_min_mg",
											"orig": "strength_min_mg",
											"type": "`$NUMBER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "price",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/vendors/{id}/products",
								"segments": []any{
									map[string]any{
										"lit": "vendors",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "products",
									},
								},
								"parts": []any{
									"vendors",
									"{id}",
									"products",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "8",
										},
									},
									"query": []any{
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
											"kind": "query",
											"example": "peptides",
										},
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "field",
											"orig": "fields",
											"type": "`$STRING`",
											"kind": "query",
											"example": "id,peptide,form",
										},
										map[string]any{
											"name": "form",
											"orig": "form",
											"type": "`$STRING`",
											"kind": "query",
											"example": "vial",
										},
										map[string]any{
											"name": "in_stock",
											"orig": "in_stock",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "peptide",
											"orig": "peptide",
											"type": "`$STRING`",
											"kind": "query",
											"example": "bpc-157",
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "ships_to",
											"orig": "ships_to",
											"type": "`$STRING`",
											"kind": "query",
											"example": "US",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "product",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/vendors",
								"segments": []any{
									map[string]any{
										"lit": "vendors",
									},
								},
								"parts": []any{
									"vendors",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "US",
											"field": true,
										},
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "field",
											"orig": "fields",
											"type": "`$STRING`",
											"kind": "query",
											"example": "id,slug,name",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "min_rating",
											"orig": "min_rating",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "peptide",
											"orig": "peptide",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "product_category",
											"orig": "product_category",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "ships_to",
											"orig": "ships_to",
											"type": "`$STRING`",
											"kind": "query",
											"example": "US",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/vendors/{id}",
								"segments": []any{
									map[string]any{
										"lit": "vendors",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"vendors",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "8",
										},
									},
									"query": []any{
										map[string]any{
											"name": "ships_to",
											"orig": "ships_to",
											"type": "`$STRING`",
											"kind": "query",
											"example": "US",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/vendors/compare",
								"segments": []any{
									map[string]any{
										"lit": "vendors",
									},
									map[string]any{
										"lit": "compare",
									},
								},
								"parts": []any{
									"vendors",
									"compare",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "ids",
											"orig": "ids",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "8,13",
										},
										map[string]any{
											"name": "ships_to",
											"orig": "ships_to",
											"type": "`$STRING`",
											"kind": "query",
											"example": "US",
										},
									},
								},
								"select": map[string]any{
									"$action": "compare",
									"exist": []any{
										"ids",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/vendors/{id}/shipping",
								"segments": []any{
									map[string]any{
										"lit": "vendors",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "shipping",
									},
								},
								"parts": []any{
									"vendors",
									"{id}",
									"shipping",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "8",
										},
									},
									"query": []any{
										map[string]any{
											"name": "ships_to",
											"orig": "ships_to",
											"type": "`$STRING`",
											"kind": "query",
											"example": "US",
										},
									},
								},
								"select": map[string]any{
									"$action": "shipping",
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
