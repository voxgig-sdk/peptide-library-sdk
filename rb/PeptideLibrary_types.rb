# frozen_string_literal: true

# Typed models for the PeptideLibrary SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GetApiIndex entity data model.
#
# @!attribute [rw] documentation
#   @return [String]
#
# @!attribute [rw] endpoints
#   @return [Array]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] openapi
#   @return [String]
#
# @!attribute [rw] release
#   @return [String]
#
# @!attribute [rw] version
#   @return [String]
GetApiIndex = Struct.new(
  :documentation,
  :endpoints,
  :name,
  :openapi,
  :release,
  :version,
  keyword_init: true
)

# Request payload for GetApiIndex#load.
#
# @!attribute [rw] documentation
#   @return [String, nil]
#
# @!attribute [rw] endpoints
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] openapi
#   @return [String, nil]
#
# @!attribute [rw] release
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
GetApiIndexLoadMatch = Struct.new(
  :documentation,
  :endpoints,
  :name,
  :openapi,
  :release,
  :version,
  keyword_init: true
)

# Meta entity data model.
#
# @!attribute [rw] database
#   @return [String]
#
# @!attribute [rw] release
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
Meta = Struct.new(
  :database,
  :release,
  :status,
  keyword_init: true
)

# Request payload for Meta#load.
#
# @!attribute [rw] database
#   @return [String, nil]
#
# @!attribute [rw] release
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
MetaLoadMatch = Struct.new(
  :database,
  :release,
  :status,
  keyword_init: true
)

# Price entity data model.
#
# @!attribute [rw] availability
#   @return [String]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] first_seen_at
#   @return [Object]
#
# @!attribute [rw] form
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] is_affiliate_link
#   @return [Boolean]
#
# @!attribute [rw] is_stale
#   @return [Boolean]
#
# @!attribute [rw] last_seen_at
#   @return [Object]
#
# @!attribute [rw] peptide
#   @return [Hash]
#
# @!attribute [rw] price
#   @return [String]
#
# @!attribute [rw] price_changed_at
#   @return [Object]
#
# @!attribute [rw] price_per_mg
#   @return [Object]
#
# @!attribute [rw] price_per_unit
#   @return [Object]
#
# @!attribute [rw] product_id
#   @return [String]
#
# @!attribute [rw] product_name
#   @return [String]
#
# @!attribute [rw] product_page_url
#   @return [String]
#
# @!attribute [rw] product_type
#   @return [String]
#
# @!attribute [rw] regular_price
#   @return [Object]
#
# @!attribute [rw] ships_to
#   @return [Object]
#
# @!attribute [rw] strength
#   @return [Hash]
#
# @!attribute [rw] vendor
#   @return [Hash]
Price = Struct.new(
  :availability,
  :currency,
  :first_seen_at,
  :form,
  :id,
  :is_affiliate_link,
  :is_stale,
  :last_seen_at,
  :peptide,
  :price,
  :price_changed_at,
  :price_per_mg,
  :price_per_unit,
  :product_id,
  :product_name,
  :product_page_url,
  :product_type,
  :regular_price,
  :ships_to,
  :strength,
  :vendor,
  keyword_init: true
)

# Request payload for Price#load.
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] form
#   @return [String, nil]
#
# @!attribute [rw] in_stock
#   @return [Boolean, nil]
#
# @!attribute [rw] peptide
#   @return [String]
#
# @!attribute [rw] ships_to
#   @return [String, nil]
PriceLoadMatch = Struct.new(
  :currency,
  :form,
  :in_stock,
  :peptide,
  :ships_to,
  keyword_init: true
)

