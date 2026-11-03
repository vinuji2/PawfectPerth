# Pawfect Perth

A lightweight, offline Android simulation for discovering fictional puppy matches around Perth.

## Run locally

```bash
npm install
npx expo start
```

## Checks

```bash
npm run typecheck
npm test
npx expo-doctor
```

## Android APK

Authenticate with Expo, then run:

```bash
npx eas-cli@latest build --platform android --profile preview
```

Starter puppy photography is bundled for offline use under the Unsplash License. Source details are recorded in `assets/credits.json`.
