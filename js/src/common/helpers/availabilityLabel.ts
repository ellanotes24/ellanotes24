export default function availabilityLabel(value?: string): string {
  switch (value) {
    case 'busy':
      return app.translator.trans('ellanotes-profile-services-card.forum.availability.busy') as string;
    case 'unavailable':
      return app.translator.trans('ellanotes-profile-services-card.forum.availability.unavailable') as string;
    case 'available':
    default:
      return app.translator.trans('ellanotes-profile-services-card.forum.availability.available') as string;
  }
}
