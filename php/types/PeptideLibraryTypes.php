<?php
declare(strict_types=1);

// Typed models for the PeptideLibrary SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** GetApiIndex entity data model. */
class GetApiIndex
{
    public string $documentation;
    public array $endpoints;
    public string $name;
    public string $openapi;
    public string $release;
    public string $version;
}

/** Request payload for GetApiIndex#load. */
class GetApiIndexLoadMatch
{
    public ?string $documentation = null;
    public ?array $endpoints = null;
    public ?string $name = null;
    public ?string $openapi = null;
    public ?string $release = null;
    public ?string $version = null;
}

/** Meta entity data model. */
class Meta
{
    public string $database;
    public string $release;
    public string $status;
}

/** Request payload for Meta#load. */
class MetaLoadMatch
{
    public ?string $database = null;
    public ?string $release = null;
    public ?string $status = null;
}

/** Price entity data model. */
class Price
{
    public string $availability;
    public string $currency;
    public mixed $first_seen_at;
    public string $form;
    public string $id;
    public bool $is_affiliate_link;
    public bool $is_stale;
    public mixed $last_seen_at;
    public array $peptide;
    public string $price;
    public mixed $price_changed_at;
    public mixed $price_per_mg;
    public mixed $price_per_unit;
    public string $product_id;
    public string $product_name;
    public string $product_page_url;
    public string $product_type;
    public mixed $regular_price;
    public mixed $ships_to;
    public array $strength;
    public array $vendor;
}

/** Request payload for Price#load. */
class PriceLoadMatch
{
    public ?string $currency = null;
    public ?string $form = null;
    public ?bool $in_stock = null;
    public string $peptide;
    public ?string $ships_to = null;
}

/** Request payload for Price#list. */
class PriceListMatch
{
    public ?string $category = null;
    public ?string $currency = null;
    public ?string $cursor = null;
    public ?string $field = null;
    public ?string $form = null;
    public ?bool $in_stock = null;
    public ?int $limit = null;
    public ?string $peptide = null;
    public ?float $price_max = null;
    public ?float $price_min = null;
    public ?string $product = null;
    public ?string $search = null;
    public ?string $ships_to = null;
    public ?string $sort = null;
    public ?float $strength_max_mg = null;
    public ?float $strength_min_mg = null;
    public ?string $vendor = null;
}

/** Product entity data model. */
class Product
{
    public string $api_url;
    public string $form;
    public string $id;
    public int $in_stock_count;
    public mixed $last_seen_at;
    public int $offer_count;
    public mixed $offers;
    public array $peptide;
    public array $prices;
    public string $product_type;
    public int $vendor_count;
}

/** Request payload for Product#load. */
class ProductLoadMatch
{
    public string $id;
    public ?string $ships_to = null;
}

/** Request payload for Product#list. */
class ProductListMatch
{
    public ?string $category = null;
    public ?string $cursor = null;
    public ?string $field = null;
    public ?string $form = null;
    public ?bool $in_stock = null;
    public ?int $limit = null;
    public ?string $peptide = null;
    public ?string $search = null;
    public ?string $ships_to = null;
    public ?string $sort = null;
    public ?string $vendor = null;
}

/** Research entity data model. */
class Research
{
    public array $also_known_as;
    public string $api_url;
    public bool $approved_medicine;
    public mixed $availability;
    public array $categories;
    public array $classification;
    public array $clinical_evidence;
    public mixed $conflict;
    public array $content;
    public mixed $content_reviewed_at;
    public int $content_total;
    public string $description;
    public mixed $development_stage;
    public array $evidence;
    public mixed $fda_status;
    public string $id;
    public string $label;
    public mixed $last_reviewed;
    public mixed $library_classification;
    public array $limitations;
    public array $links;
    public array $mechanism;
    public array $mechanisms;
    public string $name;
    public string $note;
    public array $notes;
    public array $peptide;
    public int $peptide_count;
    public int $peptide_total;
    public array $peptides;
    public array $preclinical_evidence;
    public array $properties;
    public string $query;
    public array $references;
    public array $regulatory;
    public array $regulatory_evidence;
    public string $regulatory_status;
    public string $regulatory_status_label;
    public array $research_areas;
    public array $research_gaps;
    public array $research_topics;
    public array $review;
    public array $safety;
    public array $secondary_reports;
    public mixed $statement;
    public mixed $summary;
    public array $unavailable_sources;
    public string $url;
    public mixed $wada_status;
}

/** Request payload for Research#load. */
class ResearchLoadMatch
{
    public string $slug;
}

