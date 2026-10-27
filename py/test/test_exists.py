# PeptideLibrary SDK exists test

import pytest
from peptidelibrary_sdk import PeptideLibrarySDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = PeptideLibrarySDK.test(None, None)
        assert testsdk is not None
