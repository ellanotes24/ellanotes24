<?php

namespace EllaNotes\ProfileServicesCard\Api\Controller;

use EllaNotes\ProfileServicesCard\Api\Serializer\ProfileServicesCardSerializer;
use EllaNotes\ProfileServicesCard\Model\ProfileServicesCard;
use EllaNotes\ProfileServicesCard\Repository\ProfileServicesCardRepository;
use EllaNotes\ProfileServicesCard\Validator\ProfileServicesCardValidator;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Support\Carbon;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UpdateProfileServicesCardController extends AbstractShowController
{
    use Concerns;

    public $serializer = ProfileServicesCardSerializer::class;

    public function __construct(
        private readonly ProfileServicesCardRepository $cards,
        private readonly ProfileServicesCardValidator $validator,
        private readonly SettingsRepositoryInterface $settings
    ) {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $card = $this->cards->findOrFail((int) $request->getAttribute('id'));
        $actor->assertCan('edit', $card);

        $data = $this->validator->validate($this->attributes($request));

        if ($this->shouldReapprove($actor, $card)) {
            $data['status'] = ProfileServicesCard::STATUS_PENDING;
            $data['approved_at'] = null;
            $data['approved_by_user_id'] = null;
            $data['rejected_at'] = null;
            $data['rejected_by_user_id'] = null;
        }

        return $this->cards->update($card, $data);
    }

    private function shouldReapprove($actor, ProfileServicesCard $card): bool
    {
        return (bool) $this->settings->get('ellanotes-profile-services-card.reapprove_after_edit', true)
            && (int) $actor->id === (int) $card->user_id
            && ! $actor->can('profileServicesCard.moderate');
    }
}
