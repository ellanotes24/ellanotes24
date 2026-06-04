import ProfileServicesCard from '../models/ProfileServicesCard';

export default class ProfileServicesCardState {
  card: ProfileServicesCard | null = null;
  loading = false;
  error: unknown = null;

  async load(userId: string | number): Promise<ProfileServicesCard | null> {
    this.loading = true;
    this.error = null;
    m.redraw();

    try {
      this.card = (await app.store.find('profile-services-card/users', userId as string)) as ProfileServicesCard;
    } catch (error) {
      this.error = error;
      this.card = null;
    }

    this.loading = false;
    m.redraw();
    return this.card;
  }

  async save(attributes: Record<string, unknown>): Promise<ProfileServicesCard> {
    if (this.card) {
      this.card.pushAttributes(attributes);
      this.card = (await this.card.save(attributes)) as ProfileServicesCard;
    } else {
      this.card = (await app.store.createRecord('profile-services-cards').save(attributes, { url: `${app.forum.attribute('apiUrl')}/profile-services-card` })) as ProfileServicesCard;
    }

    m.redraw();
    return this.card;
  }

  async delete(): Promise<void> {
    if (!this.card) return;
    await app.request({ method: 'DELETE', url: `${app.forum.attribute('apiUrl')}/profile-services-card/${this.card.id()}` });
    this.card = null;
    m.redraw();
  }

  async approve(): Promise<ProfileServicesCard | null> {
    return this.moderate('approve');
  }

  async reject(): Promise<ProfileServicesCard | null> {
    return this.moderate('reject');
  }

  private async moderate(action: 'approve' | 'reject'): Promise<ProfileServicesCard | null> {
    if (!this.card) return null;
    this.card = (await app.request({ method: 'POST', url: `${app.forum.attribute('apiUrl')}/profile-services-card/${this.card.id()}/${action}` })) as ProfileServicesCard;
    m.redraw();
    return this.card;
  }
}
