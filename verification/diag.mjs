// Diagnose interaction-test failures: compare redesign vs baseline behavior.
import { chromium } from 'playwright';
const browser = await chromium.launch();

async function diag(base, tag) {
  const page = await (await browser.newContext({ viewport:{width:1280,height:850} })).newPage();
  await page.goto(base, { waitUntil:'networkidle', timeout:45000 }).catch(()=>{});
  await page.waitForTimeout(1500);
  const d = await page.evaluate(() => {
    const vis = el => !!el && getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden';
    const demoBtns = [...document.querySelectorAll('[onclick="openDemoModal()"]')];
    const firstH1 = document.querySelector('h1');
    return {
      demoButtons: demoBtns.length,
      demoButtonsVisible: demoBtns.filter(vis).length,
      faqDetails: document.querySelectorAll('#faqList details').length,
      faqListVisible: vis(document.getElementById('faqList')),
      rvViewport: !!document.getElementById('rvViewport'),
      rvVisible: vis(document.getElementById('rvViewport')),
      rvNextVisible: vis(document.getElementById('rvNext')),
      reviewsSecVisible: vis(document.getElementById('reviewsSec')),
      firstH1Text: firstH1 ? firstH1.textContent.slice(0,60) : null,
      firstH1InHero: firstH1 ? !!firstH1.closest('.hero') : null,
      statsVisible: vis(document.getElementById('statsStrip')),
    };
  });
  // language switch effect on hero headline line 1
  const hbBefore = await page.evaluate(() => document.querySelector('.hb-l1')?.textContent || '');
  await page.selectOption('#langSel', 'ta'); await page.waitForTimeout(2500);
  const hbTa = await page.evaluate(() => document.querySelector('.hb-l1')?.textContent || '');
  const navTa = await page.evaluate(() => document.querySelector('a[data-cfg="navAbout"]')?.textContent || '');
  await page.selectOption('#langSel', 'hin'); await page.waitForTimeout(2500);
  const hbBack = await page.evaluate(() => document.querySelector('.hb-l1')?.textContent || '');
  console.log(`\n── ${tag} ──`);
  console.log(JSON.stringify(d, null, 1));
  console.log(`i18n: hero-l1 before="${hbBefore}" ta="${hbTa}" back="${hbBack}"`);
  console.log(`i18n: navAbout(ta)="${navTa}"   changed=${hbBefore!==hbTa} restored=${hbBefore===hbBack}`);
  await page.context().close();
}
await diag('http://localhost:8080/', 'REDESIGN');
await diag('http://localhost:8081/', 'BASELINE (original)');
await browser.close();
