import Button from 'flarum/common/components/Button';
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import Stream from 'flarum/common/utils/Stream';
import ProfileServicesCardState from '../states/ProfileServicesCardState';

type Attrs = IInternalModalAttrs & {
  state: ProfileServicesCardState;
};

export default class EditProfileServicesCardModal extends Modal<Attrs> {
  serviceTitle = Stream('');
  category = Stream('');
  description = Stream('');
  availability = Stream('available');
  priceLabel = Stream('');
  externalUrl = Stream('');
  contactLabel = Stream('');
  isPublic = true;
  loading = false;

  oninit(vnode: m.Vnode<Attrs, this>) {
    super.oninit(vnode);
    const card = this.attrs.state.card;

    if (card) {
      this.serviceTitle(card.title() || '');
      this.category(card.category() || '');
      this.description(card.description() || '');
      this.availability(card.availability() || 'available');
      this.priceLabel(card.priceLabel() || '');
      this.externalUrl(card.externalUrl() || '');
      this.contactLabel(card.contactLabel() || '');
      this.isPublic = card.isPublic() !== false;
    }
  }

  className() {
    return 'ProfileServicesCardModal Modal--small';
  }

  title() {
    return app.translator.trans('ellanotes-profile-services-card.forum.modal.title');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form-group">
          <label>{app.translator.trans('ellanotes-profile-services-card.forum.modal.fields.title')}</label>
          <input className="FormControl" bidi={this.serviceTitle} maxlength="80" required />
        </div>
        <div className="Form-group">
          <label>{app.translator.trans('ellanotes-profile-services-card.forum.modal.fields.category')}</label>
          <input className="FormControl" bidi={this.category} maxlength="50" />
        </div>
        <div className="Form-group">
          <label>{app.translator.trans('ellanotes-profile-services-card.forum.modal.fields.description')}</label>
          <textarea className="FormControl" bidi={this.description} maxlength="500" rows="5" required />
        </div>
        <div className="Form-group">
          <label>{app.translator.trans('ellanotes-profile-services-card.forum.modal.fields.availability')}</label>
          <select className="FormControl" bidi={this.availability}>
            <option value="available">{app.translator.trans('ellanotes-profile-services-card.forum.availability.available')}</option>
            <option value="busy">{app.translator.trans('ellanotes-profile-services-card.forum.availability.busy')}</option>
            <option value="unavailable">{app.translator.trans('ellanotes-profile-services-card.forum.availability.unavailable')}</option>
          </select>
        </div>
        <div className="Form-group">
          <label>{app.translator.trans('ellanotes-profile-services-card.forum.modal.fields.price_label')}</label>
          <input className="FormControl" bidi={this.priceLabel} maxlength="60" />
        </div>
        <div className="Form-group">
          <label>{app.translator.trans('ellanotes-profile-services-card.forum.modal.fields.external_url')}</label>
          <input className="FormControl" bidi={this.externalUrl} maxlength="2048" type="url" />
        </div>
        <div className="Form-group">
          <label>{app.translator.trans('ellanotes-profile-services-card.forum.modal.fields.contact_label')}</label>
          <input className="FormControl" bidi={this.contactLabel} maxlength="120" />
        </div>
        <div className="Form-group">
          <label className="checkbox">
            <input type="checkbox" checked={this.isPublic} onchange={(event: InputEvent) => (this.isPublic = (event.target as HTMLInputElement).checked)} />
            {app.translator.trans('ellanotes-profile-services-card.forum.modal.fields.is_public')}
          </label>
        </div>
        <div className="Form-group">
          <Button className="Button Button--primary" type="submit" loading={this.loading}>
            {app.translator.trans('ellanotes-profile-services-card.forum.modal.save')}
          </Button>
          <Button className="Button" onclick={() => app.modal.close()}>
            {app.translator.trans('ellanotes-profile-services-card.forum.modal.cancel')}
          </Button>
        </div>
      </div>
    );
  }

  async onsubmit(event: SubmitEvent) {
    event.preventDefault();
    this.loading = true;

    await this.attrs.state.save({
      title: this.serviceTitle(),
      category: this.category(),
      description: this.description(),
      availability: this.availability(),
      priceLabel: this.priceLabel(),
      externalUrl: this.externalUrl(),
      contactLabel: this.contactLabel(),
      isPublic: this.isPublic,
    });

    this.loading = false;
    app.modal.close();
  }
}
