import Button from 'flarum/common/components/Button';
import ProfileServicesCardState from '../states/ProfileServicesCardState';

export default function ProfileServicesCardModerationControls({ state }: { state: ProfileServicesCardState }) {
  const card = state.card;

  if (!card || !card.canModerate()) return null;

  return (
    <div className="ProfileServicesCard-moderation">
      <span className={`ProfileServicesCard-status ProfileServicesCard-status--${card.status()}`}>{card.status()}</span>
      {card.status() !== 'approved' && (
        <Button className="Button Button--primary Button--small" onclick={() => state.approve()}>
          {app.translator.trans('ellanotes-profile-services-card.forum.actions.approve')}
        </Button>
      )}
      {card.status() !== 'rejected' && (
        <Button className="Button Button--danger Button--small" onclick={() => state.reject()}>
          {app.translator.trans('ellanotes-profile-services-card.forum.actions.reject')}
        </Button>
      )}
    </div>
  );
}
