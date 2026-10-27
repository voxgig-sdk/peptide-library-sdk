# PeptideLibrary SDK feature factory

from peptidelibrary_sdk.feature.base_feature import PeptideLibraryBaseFeature
from peptidelibrary_sdk.feature.ratelimit_feature import PeptideLibraryRatelimitFeature
from peptidelibrary_sdk.feature.retry_feature import PeptideLibraryRetryFeature
from peptidelibrary_sdk.feature.test_feature import PeptideLibraryTestFeature
from peptidelibrary_sdk.feature.timeout_feature import PeptideLibraryTimeoutFeature


_FEATURES = {
    "base": lambda: PeptideLibraryBaseFeature(),
    "ratelimit": lambda: PeptideLibraryRatelimitFeature(),
    "retry": lambda: PeptideLibraryRetryFeature(),
    "test": lambda: PeptideLibraryTestFeature(),
    "timeout": lambda: PeptideLibraryTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
