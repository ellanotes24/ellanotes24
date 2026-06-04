<?php

namespace EllaNotes\ProfileServicesCard\Tests\Integration\Api;

use Flarum\Testing\integration\TestCase;

class UpdateProfileServicesCardTest extends TestCase
{
    public function testMemberCanUpdateOwnCardWhenPermitted(): void
    {
        $this->markTestIncomplete('Own-card update integration coverage is scaffolded for a Flarum 2 test bench.');
    }

    public function testMemberCannotUpdateAnotherUsersCard(): void
    {
        $this->markTestIncomplete('Cross-user update integration coverage is scaffolded for a Flarum 2 test bench.');
    }

    public function testHiddenPendingRejectedCardsAreNotExposedToUnauthorizedUsers(): void
    {
        $this->markTestIncomplete('Visibility integration coverage is scaffolded for a Flarum 2 test bench.');
    }
}