/** Request payload for Research#list. */
class ResearchListMatch
{
    public ?array $also_known_as = null;
    public ?string $api_url = null;
    public ?bool $approved_medicine = null;
    public mixed $availability = null;
    public ?array $categories = null;
    public ?array $classification = null;
    public ?array $clinical_evidence = null;
    public mixed $conflict = null;
    public ?array $content = null;
    public mixed $content_reviewed_at = null;
    public ?int $content_total = null;
    public ?string $description = null;
    public mixed $development_stage = null;
    public ?array $evidence = null;
    public mixed $fda_status = null;
    public ?string $id = null;
    public ?string $label = null;
    public mixed $last_reviewed = null;
    public mixed $library_classification = null;
    public ?array $limitations = null;
    public ?array $links = null;
    public ?array $mechanism = null;
    public ?array $mechanisms = null;
    public ?string $name = null;
    public ?string $note = null;
    public ?array $notes = null;
    public ?array $peptide = null;
    public ?int $peptide_count = null;
    public ?int $peptide_total = null;
    public ?array $peptides = null;
    public ?array $preclinical_evidence = null;
    public ?array $properties = null;
    public ?string $query = null;
    public ?array $references = null;
    public ?array $regulatory = null;
    public ?array $regulatory_evidence = null;
    public ?string $regulatory_status = null;
    public ?string $regulatory_status_label = null;
    public ?array $research_areas = null;
    public ?array $research_gaps = null;
    public ?array $research_topics = null;
    public ?array $review = null;
    public ?array $safety = null;
    public ?array $secondary_reports = null;
    public mixed $statement = null;
    public mixed $summary = null;
    public ?array $unavailable_sources = null;
    public ?string $url = null;
    public mixed $wada_status = null;
}

/** ResearchStatistic entity data model. */
class ResearchStatistic
{
    public array $by_year;
    public array $categories;
    public mixed $chart_url;
    public string $citation;
    public array $columns;
    public string $definition;
    public mixed $denominator;
    public mixed $denominator_definition;
    public string $description;
    public mixed $detail;
    public mixed $doi;
    public mixed $doi_url;
    public string $embed_url;
    public string $evidence_class;
    public array $filters;
    public string $first_pub_date;
    public array $flags;
    public array $groups;
    public string $how_to_read;
    public string $id;
    public bool $is_peptide;
    public mixed $journal;
    public array $key_publications;
    public string $kind;
    public string $label;
    public array $license;
    public array $limitations;
    public array $mesh_roots;
    public string $methodology_url;
    public string $metric;
    public mixed $min_baseline;
    public string $name;
    public mixed $numerator;
    public mixed $numerator_definition;
    public mixed $open_access;
    public mixed $origin;
    public int $partial_year;
    public array $peptide;
    public array $peptide_ids;
    public string $permalink;
    public string $pmid;
    public string $png_url;
    public mixed $publications;
    public string $published_at;
    public string $pubmed_url;
    public mixed $query;
    public mixed $regulatory;
    public string $research_url;
    public array $rows;
    public int $section;
    public string $slug;
    public array $snapshot;
    public string $source;
    public string $study_type;
    public array $study_types;
    public string $subtitle;
    public string $svg_url;
    public string $tier;
    public mixed $tier_reason;
    public string $title;
    public mixed $totals;
    public mixed $trials;
    public string $unit;
    public string $url;
    public mixed $value;
    public int $version;
    public array $versions;
}

/** Request payload for ResearchStatistic#load. */
class ResearchStatisticLoadMatch
{
    public string $id;
    public ?string $version = null;
}

/** Request payload for ResearchStatistic#list. */
class ResearchStatisticListMatch
{
    public ?string $version = null;
}

/** Study entity data model. */
class Study
{
    public bool $analog_compound;
    public string $authors;
    public array $citations;
    public array $cited_by;
    public mixed $doi;
    public string $evidence_classification;
    public string $evidence_classification_label;
    public string $id;
    public string $journal;
    public array $limitations;
    public mixed $nct_id;
    public mixed $pmid;
    public mixed $population;
    public mixed $publication_year;
    public string $research_model;
    public mixed $sample_size;
    public mixed $source_url;
    public mixed $study_type;
    public mixed $summary;
    public string $title;
}

/** Request payload for Study#load. */
class StudyLoadMatch
{
    public string $id;
}

/** Request payload for Study#list. */
class StudyListMatch
{
    public ?string $cursor = null;
    public ?string $evidence_classification = null;
    public ?string $field = null;
    public ?int $limit = null;
    public ?string $peptide = null;
    public ?string $search = null;
    public ?string $sort = null;
    public ?int $year_from = null;
    public ?int $year_to = null;
}

/** Vendor entity data model. */
class Vendor
{
    public array $about;
    public string $api_url;
    public array $catalog;
    public mixed $country;
    public mixed $description;
    public string $id;
    public mixed $logo_url;
    public string $name;
    public array $product_categories;
    public string $profile_url;
    public array $rating;
    public mixed $region;
    public array $reviews;
    public array $shipping;
    public string $slug;
    public array $sources;
    public string $website_url;
}

/** Request payload for Vendor#load. */
class VendorLoadMatch
{
    public string $id;
    public ?string $ships_to = null;
}

/** Request payload for Vendor#list. */
class VendorListMatch
{
    public ?string $country = null;
    public ?string $cursor = null;
    public ?string $field = null;
    public ?int $limit = null;
    public ?float $min_rating = null;
    public ?string $peptide = null;
    public ?string $product_category = null;
    public ?string $search = null;
    public ?string $ships_to = null;
    public ?string $sort = null;
}

