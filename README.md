# ITE18 — Three.js Activities

This repository contains a series of Three.js activities (1.1 to 1.11) covering textures, materials, lighting, environment maps, 3D text, and interaction utilities.

Live Deployments (Vercel):
- Activity 1.6: https://activity-1-6-97zy94o5g-cassandra-matayas-projects.vercel.app
- Activity 1.7: https://activity-1-7-f3x5f12ln-cassandra-matayas-projects.vercel.app
- Activity 1.8: https://activity-1-8-849qt7eoo-cassandra-matayas-projects.vercel.app
- Activity 1.9: https://activity-1-9-7dtzlupyt-cassandra-matayas-projects.vercel.app
- Activity 1.10: https://activity-1-10-3jlbvslji-cassandra-matayas-projects.vercel.app
- Activity 1.11: https://activity-1-11-ihqg1mr5d-cassandra-matayas-projects.vercel.app

Local Development (per activity):
1. Open a terminal in the activity folder (e.g. `Activity 1 Starter Pack/Activity 1.10`).
2. Install dependencies (first time): `npm install`
3. Start dev server: `npm run dev`
4. Build for production: `npm run build`

Manual Deploy (per activity):
- Ensure you are logged into Vercel (`npx vercel login`).
- From the activity folder:
  - `npm run build`
  - `npx vercel --prod --yes`

Notes:
- Each activity is a separate Vite app with its own `package.json` and `dist` output.
- Fullscreen toggle is implemented where applicable (double‑click canvas).
- 1.10 demonstrates PBR workflow (MeshStandardMaterial, AO/normal/height/alpha maps, env map).
- 1.11 implements 3D text with `FontLoader` and animated stars plus a Debug GUI.
