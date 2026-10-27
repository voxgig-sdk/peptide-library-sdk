// Typed models for the PeptideLibrary SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/peptide-library-sdk/go/core"
)

// GetApiIndex is the typed data model for the get_api_index entity.
type GetApiIndex struct {
}

// GetApiIndexLoadMatch is the typed request payload for GetApiIndex.LoadTyped.
type GetApiIndexLoadMatch struct {
	Documentation *string `json:"documentation,omitempty"`
	Endpoints *[]any `json:"endpoints,omitempty"`
	Name *string `json:"name,omitempty"`
	Openapi *string `json:"openapi,omitempty"`
	Release *string `json:"release,omitempty"`
	Version *string `json:"version,omitempty"`
}

// Meta is the typed data model for the meta entity.
type Meta struct {
}

// MetaLoadMatch is the typed request payload for Meta.LoadTyped.
type MetaLoadMatch struct {
	Database *string `json:"database,omitempty"`
	Release *string `json:"release,omitempty"`
	Status *string `json:"status,omitempty"`
}

// Price is the typed data model for the price entity.
type Price struct {
}

// PriceLoadMatch is the typed request payload for Price.LoadTyped.
type PriceLoadMatch struct {
	Currency *string `json:"currency,omitempty"`
	Form *string `json:"form,omitempty"`
	InStock *bool `json:"in_stock,omitempty"`
	Peptide string `json:"peptide"`
	ShipsTo *string `json:"ships_to,omitempty"`
}

// PriceListMatch is the typed request payload for Price.ListTyped.
type PriceListMatch struct {
	Category *string `json:"category,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	Field *string `json:"field,omitempty"`
	Form *string `json:"form,omitempty"`
	InStock *bool `json:"in_stock,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Peptide *string `json:"peptide,omitempty"`
	PriceMax *float64 `json:"price_max,omitempty"`
	PriceMin *float64 `json:"price_min,omitempty"`
	Product *string `json:"product,omitempty"`
	Search *string `json:"search,omitempty"`
	ShipsTo *string `json:"ships_to,omitempty"`
	Sort *string `json:"sort,omitempty"`
	StrengthMaxMg *float64 `json:"strength_max_mg,omitempty"`
	StrengthMinMg *float64 `json:"strength_min_mg,omitempty"`
	Vendor *string `json:"vendor,omitempty"`
}

// Product is the typed data model for the product entity.
type Product struct {
}

// ProductLoadMatch is the typed request payload for Product.LoadTyped.
type ProductLoadMatch struct {
	Id string `json:"id"`
	ShipsTo *string `json:"ships_to,omitempty"`
}

// ProductListMatch is the typed request payload for Product.ListTyped.
type ProductListMatch struct {
	Category *string `json:"category,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	Field *string `json:"field,omitempty"`
	Form *string `json:"form,omitempty"`
	InStock *bool `json:"in_stock,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Peptide *string `json:"peptide,omitempty"`
	Search *string `json:"search,omitempty"`
	ShipsTo *string `json:"ships_to,omitempty"`
	Sort *string `json:"sort,omitempty"`
	Vendor *string `json:"vendor,omitempty"`
}

// Research is the typed data model for the research entity.
type Research struct {
}

// ResearchLoadMatch is the typed request payload for Research.LoadTyped.
type ResearchLoadMatch struct {
	Slug string `json:"slug"`
}

