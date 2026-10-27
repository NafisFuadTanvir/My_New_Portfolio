import { test, expect } from "@playwright/test";

/**
 * Milestone 2 — All sections
 */

test.describe("Milestone 2 — Sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  // ─── Hero ─────────────────────────────────────────────────────────────────
  test("hero renders full name", async ({ page }) => {
    const h1 = page.locator("#hero h1");
    await expect(h1).toContainText("Nafis");
    await expect(h1).toContainText("Tanvir");
  });

  test("hero has View work and Download CV CTAs", async ({ page }) => {
    const viewWork = page.locator("#hero a[href='#work']");
    const downloadCv = page.locator("#hero a[href='/resume']");
    await expect(viewWork).toBeVisible();
    await expect(downloadCv).toBeVisible();
  });

  test("hero shows tagline with accent text", async ({ page }) => {
    await expect(page.locator("#hero")).toContainText("SQA Engineer");
  });

  // ─── Nav ─────────────────────────────────────────────────────────────────
  test("nav links include Work, About, Experience, Skills, GitHub, Contact", async ({ page }) => {
    for (const label of ["Work", "About", "Experience", "Skills", "GitHub", "Contact"]) {
      await expect(page.locator(`nav a:has-text("${label}")`).first()).toBeAttached();
    }
  });

  test("mobile menu toggle opens overlay", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const toggle = page.locator("#mobile-menu-toggle");
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.locator("#mobile-menu")).toBeVisible();
  });

  // ─── Work section ─────────────────────────────────────────────────────────
  test("work section renders featured projects", async ({ page }) => {
    const section = page.locator("#work");
    await expect(section).toContainText("GovShield BD");
    await expect(section).toContainText("Bangladesh News Monitor");
    await expect(section).toContainText("GeoInsight BD");
  });

  test("project rows show stack chips", async ({ page }) => {
    const firstChip = page.locator("#work .chip").first();
    await expect(firstChip).toBeVisible();
  });

  test("project rows are links to case studies", async ({ page }) => {
    const links = page.locator("#work a[href^='/projects/']");
    expect(await links.count()).toBeGreaterThan(0);
  });

  // ─── About section ────────────────────────────────────────────────────────
  test("about section renders bio", async ({ page }) => {
    const about = page.locator("#about");
    await expect(about).toBeVisible();
    await expect(about).toContainText("intersection");
  });

  test("about section has quick facts", async ({ page }) => {
    await expect(page.locator("#about")).toContainText("Chattogram");
    await expect(page.locator("#about")).toContainText("Based in");
  });

  // ─── Experience section ───────────────────────────────────────────────────
  test("experience section shows MGH Group", async ({ page }) => {
    await expect(page.locator("#experience")).toContainText("MGH Group");
  });

  test("experience section shows internship", async ({ page }) => {
    await expect(page.locator("#experience")).toContainText("Robo Tech Valley");
  });

  test("experience timeline has dot markers", async ({ page }) => {
    const dots = page.locator(".timeline-item");
    expect(await dots.count()).toBeGreaterThanOrEqual(2);
  });

  // ─── Skills section ───────────────────────────────────────────────────────
  test("skills section is present", async ({ page }) => {
    await expect(page.locator("#skills")).toBeVisible();
  });

  test("skills section shows Playwright", async ({ page }) => {
    await expect(page.locator("#skills")).toContainText("Playwright");
  });

  test("skills section does not contain percentage signs", async ({ page }) => {
    const text = await page.locator("#skills").textContent();
    expect(text).not.toContain("%");
  });

  // ─── Testing approach ─────────────────────────────────────────────────────
  test("testing approach section renders", async ({ page }) => {
    await expect(page.locator("#testing-approach")).toBeVisible();
  });

  test("testing approach contains the body quote", async ({ page }) => {
    await expect(page.locator("#testing-approach")).toContainText("architecture");
  });

  test("testing approach has bug-found callout", async ({ page }) => {
    await expect(page.locator("#testing-approach")).toContainText("bug found");
  });

  // ─── Credentials section ──────────────────────────────────────────────────
  test("credentials section shows education", async ({ page }) => {
    await expect(page.locator("#credentials")).toContainText("Green University");
  });

  test("credentials section shows certification", async ({ page }) => {
    await expect(page.locator("#credentials")).toContainText("Road to SDET");
  });

  // ─── Repos section ────────────────────────────────────────────────────────
  test("repos section renders cards", async ({ page }) => {
    const cards = page.locator("#repos .card");
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test("repos filter buttons are visible", async ({ page }) => {
    const filterGroup = page.locator("#repos [role='group']");
    await expect(filterGroup).toBeVisible();
  });

  test("repos filter changes visible cards", async ({ page }) => {
    await page.locator("#repos [role='group'] button").nth(1).click();
    const cards = page.locator("#repos .card");
    expect(await cards.count()).toBeGreaterThan(0);
  });

  // ─── Contact section ──────────────────────────────────────────────────────
  test("contact form has name, email, message fields", async ({ page }) => {
    await expect(page.locator("#contact-name")).toBeVisible();
    await expect(page.locator("#contact-email")).toBeVisible();
    await expect(page.locator("#contact-message")).toBeVisible();
  });

  test("contact form submit button exists", async ({ page }) => {
    const btn = page.locator("#contact button[type='submit']");
    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();
  });

  test("email reveal button shows partial email before click", async ({ page }) => {
    const revealBtn = page.locator("#contact button[aria-label='Reveal email address']");
    await expect(revealBtn).toBeVisible();
    const text = await revealBtn.textContent();
    expect(text).toContain("@···");
  });

  test("email revealed on click", async ({ page }) => {
    await page.locator("#contact button[aria-label='Reveal email address']").click();
    const emailLink = page.locator("#contact a[href^='mailto:']");
    await expect(emailLink).toBeVisible();
  });

  // ─── Footer ───────────────────────────────────────────────────────────────
  test("footer has how this site is tested link", async ({ page }) => {
    await expect(page.locator("footer")).toContainText("How this site is tested");
  });

  // ─── Accessibility ────────────────────────────────────────────────────────
  test("all sections have aria-label", async ({ page }) => {
    const sections = await page.locator("section[aria-label]").count();
    expect(sections).toBeGreaterThanOrEqual(8);
  });

  test("form fields have labels", async ({ page }) => {
    const labels = await page.locator("#contact label").count();
    expect(labels).toBeGreaterThanOrEqual(3);
  });

  // ─── Visual regression ───────────────────────────────────────────────────
  for (const [name, width, height] of [
    ["mobile-390", 390, 844],
    ["tablet-768", 768, 1024],
    ["desktop-1440", 1440, 900],
  ] as const) {
    test(`visual: full page at ${name}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`sections-${name}.png`, {
        fullPage: true,
        animations: "disabled",
      });
    });
  }
});
