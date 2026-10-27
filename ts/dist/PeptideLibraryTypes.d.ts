export interface GetApiIndex {
    documentation: string;
    endpoints: any[];
    name: string;
    openapi: string;
    release: string;
    version: string;
}
export interface GetApiIndexLoadMatch {
    documentation?: string;
    endpoints?: any[];
    name?: string;
    openapi?: string;
    release?: string;
    version?: string;
}
export interface Meta {
    database: string;
    release: string;
    status: string;
}
export interface MetaLoadMatch {
    database?: string;
    release?: string;
    status?: string;
}
export interface Price {
    availability: string;
    currency: string;
    first_seen_at: any;
    form: string;
    id: string;
    is_affiliate_link: boolean;
    is_stale: boolean;
    last_seen_at: any;
    peptide: Record<string, any>;
    price: string;
    price_changed_at: any;
    price_per_mg: any;
    price_per_unit: any;
    product_id: string;
    product_name: string;
    product_page_url: string;
    product_type: string;
    regular_price: any;
    ships_to: any;
    strength: Record<string, any>;
    vendor: Record<string, any>;
}
export interface PriceLoadMatch {
    currency?: string;
    form?: string;
    in_stock?: boolean;
    peptide: string;
    ships_to?: string;
    $action?: string;
    [action: string]: any;
}
export interface PriceListMatch {
    category?: string;
    currency?: string;
    cursor?: string;
    field?: string;
    form?: string;
    in_stock?: boolean;
    limit?: number;
    peptide?: string;
    price_max?: number;
    price_min?: number;
    product?: string;
    search?: string;
    ships_to?: string;
    sort?: string;
    strength_max_mg?: number;
    strength_min_mg?: number;
    vendor?: string;
}
export interface Product {
    api_url: string;
    form: string;
    id: string;
    in_stock_count: number;
    last_seen_at: any;
    offer_count: number;
    offers: any;
    peptide: Record<string, any>;
    prices: any[];
    product_type: string;
    vendor_count: number;
}
export interface ProductLoadMatch {
    id: string;
    ships_to?: string;
}
export interface ProductListMatch {
    category?: string;
    cursor?: string;
    field?: string;
    form?: string;
    in_stock?: boolean;
    limit?: number;
    peptide?: string;
    search?: string;
    ships_to?: string;
    sort?: string;
    vendor?: string;
}
export interface Research {
    also_known_as: any[];
    api_url: string;
    approved_medicine: boolean;
    availability: any;
    categories: any[];
    classification: Record<string, any>;
    clinical_evidence: Record<string, any>;
    conflict: any;
    content: any[];
    content_reviewed_at: any;
    content_total: number;
    description: string;
    development_stage: any;
    evidence: Record<string, any>;
    fda_status: any;
    id: string;
    label: string;
    last_reviewed: any;
    library_classification: any;
    limitations: any[];
    links: Record<string, any>;
    mechanism: Record<string, any>;
    mechanisms: Record<string, any>;
    name: string;
    note: string;
    notes: any[];
    peptide: Record<string, any>;
    peptide_count: number;
    peptide_total: number;
    peptides: any[];
    preclinical_evidence: Record<string, any>;
    properties: Record<string, any>;
    query: string;
    references: any[];
    regulatory: Record<string, any>;
    regulatory_evidence: any[];
    regulatory_status: string;
    regulatory_status_label: string;
    research_areas: any[];
    research_gaps: any[];
    research_topics: any[];
    review: Record<string, any>;
    safety: Record<string, any>;
    secondary_reports: Record<string, any>;
    statement: any;
    summary: any;
    unavailable_sources: any[];
    url: string;
    wada_status: any;
}
export interface ResearchLoadMatch {
    slug: string;
}
export interface ResearchListMatch {
    also_known_as?: any[];
    api_url?: string;
    approved_medicine?: boolean;
    availability?: any;
    categories?: any[];
    classification?: Record<string, any>;
    clinical_evidence?: Record<string, any>;
    conflict?: any;
    content?: any[];
    content_reviewed_at?: any;
    content_total?: number;
    description?: string;
    development_stage?: any;
    evidence?: Record<string, any>;
    fda_status?: any;
    id?: string;
    label?: string;
    last_reviewed?: any;
    library_classification?: any;
    limitations?: any[];
    links?: Record<string, any>;
    mechanism?: Record<string, any>;
    mechanisms?: Record<string, any>;
    name?: string;
    note?: string;
    notes?: any[];
    peptide?: Record<string, any>;
    peptide_count?: number;
    peptide_total?: number;
    peptides?: any[];
    preclinical_evidence?: Record<string, any>;
    properties?: Record<string, any>;
    query?: string;
    references?: any[];
    regulatory?: Record<string, any>;
    regulatory_evidence?: any[];
    regulatory_status?: string;
    regulatory_status_label?: string;
    research_areas?: any[];
    research_gaps?: any[];
    research_topics?: any[];
    review?: Record<string, any>;
    safety?: Record<string, any>;
    secondary_reports?: Record<string, any>;
    statement?: any;
    summary?: any;
    unavailable_sources?: any[];
    url?: string;
    wada_status?: any;
}
export interface ResearchStatistic {
    by_year: any[];
    categories: any[];
    chart_url: any;
    citation: string;
    columns: any[];
    definition: string;
    denominator: number | null;
    denominator_definition: string | null;
    description: string;
    detail: any;
    doi: string | null;
    doi_url: any;
    embed_url: string;
    evidence_class: string;
    filters: Record<string, any>;
    first_pub_date: string;
    flags: any[];
    groups: any[];
    how_to_read: string;
    id: string;
    is_peptide: boolean;
    journal: string | null;
    key_publications: any[];
    kind: string;
    label: string;
    license: Record<string, any>;
    limitations: any[];
    mesh_roots: any[];
    methodology_url: string;
    metric: string;
    min_baseline: any;
    name: string;
    numerator: number | null;
    numerator_definition: string | null;
    open_access: boolean | null;
    origin: string | null;
    partial_year: number;
    peptide: Record<string, any>;
    peptide_ids: any[];
    permalink: string;
    pmid: string;
    png_url: string;
    publications: any;
    published_at: string;
    pubmed_url: string;
    query: string | null;
    regulatory: string | null;
    research_url: string;
    rows: any[];
    section: number;
    slug: string;
    snapshot: Record<string, any>;
    source: string;
    study_type: string;
    study_types: any[];
    subtitle: string;
    svg_url: string;
    tier: string;
    tier_reason: string | null;
    title: string;
    totals: any;
    trials: any;
    unit: string;
    url: string;
    value: number | null;
    version: number;
    versions: any[];
}
export interface ResearchStatisticLoadMatch {
    id: string;
    version?: string;
}
export interface ResearchStatisticListMatch {
    version?: string;
}
export interface Study {
    analog_compound: boolean;
    authors: string;
    citations: any[];
    cited_by: any[];
    doi: string | null;
    evidence_classification: string;
    evidence_classification_label: string;
    id: string;
    journal: string;
    limitations: any[];
    nct_id: string | null;
    pmid: string | null;
    population: any;
    publication_year: any;
    research_model: string;
    sample_size: any;
    source_url: any;
    study_type: any;
    summary: any;
    title: string;
}
export interface StudyLoadMatch {
    id: string;
}
export interface StudyListMatch {
    cursor?: string;
    evidence_classification?: string;
    field?: string;
    limit?: number;
    peptide?: string;
    search?: string;
    sort?: string;
    year_from?: number;
    year_to?: number;
}
export interface Vendor {
    about: Record<string, any>;
    api_url: string;
    catalog: Record<string, any>;
    country: any;
    description: string | null;
    id: string;
    logo_url: any;
    name: string;
    product_categories: any[];
    profile_url: string;
    rating: Record<string, any>;
    region: string | null;
    reviews: Record<string, any>;
    shipping: Record<string, any>;
    slug: string;
    sources: Record<string, any>;
    website_url: string;
}
export interface VendorLoadMatch {
    id: string;
    ships_to?: string;
    $action?: string;
    [action: string]: any;
}
export interface VendorListMatch {
    country?: string;
    cursor?: string;
    field?: string;
    limit?: number;
    min_rating?: number;
    peptide?: string;
    product_category?: string;
    search?: string;
    ships_to?: string;
    sort?: string;
    $action?: string;
    [action: string]: any;
}
