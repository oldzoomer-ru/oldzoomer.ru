# oldzoomer.ru — Pure React Portfolio

Static portfolio website for Egor Gavrilov (Java Developer), rebuilt from Vaadin to pure React.

## Features

- **Client-side only** — all data is fetched from GitHub API directly in the browser
- **No API tokens required** — uses public GitHub API endpoints (60 req/hr limit)
- **GNOME Adwaita theme** — Libadwaita-inspired design with dark mode support
- **Responsive** — works on mobile and desktop
- **Cantarell font** — matching the original Vaadin version

## Tech Stack

- **React 19** + TypeScript
- **Vite** — fast build tool
- **React Router** — client-side routing
- **react-markdown** — README rendering
- **Adwaita CSS** — GNOME-style theming

## Development

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

Output will be in `dist/` — serve these static files with any HTTP server.

## Deployment on Keenetic (Entware)

1. Build: `npm run build`
2. Copy `dist/` to your router's web server directory
3. Or use Entware's nginx:
   ```
   nginx -c /opt/etc/nginx/nginx.conf
   ```
   Point `root` to the `dist/` folder.

## GitHub API Rate Limits

Public GitHub API allows 60 requests/hour without authentication.
For higher limits, add a personal access token via environment variable (not needed for basic usage).

## Structure

```
src/
  components/     # React UI components
    Header.tsx
    Navigation.tsx
    MainView.tsx
    ReposView.tsx
    Sections.tsx
    SectionCard.tsx
    StatsCard.tsx
    MarkdownRenderer.tsx
    Loading.tsx
    Error.tsx
  hooks/
    useGitHubData.ts
  types/
    github.ts
  utils/
    githubApi.ts      # GitHub API client (no auth)
    displayService.ts # Data transformation
    helpers.ts        # Date formatting
```
