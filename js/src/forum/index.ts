import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import UserPage from 'flarum/forum/components/UserPage';
import ProfileServicesCard from './components/ProfileServicesCard';
import ProfileServicesCardModel from './models/ProfileServicesCard';

app.initializers.add('ellanotes-profile-services-card', () => {
  app.store.models['profile-services-cards'] = ProfileServicesCardModel;

  extend(UserPage.prototype, 'content', function (content) {
    const user = this.user;

    if (!user) return;

    content.children.push(<ProfileServicesCard user={user} />);
  });
});
