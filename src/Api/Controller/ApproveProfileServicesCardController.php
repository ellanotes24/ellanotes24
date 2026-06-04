<?php

namespace EllaNotes\ProfileServicesCard\Api\Controller;

use EllaNotes\ProfileServicesCard\Api\Serializer\ProfileServicesCardSerializer;
use EllaNotes\ProfileServicesCard\Model\ProfileServicesCard;
use EllaNotes\ProfileServicesCard\Repository\ProfileServicesCardRepository;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Carbon;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ApproveProfileServicesCardController extends AbstractShowController
{
    public $serializer = ProfileServicesCardSerializer::class;

    public function __construct(private readonly ProfileServicesCardRepository $cards)
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $card = $this->cards->findOrFail((int) $request->getAttribute('id'));
        $actor->assertCan('moderate', $card);

        return $this->cards->update($card, [
            'status' => ProfileServicesCard::STATUS_APPROVED,
            'approved_at' => Carbon::now(),
            'approved_by_user_id' => $actor->id,
            'rejected_at' => null,
            'rejected_by_user_id' => null,
        ]);
    }
}
