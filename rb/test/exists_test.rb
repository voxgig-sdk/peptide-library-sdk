# PeptideLibrary SDK exists test

require "minitest/autorun"
require_relative "../PeptideLibrary_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = PeptideLibrarySDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