# Request payload for Price#list.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] field
#   @return [String, nil]
#
# @!attribute [rw] form
#   @return [String, nil]
#
# @!attribute [rw] in_stock
#   @return [Boolean, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] peptide
#   @return [String, nil]
#
# @!attribute [rw] price_max
#   @return [Float, nil]
#
# @!attribute [rw] price_min
#   @return [Float, nil]
#
# @!attribute [rw] product
#   @return [String, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] ships_to
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
#
# @!attribute [rw] strength_max_mg
#   @return [Float, nil]
#
# @!attribute [rw] strength_min_mg
#   @return [Float, nil]
#
# @!attribute [rw] vendor
#   @return [String, nil]
PriceListMatch = Struct.new(
  :category,
  :currency,
  :cursor,
  :field,
  :form,
  :in_stock,
  :limit,
  :peptide,
  :price_max,
  :price_min,
  :product,
  :search,
  :ships_to,
  :sort,
  :strength_max_mg,
  :strength_min_mg,
  :vendor,
  keyword_init: true
)

# Product entity data model.
#
# @!attribute [rw] api_url
#   @return [String]
#
# @!attribute [rw] form
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] in_stock_count
#   @return [Integer]
#
# @!attribute [rw] last_seen_at
#   @return [Object]
#
# @!attribute [rw] offer_count
#   @return [Integer]
#
# @!attribute [rw] offers
#   @return [Object]
#
# @!attribute [rw] peptide
#   @return [Hash]
#
# @!attribute [rw] prices
#   @return [Array]
#
# @!attribute [rw] product_type
#   @return [String]
#
# @!attribute [rw] vendor_count
#   @return [Integer]
Product = Struct.new(
  :api_url,
  :form,
  :id,
  :in_stock_count,
  :last_seen_at,
  :offer_count,
  :offers,
  :peptide,
  :prices,
  :product_type,
  :vendor_count,
  keyword_init: true
)

# Request payload for Product#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] ships_to
#   @return [String, nil]
ProductLoadMatch = Struct.new(
  :id,
  :ships_to,
  keyword_init: true
)

# Request payload for Product#list.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] field
#   @return [String, nil]
#
# @!attribute [rw] form
#   @return [String, nil]
#
# @!attribute [rw] in_stock
#   @return [Boolean, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] peptide
#   @return [String, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] ships_to
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
#
# @!attribute [rw] vendor
#   @return [String, nil]
ProductListMatch = Struct.new(
  :category,
  :cursor,
  :field,
  :form,
  :in_stock,
  :limit,
  :peptide,
  :search,
  :ships_to,
  :sort,
  :vendor,
  keyword_init: true
)

