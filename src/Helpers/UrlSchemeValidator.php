<?php

namespace EllaNotes\ProfileServicesCard\Helpers;

class UrlSchemeValidator
{
    private const DANGEROUS_SCHEMES = ['javascript', 'data', 'file', 'vbscript'];

    public function isAllowed(?string $url, string $allowedSchemes): bool
    {
        $url = trim((string) $url);

        if ($url === '' || strlen($url) > 2048 || filter_var($url, FILTER_VALIDATE_URL) === false) {
            return false;
        }

        $scheme = strtolower((string) parse_url($url, PHP_URL_SCHEME));

        if ($scheme === '' || in_array($scheme, self::DANGEROUS_SCHEMES, true)) {
            return false;
        }

        $allowed = array_filter(array_map(
            fn (string $value): string => strtolower(trim($value)),
            explode(',', $allowedSchemes)
        ));

        return in_array($scheme, $allowed, true);
    }
}
