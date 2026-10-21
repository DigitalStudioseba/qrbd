#!/usr/bin/env python3
# QRSe Print — local production-replica staging (READ-ONLY, isolated).
#  * Serves deploy/bundle/ (rebased candidate + verified assets) at /
#  * Answers /api/* and /i18n/*.js GETs from captured fixtures (deploy/fixtures/)
#  * Mirrors production security headers (CSP etc.)
#  * Non-GET requests → 403 JSON (nothing mutates, ever)
#  * Binds 127.0.0.1 only — canary allowlist permits localhost.
import http.server, json, os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
BUNDLE, FIX = os.path.join(ROOT, 'bundle'), os.path.join(ROOT, 'fixtures')
manifest = json.load(open(os.path.join(FIX, 'manifest.json')))

CSP = ("default-src 'self'; script-src 'self' 'unsafe-inline' https://checkout.razorpay.com "
 "https://cdnjs.cloudflare.com https://*.cashfree.com; style-src 'self' 'unsafe-inline' "
 "https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' "
 "data: https://res.cloudinary.com https://*.razorpay.com https://*.cashfree.com; connect-src 'self' "
 "https://*.cashfree.com https://api.cloudinary.com; worker-src 'self' blob: https://cdnjs.cloudflare.com; "
 "frame-src https://checkout.razorpay.com https://api.razorpay.com https://*.cashfree.com "
 "https://www.youtube-nocookie.com; object-src 'none'; base-uri 'self'; form-action 'self' "
 "https://checkout.razorpay.com https://*.cashfree.com https://secure.ccavenue.com "
 "https://test.ccavenue.com https://secure.payu.in https://test.payu.in; frame-ancestors 'self'")

class H(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw): super().__init__(*a, directory=BUNDLE, **kw)
    def _headers(self, code=200, ctype='text/html; charset=utf-8', extra=None):
        self.send_response(code)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Security-Policy', CSP)
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        self.send_header('Permissions-Policy', 'geolocation=(), microphone=(), camera=(self)')
        for k, v in (extra or {}).items(): self.send_header(k, v)
        self.end_headers()
    def _fixture_for(self):
        p = self.path.split('?')[0]
        q = ('?'+self.path.split('?',1)[1]) if '?' in self.path else ''
        key = p + ('?'+q if p=='/api/i18n/dict' and q else '')
        ent = manifest['endpoints'].get(key) or manifest['endpoints'].get(p)
        if not ent or 'fixture' not in ent: return None
        return os.path.join(FIX, ent['fixture'])
    def do_GET(self):
        if self.path.startswith('/api/') or re.match(r'^/i18n/[^/]+\.js', self.path):
            f = self._fixture_for()
            if not f or not os.path.exists(f):
                self._headers(404, 'application/json'); self.wfile.write(b'{"error":"not found (staging mirror of origin 404)"}'); return
            body = open(f, 'rb').read()
            extra = {'Access-Control-Allow-Origin':'*'} if self.path.startswith('/api/') else None
            self._headers(200, 'application/json; charset=utf-8' if f.endswith('.json') else 'application/javascript; charset=utf-8', extra)
            self.wfile.write(body); return
        # static resolution: bundle (candidate) → origin-captured statics →
        # workspace files verified byte-identical to origin (fallback) → 404
        rel = self.path.split('?')[0].lstrip('/')
        fs_path = os.path.normpath(os.path.join(BUNDLE, rel))
        WS = os.path.dirname(ROOT)
        candidates = [os.path.normpath(os.path.join(BUNDLE, rel)),
                      os.path.normpath(os.path.join(FIX, 'static', rel)),
                      os.path.normpath(os.path.join(WS, rel))]
        fs_path = next((c for c in candidates if (c.startswith((BUNDLE, FIX, WS)) and os.path.exists(c) and not os.path.isdir(c))), candidates[0])
        if not os.path.exists(fs_path) or os.path.isdir(fs_path):
            # SPA-style paths (/, /about etc.) → bundle index (mirrors simple-static origin behavior is 404;
            # but for local staging accept index for '/')
            if self.path in ('/', '/index.html'): fs_path = os.path.join(BUNDLE, 'index.html')
            else:
                self._headers(404, 'text/plain'); self.wfile.write(b'404 (staging) ' + self.path.encode()); return
        ext = os.path.splitext(fs_path)[1].lower()
        ctype = {'.html':'text/html; charset=utf-8','.png':'image/png','.svg':'image/svg+xml',
                 '.js':'application/javascript; charset=utf-8','.json':'application/json',
                 '.webmanifest':'application/manifest+json','.css':'text/css'}.get(ext,'application/octet-stream')
        body = open(fs_path,'rb').read()
        self._headers(200, ctype); self.wfile.write(body)
    def do_POST(self):   # read-only staging: mutating verbs are refused locally
        body = json.dumps({'success': False, 'error': 'staging is read-only (local mock)'}).encode()
        self._headers(403, 'application/json'); self.wfile.write(body)
    do_PUT = do_DELETE = do_PATCH = do_POST
    def log_message(self, *a): pass

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8082
    http.server.ThreadingHTTPServer(('127.0.0.1', port), H).serve_forever()
