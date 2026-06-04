<?php

namespace EllaNotes\ProfileServicesCard\Policy;

use EllaNotes\ProfileServicesCard\Model\ProfileServicesCard;
use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class ProfileServicesCardPolicy extends AbstractPolicy
{
    public function view(User $actor, ProfileServicesCard $card): bool
    {
        if (! $this->featureEnabled()) {
            return false;
        }

        if ($this->owns($actor, $card)) {
            return true;
        }

        if ($actor->can('profileServicesCard.moderate')) {
            return true;
        }

        if ($actor->isGuest() && ! (bool) resolve('flarum.settings')->get('ellanotes-profile-services-card.allow_guest_view', true)) {
            return false;
        }

        return $actor->can('profileServicesCard.view')
            && $card->is_public
            && $card->status === ProfileServicesCard::STATUS_APPROVED;
    }

    public function create(User $actor): bool
    {
        return $this->featureEnabled() && ! $actor->isGuest() && $actor->can('profileServicesCard.create');
    }

    public function edit(User $actor, ProfileServicesCard $card): bool
    {
        if (! $this->featureEnabled()) {
            return false;
        }

        return $actor->can('profileServicesCard.editAny')
            || ($this->owns($actor, $card) && $actor->can('profileServicesCard.editOwn'));
    }

    public function delete(User $actor, ProfileServicesCard $card): bool
    {
        if (! $this->featureEnabled()) {
            return false;
        }

        return $actor->can('profileServicesCard.deleteAny')
            || ($this->owns($actor, $card) && $actor->can('profileServicesCard.deleteOwn'));
    }

    public function moderate(User $actor, ProfileServicesCard $card): bool
    {
        return $this->featureEnabled() && $actor->can('profileServicesCard.moderate');
    }

    private function owns(User $actor, ProfileServicesCard $card): bool
    {
        return ! $actor->isGuest() && (int) $actor->id === (int) $card->user_id;
    }

    private function featureEnabled(): bool
    {
        return (bool) resolve('flarum.settings')->get('ellanotes-profile-services-card.enabled', true);
    }
}
