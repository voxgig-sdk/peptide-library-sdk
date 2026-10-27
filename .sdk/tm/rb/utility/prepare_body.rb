# PeptideLibrary SDK utility: prepare_body
require_relative 'media'
module PeptideLibraryUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return PeptideLibraryUtilities.raw_body(ctx.reqdata) if PeptideLibraryUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
