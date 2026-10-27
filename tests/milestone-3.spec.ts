import { test, expect } from "@playwright/test";

/**
 * Milestone 3 — Case study pages, resume page, custom 404
 */

test.describe("Milestone 3 — Case Studies", () => {
  // ─── Project case study pages ────────────────────────────────────────────
  for (const [slug, title] of [
    ["govshield-bd", "GovShield BD"],
    ["bangladesh-news-monitor", "Bangladesh News Monitor"],
    ["geoinsight-bd", "GeoInsight BD"],
  ] as const) {
    test(`case study page loads for ${slug}`, async ({ page }) => {
      await page.goto(`/projects/${slug}`);
      await page.waitForLoadState("networkidle");
      await expect(page.locator("#case-study-hero")).toBeVisible();
    });

    test(`case study title is ${title}`, async ({ page }) => {
      await page.goto(`/projects/${slug}`);
      const h1 = page.locator("#case-study-hero h1");
      await expect(h1).toContainText(title);
    });

    test(`case study has back-to-work link for ${slug}`, async ({ page }) => {
      await page.goto(`/projects/${slug}`);
      const back = page.locator("a[href='/#work'], a[aria-label='Back to all projects']");
      await expect(back.first()).toBeVisible();
    });

    test(`case study has problem section for ${slug}`, async ({ page }) => {
      await page.goto(`/projects/${slug}`);
      await expect(page.locator("article")).toContainText("01");
    });

    test(`case study shows stack chips for ${slug}`, async ({ page }) => {
      await page.goto(`/projects/${slug}`);
      const chips = page.locator(".chip");
      expect(await chips.count()).toBeGreaterThan(0);
    });

    test(`case study shows testing strategy for ${slug}`, async ({ page }) => {
      await page.goto(`/projects/${slug}`);
      await expect(page.locator("article")).toContainText("testing strategy");
    });

    test(`case study shows bug-found callout for ${slug}`, async ({ page }) => {
      await page.goto(`/projects/${slug}`);
      await expect(page.locator("#bug-callout")).toBeVisible();
      await expect(page.locator("#bug-callout")).toContainText("bug found");
    });

    test(`case study has GitHub repo link for ${slug}`, async ({ page }) => {
      await page.goto(`/projects/${slug}`);
      const ghLink = page.locator(
        "a[href*='github.com/NafisFuadTanvir'][target='_blank']"
      );
      expect(await ghLink.count()).toBeGreaterThan(0);
    });

    test(`project nav links to next/prev for ${slug}`, async ({ page }) => {
      await page.goto(`/projects/${slug}`);
      const nav = page.locator("nav[aria-label='Project navigation']");
      await expect(nav).toBeVisible();
    });
  }

  // ─── Work section links open correct case study ─────────────────────────
  test("clicking a work project row navigates to its case study", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const firstLink = page.locator("#work a[href^='/projects/']").first();
    const href = await firstLink.getAttribute("href");
    await firstLink.click();
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/projects/");
    await expect(page.locator("#case-study-hero h1")).toBeVisible();
  });

  // ─── Resume page ─────────────────────────────────────────────────────────
  test("resume page loads", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("resume page has download link", async ({ page }) => {
    await page.goto("/resume");
    const downloadLink = page.locator("#resume-download");
    await expect(downloadLink).toBeVisible();
    await expect(downloadLink).toHaveAttribute("download");
  });

  test("resume page has back-to-home link", async ({ page }) => {
    await page.goto("/resume");
    const back = page.locator("a[href='/']");
    await expect(back.first()).toBeVisible();
  });

  test("hero download CV button links to /resume", async ({ page }) => {
    await page.goto("/");
    const cvLink = page.locator("#hero a[href='/resume']");
    await expect(cvLink).toBeVisible();
  });

  // ─── Custom 404 ──────────────────────────────────────────────────────────
  test("custom 404 page renders on unknown route", async ({ page }) => {
    await page.goto("/this-does-not-exist-xyz");
    await expect(page.locator("main")).toBeVisible();
    const text = await page.locator("main").textContent();
    expect(text?.toLowerCase()).toMatch(/not found|404/);
  });

  test("404 page has a go-home link", async ({ page }) => {
    await page.goto("/nonexistent-page-abc");
    const homeLink = page.locator("a[href='/']");
    await expect(homeLink.first()).toBeVisible();
  });

  // ─── Accessibility: case study aria-labels ───────────────────────────────
  test("case study hero has aria-label", async ({ page }) => {
    await page.goto("/projects/govshield-bd");
    const section = page.locator("section[aria-label*='case study']");
    await expect(section).toBeVisible();
  });

  test("project nav has aria-label", async ({ page }) => {
    await page.goto("/projects/govshield-bd");
    const nav = page.locator("nav[aria-label='Project navigation']");
    await expect(nav).toBeVisible();
  });

  // ─── Metadata ────────────────────────────────────────────────────────────
  test("case study page has unique <title>", async ({ page }) => {
    await page.goto("/projects/govshield-bd");
    const title = await page.title();
    expect(title).toContain("GovShield");
  });

  test("resume page has <title>", async ({ page }) => {
    await page.goto("/resume");
    const title = await page.title();
    expect(title.toLowerCase()).toContain("résumé");
  });

  // ─── Visual regression ───────────────────────────────────────────────────
  for (const [name, width, height] of [
    ["mobile-390", 390, 844],
    ["desktop-1440", 1440, 900],
  ] as const) {
    test(`visual: govshield case study at ${name}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto("/projects/govshield-bd");
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`casestudy-govshield-${name}.png`, {
        fullPage: true,
        animations: "disabled",
      });
    });

    test(`visual: resume page at ${name}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto("/resume");
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`resume-${name}.png`, {
        fullPage: true,
        animations: "disabled",
      });
    });
  }
});
