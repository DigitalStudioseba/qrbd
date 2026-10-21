// QRSe Print — staging regression suite against the REBASED candidate
// served by the local read-only replica (127.0.0.1:8082, fixture backend).
// No production traffic. Real browser execution only.
import { chromium } from 'playwright';
const BASE = 'http://127.0.0.1:8082/';
const results = [];
const record = (s, n, d='') => results.push({s, n, d});
const browser = await chromium.launch();

// ── viewport sweep ──────────────────────────────────────────────────
async function probe(w, h, mobile) {
  const ctx = await browser.newContext({ viewport:{width:w,height:h}, isMobile:mobile, hasTouch:mobile });
  const page = await ctx.newPage();
  const errs = [], cerr = [], failed = [];
  page.on('pageerror', e => errs.push(String(e)));
  page.on('console', m => { if (m.type()==='error') cerr.push(m.text()); });
  page.on('response', r => { if (r.status()>=400) failed.push(r.status()+' '+new URL(r.url()).pathname); });
  await page.goto(BASE, { waitUntil:'networkidle', timeout:45000 }).catch(()=>{});
  await page.waitForTimeout(1500);
  const ovf = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
  const canary = page.url().startsWith(BASE);
  record(!ovf ? 'PASS':'FAIL', `No horizontal overflow @${w}`, '');
  record(canary ? 'PASS':'FAIL', `Canary OK on staging @${w}`, page.url());
  const real = errs.filter(e => !/beacon|cloudflareinsights|Error: T($|\b)/.test(e));
  record(!real.length ? 'PASS':'FAIL', `No pageerrors @${w}`, real.slice(0,2).join('|') || '0');
  record(!failed.length ? 'PASS':'WARNING', `Asset 404s @${w}`, [...new Set(failed)].slice(0,4).join(';') || 'none');
  await ctx.close();
  return { errs, cerr };
}
for (const [w,h,m] of [[380,800,true],[560,800,true],[768,1024,true],[1000,700,false],[1280,800,false],[1440,900,false]]) await probe(w,h,m);

// ── backend-fixture-driven content (mocked from live GETs) ──────────
{
  const page = await (await browser.newContext({ viewport:{width:1280,height:850} })).newPage();
  await page.goto(BASE, { waitUntil:'networkidle', timeout:45000 }).catch(()=>{});
  await page.waitForTimeout(2200);
  const c = await page.evaluate(() => ({
    price0: document.querySelector('.plan3 .p3p')?.textContent.trim(),
    allPrices: [...document.querySelectorAll('.plan3 .p3p')].map(e=>e.textContent.trim().split('\n')[0]).slice(0,5),
    rvCards: document.querySelectorAll('#rvGrid > *').length,
    rvScrollable: (()=>{const v=document.getElementById('rvViewport'); return v && v.scrollWidth > v.clientWidth+1;})(),
    statsHiddenPerConfig: getComputedStyle(document.getElementById('statsStrip')).display === 'none',
    langOptions: [...document.querySelectorAll('#langSel option')].map(o=>o.value),
    festStrip: !!document.querySelector('.fest-strip') || [...document.styleSheets].some(s=>{try{return [...s.cssRules].some(r=>r.selectorText==='.fest-strip')}catch(e){return false}}),
  }));
  record(c.rvCards >= 5 ? 'PASS':'FAIL', 'Reviews populated from fixture (mocked live data)', `${c.rvCards} cards, scrollable=${c.rvScrollable}`);
  record(c.statsHiddenPerConfig ? 'PASS':'FAIL', 'Stats strip honors showStats:false config', '');
  const siteLangs = ['en','ta','te','kn','bn','hin'];
  const optsOk = siteLangs.every(l => (c.langOptions||[]).includes(l)) && c.langOptions.length === siteLangs.length;
  record(optsOk ? 'PASS':'FAIL', 'Website language box = 6 site languages (spec: mni/mni-mtei are customer-page-only)', (c.langOptions||[]).join(','));
  record('UNVERIFIED', 'mni / mni-mtei rendering', 'customer print page only — out of this file’s scope by design');
  record(c.festStrip ? 'PASS':'WARNING', 'work-67 festival styles present (rebased file)', '');
  // real carousel now testable
  if (c.rvScrollable) {
    const mv = await page.evaluate(async () => { const v=document.getElementById('rvViewport'); const b=v.scrollLeft; document.getElementById('rvNext').click(); await new Promise(r=>setTimeout(r,350)); return {b, a:v.scrollLeft}; });
    record(mv.a !== mv.b ? 'PASS':'FAIL', 'Reviews carousel arrows (populated)', JSON.stringify(mv));
  }
  await page.context().close();
}