# Research entity data model.
#
# @!attribute [rw] also_known_as
#   @return [Array]
#
# @!attribute [rw] api_url
#   @return [String]
#
# @!attribute [rw] approved_medicine
#   @return [Boolean]
#
# @!attribute [rw] availability
#   @return [Object]
#
# @!attribute [rw] categories
#   @return [Array]
#
# @!attribute [rw] classification
#   @return [Hash]
#
# @!attribute [rw] clinical_evidence
#   @return [Hash]
#
# @!attribute [rw] conflict
#   @return [Object]
#
# @!attribute [rw] content
#   @return [Array]
#
# @!attribute [rw] content_reviewed_at
#   @return [Object]
#
# @!attribute [rw] content_total
#   @return [Integer]
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] development_stage
#   @return [Object]
#
# @!attribute [rw] evidence
#   @return [Hash]
#
# @!attribute [rw] fda_status
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] label
#   @return [String]
#
# @!attribute [rw] last_reviewed
#   @return [Object]
#
# @!attribute [rw] library_classification
#   @return [Object]
#
# @!attribute [rw] limitations
#   @return [Array]
#
# @!attribute [rw] links
#   @return [Hash]
#
# @!attribute [rw] mechanism
#   @return [Hash]
#
# @!attribute [rw] mechanisms
#   @return [Hash]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] note
#   @return [String]
#
# @!attribute [rw] notes
#   @return [Array]
#
# @!attribute [rw] peptide
#   @return [Hash]
#
# @!attribute [rw] peptide_count
#   @return [Integer]
#
# @!attribute [rw] peptide_total
#   @return [Integer]
#
# @!attribute [rw] peptides
#   @return [Array]
#
# @!attribute [rw] preclinical_evidence
#   @return [Hash]
#
# @!attribute [rw] properties
#   @return [Hash]
#
# @!attribute [rw] query
#   @return [String]
#
# @!attribute [rw] references
#   @return [Array]
#
# @!attribute [rw] regulatory
#   @return [Hash]
#
# @!attribute [rw] regulatory_evidence
#   @return [Array]
#
# @!attribute [rw] regulatory_status
#   @return [String]
#
# @!attribute [rw] regulatory_status_label
#   @return [String]
#
# @!attribute [rw] research_areas
#   @return [Array]
#
# @!attribute [rw] research_gaps
#   @return [Array]
#
# @!attribute [rw] research_topics
#   @return [Array]
#
# @!attribute [rw] review
#   @return [Hash]
#
# @!attribute [rw] safety
#   @return [Hash]
#
# @!attribute [rw] secondary_reports
#   @return [Hash]
#
# @!attribute [rw] statement
#   @return [Object]
#
# @!attribute [rw] summary
#   @return [Object]
#
# @!attribute [rw] unavailable_sources
#   @return [Array]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] wada_status
#   @return [Object]
Research = Struct.new(
  :also_known_as,
  :api_url,
  :approved_medicine,
  :availability,
  :categories,
  :classification,
  :clinical_evidence,
  :conflict,
  :content,
  :content_reviewed_at,
  :content_total,
  :description,
  :development_stage,
  :evidence,
  :fda_status,
  :id,
  :label,
  :last_reviewed,
  :library_classification,
  :limitations,
  :links,
  :mechanism,
  :mechanisms,
  :name,
  :note,
  :notes,
  :peptide,
  :peptide_count,
  :peptide_total,
  :peptides,
  :preclinical_evidence,
  :properties,
  :query,
  :references,
  :regulatory,
  :regulatory_evidence,
  :regulatory_status,
  :regulatory_status_label,
  :research_areas,
  :research_gaps,
  :research_topics,
  :review,
  :safety,
  :secondary_reports,
  :statement,
  :summary,
  :unavailable_sources,
  :url,
  :wada_status,
  keyword_init: true
)

# Request payload for Research#load.
#
# @!attribute [rw] slug
#   @return [String]
ResearchLoadMatch = Struct.new(
  :slug,
  keyword_init: true
)

