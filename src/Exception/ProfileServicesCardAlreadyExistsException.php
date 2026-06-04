<?php

namespace EllaNotes\ProfileServicesCard\Exception;

use Flarum\Foundation\KnownError;

class ProfileServicesCardAlreadyExistsException extends \RuntimeException implements KnownError
{
    public function getType(): string
    {
        return 'profile_services_card_already_exists';
    }
}
