import app from 'flarum/admin/app';
import ProfileServicesCardSettingsPage from './components/ProfileServicesCardSettingsPage';

app.initializers.add('ellanotes-profile-services-card', () => {
  app.extensionData
    .for('ellanotes-profile-services-card')
    .registerPage(ProfileServicesCardSettingsPage)
    .registerPermission(
      {
        icon: 'fas fa-eye',
        label: app.translator.trans('ellanotes-profile-services-card.admin.permissions.view_label'),
        permission: 'profileServicesCard.view',
      },
      'view'
    )
    .registerPermission(
      {
        icon: 'fas fa-plus',
        label: app.translator.trans('ellanotes-profile-services-card.admin.permissions.create_label'),
        permission: 'profileServicesCard.create',
      },
      'start'
    )
    .registerPermission(
      {
        icon: 'fas fa-edit',
        label: app.translator.trans('ellanotes-profile-services-card.admin.permissions.edit_own_label'),
        permission: 'profileServicesCard.editOwn',
      },
      'start'
    )
    .registerPermission(
      {
        icon: 'fas fa-trash',
        label: app.translator.trans('ellanotes-profile-services-card.admin.permissions.delete_own_label'),
        permission: 'profileServicesCard.deleteOwn',
      },
      'start'
    )
    .registerPermission(
      {
        icon: 'fas fa-user-shield',
        label: app.translator.trans('ellanotes-profile-services-card.admin.permissions.edit_any_label'),
        permission: 'profileServicesCard.editAny',
      },
      'moderate'
    )
    .registerPermission(
      {
        icon: 'fas fa-user-slash',
        label: app.translator.trans('ellanotes-profile-services-card.admin.permissions.delete_any_label'),
        permission: 'profileServicesCard.deleteAny',
      },
      'moderate'
    )
    .registerPermission(
      {
        icon: 'fas fa-check-circle',
        label: app.translator.trans('ellanotes-profile-services-card.admin.permissions.moderate_label'),
        permission: 'profileServicesCard.moderate',
      },
      'moderate'
    )
    .registerPermission(
      {
        icon: 'fas fa-cog',
        label: app.translator.trans('ellanotes-profile-services-card.admin.permissions.configure_label'),
        permission: 'profileServicesCard.configure',
      },
      'administrate'
    );
});