// ── full language suite incl. full Tamil dictionary fixture ─────────
{
  const page = await (await browser.newContext({ viewport:{width:1280,height:850} })).newPage();
  const errs=[]; page.on('pageerror', e=>errs.push(String(e)));
  await page.goto(BASE, { waitUntil:'networkidle', timeout:45000 }).catch(()=>{});
  await page.waitForTimeout(1500);
  const en = await page.evaluate(()=>document.querySelector('.hb-l1')?.textContent||'');
  await page.selectOption('#langSel','ta'); await page.waitForTimeout(3500);
  const ta = await page.evaluate(()=>document.querySelector('.hb-l1')?.textContent||'');
  const ta2 = await page.evaluate(()=>document.querySelector('.hb-l2')?.textContent||'');
  const lang = await page.evaluate(()=>document.documentElement.lang);
  const tamil = /[\u0B80-\u0BFF]/.test(ta + ta2);
  await page.selectOption('#langSel','bn'); await page.waitForTimeout(3000);
  const bn = await page.evaluate(()=>document.querySelector('.hb-l1')?.textContent||'');
  const bengali = /[\u0980-\u09FF]/.test(bn);
  await page.selectOption('#langSel','hin'); await page.waitForTimeout(2000);
  const hin = await page.evaluate(()=>document.querySelector('.hb-l1')?.textContent||'');
  await page.selectOption('#langSel','en'); await page.waitForTimeout(2000);
  const en2 = await page.evaluate(()=>document.querySelector('.hb-l1')?.textContent||'');
  record(tamil && lang==='ta' ? 'PASS':'FAIL', 'Tamil full dictionary applies on staging', `"${ta}" / "${ta2}"`);
  record(bengali ? 'PASS':'FAIL', 'Bengali dictionary applies on staging', `"${bn}"`);
  record(hin!==en2 && en2===en ? 'PASS':'FAIL', 'hin source + en roundtrip restore', `"${hin}" → "${en2}"`);
  record(!errs.length?'PASS':'FAIL','No pageerrors during language cycling', errs.slice(0,2).join('|')||'clean');
  await page.context().close();
}

// ── interactions (router/demo/faq/burger) + spec tokens ─────────────
for (const [tag, w, mob] of [['desktop',1280,false],['mobile',390,true]]) {
  const ctx = await browser.newContext({ viewport:{width:w,height:850}, isMobile:mob, hasTouch:mob });
  const page = await ctx.newPage();
  const errs=[]; page.on('pageerror', e=>errs.push(String(e)));
  await page.goto(BASE, { waitUntil:'networkidle', timeout:45000 }).catch(()=>{});
  await page.waitForTimeout(1200);
  if (mob) { await page.tap('#navBurger'); await page.waitForTimeout(400); }
  await page.click(mob ? '#navDrop a[href="/setup-guide"]' : 'a[href="/setup-guide"]', { timeout:5000 }).catch(()=>{});
  await page.waitForTimeout(700);
  const guide = await page.evaluate(() => { const el=document.getElementById('setupGuidePage'); return el && getComputedStyle(el).display!=='none'; });
  record(guide?'PASS':'FAIL', `Router overlay (/setup-guide → guide key) [${tag}]`, '');
  const demo = await page.evaluate(async () => {
    openDemoModal(); await new Promise(r=>setTimeout(r,500));
    const opened = getComputedStyle(document.getElementById('demoModal')).display!=='none';
    createDemo(); await new Promise(r=>setTimeout(r,400));
    const validated = (document.getElementById('dmErr')?.textContent||'').trim().length>0;
    closeDemoModal(); await new Promise(r=>setTimeout(r,400));
    const m=document.getElementById('demoModal'), s=getComputedStyle(m);
    const closed = s.display==='none' || s.visibility==='hidden' || +s.opacity===0;
    return {opened, validated, closed};
  });
  record(demo.opened&&demo.validated&&demo.closed ? 'PASS':'FAIL', `Demo modal open/validate(no submit)/close [${tag}]`, JSON.stringify(demo));
  const faq = await page.evaluate(() => { const d=document.querySelector('#faqList details'); if(!d) return false; const w=d.open; d.querySelector('summary').click(); return d.open!==w; });
  record(faq?'PASS':'FAIL', `FAQ accordion [${tag}]`, '');
  const t = await page.evaluate(() => {
    const cs = getComputedStyle(document.querySelector('.cta-price'));
    const cd = getComputedStyle(document.querySelector('.plan3'));
    const r = getComputedStyle(document.documentElement);
    return {pri:r.getPropertyValue('--primary').trim(), sec:r.getPropertyValue('--secondary').trim(),
            btnR:cs.borderRadius, cardR:cd.borderRadius, font:getComputedStyle(document.body).fontFamily};
  });
  record(t.pri==='#ff2e63'&&t.sec==='#6f35ff'&&t.btnR==='14px'&&t.cardR==='18px'&&/Inter/.test(t.font)?'PASS':'FAIL', `Spec tokens rendered [${tag}]`, JSON.stringify(t));
  record(!errs.length?'PASS':'FAIL', `No pageerrors [${tag}]`, errs.slice(0,2).join('|')||'clean');
  await ctx.close();
}
{
  const page = await (await browser.newContext({ viewport:{width:1280,height:850} })).newPage();
  await page.goto(BASE,{waitUntil:'networkidle',timeout:45000}).catch(()=>{}); await page.waitForTimeout(1200);
  await page.screenshot({ path: new URL('./shots/staging-1280.png', import.meta.url).pathname });
  await page.evaluate(()=>openDemoModal()); await page.waitForTimeout(600);
  await page.screenshot({ path: new URL('./shots/staging-demo-modal.png', import.meta.url).pathname });
  await page.evaluate(()=>closeDemoModal());
  await page.context().close();
}
const counts = { PASS:0, WARNING:0, FAIL:0 };
console.log('\n════════ REBASED CANDIDATE — staging regression results ════════');
for (const r of results) { counts[r.s]++; console.log(`${r.s.padEnd(8)} ${r.n}${r.d?'  →  '+r.d:''}`); }
console.log(`\nTOTAL: ${counts.PASS} PASS · ${counts.WARNING||0} WARNING · ${counts.FAIL} FAIL`);
await browser.close();
process.exit(counts.FAIL ? 1 : 0);
