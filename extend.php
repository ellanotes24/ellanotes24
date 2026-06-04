<?php

use EllaNotes\ProfileServicesCard\Api\Controller\ApproveProfileServicesCardController;
use EllaNotes\ProfileServicesCard\Api\Controller\CreateProfileServicesCardController;
use EllaNotes\ProfileServicesCard\Api\Controller\DeleteProfileServicesCardController;
use EllaNotes\ProfileServicesCard\Api\Controller\GetUserProfileServicesCardController;
use EllaNotes\ProfileServicesCard\Api\Controller\RejectProfileServicesCardController;
use EllaNotes\ProfileServicesCard\Api\Controller\UpdateProfileServicesCardController;
use EllaNotes\ProfileServicesCard\Api\Serializer\ProfileServicesCardSerializer;
use EllaNotes\ProfileServicesCard\Model\ProfileServicesCard;
use EllaNotes\ProfileServicesCard\Policy\ProfileServicesCardPolicy;
use Flarum\Extend;
use Flarum\User\User;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Settings())
        ->default('ellanotes-profile-services-card.enabled', true)
        ->default('ellanotes-profile-services-card.allow_guest_view', true)
        ->default('ellanotes-profile-services-card.require_approval', false)
        ->default('ellanotes-profile-services-card.reapprove_after_edit', true)
        ->default('ellanotes-profile-services-card.allow_external_url', true)
        ->default('ellanotes-profile-services-card.allow_price_label', true)
        ->default('ellanotes-profile-services-card.allow_contact_label', true)
        ->default('ellanotes-profile-services-card.max_title_length', 80)
        ->default('ellanotes-profile-services-card.max_description_length', 500)
        ->default('ellanotes-profile-services-card.max_category_length', 50)
        ->default('ellanotes-profile-services-card.max_price_label_length', 60)
        ->default('ellanotes-profile-services-card.max_contact_label_length', 120)
        ->default('ellanotes-profile-services-card.allowed_url_schemes', 'https,http'),

    (new Extend\Routes('api'))
        ->get('/profile-services-card/users/{id}', 'profile-services-card.users.show', GetUserProfileServicesCardController::class)
        ->post('/profile-services-card', 'profile-services-card.create', CreateProfileServicesCardController::class)
        ->patch('/profile-services-card/{id}', 'profile-services-card.update', UpdateProfileServicesCardController::class)
        ->delete('/profile-services-card/{id}', 'profile-services-card.delete', DeleteProfileServicesCardController::class)
        ->post('/profile-services-card/{id}/approve', 'profile-services-card.approve', ApproveProfileServicesCardController::class)
        ->post('/profile-services-card/{id}/reject', 'profile-services-card.reject', RejectProfileServicesCardController::class),

    (new Extend\ApiSerializer(ProfileServicesCardSerializer::class))
        ->attribute('canEdit', fn (ProfileServicesCardSerializer $serializer, ProfileServicesCard $card): bool => $serializer->getActor()->can('edit', $card))
        ->attribute('canDelete', fn (ProfileServicesCardSerializer $serializer, ProfileServicesCard $card): bool => $serializer->getActor()->can('delete', $card))
        ->attribute('canModerate', fn (ProfileServicesCardSerializer $serializer, ProfileServicesCard $card): bool => $serializer->getActor()->can('moderate', $card)),

    (new Extend\Model(User::class))
        ->hasOne('profileServicesCard', ProfileServicesCard::class, 'user_id'),

    (new Extend\Policy())
        ->modelPolicy(ProfileServicesCard::class, ProfileServicesCardPolicy::class),
];