# Request payload for Research#list.
#
# @!attribute [rw] also_known_as
#   @return [Array, nil]
#
# @!attribute [rw] api_url
#   @return [String, nil]
#
# @!attribute [rw] approved_medicine
#   @return [Boolean, nil]
#
# @!attribute [rw] availability
#   @return [Object, nil]
#
# @!attribute [rw] categories
#   @return [Array, nil]
#
# @!attribute [rw] classification
#   @return [Hash, nil]
#
# @!attribute [rw] clinical_evidence
#   @return [Hash, nil]
#
# @!attribute [rw] conflict
#   @return [Object, nil]
#
# @!attribute [rw] content
#   @return [Array, nil]
#
# @!attribute [rw] content_reviewed_at
#   @return [Object, nil]
#
# @!attribute [rw] content_total
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] development_stage
#   @return [Object, nil]
#
# @!attribute [rw] evidence
#   @return [Hash, nil]
#
# @!attribute [rw] fda_status
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] label
#   @return [String, nil]
#
# @!attribute [rw] last_reviewed
#   @return [Object, nil]
#
# @!attribute [rw] library_classification
#   @return [Object, nil]
#
# @!attribute [rw] limitations
#   @return [Array, nil]
#
# @!attribute [rw] links
#   @return [Hash, nil]
#
# @!attribute [rw] mechanism
#   @return [Hash, nil]
#
# @!attribute [rw] mechanisms
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] notes
#   @return [Array, nil]
#
# @!attribute [rw] peptide
#   @return [Hash, nil]
#
# @!attribute [rw] peptide_count
#   @return [Integer, nil]
#
# @!attribute [rw] peptide_total
#   @return [Integer, nil]
#
# @!attribute [rw] peptides
#   @return [Array, nil]
#
# @!attribute [rw] preclinical_evidence
#   @return [Hash, nil]
#
# @!attribute [rw] properties
#   @return [Hash, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] references
#   @return [Array, nil]
#
# @!attribute [rw] regulatory
#   @return [Hash, nil]
#
# @!attribute [rw] regulatory_evidence
#   @return [Array, nil]
#
# @!attribute [rw] regulatory_status
#   @return [String, nil]
#
# @!attribute [rw] regulatory_status_label
#   @return [String, nil]
#
# @!attribute [rw] research_areas
#   @return [Array, nil]
#
# @!attribute [rw] research_gaps
#   @return [Array, nil]
#
# @!attribute [rw] research_topics
#   @return [Array, nil]
#
# @!attribute [rw] review
#   @return [Hash, nil]
#
# @!attribute [rw] safety
#   @return [Hash, nil]
#
# @!attribute [rw] secondary_reports
#   @return [Hash, nil]
#
# @!attribute [rw] statement
#   @return [Object, nil]
#
# @!attribute [rw] summary
#   @return [Object, nil]
#
# @!attribute [rw] unavailable_sources
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] wada_status
#   @return [Object, nil]
ResearchListMatch = Struct.new(
  :also_known_as,
  :api_url,
  :approved_medicine,
  :availability,
  :categories,
  :classification,
  :clinical_evidence,
  :conflict,
  :content,
  :content_reviewed_at,
  :content_total,
  :description,
  :development_stage,
  :evidence,
  :fda_status,
  :id,
  :label,
  :last_reviewed,
  :library_classification,
  :limitations,
  :links,
  :mechanism,
  :mechanisms,
  :name,
  :note,
  :notes,
  :peptide,
  :peptide_count,
  :peptide_total,
  :peptides,
  :preclinical_evidence,
  :properties,
  :query,
  :references,
  :regulatory,
  :regulatory_evidence,
  :regulatory_status,
  :regulatory_status_label,
  :research_areas,
  :research_gaps,
  :research_topics,
  :review,
  :safety,
  :secondary_reports,
  :statement,
  :summary,
  :unavailable_sources,
  :url,
  :wada_status,
  keyword_init: true
)

