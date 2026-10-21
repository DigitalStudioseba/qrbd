// Section-level screenshots of the redesign for visual QA.
import { chromium } from 'playwright';
const browser = await chromium.launch();
const REDESIGN = 'http://localhost:8080/';
const OUT = new URL('./shots/', import.meta.url).pathname;

async function grab(width, height, tag, mobile) {
  const page = await (await browser.newContext({ viewport:{width,height}, isMobile:mobile, hasTouch:mobile })).newPage();
  await page.goto(REDESIGN, { waitUntil:'networkidle', timeout:45000 }).catch(()=>{});
  await page.waitForTimeout(1200);
  const shots = [
    ['#pricingSection', 'pricing'],
    ['#whatsappToPrint', 'wapp'],
    ['#faq', 'faq'],
    ['#reviewsSec', 'reviews'],
    ['#uiSec', 'uisec'],
  ];
  for (const [sel, name] of shots) {
    const el = page.locator(sel);
    await el.scrollIntoViewIfNeeded().catch(()=>{});
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}sec-${name}-${tag}.png` }).catch(()=>{});
  }
  // demo modal
  await page.evaluate(() => window.scrollTo(0,0));
  await page.evaluate(() => openDemoModal());
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}sec-demomodal-${tag}.png` });
  await page.evaluate(() => closeDemoModal());
  // legal page overlay via router
  await page.goto(REDESIGN + '#/setup-guide', { waitUntil:'networkidle' }).catch(()=>{});
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}sec-setupguide-${tag}.png` });
  await page.context().close();
}
await grab(1280, 850, 'd', false);
await grab(390, 844, 'm', true);
console.log('section shots done');
await browser.close();
