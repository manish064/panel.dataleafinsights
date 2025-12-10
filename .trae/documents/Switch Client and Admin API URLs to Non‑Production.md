## Goal
Switch both client and admin apps away from the production API URL and use environment-driven base URLs (defaulting to `http://localhost:5001` for development), eliminating unintended redirection to production.

## Client Changes
1. Replace hardcoded axios base URL:
   - Update `client/src/contexts/AuthContext.js:16` from `https://api.credencuesta-panel.com` to `process.env.REACT_APP_API_URL || 'http://localhost:5001'`.
2. Make Google OAuth redirect environment-driven:
   - Update `client/src/contexts/AuthContext.js:312` to `window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/auth/google``.
3. Keep existing relative API calls (`/auth/...`, `/users/...`) so they work with CRA proxy in dev (`client/package.json:40` → `http://localhost:5001`) and nginx in production.
4. No change to `SocketContext` (already uses `process.env.REACT_APP_API_URL || 'http://localhost:5001'`).

## Admin Changes
1. Update default API base URL to non‑production:
   - In `admin/src/utils/axiosConfig.js:5`, keep env first, but change fallback from `https://api.credencuesta-panel.com` to `'http://localhost:5001'`.
2. All service calls already use relative paths (e.g., `/api/admin/...`), so no endpoint changes are needed.

## Environment Files
1. Add `client/.env.development`:
   - `REACT_APP_API_URL=http://localhost:5001`
2. Add `admin/.env.development`:
   - `REACT_APP_API_URL=http://localhost:5001`
3. Optional: Add production files to preserve current behavior explicitly:
   - `client/.env.production` and `admin/.env.production` with `REACT_APP_API_URL=https://api.credencuesta-panel.com`.

## Verification
- Development:
  - Start client and admin dev servers; confirm all network requests point to `http://localhost:5001` and no calls hit `api.credencuesta-panel.com`.
  - Verify OAuth redirect points to `http://localhost:5001/auth/google`.
  - Confirm socket connects to `http://localhost:5001`.
- Production sanity:
  - Ensure env variables are set during build/deploy (CI/CD or hosting env) so the apps use the intended URL.

## Notes
- CORS is already configured server-side to allow `http://localhost:3000` for dev; no server change needed.
- Base URLs should not include `/api`; relative endpoints already start with `/api`, producing `http://localhost:5001/api/...` correctly.

If you approve, I will implement these edits and add the environment files.