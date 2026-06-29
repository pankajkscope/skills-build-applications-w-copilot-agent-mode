# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## API configuration

Define `VITE_CODESPACE_NAME` in `.env.local` when running in GitHub Codespaces:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, the frontend calls backend endpoints under:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is not set and the app is running from a Codespaces `*.app.github.dev` URL, the frontend derives the backend URL from the current browser hostname and swaps the port segment to `8000`. This avoids `https://undefined-8000...` URLs and also avoids browser requests to the viewer's local machine.

For local development outside Codespaces, the app falls back to:

```text
http://localhost:8000/api
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
```
