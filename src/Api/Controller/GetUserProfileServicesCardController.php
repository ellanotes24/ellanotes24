<?php

namespace EllaNotes\ProfileServicesCard\Api\Controller;

use EllaNotes\ProfileServicesCard\Api\Serializer\ProfileServicesCardSerializer;
use EllaNotes\ProfileServicesCard\Repository\ProfileServicesCardRepository;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class GetUserProfileServicesCardController extends AbstractShowController
{
    public $serializer = ProfileServicesCardSerializer::class;

    public function __construct(private readonly ProfileServicesCardRepository $cards)
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $userId = (int) $request->getAttribute('id');
        $card = $this->cards->findForUser($userId);

        if (! $card) {
            throw new ModelNotFoundException();
        }

        RequestUtil::getActor($request)->assertCan('view', $card);

        return $card;
    }
}
