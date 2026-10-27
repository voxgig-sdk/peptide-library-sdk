# PeptideLibrary SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module PeptideLibraryFeatures
  def self.make_feature(name)
    case name
    when "base"
      PeptideLibraryBaseFeature.new
    when "ratelimit"
      PeptideLibraryRatelimitFeature.new
    when "retry"
      PeptideLibraryRetryFeature.new
    when "test"
      PeptideLibraryTestFeature.new
    when "timeout"
      PeptideLibraryTimeoutFeature.new
    else
      PeptideLibraryBaseFeature.new
    end
  end
end
