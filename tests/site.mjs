import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";

const baseURL = process.env.SITE_URL ?? "http://127.0.0.1:3001";
await mkdir("tests/screenshots", { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH ?? (process.platform === "win32" ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" : undefined),
  args: ["--no-sandbox", "--disable-gpu", "--no-proxy-server"],
});

try {
  for (const width of [320, 375, 390, 560, 768, 900, 1024, 1440, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    await page.goto(baseURL, { waitUntil: "networkidle" });
    await page.locator(".skip-intro").click();
    await page.waitForFunction(() => document.querySelector(".static-website--entered"), undefined, { timeout: 5000 });
    await page.waitForFunction(() => document.querySelector("#main-site")?.getBoundingClientRect().top < 100);
    await page.locator("#main-site h1").waitFor();
    if (width === 390 || width === 1440) await page.screenshot({ path: `tests/screenshots/site-main-${width}.png` });
    if (!(await page.locator(".mobile-menu-toggle").isVisible())) throw new Error(`Menu button hidden at ${width}px`);
    await page.locator(".mobile-menu-toggle").click();
    if (!(await page.locator("#primary-nav").isVisible())) throw new Error(`Menu failed to open at ${width}px`);
    await page.locator(".mobile-menu-toggle").click();
    if (await page.locator("#primary-nav").isVisible()) throw new Error(`Menu failed to close at ${width}px`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    if (overflow) throw new Error(`Horizontal overflow at ${width}px`);
    if (errors.length) throw new Error(`Browser errors at ${width}px: ${errors.join("; ")}`);
    const firstCardImage = page.locator(".culture-card img").first();
    await firstCardImage.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => {
      const image = document.querySelector(".culture-card img");
      return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0;
    });
    if (width === 390 || width === 1440) await page.screenshot({ path: `tests/screenshots/site-cards-${width}.png` });
    console.log(`${width}px: navigation, rendering, and overflow passed`);
    await page.close();
  }

  const page = await browser.newPage();
  await page.goto(`${baseURL}/#architecture`, { waitUntil: "domcontentloaded" });
  await page.locator("#architecture").waitFor();
  await page.locator(".website-nav .language-switcher").click();
  const lang = await page.locator("html").getAttribute("lang");
  if (lang !== "ta") throw new Error(`Language switch failed: ${lang}`);
  if (!(await page.locator(".mobile-menu-toggle").isVisible())) throw new Error("Tamil navigation should use compact menu at 1440px");
  await page.locator(".mobile-menu-toggle").click();
  if (!(await page.locator("#primary-nav").isVisible())) throw new Error("Tamil navigation menu did not open");
  await page.locator(".mobile-menu-toggle").click();
  await page.screenshot({ path: "tests/screenshots/site-tamil-story-1440.png" });
  console.log("Deep link and language switch passed");
  await page.close();

  const tamilMobileContext = await browser.newContext({ viewport: { width: 320, height: 700 } });
  const tamilMobile = await tamilMobileContext.newPage();
  await tamilMobile.goto(baseURL, { waitUntil: "networkidle" });
  await tamilMobile.locator(".sticky > .cinematic-language").click();
  if (!(await tamilMobile.locator(".cinematic-intro__title").innerText()).includes("பண்பாட்டின்")) throw new Error("Mobile Tamil intro was not translated");
  if (await tamilMobile.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) throw new Error("Tamil intro overflows at 320px");
  await tamilMobile.screenshot({ path: "tests/screenshots/site-tamil-intro-320.png" });
  await tamilMobile.locator(".skip-intro").click();
  await tamilMobile.locator(".mobile-menu-toggle").click();
  const tamilAudit = await new AxeBuilder({ page: tamilMobile }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  if (tamilAudit.violations.length) throw new Error(`Tamil mobile accessibility violations: ${tamilAudit.violations.map((item) => item.id).join(", ")}`);
  console.log("Tamil mobile translation, overflow, menu, and accessibility passed");
  await tamilMobileContext.close();

  const reduced = await browser.newPage({ reducedMotion: "reduce", viewport: { width: 390, height: 844 } });
  await reduced.goto(baseURL, { waitUntil: "networkidle" });
  const height = await reduced.locator(".cinematic-journey").evaluate((element) => element.getBoundingClientRect().height);
  if (height > 850) throw new Error(`Reduced-motion intro remained too long: ${height}px`);
  await reduced.keyboard.press("Tab");
  if (!(await reduced.locator(".skip-link").evaluate((element) => element === document.activeElement))) throw new Error("Skip link is not first in keyboard order");
  await reduced.keyboard.press("Enter");
  await reduced.locator("#main-site h1").waitFor();
  console.log("Reduced motion and keyboard skip link passed");
  await reduced.close();

  const intro = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await intro.goto(baseURL, { waitUntil: "networkidle" });
  await intro.locator(".sticky > .cinematic-language").click();
  if (!(await intro.locator(".cinematic-intro__title").innerText()).includes("பண்பாட்டின்")) throw new Error("Tamil intro title was not translated");
  await intro.locator(".sticky > .cinematic-language").click();
  await intro.evaluate(() => {
    const section = document.querySelector(".cinematic-journey");
    if (!section) throw new Error("Intro missing");
    window.scrollTo(0, (section.clientHeight - window.innerHeight) * 0.4);
  });
  await intro.waitForFunction(() => document.querySelector("video")?.currentTime > 0);
  const videoInfo = await intro.locator("video").evaluate((video) => ({ seconds: video.duration, width: video.videoWidth, height: video.videoHeight }));
  console.log(`Hero video: ${videoInfo.width}×${videoInfo.height}, ${videoInfo.seconds.toFixed(1)}s`);
  const forwardTime = await intro.locator("video").evaluate((video) => video.currentTime);
  await intro.evaluate(() => window.scrollTo(0, 0));
  await intro.waitForFunction((previous) => (document.querySelector("video")?.currentTime ?? previous) < previous, forwardTime);
  await intro.evaluate(() => {
    const section = document.querySelector(".cinematic-journey");
    window.scrollTo(0, (section.clientHeight - window.innerHeight) * 0.9);
  });
  await intro.locator(".arrival-screen__enter").click();
  await intro.waitForFunction(() => document.querySelector(".static-website--entered"));
  console.log("Video scrubbing, reverse scrolling, and Enter button passed");
  await intro.close();

  const auditContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const auditPage = await auditContext.newPage();
  await auditPage.goto(baseURL, { waitUntil: "networkidle" });
  await auditPage.locator(".skip-intro").click();
  const audit = await new AxeBuilder({ page: auditPage }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  if (audit.violations.length) {
    for (const violation of audit.violations) {
      console.error(`${violation.id}: ${violation.nodes.length} nodes — ${violation.description}`);
      for (const node of violation.nodes) console.error(`${node.target.join(" ")}: ${node.failureSummary}`);
    }
    throw new Error(`${audit.violations.length} accessibility violations`);
  }
  console.log("Automated WCAG accessibility audit passed");
  await auditContext.close();

  const content = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await content.goto(baseURL, { waitUntil: "networkidle" });
  await content.locator(".skip-intro").click();
  const cards = content.locator(".culture-card");
  if (await cards.count() !== 12) throw new Error("Expected twelve heritage cards");
  for (let index = 0; index < 12; index += 1) {
    const image = cards.nth(index).locator("img");
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(async (element) => {
      if (!(element instanceof HTMLImageElement)) throw new Error("Card image missing");
      await element.decode();
      if (!element.naturalWidth) throw new Error(`Card image failed: ${element.currentSrc}`);
    });
  }
  await cards.first().click();
  if (!(await content.evaluate(() => window.location.hash === "#language"))) throw new Error("Card did not deep-link to story");
  await content.locator("#language .related-cultures a").first().click();
  await content.goBack();
  if (!(await content.evaluate(() => window.location.hash === "#language"))) throw new Error("Browser back did not restore story");
  await content.locator(".site-footer a[href='#main-site']").click();
  console.log("All twelve media assets, story links, browser back, and footer passed");
  await content.close();
} finally {
  await browser.close();
}
