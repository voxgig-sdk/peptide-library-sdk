<?php
declare(strict_types=1);

// PeptideLibrary SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class PeptideLibraryMakeContext
{
    public static function call(array $ctxmap, ?PeptideLibraryContext $basectx): PeptideLibraryContext
    {
        return new PeptideLibraryContext($ctxmap, $basectx);
    }
}
