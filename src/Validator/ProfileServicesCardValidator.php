<?php

namespace EllaNotes\ProfileServicesCard\Validator;

use EllaNotes\ProfileServicesCard\Helpers\UrlSchemeValidator;
use EllaNotes\ProfileServicesCard\Model\ProfileServicesCard;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Support\Arr;
use Illuminate\Validation\Factory;
use Illuminate\Validation\ValidationException;

class ProfileServicesCardValidator
{
    public function __construct(
        private readonly Factory $validator,
        private readonly SettingsRepositoryInterface $settings,
        private readonly UrlSchemeValidator $urlSchemeValidator
    ) {
    }

    /**
     * @throws ValidationException
     */
    public function validate(array $attributes): array
    {
        $data = $this->normalize($attributes);

        $validator = $this->validator->make($data, [
            'title' => ['required', 'string', 'min:3', 'max:'.$this->intSetting('max_title_length', 80), 'not_regex:/<[^>]*>/'],
            'category' => ['nullable', 'string', 'max:'.$this->intSetting('max_category_length', 50), 'not_regex:/<[^>]*>/'],
            'description' => ['required', 'string', 'min:10', 'max:'.$this->intSetting('max_description_length', 500), 'not_regex:/<[^>]*>/'],
            'availability' => ['required', 'in:'.implode(',', [ProfileServicesCard::AVAILABILITY_AVAILABLE, ProfileServicesCard::AVAILABILITY_BUSY, ProfileServicesCard::AVAILABILITY_UNAVAILABLE])],
            'price_label' => ['nullable', 'string', 'max:'.$this->intSetting('max_price_label_length', 60), 'not_regex:/<[^>]*>/'],
            'external_url' => ['nullable', 'string', 'max:2048'],
            'contact_label' => ['nullable', 'string', 'max:'.$this->intSetting('max_contact_label_length', 120), 'not_regex:/<[^>]*>/'],
            'is_public' => ['sometimes', 'boolean'],
        ]);

        $validator->after(function ($validator) use (&$data): void {
            if (! $this->boolSetting('allow_price_label', true)) {
                $data['price_label'] = null;
            }

            if (! $this->boolSetting('allow_contact_label', true)) {
                $data['contact_label'] = null;
            }

            if (! $this->boolSetting('allow_external_url', true)) {
                $data['external_url'] = null;
            } elseif (! empty($data['external_url']) && ! $this->urlSchemeValidator->isAllowed($data['external_url'], (string) $this->settings->get('ellanotes-profile-services-card.allowed_url_schemes', 'https,http'))) {
                $validator->errors()->add('externalUrl', 'The external URL is invalid or uses a disallowed scheme.');
            }
        });

        $validator->validate();

        return array_filter($data, static fn ($value): bool => $value !== '');
    }

    private function normalize(array $attributes): array
    {
        $map = [
            'priceLabel' => 'price_label',
            'externalUrl' => 'external_url',
            'contactLabel' => 'contact_label',
            'isPublic' => 'is_public',
        ];

        foreach ($map as $from => $to) {
            if (array_key_exists($from, $attributes)) {
                $attributes[$to] = $attributes[$from];
                unset($attributes[$from]);
            }
        }

        $data = Arr::only($attributes, ['title', 'category', 'description', 'availability', 'price_label', 'external_url', 'contact_label', 'is_public']);

        foreach (['title', 'category', 'description', 'price_label', 'external_url', 'contact_label'] as $field) {
            if (array_key_exists($field, $data) && $data[$field] !== null) {
                $data[$field] = trim((string) $data[$field]);
            }
        }

        $data['availability'] ??= ProfileServicesCard::AVAILABILITY_AVAILABLE;
        $data['is_public'] = array_key_exists('is_public', $data) ? filter_var($data['is_public'], FILTER_VALIDATE_BOOL) : true;

        return $data;
    }

    private function intSetting(string $key, int $default): int
    {
        return max(1, (int) $this->settings->get('ellanotes-profile-services-card.'.$key, $default));
    }

    private function boolSetting(string $key, bool $default): bool
    {
        return (bool) $this->settings->get('ellanotes-profile-services-card.'.$key, $default);
    }
}
