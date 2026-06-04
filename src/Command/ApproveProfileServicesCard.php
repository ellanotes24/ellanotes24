<?php

namespace EllaNotes\ProfileServicesCard\Command;

use Flarum\User\User;

class ApproveProfileServicesCard
{
    public function __construct(
        public readonly User $actor,
        public readonly ?int $cardId = null,
        public readonly array $data = []
    ) {
    }
}
