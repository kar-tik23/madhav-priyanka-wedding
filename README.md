# Madhav & Priyanka — Wedding Invitation

A responsive React + Vite wedding invitation website with a pastel floral theme.

## Run locally

Requirements: Node.js 18+

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Customize

- Wedding date: `WEDDING_DATE` in `src/App.jsx`.
- Venue and map search: `VENUE` and `MAPS_URL` in `src/App.jsx`.
- Ceremony time: update the event card once confirmed.
- Add family names, event schedule, photos, and a real RSVP backend when available.

## RSVP note

The RSVP form currently prepares a response for sharing/copying in the browser. It does not save guest responses to a database or notify the hosts. Connect a backend or form service before using it as the official RSVP channel.
