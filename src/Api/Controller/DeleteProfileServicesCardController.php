<?php

namespace EllaNotes\ProfileServicesCard\Api\Controller;

use EllaNotes\ProfileServicesCard\Repository\ProfileServicesCardRepository;
use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Laminas\Diactoros\Response\EmptyResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class DeleteProfileServicesCardController extends AbstractDeleteController
{
    public function __construct(private readonly ProfileServicesCardRepository $cards)
    {
    }

    protected function delete(ServerRequestInterface $request): ResponseInterface
    {
        $card = $this->cards->findOrFail((int) $request->getAttribute('id'));
        RequestUtil::getActor($request)->assertCan('delete', $card);
        $this->cards->delete($card);

        return new EmptyResponse(204);
    }
}
