<?php

namespace EllaNotes\ProfileServicesCard\Tests\Integration\Api;

use Flarum\Testing\integration\TestCase;

class DeleteProfileServicesCardTest extends TestCase
{
    public function testMemberCanDeleteOwnCardWhenPermitted(): void
    {
        $this->markTestIncomplete('Own-card delete integration coverage is scaffolded for a Flarum 2 test bench.');
    }

    public function testMemberCannotDeleteAnotherUsersCard(): void
    {
        $this->markTestIncomplete('Cross-user delete integration coverage is scaffolded for a Flarum 2 test bench.');
    }
}
