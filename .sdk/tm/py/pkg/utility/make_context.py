# PeptideLibrary SDK utility: make_context

from projectname_sdk.core.context import PeptideLibraryContext


def make_context_util(ctxmap, basectx):
    return PeptideLibraryContext(ctxmap, basectx)
