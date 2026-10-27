package voxgigpeptidelibrarysdk

import (
	"github.com/voxgig-sdk/peptide-library-sdk/go/core"
	"github.com/voxgig-sdk/peptide-library-sdk/go/entity"
	"github.com/voxgig-sdk/peptide-library-sdk/go/feature"
	_ "github.com/voxgig-sdk/peptide-library-sdk/go/utility"
)

// Type aliases preserve external API.
type PeptideLibrarySDK = core.PeptideLibrarySDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type PeptideLibraryEntity = core.PeptideLibraryEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type PeptideLibraryError = core.PeptideLibraryError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewGetApiIndexEntityFunc = func(client *core.PeptideLibrarySDK, entopts map[string]any) core.PeptideLibraryEntity {
		return entity.NewGetApiIndexEntity(client, entopts)
	}
	core.NewMetaEntityFunc = func(client *core.PeptideLibrarySDK, entopts map[string]any) core.PeptideLibraryEntity {
		return entity.NewMetaEntity(client, entopts)
	}
	core.NewPriceEntityFunc = func(client *core.PeptideLibrarySDK, entopts map[string]any) core.PeptideLibraryEntity {
		return entity.NewPriceEntity(client, entopts)
	}
	core.NewProductEntityFunc = func(client *core.PeptideLibrarySDK, entopts map[string]any) core.PeptideLibraryEntity {
		return entity.NewProductEntity(client, entopts)
	}
	core.NewResearchEntityFunc = func(client *core.PeptideLibrarySDK, entopts map[string]any) core.PeptideLibraryEntity {
		return entity.NewResearchEntity(client, entopts)
	}
	core.NewResearchStatisticEntityFunc = func(client *core.PeptideLibrarySDK, entopts map[string]any) core.PeptideLibraryEntity {
		return entity.NewResearchStatisticEntity(client, entopts)
	}
	core.NewStudyEntityFunc = func(client *core.PeptideLibrarySDK, entopts map[string]any) core.PeptideLibraryEntity {
		return entity.NewStudyEntity(client, entopts)
	}
	core.NewVendorEntityFunc = func(client *core.PeptideLibrarySDK, entopts map[string]any) core.PeptideLibraryEntity {
		return entity.NewVendorEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewPeptideLibrarySDK = core.NewPeptideLibrarySDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewPeptideLibrarySDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *PeptideLibrarySDK  { return NewPeptideLibrarySDK(nil) }
func Test() *PeptideLibrarySDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
