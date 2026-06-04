# Profile Services Card

Profile Services Card is a universal Flarum 2 extension that lets forum users add one small, moderated **Services** card to their profile. Members can describe services they offer, such as design, coding, writing, tutoring, consulting, support, or community marketplace work.

The extension is intentionally **not** a full marketplace: it does not include payments, escrow, bookings, uploads, reviews, ratings, private messaging, or order management.

## Requirements

- Flarum `^2.0.0-rc.2`
- PHP `>=8.3`
- MySQL or MariaDB supported by Flarum
- Composer package type: `flarum-extension`

## Installation

Install from your Flarum root:

```bash
composer require ellanotes/flarum-profile-services-card
php flarum migrate
php flarum cache:clear
```

Enable **Profile Services Card** in the admin panel, configure settings, and then configure permissions.

## Updating

```bash
composer update ellanotes/flarum-profile-services-card
php flarum migrate
php flarum cache:clear
```

## Configuration

Admins can configure:

- Enable or disable the feature globally.
- Allow guests to view approved public cards.
- Require approval before cards become public.
- Require reapproval after owner edits.
- Allow or disallow an external URL.
- Enable or disable price and contact fields.
- Maximum lengths for title, description, category, price label, and contact label.
- Allowed URL schemes, defaulting to `https,http`.

## Permissions

The extension registers these permissions:

- `profileServicesCard.view` — View profile services cards.
- `profileServicesCard.create` — Create own services card.
- `profileServicesCard.editOwn` — Edit own services card.
- `profileServicesCard.deleteOwn` — Delete own services card.
- `profileServicesCard.editAny` — Edit any services card.
- `profileServicesCard.deleteAny` — Delete any services card.
- `profileServicesCard.moderate` — Approve or reject services cards.
- `profileServicesCard.configure` — Configure Profile Services Card.

All privileged behavior is enforced through Flarum authorization and policies. The extension does not rely on hardcoded forum domains or hardcoded admin checks.

## Development path repository install

Use a development forum first. Do **not** test this extension first on a live forum.

Example aaPanel development workflow:

```bash
mkdir -p /www/wwwroot/flarum-extensions
cd /www/wwwroot/flarum-extensions
git clone git@github.com:ellanotes/flarum-profile-services-card.git
cd /www/wwwroot/dev.1337x.co.za
composer config repositories.profile-services-card path /www/wwwroot/flarum-extensions/flarum-profile-services-card
composer require ellanotes/flarum-profile-services-card:"*@dev"
php flarum migrate
php flarum cache:clear
```

Build frontend assets from the extension folder during development:

```bash
cd /www/wwwroot/flarum-extensions/flarum-profile-services-card/js
npm install
npm run build
cd /www/wwwroot/dev.1337x.co.za
php flarum cache:clear
```

## Testing

Suggested checks:

```bash
composer validate
composer install
cd js
npm install
npm run build
```

Then test the extension on a Flarum development forum with guest, member, moderator, and admin accounts:

- Guest view enabled and disabled.
- Member create, edit own, delete own, and duplicate card prevention.
- Member cannot edit or delete another user's card.
- Moderator approve and reject actions.
- Hidden, pending, and rejected visibility rules.
- Invalid URL, unsafe URL scheme, overlong fields, and invalid availability values.

## Rollback and uninstall

Use these steps on a development forum first:

```bash
cd /www/wwwroot/dev.1337x.co.za
php flarum extension:disable ellanotes-profile-services-card
composer remove ellanotes/flarum-profile-services-card
php flarum cache:clear
```

If you need a clean development database reset, back up first and only then drop the extension table manually if appropriate:

```sql
DROP TABLE IF EXISTS profile_services_cards;
```

Do not manually drop tables on a live forum without a verified backup.

## License

Released under the MIT License.
