# PeptideLibrary SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

PeptideLibraryUtility.registrar = ->(u) {
  u.clean = PeptideLibraryUtilities::Clean
  u.clean_add = PeptideLibraryUtilities::CleanAdd
  u.clean_explain = PeptideLibraryUtilities::CleanExplain
  u.done = PeptideLibraryUtilities::Done
  u.make_error = PeptideLibraryUtilities::MakeError
  u.feature_add = PeptideLibraryUtilities::FeatureAdd
  u.feature_hook = PeptideLibraryUtilities::FeatureHook
  u.feature_init = PeptideLibraryUtilities::FeatureInit
  u.fetcher = PeptideLibraryUtilities::Fetcher
  u.make_fetch_def = PeptideLibraryUtilities::MakeFetchDef
  u.make_context = PeptideLibraryUtilities::MakeContext
  u.make_options = PeptideLibraryUtilities::MakeOptions
  u.make_request = PeptideLibraryUtilities::MakeRequest
  u.make_response = PeptideLibraryUtilities::MakeResponse
  u.make_result = PeptideLibraryUtilities::MakeResult
  u.make_point = PeptideLibraryUtilities::MakePoint
  u.make_spec = PeptideLibraryUtilities::MakeSpec
  u.make_url = PeptideLibraryUtilities::MakeUrl
  u.param = PeptideLibraryUtilities::Param
  u.prepare_auth = PeptideLibraryUtilities::PrepareAuth
  u.prepare_body = PeptideLibraryUtilities::PrepareBody
  u.prepare_headers = PeptideLibraryUtilities::PrepareHeaders
  u.prepare_method = PeptideLibraryUtilities::PrepareMethod
  u.prepare_params = PeptideLibraryUtilities::PrepareParams
  u.prepare_path = PeptideLibraryUtilities::PreparePath
  u.prepare_query = PeptideLibraryUtilities::PrepareQuery
  u.graphql_body = PeptideLibraryUtilities::GraphqlBody
  u.graphql_errors = PeptideLibraryUtilities::GraphqlErrors
  u.result_basic = PeptideLibraryUtilities::ResultBasic
  u.result_body = PeptideLibraryUtilities::ResultBody
  u.result_headers = PeptideLibraryUtilities::ResultHeaders
  u.transform_request = PeptideLibraryUtilities::TransformRequest
  u.transform_response = PeptideLibraryUtilities::TransformResponse
}