# ResearchStatistic entity data model.
#
# @!attribute [rw] by_year
#   @return [Array]
#
# @!attribute [rw] categories
#   @return [Array]
#
# @!attribute [rw] chart_url
#   @return [Object]
#
# @!attribute [rw] citation
#   @return [String]
#
# @!attribute [rw] columns
#   @return [Array]
#
# @!attribute [rw] definition
#   @return [String]
#
# @!attribute [rw] denominator
#   @return [Object]
#
# @!attribute [rw] denominator_definition
#   @return [Object]
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] detail
#   @return [Object]
#
# @!attribute [rw] doi
#   @return [Object]
#
# @!attribute [rw] doi_url
#   @return [Object]
#
# @!attribute [rw] embed_url
#   @return [String]
#
# @!attribute [rw] evidence_class
#   @return [String]
#
# @!attribute [rw] filters
#   @return [Hash]
#
# @!attribute [rw] first_pub_date
#   @return [String]
#
# @!attribute [rw] flags
#   @return [Array]
#
# @!attribute [rw] groups
#   @return [Array]
#
# @!attribute [rw] how_to_read
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] is_peptide
#   @return [Boolean]
#
# @!attribute [rw] journal
#   @return [Object]
#
# @!attribute [rw] key_publications
#   @return [Array]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] label
#   @return [String]
#
# @!attribute [rw] license
#   @return [Hash]
#
# @!attribute [rw] limitations
#   @return [Array]
#
# @!attribute [rw] mesh_roots
#   @return [Array]
#
# @!attribute [rw] methodology_url
#   @return [String]
#
# @!attribute [rw] metric
#   @return [String]
#
# @!attribute [rw] min_baseline
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] numerator
#   @return [Object]
#
# @!attribute [rw] numerator_definition
#   @return [Object]
#
# @!attribute [rw] open_access
#   @return [Object]
#
# @!attribute [rw] origin
#   @return [Object]
#
# @!attribute [rw] partial_year
#   @return [Integer]
#
# @!attribute [rw] peptide
#   @return [Hash]
#
# @!attribute [rw] peptide_ids
#   @return [Array]
#
# @!attribute [rw] permalink
#   @return [String]
#
# @!attribute [rw] pmid
#   @return [String]
#
# @!attribute [rw] png_url
#   @return [String]
#
# @!attribute [rw] publications
#   @return [Object]
#
# @!attribute [rw] published_at
#   @return [String]
#
# @!attribute [rw] pubmed_url
#   @return [String]
#
# @!attribute [rw] query
#   @return [Object]
#
# @!attribute [rw] regulatory
#   @return [Object]
#
# @!attribute [rw] research_url
#   @return [String]
#
# @!attribute [rw] rows
#   @return [Array]
#
# @!attribute [rw] section
#   @return [Integer]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] snapshot
#   @return [Hash]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] study_type
#   @return [String]
#
# @!attribute [rw] study_types
#   @return [Array]
#
# @!attribute [rw] subtitle
#   @return [String]
#
# @!attribute [rw] svg_url
#   @return [String]
#
# @!attribute [rw] tier
#   @return [String]
#
# @!attribute [rw] tier_reason
#   @return [Object]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] totals
#   @return [Object]
#
# @!attribute [rw] trials
#   @return [Object]
#
# @!attribute [rw] unit
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] value
#   @return [Object]
#
# @!attribute [rw] version
#   @return [Integer]
#
# @!attribute [rw] versions
#   @return [Array]
ResearchStatistic = Struct.new(
  :by_year,
  :categories,
  :chart_url,
  :citation,
  :columns,
  :definition,
  :denominator,
  :denominator_definition,
  :description,
  :detail,
  :doi,
  :doi_url,
  :embed_url,
  :evidence_class,
  :filters,
  :first_pub_date,
  :flags,
  :groups,
  :how_to_read,
  :id,
  :is_peptide,
  :journal,
  :key_publications,
  :kind,
  :label,
  :license,
  :limitations,
  :mesh_roots,
  :methodology_url,
  :metric,
  :min_baseline,
  :name,
  :numerator,
  :numerator_definition,
  :open_access,
  :origin,
  :partial_year,
  :peptide,
  :peptide_ids,
  :permalink,
  :pmid,
  :png_url,
  :publications,
  :published_at,
  :pubmed_url,
  :query,
  :regulatory,
  :research_url,
  :rows,
  :section,
  :slug,
  :snapshot,
  :source,
  :study_type,
  :study_types,
  :subtitle,
  :svg_url,
  :tier,
  :tier_reason,
  :title,
  :totals,
  :trials,
  :unit,
  :url,
  :value,
  :version,
  :versions,
  keyword_init: true
)

# Request payload for ResearchStatistic#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] version
#   @return [String, nil]
ResearchStatisticLoadMatch = Struct.new(
  :id,
  :version,
  keyword_init: true
)

# Request payload for ResearchStatistic#list.
#
# @!attribute [rw] version
#   @return [String, nil]
ResearchStatisticListMatch = Struct.new(
  :version,
  keyword_init: true
)

