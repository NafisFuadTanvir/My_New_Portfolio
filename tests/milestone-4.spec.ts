import { test, expect } from "@playwright/test";

/**
 * Milestone 4 — Motion & Interaction
 *
 * Note: Most animation tests verify DOM/CSS state rather than
 * animation frames (which Playwright disables in test mode).
 * We check that:
 *  1. Animated elements exist in the DOM (not hidden/removed).
 *  2. Interactive motion elements (nav hide, cursor label, magnetic) have
 *     the correct structure for JS to operate on.
 *  3. prefers-reduced-motion causes no layout breakage.
 */

test.describe("Milestone 4 — Motion", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  // ─── Load sequence ────────────────────────────────────────────────────────
  test("load sequence ticker element is hidden after session played", async ({ page }) => {
    // Set sessionStorage to simulate already-played
    await page.evaluate(() => sessionStorage.setItem("nft-intro-played", "1"));
    await page.reload();
    await page.waitForLoadState("networkidle");
    // Ticker should NOT appear once session flag is set
    const ticker = page.locator("[aria-hidden='true'][style*='fixed']").first();
    // Either not in DOM or not visible — both are acceptable
    const count = await page.locator("text=running portfolio.spec").count();
    expect(count).toBe(0);
  });

  // ─── Nav scroll-hide ──────────────────────────────────────────────────────
  test("nav header is in the DOM and sticky", async ({ page }) => {
    const header = page.locator("header[role='banner']");
    await expect(header).toBeVisible();
    const position = await header.evaluate((el) =>
      window.getComputedStyle(el).position
    );
    expect(position).toBe("sticky");
  });

  test("nav header has will-change:transform for GPU promotion", async ({ page }) => {
    const header = page.locator("header[role='banner']");
    const willChange = await header.evaluate((el) =>
      window.getComputedStyle(el).willChange
    );
    expect(willChange).toContain("transform");
  });

  test("mobile menu animates open and closed", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const toggle = page.locator("#mobile-menu-toggle");
    await toggle.click();
    const menu = page.locator("#mobile-menu");
    await expect(menu).toBeVisible();
    // Close it
    await toggle.click();
    await expect(menu).not.toBeVisible();
  });

  test("mobile menu links stagger — each li is in the overlay", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.locator("#mobile-menu-toggle").click();
    const items = page.locator("#mobile-menu nav li");
    expect(await items.count()).toBeGreaterThanOrEqual(6);
  });

  // ─── Page transition ──────────────────────────────────────────────────────
  test("home page renders inside a PageTransition wrapper (motion.div)", async ({ page }) => {
    // The PageTransition wraps main — check main is present and visible
    await expect(page.locator("main#main-content")).toBeVisible();
  });

  test("navigating to a case study renders main content", async ({ page }) => {
    await page.goto("/projects/govshield-bd");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main#main-content")).toBeVisible();
    await expect(page.locator("#case-study-hero h1")).toContainText("GovShield");
  });

  // ─── Scroll reveals — check elements are present ──────────────────────────
  test("hero h1 text renders (mask-up reveal)", async ({ page }) => {
    const h1 = page.locator("#hero h1");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Nafis");
  });

  test("work section heading renders (RevealText)", async ({ page }) => {
    await page.locator("#work").scrollIntoViewIfNeeded();
    await expect(page.locator("#work")).toContainText("Projects");
  });

  test("about section heading renders (RevealText)", async ({ page }) => {
    await page.locator("#about").scrollIntoViewIfNeeded();
    await expect(page.locator("#about")).toContainText("Who I am");
  });

  test("experience section heading renders (RevealText)", async ({ page }) => {
    await page.locator("#experience").scrollIntoViewIfNeeded();
    await expect(page.locator("#experience")).toContainText("Where I");
  });

  test("skills section heading renders (RevealText)", async ({ page }) => {
    await page.locator("#skills").scrollIntoViewIfNeeded();
    await expect(page.locator("#skills")).toContainText("What I use");
  });

  test("testing approach section renders (RevealText)", async ({ page }) => {
    await page.locator("#testing-approach").scrollIntoViewIfNeeded();
    await expect(page.locator("#testing-approach")).toBeVisible();
  });

  test("credentials section heading renders (RevealText)", async ({ page }) => {
    await page.locator("#credentials").scrollIntoViewIfNeeded();
    await expect(page.locator("#credentials")).toContainText("Background");
  });

  test("repos section heading renders (RevealText)", async ({ page }) => {
    await page.locator("#repos").scrollIntoViewIfNeeded();
    await expect(page.locator("#repos")).toContainText("GitHub");
  });

  test("contact section heading renders (RevealText)", async ({ page }) => {
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.locator("#contact")).toContainText("Get in touch");
  });

  // ─── Timeline draw ────────────────────────────────────────────────────────
  test("experience timeline items are visible after scroll", async ({ page }) => {
    await page.locator("#experience").scrollIntoViewIfNeeded();
    const items = page.locator(".timeline-item");
    expect(await items.count()).toBeGreaterThanOrEqual(2);
  });

  // ─── Work row cursor label ─────────────────────────────────────────────────
  test("work rows are list items with links", async ({ page }) => {
    const rows = page.locator("#work ol li");
    expect(await rows.count()).toBeGreaterThan(0);
  });

  // ─── Reduced motion ───────────────────────────────────────────────────────
  test("page renders correctly with prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // All major sections still visible
    await expect(page.locator("#hero")).toBeVisible();
    await expect(page.locator("#work")).toBeVisible();
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#experience")).toBeVisible();
    await expect(page.locator("#skills")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
  });

  test("hero name is visible with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const h1 = page.locator("#hero h1");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Nafis");
  });

  test("load sequence does not appear with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const ticker = page.locator("text=initialising portfolio.spec");
    await expect(ticker).not.toBeVisible();
  });

  test("smooth scroll html property is auto with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const scrollBehavior = await page.evaluate(() =>
      window.getComputedStyle(document.documentElement).scrollBehavior
    );
    expect(scrollBehavior).toBe("auto");
  });

  // ─── Hover CSS states ─────────────────────────────────────────────────────
  test("btn-primary has transition property", async ({ page }) => {
    const btn = page.locator("#hero .btn-primary").first();
    const transition = await btn.evaluate((el) =>
      window.getComputedStyle(el).transition
    );
    expect(transition).not.toBe("all 0s ease 0s");
  });

  test("chip elements have CSS transitions", async ({ page }) => {
    const chip = page.locator(".chip").first();
    const transition = await chip.evaluate((el) =>
      window.getComputedStyle(el).transition
    );
    expect(transition).toContain("0.15s");
  });

  // ─── Visual regression ───────────────────────────────────────────────────
  for (const [name, width, height] of [
    ["mobile-390", 390, 844],
    ["desktop-1440", 1440, 900],
  ] as const) {
    test(`visual: home hero at ${name} (motion)`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.emulateMedia({ reducedMotion: "reduce" }); // stable screenshots
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      // Scroll to top to capture hero
      await page.evaluate(() => window.scrollTo(0, 0));
      await expect(page).toHaveScreenshot(`motion-hero-${name}.png`, {
        fullPage: false,
        animations: "disabled",
      });
    });
  }
});
