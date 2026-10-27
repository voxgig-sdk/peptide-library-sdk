<?php
declare(strict_types=1);

// PeptideLibrary SDK utility: result_headers

class PeptideLibraryResultHeaders
{
    public static function call(PeptideLibraryContext $ctx): ?PeptideLibraryResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
