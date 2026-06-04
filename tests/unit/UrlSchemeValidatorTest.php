<?php

namespace EllaNotes\ProfileServicesCard\Tests\Unit;

use EllaNotes\ProfileServicesCard\Helpers\UrlSchemeValidator;
use PHPUnit\Framework\TestCase;

class UrlSchemeValidatorTest extends TestCase
{
    public function testAcceptsHttps(): void
    {
        $this->assertTrue((new UrlSchemeValidator())->isAllowed('https://example.com/services', 'https,http'));
    }

    public function testAcceptsHttpWhenAllowed(): void
    {
        $this->assertTrue((new UrlSchemeValidator())->isAllowed('http://example.com/services', 'https,http'));
    }

    public function testRejectsJavascript(): void
    {
        $this->assertFalse((new UrlSchemeValidator())->isAllowed('javascript:alert(1)', 'https,http'));
    }

    public function testRejectsData(): void
    {
        $this->assertFalse((new UrlSchemeValidator())->isAllowed('data:text/html;base64,PGgxPkhlbGxvPC9oMT4=', 'https,http'));
    }

    public function testRejectsMalformedUrl(): void
    {
        $this->assertFalse((new UrlSchemeValidator())->isAllowed('not a url', 'https,http'));
    }
}
