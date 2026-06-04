<?php

namespace EllaNotes\ProfileServicesCard\Tests\Integration\Policy;

use Flarum\Testing\integration\TestCase;

class ProfileServicesCardPolicyTest extends TestCase
{
    public function testOwnVersusAnyPermissions(): void
    {
        $this->markTestIncomplete('Policy own-versus-any coverage is scaffolded for a Flarum 2 test bench.');
    }

    public function testGuestPermissions(): void
    {
        $this->markTestIncomplete('Guest policy coverage is scaffolded for a Flarum 2 test bench.');
    }

    public function testModeratorPermissions(): void
    {
        $this->markTestIncomplete('Moderator policy coverage is scaffolded for a Flarum 2 test bench.');
    }
}
