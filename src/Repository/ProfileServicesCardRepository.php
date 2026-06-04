<?php

namespace EllaNotes\ProfileServicesCard\Repository;

use EllaNotes\ProfileServicesCard\Model\ProfileServicesCard;
use Flarum\User\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProfileServicesCardRepository
{
    public function findOrFail(int $id): ProfileServicesCard
    {
        $card = ProfileServicesCard::query()->whereKey($id)->first();

        if (! $card) {
            throw new ModelNotFoundException();
        }

        return $card;
    }

    public function findForUser(int $userId): ?ProfileServicesCard
    {
        return ProfileServicesCard::query()->where('user_id', $userId)->first();
    }

    public function createForUser(User $user, array $data): ProfileServicesCard
    {
        $card = new ProfileServicesCard($data);
        $card->user_id = (int) $user->id;
        $card->save();

        return $card;
    }

    public function update(ProfileServicesCard $card, array $data): ProfileServicesCard
    {
        $card->fill($data);
        $card->save();

        return $card;
    }

    public function delete(ProfileServicesCard $card): void
    {
        $card->delete();
    }
}
