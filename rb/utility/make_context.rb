# PeptideLibrary SDK utility: make_context
require_relative '../core/context'
module PeptideLibraryUtilities
  MakeContext = ->(ctxmap, basectx) {
    PeptideLibraryContext.new(ctxmap, basectx)
  }
end
