import { test, expect } from "@playwright/test";

/**
 * Milestone 1 — Foundation tests
 * Covers: design tokens, theme toggle, skip link, nav, GitHub fetch placeholder
 */

test.describe("Milestone 1 — Foundation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // ─── Layout ──────────────────────────────────────────────────────────────
  test("page has a skip-to-content link", async ({ page }) => {
    const skipLink = page.locator(".skip-link");
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  test("skip link receives focus before nav on Tab", async ({ page }) => {
    await page.keyboard.press("Tab");
    const focusedText = await page.evaluate(
      () => document.activeElement?.textContent?.trim()
    );
    expect(focusedText).toBe("Skip to main content");
  });

  test("main content has correct id for skip link target", async ({ page }) => {
    const main = page.locator("#main-content");
    await expect(main).toBeAttached();
  });

  // ─── Nav ─────────────────────────────────────────────────────────────────
  test("nav is present with role=banner", async ({ page }) => {
    const header = page.locator("[role=banner]");
    await expect(header).toBeAttached();
  });

  test("primary navigation exists", async ({ page }) => {
    const nav = page.locator("nav[aria-label='Primary navigation']");
    await expect(nav).toBeAttached();
  });

  test("nav contains Work link", async ({ page }) => {
    const link = page.locator("nav a[href='#work']");
    await expect(link).toBeAttached();
  });

  // ─── Theme toggle ─────────────────────────────────────────────────────────
  test("theme toggle button is present", async ({ page }) => {
    const toggle = page.locator("#theme-toggle");
    await expect(toggle).toBeAttached();
    await expect(toggle).toHaveAttribute("aria-label");
  });

  test("theme toggle switches dark/light class on html", async ({ page }) => {
    const html = page.locator("html");
    // Wait for mount
    await page.waitForSelector("#theme-toggle:not([disabled])");

    // Force light for consistent test start
    await page.evaluate(() => {
      document.documentElement.classList.remove("dark");
    });

    const toggle = page.locator("#theme-toggle");
    await toggle.click();

    // Should now have .dark
    await expect(html).toHaveClass(/dark/);

    await toggle.click();

    // Should no longer have .dark
    const cls = await html.getAttribute("class");
    expect(cls).not.toMatch(/\bdark\b/);
  });

  // ─── Design tokens ────────────────────────────────────────────────────────
  test("CSS custom property --color-accent is defined", async ({ page }) => {
    const accent = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue(
        "--color-accent"
      )
    );
    expect(accent.trim()).toBeTruthy();
  });

  test("body uses font-family from design tokens (not Arial by default)", async ({
    page,
  }) => {
    const font = await page.evaluate(() =>
      getComputedStyle(document.body).fontFamily
    );
    // Should include Geist or a fallback — not plain Arial
    expect(font.toLowerCase()).not.toBe("arial");
  });

  // ─── Hero content ─────────────────────────────────────────────────────────
  test("hero section renders the name", async ({ page }) => {
    const h1 = page.locator("h1");
    await expect(h1).toContainText("Nafis Fuad Tanvir");
  });

  test("hero shows availability status", async ({ page }) => {
    await expect(page.locator("#hero")).toContainText("Open to SQA roles");
  });

  // ─── GitHub repos ─────────────────────────────────────────────────────────
  test("repos section is present", async ({ page }) => {
    const section = page.locator("#repos");
    await expect(section).toBeAttached();
  });

  test("at least one repo card is rendered", async ({ page }) => {
    const cards = page.locator("#repos .card");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  // ─── Accessibility ────────────────────────────────────────────────────────
  test("page title is descriptive", async ({ page }) => {
    const title = await page.title();
    expect(title).toContain("Nafis Fuad Tanvir");
  });

  test("h1 appears exactly once", async ({ page }) => {
    const count = await page.locator("h1").count();
    expect(count).toBe(1);
  });

  // ─── Visual regression at 3 viewports ────────────────────────────────────
  for (const [name, width, height] of [
    ["mobile-360", 360, 800],
    ["tablet-768", 768, 1024],
    ["desktop-1440", 1440, 900],
  ] as const) {
    test(`visual: foundation page at ${name}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`foundation-${name}.png`, {
        fullPage: true,
        animations: "disabled",
      });
    });
  }
});
