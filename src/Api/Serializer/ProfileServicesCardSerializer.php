<?php

namespace EllaNotes\ProfileServicesCard\Api\Serializer;

use EllaNotes\ProfileServicesCard\Model\ProfileServicesCard;
use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;
use InvalidArgumentException;

class ProfileServicesCardSerializer extends AbstractSerializer
{
    protected $type = 'profile-services-cards';

    protected function getDefaultAttributes($model): array
    {
        if (! $model instanceof ProfileServicesCard) {
            throw new InvalidArgumentException('Expected a ProfileServicesCard model.');
        }

        return [
            'title' => $model->title,
            'category' => $model->category,
            'description' => $model->description,
            'availability' => $model->availability,
            'priceLabel' => $model->price_label,
            'externalUrl' => $model->external_url,
            'contactLabel' => $model->contact_label,
            'isPublic' => (bool) $model->is_public,
            'status' => $model->status,
            'createdAt' => $this->formatDate($model->created_at),
            'updatedAt' => $this->formatDate($model->updated_at),
            'approvedAt' => $this->formatDate($model->approved_at),
            'rejectedAt' => $this->formatDate($model->rejected_at),
        ];
    }

    protected function user(ProfileServicesCard $card)
    {
        return $this->hasOne($card, BasicUserSerializer::class, 'user');
    }

    protected function approvedBy(ProfileServicesCard $card)
    {
        return $this->hasOne($card, BasicUserSerializer::class, 'approvedBy');
    }

    protected function rejectedBy(ProfileServicesCard $card)
    {
        return $this->hasOne($card, BasicUserSerializer::class, 'rejectedBy');
    }
}
