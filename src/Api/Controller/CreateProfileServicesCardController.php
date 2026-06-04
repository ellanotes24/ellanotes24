<?php

namespace EllaNotes\ProfileServicesCard\Api\Controller;

use EllaNotes\ProfileServicesCard\Api\Serializer\ProfileServicesCardSerializer;
use EllaNotes\ProfileServicesCard\Exception\ProfileServicesCardAlreadyExistsException;
use EllaNotes\ProfileServicesCard\Model\ProfileServicesCard;
use EllaNotes\ProfileServicesCard\Repository\ProfileServicesCardRepository;
use EllaNotes\ProfileServicesCard\Validator\ProfileServicesCardValidator;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Support\Carbon;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreateProfileServicesCardController extends AbstractCreateController
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
        $actor->assertCan('create', ProfileServicesCard::class);

        if ($this->cards->findForUser((int) $actor->id)) {
            throw new ProfileServicesCardAlreadyExistsException();
        }

        $data = $this->validator->validate($this->attributes($request));
        $data['status'] = $this->requiresApproval() ? ProfileServicesCard::STATUS_PENDING : ProfileServicesCard::STATUS_APPROVED;

        if ($data['status'] === ProfileServicesCard::STATUS_APPROVED) {
            $data['approved_at'] = Carbon::now();
            $data['approved_by_user_id'] = $actor->id;
        }

        return $this->cards->createForUser($actor, $data);
    }

    private function requiresApproval(): bool
    {
        return (bool) $this->settings->get('ellanotes-profile-services-card.require_approval', false);
    }
}
