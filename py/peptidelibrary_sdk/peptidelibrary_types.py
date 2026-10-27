# Typed models for the PeptideLibrary SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class GetApiIndex(TypedDict):
    documentation: str
    endpoints: list
    name: str
    openapi: str
    release: str
    version: str


class GetApiIndexLoadMatch(TypedDict, total=False):
    documentation: str
    endpoints: list
    name: str
    openapi: str
    release: str
    version: str


class Meta(TypedDict):
    database: str
    release: str
    status: str


class MetaLoadMatch(TypedDict, total=False):
    database: str
    release: str
    status: str


class Price(TypedDict):
    availability: str
    currency: str
    first_seen_at: Any
    form: str
    id: str
    is_affiliate_link: bool
    is_stale: bool
    last_seen_at: Any
    peptide: dict
    price: str
    price_changed_at: Any
    price_per_mg: Any
    price_per_unit: Any
    product_id: str
    product_name: str
    product_page_url: str
    product_type: str
    regular_price: Any
    ships_to: Any
    strength: dict
    vendor: dict


class PriceLoadMatchRequired(TypedDict):
    peptide: str


class PriceLoadMatch(PriceLoadMatchRequired, total=False):
    currency: str
    form: str
    in_stock: bool
    ships_to: str


class PriceListMatch(TypedDict, total=False):
    category: str
    currency: str
    cursor: str
    field: str
    form: str
    in_stock: bool
    limit: int
    peptide: str
    price_max: float
    price_min: float
    product: str
    search: str
    ships_to: str
    sort: str
    strength_max_mg: float
    strength_min_mg: float
    vendor: str


class Product(TypedDict):
    api_url: str
    form: str
    id: str
    in_stock_count: int
    last_seen_at: Any
    offer_count: int
    offers: Any
    peptide: dict
    prices: list
    product_type: str
    vendor_count: int


class ProductLoadMatchRequired(TypedDict):
    id: str


class ProductLoadMatch(ProductLoadMatchRequired, total=False):
    ships_to: str


class ProductListMatch(TypedDict, total=False):
    category: str
    cursor: str
    field: str
    form: str
    in_stock: bool
    limit: int
    peptide: str
    search: str
    ships_to: str
    sort: str
    vendor: str


class Research(TypedDict):
    also_known_as: list
    api_url: str
    approved_medicine: bool
    availability: Any
    categories: list
    classification: dict
    clinical_evidence: dict
    conflict: Any
    content: list
    content_reviewed_at: Any
    content_total: int
    description: str
    development_stage: Any
    evidence: dict
    fda_status: Any
    id: str
    label: str
    last_reviewed: Any
    library_classification: Any
    limitations: list
    links: dict
    mechanism: dict
    mechanisms: dict
    name: str
    note: str
    notes: list
    peptide: dict
    peptide_count: int
    peptide_total: int
    peptides: list
    preclinical_evidence: dict
    properties: dict
    query: str
    references: list
    regulatory: dict
    regulatory_evidence: list
    regulatory_status: str
    regulatory_status_label: str
    research_areas: list
    research_gaps: list
    research_topics: list
    review: dict
    safety: dict
    secondary_reports: dict
    statement: Any
    summary: Any
    unavailable_sources: list
    url: str
    wada_status: Any


class ResearchLoadMatch(TypedDict):
    slug: str


class ResearchListMatch(TypedDict, total=False):
    also_known_as: list
    api_url: str
    approved_medicine: bool
    availability: Any
    categories: list
    classification: dict
    clinical_evidence: dict
    conflict: Any
    content: list
    content_reviewed_at: Any
    content_total: int
    description: str
    development_stage: Any
    evidence: dict
    fda_status: Any
    id: str
    label: str
    last_reviewed: Any
    library_classification: Any
    limitations: list
    links: dict
    mechanism: dict
    mechanisms: dict
    name: str
    note: str
    notes: list
    peptide: dict
    peptide_count: int
    peptide_total: int
    peptides: list
    preclinical_evidence: dict
    properties: dict
    query: str
    references: list
    regulatory: dict
    regulatory_evidence: list
    regulatory_status: str
    regulatory_status_label: str
    research_areas: list
    research_gaps: list
    research_topics: list
    review: dict
    safety: dict
    secondary_reports: dict
    statement: Any
    summary: Any
    unavailable_sources: list
    url: str
    wada_status: Any


class ResearchStatistic(TypedDict):
    by_year: list
    categories: list
    chart_url: Any
    citation: str
    columns: list
    definition: str
    denominator: float | None
    denominator_definition: str | None
    description: str
    detail: Any
    doi: str | None
    doi_url: Any
    embed_url: str
    evidence_class: str
    filters: dict
    first_pub_date: str
    flags: list
    groups: list
    how_to_read: str
    id: str
    is_peptide: bool
    journal: str | None
    key_publications: list
    kind: str
    label: str
    license: dict
    limitations: list
    mesh_roots: list
    methodology_url: str
    metric: str
    min_baseline: Any
    name: str
    numerator: float | None
    numerator_definition: str | None
    open_access: bool | None
    origin: str | None
    partial_year: int
    peptide: dict
    peptide_ids: list
    permalink: str
    pmid: str
    png_url: str
    publications: Any
    published_at: str
    pubmed_url: str
    query: str | None
    regulatory: str | None
    research_url: str
    rows: list
    section: int
    slug: str
    snapshot: dict
    source: str
    study_type: str
    study_types: list
    subtitle: str
    svg_url: str
    tier: str
    tier_reason: str | None
    title: str
    totals: Any
    trials: Any
    unit: str
    url: str
    value: float | None
    version: int
    versions: list


class ResearchStatisticLoadMatchRequired(TypedDict):
    id: str


class ResearchStatisticLoadMatch(ResearchStatisticLoadMatchRequired, total=False):
    version: str


class ResearchStatisticListMatch(TypedDict, total=False):
    version: str


class Study(TypedDict):
    analog_compound: bool
    authors: str
    citations: list
    cited_by: list
    doi: str | None
    evidence_classification: str
    evidence_classification_label: str
    id: str
    journal: str
    limitations: list
    nct_id: str | None
    pmid: str | None
    population: Any
    publication_year: Any
    research_model: str
    sample_size: Any
    source_url: Any
    study_type: Any
    summary: Any
    title: str


class StudyLoadMatch(TypedDict):
    id: str


class StudyListMatch(TypedDict, total=False):
    cursor: str
    evidence_classification: str
    field: str
    limit: int
    peptide: str
    search: str
    sort: str
    year_from: int
    year_to: int


class Vendor(TypedDict):
    about: dict
    api_url: str
    catalog: dict
    country: Any
    description: str | None
    id: str
    logo_url: Any
    name: str
    product_categories: list
    profile_url: str
    rating: dict
    region: str | None
    reviews: dict
    shipping: dict
    slug: str
    sources: dict
    website_url: str


class VendorLoadMatchRequired(TypedDict):
    id: str


class VendorLoadMatch(VendorLoadMatchRequired, total=False):
    ships_to: str


class VendorListMatch(TypedDict, total=False):
    country: str
    cursor: str
    field: str
    limit: int
    min_rating: float
    peptide: str
    product_category: str
    search: str
    ships_to: str
    sort: str
