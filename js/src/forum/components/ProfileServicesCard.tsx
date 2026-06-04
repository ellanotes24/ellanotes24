import Button from 'flarum/common/components/Button';
import Component from 'flarum/common/Component';
import User from 'flarum/common/models/User';
import EditProfileServicesCardModal from './EditProfileServicesCardModal';
import ProfileServicesCardModerationControls from './ProfileServicesCardModerationControls';
import availabilityLabel from '../../common/helpers/availabilityLabel';
import ProfileServicesCardState from '../states/ProfileServicesCardState';

type Attrs = {
  user: User;
};

export default class ProfileServicesCard extends Component<Attrs> {
  state = new ProfileServicesCardState();

  oninit(vnode: m.Vnode<Attrs, this>) {
    super.oninit(vnode);
    this.state.load(vnode.attrs.user.id()!);
  }

  view() {
    const card = this.state.card;
    const actor = app.session.user;
    const ownsProfile = actor && actor.id() === this.attrs.user.id();

    if (this.state.loading) {
      return <div className="ProfileServicesCard Card">{app.translator.trans('ellanotes-profile-services-card.forum.card.loading')}</div>;
    }

    if (!card) {
      if (!ownsProfile) return null;

      return (
        <div className="ProfileServicesCard Card ProfileServicesCard--empty">
          <h3>{app.translator.trans('ellanotes-profile-services-card.forum.card.heading')}</h3>
          <p>{app.translator.trans('ellanotes-profile-services-card.forum.card.empty')}</p>
          <Button className="Button Button--primary" onclick={() => app.modal.show(EditProfileServicesCardModal, { state: this.state })}>
            {app.translator.trans('ellanotes-profile-services-card.forum.actions.add')}
          </Button>
        </div>
      );
    }

    return (
      <div className={`ProfileServicesCard Card ProfileServicesCard--${card.status()} ${card.isPublic() ? '' : 'ProfileServicesCard--hidden'}`}>
        <div className="ProfileServicesCard-header">
          <h3>{app.translator.trans('ellanotes-profile-services-card.forum.card.heading')}</h3>
          <span className={`ProfileServicesCard-availability ProfileServicesCard-availability--${card.availability()}`}>{availabilityLabel(card.availability())}</span>
        </div>
        {ownsProfile && !card.isPublic() && <p className="ProfileServicesCard-note">{app.translator.trans('ellanotes-profile-services-card.forum.card.hidden_note')}</p>}
        {ownsProfile && card.status() === 'pending' && <p className="ProfileServicesCard-note">{app.translator.trans('ellanotes-profile-services-card.forum.card.pending_note')}</p>}
        {ownsProfile && card.status() === 'rejected' && <p className="ProfileServicesCard-note ProfileServicesCard-note--danger">{app.translator.trans('ellanotes-profile-services-card.forum.card.rejected_note')}</p>}
        <h4>{card.title()}</h4>
        {card.category() && <p className="ProfileServicesCard-category">{app.translator.trans('ellanotes-profile-services-card.forum.card.category', { category: card.category() })}</p>}
        <p className="ProfileServicesCard-description">{card.description()}</p>
        {card.priceLabel() && <p>{app.translator.trans('ellanotes-profile-services-card.forum.card.price', { price: card.priceLabel() })}</p>}
        {card.contactLabel() && <p>{app.translator.trans('ellanotes-profile-services-card.forum.card.contact', { contact: card.contactLabel() })}</p>}
        {card.externalUrl() && (
          <p>
            <a href={card.externalUrl()!} target="_blank" rel="nofollow ugc noopener noreferrer">
              {app.translator.trans('ellanotes-profile-services-card.forum.card.website')}
            </a>
          </p>
        )}
        <ProfileServicesCardModerationControls state={this.state} />
        <div className="ProfileServicesCard-actions">
          {card.canEdit() && (
            <Button className="Button Button--small" onclick={() => app.modal.show(EditProfileServicesCardModal, { state: this.state })}>
              {app.translator.trans('ellanotes-profile-services-card.forum.actions.edit')}
            </Button>
          )}
          {card.canDelete() && (
            <Button className="Button Button--danger Button--small" onclick={() => this.state.delete()}>
              {app.translator.trans('ellanotes-profile-services-card.forum.actions.delete')}
            </Button>
          )}
        </div>
      </div>
    );
  }
}
