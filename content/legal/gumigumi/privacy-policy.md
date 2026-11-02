# GumiGumi — Privacy Policy

_Last updated: 2 November 2026_

GumiGumi is an Android app made by Madhav Kwatra, an independent developer in India. It lets you mark the places you have visited and see them on a map. This policy covers app versions 1.0.x and 2.0; where they differ, it says so.

## The short version

- **Your places are saved to your account**, so they are backed up and never lost.
- **No background location tracking.** A place is saved only when you add it.
- **No selling of data, no ads**, and no advertising trackers.
- Some features use outside services (maps, place search, AI). They get only what they need — never your name or email for AI.
- **You can delete your account and data at any time**: on the [delete-account page](/gumigumi/delete-account/), and inside the app from version 2.0 (which also lets you export everything).

## What we collect and why

- **Account details** — email, name and profile photo from Google sign-in. Used to create your account and show your profile. Kept in Supabase (our database and login provider), on servers in Mumbai, India.
- **Places you add** — name, map position, country, state or union territory, date, type and note. This is the core of the app: your map and your stats. Kept in Supabase; only you can read your places (row-level security).
- **Photos you attach** — to places, your avatar and your cover. Kept in Supabase Storage, in a private folder that only your account can open.
- **Crash reports** — device model, Android version, app version and the error, with no name or email. Used to fix crashes. Sent to Sentry.
- **Settings** — theme and default view. Kept on your phone.

**Guest mode (from 2.0):** if you use GumiGumi without signing in, your places stay only on your phone until you sign in. If you delete the app in guest mode, they are gone.

## Outside services we use

- **Supabase** — stores your account, places and photos (database, login, storage).
- **Google Sign-In** — lets you log in with your Google account.
- **Mapbox** — draws the map and the 3D globe. Like any website, it receives your device's IP address with each map tile request.
- **Place search** — the text you type in the search box goes to Geoapify (OpenStreetMap data) from version 2.0, through our server, and to Google Places in version 1.0.x.
- **Google Gemini API** — from 2.0: only place names, countries and dates (for example "Goa, 2023"), never your name or email, for the AI helpers (type-to-add, trip ideas, captions). In 1.0.x: the messages you type in the Gumi chat.
- **Vercel** — 1.0.x only: chat messages pass through our small server there on their way to Gemini.
- **Vexo** — 1.0.x only: anonymous app usage events (screens opened, app version, device model). Removed in 2.0.
- **Wikipedia** — from 2.0: the name of a place, through our server, to show facts about it.
- **Sentry** — crash reports (no personal details).

These services work for us and may not use your data for their own purposes. **AI note:** the free Gemini service may use what is sent to it to improve Google's products, and Google staff may review it. That is why, from 2.0, we send only place names and dates. The AI features are for people aged 18 and over.

## What we never do

- No background location tracking. No reading of your contacts, messages, microphone or other apps.
- No selling or renting of data. No ads. No advertising or tracking tools.
- No access to your photo library: you pick individual photos with Android's photo picker.

## How long we keep data

- **Your account and places:** until you delete them or your account.
- **Crash reports:** 30 days in Sentry, then deleted.
- **Backups:** we make an encrypted backup of the database every week and keep each backup for 30 days. Data you delete disappears from all backups within 30 days.

## Your choices and rights

- **Delete:** in the app from 2.0 (Settings › Account › Delete account), or for any version on the [delete-account page](/gumigumi/delete-account/). This removes your account, places, photos and profile.
- **Export (from 2.0):** Settings › Your data › Export (CSV or JSON). Before 2.0, email us and we will send you your data.
- **Correct:** edit or delete any place in the app.
- **Notifications:** optional; turn them off in Settings or in Android's settings.
- Under India's Digital Personal Data Protection Act, 2023, you can ask to access, correct or erase your data, and to nominate someone to act for you. Write to the email below; we answer within 30 days. Our grievance contact is the same email.

## Children

GumiGumi is meant for people aged 18 and over (because of the AI features). We do not knowingly collect data from children.

## Security

Data travels over HTTPS. Each user's places and photos are protected by row-level security and private storage. Secret keys stay on our servers, never inside the app.

## Changes

If this policy changes, we will update this page and the date at the top, and tell you in the app if anything important changes.

## Contact

Madhav Kwatra · [madhav.kwat+gumigumi@gmail.com](mailto:madhav.kwat+gumigumi@gmail.com)
