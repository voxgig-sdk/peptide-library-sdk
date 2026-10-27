package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewGetApiIndexEntityFunc func(client *PeptideLibrarySDK, entopts map[string]any) PeptideLibraryEntity

var NewMetaEntityFunc func(client *PeptideLibrarySDK, entopts map[string]any) PeptideLibraryEntity

var NewPriceEntityFunc func(client *PeptideLibrarySDK, entopts map[string]any) PeptideLibraryEntity

var NewProductEntityFunc func(client *PeptideLibrarySDK, entopts map[string]any) PeptideLibraryEntity

var NewResearchEntityFunc func(client *PeptideLibrarySDK, entopts map[string]any) PeptideLibraryEntity

var NewResearchStatisticEntityFunc func(client *PeptideLibrarySDK, entopts map[string]any) PeptideLibraryEntity

var NewStudyEntityFunc func(client *PeptideLibrarySDK, entopts map[string]any) PeptideLibraryEntity

var NewVendorEntityFunc func(client *PeptideLibrarySDK, entopts map[string]any) PeptideLibraryEntity

