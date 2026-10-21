# QRSe Print — Manual Upload Instructions 🚀
**Step-by-step, no technical experience needed. Take your time — the whole thing takes ~15 minutes.**

## What's inside this ZIP
| File | What it is | Goes where |
|---|---|---|
| `index.html` | Your NEW redesigned homepage (verified, built from today's live site) | Website folder (document root) |
| `icon-512.png` | Your app icon — same file you already have, re-uploaded for safety | Same folder |
| `og-image.png` | Your share-preview image — same file you already have | Same folder |
| `_DO-NOT-UPLOAD/` | 📎 Papers for you only: instructions, backup file, hashes. **Do not upload this folder.** | Nowhere — keep it on your computer |

> ⚠️ **Golden rule:** the upload replaces **exactly 3 files**. Don't delete anything else, don't upload anything else. Everything else on your hosting stays exactly as it is (especially `i18n-extra.js`, `i18n.js`, images, `cdn-cgi/`).

## STEP 1 — Download and extract the ZIP
1. Save `qrbd-Production-Upload.zip` to your computer.
2. Right-click → **Extract All** (Windows) or double-click it (Mac).
3. Open the extracted folder. You should see the 3 files listed above.

## STEP 2 — Make a safety copy of your current homepage (5 min, strongly recommended)
1. Log in to your hosting **cPanel → File Manager** (or your FTP program).
2. Go to your website folder — usually `public_html`.
3. Find the current `index.html` → right-click → **Copy** → name the copy `index.html.backup-before-redesign`.
   - (A byte-exact backup is also inside `_DO-NOT-UPLOAD/rollback-index-T0.html`, but making the hosting copy first costs you one minute and gives belt-and-braces safety.)

## STEP 3 — Upload the 3 files
**Option A — cPanel File Manager (easiest):**
1. In the website folder (`public_html`), click **Upload** → select the extracted `index.html`, then repeat for `icon-512.png` and `og-image.png` (or multi-select all 3).
2. If asked "Overwrite existing files?" → **Yes, overwrite**. This is expected.

**Option B — FTP client (FileZilla etc.):**
1. Connect → open the website folder on the right side → open the extracted folder on the left side.
2. Drag the **3 files only** (not the `_DO-NOT-UPLOAD` folder) from left to right → confirm **Overwrite**.

## STEP 4 — Clear cache (only if you use Cloudflare)
1. Cloudflare dashboard → your site → **Caching → Configuration → Purge Cache**.
2. Choose **Purge Everything** (simplest) — or Custom Purge for `https://qrseprint.in/` and `https://qrseprint.in/index.html`.
3. Your site uses Cloudflare, so do this — otherwise visitors may see the old page for a while.

## STEP 5 — Check that it worked (5–10 min)
Open **https://qrseprint.in** on your phone and computer and check:
- ✅ The homepage looks NEW (pink → violet gradient accents, rounded modern cards and buttons).
- ✅ **Pricing** section shows real amounts (not blank / not ₹0).
- ✅ **Reviews** section shows review cards and the arrow buttons scroll them.
- ✅ Language box (bottom-left / footer): switching to தমிழ் / বাংলা / हिंदी changes the text, and switching back to English works.
- ✅ **Register Demo** button opens a form, the form asks for empty fields, and it closes properly.
- ✅ Menus (Home, Pricing, How to Setup, etc.) all open correctly.

## If something looks wrong — roll back in 2 minutes ⏪
1. In cPanel File Manager, go to the website folder.
2. Upload `_DO-NOT-UPLOAD/rollback-index-T0.html` from the extracted ZIP.
3. Rename the current (new) `index.html` to `index.html.redesign-paused`.
4. Rename `rollback-index-T0.html` → `index.html`.
5. Cloudflare → Purge Cache again.
6. Refresh the site — it's exactly as it was on 21-Oct-2026, 08:19 UTC before the change.
   (Guaranteed byte-exact: SHA-256 `34f9001e037e35756776930791f7b00738713f32e7b15400fbd6edc30658f7c2`.)
7. Contact whoever prepared this package before trying again.

## For the cautious: verify the files before uploading
In the extracted folder on your computer, the 3 files must have these exact SHA-256 hashes (see `PACKAGE-MANIFEST.txt`):
- `index.html` → starts with `bed392e6ce9ca79b…`
- `icon-512.png` → starts with `7871ed994d0c049f…`
- `og-image.png` → starts with `7ae067f700178476…`
Windows PowerShell: `Get-FileHash .\index.html` · Mac/Linux: `sha256sum index.html`

## Quick FAQ
- **Will this affect the print/payment system?** No. This package changes only the design (colors, spacing, layout) of the homepage. Zero changes to scripts, forms, payment links, or server calls — verified by automated tests.
- **Do I need to change anything else later?** No. `site.webmanifest`, translations and all other hosted files stay as they are.
- **Do NOT upload:** the `_DO-NOT-UPLOAD` folder, `PACKAGE-MANIFEST.txt` (keep it for your records), or any file from any other folder.
