# QRSe Print — Deployment Runbook (bundle: 2026-10-21)
**Deploy set (3 files, in `deploy/bundle/`):**
| File | sha256 (prefix) | Action |
|---|---|---|
| `index.html` | `5fca6bdd` | **Replace** the live document root's `index.html` |
| `icon-512.png` | `7871ed99` | Re-serve (origin's own current bytes — protects against full-folder sync 404s) |
| `og-image.png` | `7ae067f7` | Re-serve (origin's own current bytes) |

Full manifest: `deploy/bundle-manifest.txt` (verify: `sha256sum -c bundle-manifest.txt`).

⚠ **DO NOT overwrite anything else in the docroot** — especially `i18n-extra.js` (origin's copy is newer than any local snapshot — contains today's work-66 dictionary fixes), `i18n.js`, dictionaries, images, `site.webmanifest`, `cdn-cgi/`. The deploy set is exactly 3 files.

## 0. Pre-flight (immediately before upload — mandatory)
The owner actively deploys; drift must be re-checked right before upload:
```bash
curl -s https://qrseprint.in/ -o /tmp/live-now.html
python3 - <<'PY'
import re
def norm(p):
    b = open(p).read().replace('\r\n','\n')
    b = re.sub(r'email-protection#[0-9a-f]+', 'email-protection#X', b)
    b = re.sub(r'data-cfemail="[0-9a-f]+"', 'data-cfemail="X"', b)
    return b
same = norm('/tmp/live-now.html') == norm('deploy/rollback/live-index-T0.html')
print('DRIFT-FREE and safe to proceed' if same else '⛔ DRIFT DETECTED — STOP')

# also re-check the two assets changed most recently:
PY
curl -s https://qrseprint.in/icon-512.png | sha256sum   # must equal 7871ed99…
curl -s https://qrseprint.in/og-image.png  | sha256sum   # must equal 7ae067f7…
```
If any check fails: **STOP and re-rebase** (`python3 deploy/reference/rebase.py <new-live-capture> deploy/bundle/index.html`, re-run invariance gate + `verification/run-staging.mjs`).

## 1. Deploy steps (exact method depends on hosting access — none is stored in this repo)
1. Take server's own backup of current `index.html` if possible (belt-and-braces alongside `deploy/rollback/live-index-T0.html`).
2. Upload the 3 bundle files over the docroot (SFTP/panel/Git deploy — whatever the owner uses). Overwrite, do not delete-then-upload (avoids a 404 window).
3. Do **not** touch any other path.

## 2. Cache purge (Cloudflare) — required
`index.html` changes are behind Cloudflare; purge so visitors/CDN nodes fetch the new bytes:
- Dashboard → the zone (e.g. `qrseprint.in`) → **Caching → Configuration → Purge Cache** →
  purge **Custom URLs** for at least `https://qrseprint.in/` and `https://qrseprint.in/index.html`
  (or "Purge Everything" if unsure; statics are also versioned by ETag and will revalidate).

## 3. Post-deploy verification (10 minutes, GET-only + user-level actions)
1. `curl -s https://qrseprint.in/ | sha256sum` → must equal bundle hash `bed392e6ce9ca79bd471bff075c5509b3426d5a36b9ffc510920d8e1ad2d6119` (after purge; if a stale intermediate caches, try `?v=1` to bypass).
2. Open in browser at 360/768/1280 widths: no horizontal scrollbars; new palette visible (pink→violet gradient accents, 14px buttons / 18px cards).
3. Click through: **Pricing** (populated amounts), **Reviews** (cards + arrows), language box: en → தமிழ் → বাংলা → hin → en renders correctly.
4. Demo modal opens, validates empty phone, closes.
5. Browser console: no errors (ignore the pre-existing `Error: T` minified noise and the CSP-blocked Cloudflare beacon — both predate this change).
6. Try turningstile/checkout only as far as **free** user flows; **do not** place test payments.

## 4. Rollback (file-backup method; no Git)
If anything looks wrong: re-upload `deploy/rollback/live-index-T0.html` as `index.html`
(sha256 `34f9001e037e35756776930791f7b00738713f32e7b15400fbd6edc30658f7c2`, captured 2026-10-21 08:19:13 UTC), purge Cloudflare again (§2), re-verify per §3.1.
That restores the byte-exact pre-deploy homepage. The two PNGs are unchanged by the deploy, so no asset rollback is needed.
Keep: `deploy/rollback/` (T-0 backup), `deploy/bundle-manifest.txt` (all hashes), `deploy/reference/rebase.py` (reproducible transform).

## 5. Notes
- Canary/redirect script is untouched — the site still shows only QRSe Print branding on authorized hosts.
- Backend is shared across `qrseprint.in` aliases (staging/dev/www/api serve production); no separate staging infra exists. Deploy straight to production after approval.
- If you prefer an automated deploy via a connected Git/hosting app, grant that access and the same 3-file set + §0–§5 applies.
