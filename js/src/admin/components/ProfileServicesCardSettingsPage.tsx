import ExtensionPage from 'flarum/admin/components/ExtensionPage';

export default class ProfileServicesCardSettingsPage extends ExtensionPage {
  content() {
    return (
      <div className="ProfileServicesCardSettings ExtensionPage-settings">
        <div className="container">
          <h2>{app.translator.trans('ellanotes-profile-services-card.admin.settings.title')}</h2>
          <p>{app.translator.trans('ellanotes-profile-services-card.admin.settings.description')}</p>
          {this.buildSettingComponent({ type: 'boolean', setting: 'ellanotes-profile-services-card.enabled', label: app.translator.trans('ellanotes-profile-services-card.admin.settings.enabled_label') })}
          {this.buildSettingComponent({ type: 'boolean', setting: 'ellanotes-profile-services-card.allow_guest_view', label: app.translator.trans('ellanotes-profile-services-card.admin.settings.allow_guest_view_label') })}
          {this.buildSettingComponent({ type: 'boolean', setting: 'ellanotes-profile-services-card.require_approval', label: app.translator.trans('ellanotes-profile-services-card.admin.settings.require_approval_label') })}
          {this.buildSettingComponent({ type: 'boolean', setting: 'ellanotes-profile-services-card.reapprove_after_edit', label: app.translator.trans('ellanotes-profile-services-card.admin.settings.reapprove_after_edit_label') })}
          {this.buildSettingComponent({ type: 'boolean', setting: 'ellanotes-profile-services-card.allow_external_url', label: app.translator.trans('ellanotes-profile-services-card.admin.settings.allow_external_url_label') })}
          {this.buildSettingComponent({ type: 'boolean', setting: 'ellanotes-profile-services-card.allow_price_label', label: app.translator.trans('ellanotes-profile-services-card.admin.settings.allow_price_label_label') })}
          {this.buildSettingComponent({ type: 'boolean', setting: 'ellanotes-profile-services-card.allow_contact_label', label: app.translator.trans('ellanotes-profile-services-card.admin.settings.allow_contact_label_label') })}
          {this.buildSettingComponent({ type: 'number', setting: 'ellanotes-profile-services-card.max_title_length', label: app.translator.trans('ellanotes-profile-services-card.admin.settings.max_title_length_label') })}
          {this.buildSettingComponent({ type: 'number', setting: 'ellanotes-profile-services-card.max_description_length', label: app.translator.trans('ellanotes-profile-services-card.admin.settings.max_description_length_label') })}
          {this.buildSettingComponent({ type: 'number', setting: 'ellanotes-profile-services-card.max_category_length', label: app.translator.trans('ellanotes-profile-services-card.admin.settings.max_category_length_label') })}
          {this.buildSettingComponent({ type: 'number', setting: 'ellanotes-profile-services-card.max_price_label_length', label: app.translator.trans('ellanotes-profile-services-card.admin.settings.max_price_label_length_label') })}
          {this.buildSettingComponent({ type: 'number', setting: 'ellanotes-profile-services-card.max_contact_label_length', label: app.translator.trans('ellanotes-profile-services-card.admin.settings.max_contact_label_length_label') })}
          {this.buildSettingComponent({ type: 'text', setting: 'ellanotes-profile-services-card.allowed_url_schemes', label: app.translator.trans('ellanotes-profile-services-card.admin.settings.allowed_url_schemes_label') })}
          {this.submitButton()}
        </div>
      </div>
    );
  }
}
