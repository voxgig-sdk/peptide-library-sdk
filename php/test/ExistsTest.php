<?php
declare(strict_types=1);

// PeptideLibrary SDK exists test

require_once __DIR__ . '/../peptidelibrary_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = PeptideLibrarySDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
