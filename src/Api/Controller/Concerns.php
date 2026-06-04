<?php

namespace EllaNotes\ProfileServicesCard\Api\Controller;

use Flarum\User\User;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

trait Concerns
{
    protected function actor(ServerRequestInterface $request): User
    {
        return $request->getAttribute('actor');
    }

    protected function attributes(ServerRequestInterface $request): array
    {
        $body = $request->getParsedBody() ?: [];

        return Arr::get($body, 'data.attributes', []);
    }
}