# Study entity data model.
#
# @!attribute [rw] analog_compound
#   @return [Boolean]
#
# @!attribute [rw] authors
#   @return [String]
#
# @!attribute [rw] citations
#   @return [Array]
#
# @!attribute [rw] cited_by
#   @return [Array]
#
# @!attribute [rw] doi
#   @return [Object]
#
# @!attribute [rw] evidence_classification
#   @return [String]
#
# @!attribute [rw] evidence_classification_label
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] journal
#   @return [String]
#
# @!attribute [rw] limitations
#   @return [Array]
#
# @!attribute [rw] nct_id
#   @return [Object]
#
# @!attribute [rw] pmid
#   @return [Object]
#
# @!attribute [rw] population
#   @return [Object]
#
# @!attribute [rw] publication_year
#   @return [Object]
#
# @!attribute [rw] research_model
#   @return [String]
#
# @!attribute [rw] sample_size
#   @return [Object]
#
# @!attribute [rw] source_url
#   @return [Object]
#
# @!attribute [rw] study_type
#   @return [Object]
#
# @!attribute [rw] summary
#   @return [Object]
#
# @!attribute [rw] title
#   @return [String]
Study = Struct.new(
  :analog_compound,
  :authors,
  :citations,
  :cited_by,
  :doi,
  :evidence_classification,
  :evidence_classification_label,
  :id,
  :journal,
  :limitations,
  :nct_id,
  :pmid,
  :population,
  :publication_year,
  :research_model,
  :sample_size,
  :source_url,
  :study_type,
  :summary,
  :title,
  keyword_init: true
)

# Request payload for Study#load.
#
# @!attribute [rw] id
#   @return [String]
StudyLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Study#list.
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] evidence_classification
#   @return [String, nil]
#
# @!attribute [rw] field
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] peptide
#   @return [String, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
#
# @!attribute [rw] year_from
#   @return [Integer, nil]
#
# @!attribute [rw] year_to
#   @return [Integer, nil]
StudyListMatch = Struct.new(
  :cursor,
  :evidence_classification,
  :field,
  :limit,
  :peptide,
  :search,
  :sort,
  :year_from,
  :year_to,
  keyword_init: true
)

# Vendor entity data model.
#
# @!attribute [rw] about
#   @return [Hash]
#
# @!attribute [rw] api_url
#   @return [String]
#
# @!attribute [rw] catalog
#   @return [Hash]
#
# @!attribute [rw] country
#   @return [Object]
#
# @!attribute [rw] description
#   @return [Object]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] logo_url
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] product_categories
#   @return [Array]
#
# @!attribute [rw] profile_url
#   @return [String]
#
# @!attribute [rw] rating
#   @return [Hash]
#
# @!attribute [rw] region
#   @return [Object]
#
# @!attribute [rw] reviews
#   @return [Hash]
#
# @!attribute [rw] shipping
#   @return [Hash]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] sources
#   @return [Hash]
#
# @!attribute [rw] website_url
#   @return [String]
Vendor = Struct.new(
  :about,
  :api_url,
  :catalog,
  :country,
  :description,
  :id,
  :logo_url,
  :name,
  :product_categories,
  :profile_url,
  :rating,
  :region,
  :reviews,
  :shipping,
  :slug,
  :sources,
  :website_url,
  keyword_init: true
)

# Request payload for Vendor#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] ships_to
#   @return [String, nil]
VendorLoadMatch = Struct.new(
  :id,
  :ships_to,
  keyword_init: true
)

# Request payload for Vendor#list.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] cursor
#   @return [String, nil]
#
# @!attribute [rw] field
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] min_rating
#   @return [Float, nil]
#
# @!attribute [rw] peptide
#   @return [String, nil]
#
# @!attribute [rw] product_category
#   @return [String, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] ships_to
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
VendorListMatch = Struct.new(
  :country,
  :cursor,
  :field,
  :limit,
  :min_rating,
  :peptide,
  :product_category,
  :search,
  :ships_to,
  :sort,
  keyword_init: true
)

