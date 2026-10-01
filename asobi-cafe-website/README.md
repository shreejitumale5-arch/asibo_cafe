# ASOBI Café | PlayStation — Full-Stack Website

A premium animated cafe + PlayStation website built with plain HTML/CSS/JS on the frontend and Node.js + Express on the backend.

## Features
- Responsive animated landing page
- ASOBI logo included from the supplied image
- Animated hero, marquee, game-room section, menu and scroll reveals
- Café menu served from `/api/menu`
- Reservation form connected to `/api/reservations`
- Contact API at `/api/contact`
- Reservation/message records saved to local JSON files in `/data`
- Single Express server serves both frontend and backend
- No build step required

## Run locally
```bash
npm install
npm start
```
Open `http://localhost:3000`

## Deploy
This project is ready for Node hosting such as Render, Railway, Fly.io, VPS or any Node.js host.

Start command:
```bash
npm start
```

The server uses `process.env.PORT` automatically.

### Important production note
The included JSON storage is intended for a simple demo/small deployment. On hosts with ephemeral filesystems, use a database (PostgreSQL/Supabase/MongoDB etc.) for permanent reservations.

## Replace business details
Edit these in `public/index.html`:
- Address
- Phone / WhatsApp
- Instagram
- Opening hours

Menu items can be edited in `server.js`.