// ResearchListMatch is the typed request payload for Research.ListTyped.
type ResearchListMatch struct {
	AlsoKnownAs *[]any `json:"also_known_as,omitempty"`
	ApiUrl *string `json:"api_url,omitempty"`
	ApprovedMedicine *bool `json:"approved_medicine,omitempty"`
	Availability *any `json:"availability,omitempty"`
	Categories *[]any `json:"categories,omitempty"`
	Classification *map[string]any `json:"classification,omitempty"`
	ClinicalEvidence *map[string]any `json:"clinical_evidence,omitempty"`
	Conflict *any `json:"conflict,omitempty"`
	Content *[]any `json:"content,omitempty"`
	ContentReviewedAt *any `json:"content_reviewed_at,omitempty"`
	ContentTotal *int `json:"content_total,omitempty"`
	Description *string `json:"description,omitempty"`
	DevelopmentStage *any `json:"development_stage,omitempty"`
	Evidence *map[string]any `json:"evidence,omitempty"`
	FdaStatus *any `json:"fda_status,omitempty"`
	Id *string `json:"id,omitempty"`
	Label *string `json:"label,omitempty"`
	LastReviewed *any `json:"last_reviewed,omitempty"`
	LibraryClassification *any `json:"library_classification,omitempty"`
	Limitations *[]any `json:"limitations,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
	Mechanism *map[string]any `json:"mechanism,omitempty"`
	Mechanisms *map[string]any `json:"mechanisms,omitempty"`
	Name *string `json:"name,omitempty"`
	Note *string `json:"note,omitempty"`
	Notes *[]any `json:"notes,omitempty"`
	Peptide *map[string]any `json:"peptide,omitempty"`
	PeptideCount *int `json:"peptide_count,omitempty"`
	PeptideTotal *int `json:"peptide_total,omitempty"`
	Peptides *[]any `json:"peptides,omitempty"`
	PreclinicalEvidence *map[string]any `json:"preclinical_evidence,omitempty"`
	Properties *map[string]any `json:"properties,omitempty"`
	Query *string `json:"query,omitempty"`
	References *[]any `json:"references,omitempty"`
	Regulatory *map[string]any `json:"regulatory,omitempty"`
	RegulatoryEvidence *[]any `json:"regulatory_evidence,omitempty"`
	RegulatoryStatus *string `json:"regulatory_status,omitempty"`
	RegulatoryStatusLabel *string `json:"regulatory_status_label,omitempty"`
	ResearchAreas *[]any `json:"research_areas,omitempty"`
	ResearchGaps *[]any `json:"research_gaps,omitempty"`
	ResearchTopics *[]any `json:"research_topics,omitempty"`
	Review *map[string]any `json:"review,omitempty"`
	Safety *map[string]any `json:"safety,omitempty"`
	SecondaryReports *map[string]any `json:"secondary_reports,omitempty"`
	Statement *any `json:"statement,omitempty"`
	Summary *any `json:"summary,omitempty"`
	UnavailableSources *[]any `json:"unavailable_sources,omitempty"`
	Url *string `json:"url,omitempty"`
	WadaStatus *any `json:"wada_status,omitempty"`
}

// ResearchStatistic is the typed data model for the research_statistic entity.
type ResearchStatistic struct {
}

// ResearchStatisticLoadMatch is the typed request payload for ResearchStatistic.LoadTyped.
type ResearchStatisticLoadMatch struct {
	Id string `json:"id"`
	Version *string `json:"version,omitempty"`
}

// ResearchStatisticListMatch is the typed request payload for ResearchStatistic.ListTyped.
type ResearchStatisticListMatch struct {
	Version *string `json:"version,omitempty"`
}

// Study is the typed data model for the study entity.
type Study struct {
}

// StudyLoadMatch is the typed request payload for Study.LoadTyped.
type StudyLoadMatch struct {
	Id string `json:"id"`
}

// StudyListMatch is the typed request payload for Study.ListTyped.
type StudyListMatch struct {
	Cursor *string `json:"cursor,omitempty"`
	EvidenceClassification *string `json:"evidence_classification,omitempty"`
	Field *string `json:"field,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Peptide *string `json:"peptide,omitempty"`
	Search *string `json:"search,omitempty"`
	Sort *string `json:"sort,omitempty"`
	YearFrom *int `json:"year_from,omitempty"`
	YearTo *int `json:"year_to,omitempty"`
}

// Vendor is the typed data model for the vendor entity.
type Vendor struct {
}

// VendorLoadMatch is the typed request payload for Vendor.LoadTyped.
type VendorLoadMatch struct {
	Id string `json:"id"`
	ShipsTo *string `json:"ships_to,omitempty"`
}

// VendorListMatch is the typed request payload for Vendor.ListTyped.
type VendorListMatch struct {
	Country *string `json:"country,omitempty"`
	Cursor *string `json:"cursor,omitempty"`
	Field *string `json:"field,omitempty"`
	Limit *int `json:"limit,omitempty"`
	MinRating *float64 `json:"min_rating,omitempty"`
	Peptide *string `json:"peptide,omitempty"`
	ProductCategory *string `json:"product_category,omitempty"`
	Search *string `json:"search,omitempty"`
	ShipsTo *string `json:"ships_to,omitempty"`
	Sort *string `json:"sort,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
