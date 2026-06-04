<?php

namespace EllaNotes\ProfileServicesCard\Tests\Integration\Api;

use Flarum\Testing\integration\TestCase;

class CreateProfileServicesCardTest extends TestCase
{
    public function testMemberCanCreateOwnCardWhenPermitted(): void
    {
        $this->markTestIncomplete('Create API integration coverage is scaffolded for a Flarum 2 test bench.');
    }

    public function testDuplicateCardIsRejected(): void
    {
        $this->markTestIncomplete('Duplicate-card integration coverage is scaffolded for a Flarum 2 test bench.');
    }

    public function testGuestCannotCreateCard(): void
    {
        $this->markTestIncomplete('Guest write integration coverage is scaffolded for a Flarum 2 test bench.');
    }
}
