import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Milestone 5 — QA & Polish
 * axe-core accessibility · SEO metadata · security headers · link integrity
 */

test.describe("Milestone 5 — QA & Polish", () => {
  // ─── Accessibility: axe-core ─────────────────────────────────────────────

  test("home page — zero axe critical/serious violations", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .exclude("[aria-hidden='true']") // skip decorative elements
      .analyze();

    const criticalOrSerious = results.violations.filter((v) =>
      ["critical", "serious"].includes(v.impact ?? "")
    );

    if (criticalOrSerious.length > 0) {
      console.error(
        "Axe violations:",
        JSON.stringify(criticalOrSerious.map((v) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.map((n) => n.html).slice(0, 2),
        })), null, 2)
      );
    }

    expect(criticalOrSerious).toHaveLength(0);
  });

  test("case study page — zero axe critical/serious violations", async ({ page }) => {
    await page.goto("/projects/govshield-bd");
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .exclude("[aria-hidden='true']")
      .analyze();

    const criticalOrSerious = results.violations.filter((v) =>
      ["critical", "serious"].includes(v.impact ?? "")
    );

    expect(criticalOrSerious).toHaveLength(0);
  });

  test("resume page — zero axe critical/serious violations", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .exclude("[aria-hidden='true']")
      .analyze();

    const criticalOrSerious = results.violations.filter((v) =>
      ["critical", "serious"].includes(v.impact ?? "")
    );

    expect(criticalOrSerious).toHaveLength(0);
  });

  test("home page — mobile axe violations (Pixel 5 viewport)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .exclude("[aria-hidden='true']")
      .analyze();

    const criticalOrSerious = results.violations.filter((v) =>
      ["critical", "serious"].includes(v.impact ?? "")
    );

    expect(criticalOrSerious).toHaveLength(0);
  });

  // ─── Accessibility: manual checks ────────────────────────────────────────

  test("skip link exists and is first focusable element", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toHaveClass(/skip-link/);
  });

  test("all images have alt text", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const imgs = await page.locator("img").all();
    for (const img of imgs) {
      const alt = await img.getAttribute("alt");
      expect(alt).not.toBeNull();
      expect(alt).not.toBe("");
    }
  });

  test("all form inputs have associated labels", async ({ page }) => {
    await page.goto("/");
    const inputs = await page.locator("#contact input:not([type='hidden']), #contact textarea").all();
    for (const input of inputs) {
      const id = await input.getAttribute("id");
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        expect(await label.count()).toBeGreaterThan(0);
      }
    }
  });

  test("color contrast — accent on paper passes (visual check via CSS vars)", async ({ page }) => {
    await page.goto("/");
    // Verify custom properties are set — proxy check for correct palette
    const accentColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim()
    );
    expect(accentColor).toBeTruthy();
    // Accent should be the vermilion (#E8481C or #FF5A2B in dark)
    expect(accentColor.toLowerCase()).toMatch(/#e8481c|#ff5a2b/i);
  });

  test("focus rings visible — focus-visible outline set", async ({ page }) => {
    await page.goto("/");
    const outline = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--focus-ring").trim()
    );
    expect(outline).toContain("var(--color-accent)");
  });

  // ─── SEO metadata ─────────────────────────────────────────────────────────

  test("home page has descriptive <title>", async ({ page }) => {
    await page.goto("/");
    const title = await page.title();
    expect(title).toContain("Nafis Fuad Tanvir");
    expect(title).toContain("SQA");
  });

  test("home page has meta description", async ({ page }) => {
    await page.goto("/");
    const desc = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(desc).toBeTruthy();
    expect((desc ?? "").length).toBeGreaterThan(50);
    expect(desc).toContain("Chattogram");
  });

  test("home page has canonical link", async ({ page }) => {
    await page.goto("/");
    const canonical = page.locator('link[rel="canonical"]');
    expect(await canonical.count()).toBeGreaterThan(0);
  });

  test("home page has OG title", async ({ page }) => {
    await page.goto("/");
    const ogTitle = await page
      .locator('meta[property="og:title"]')
      .getAttribute("content");
    expect(ogTitle).toBeTruthy();
    expect(ogTitle).toContain("Nafis");
  });

  test("home page has OG image", async ({ page }) => {
    await page.goto("/");
    const ogImage = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(ogImage).toBeTruthy();
  });

  test("project page has unique <title>", async ({ page }) => {
    await page.goto("/projects/govshield-bd");
    const title = await page.title();
    expect(title).toContain("GovShield");
    // Must differ from home title
    const homeTitle = "Nafis Fuad Tanvir — SQA Engineer & Test Automation Specialist";
    expect(title).not.toBe(homeTitle);
  });

  test("project page has OG title matching project name", async ({ page }) => {
    await page.goto("/projects/bangladesh-news-monitor");
    const ogTitle = await page
      .locator('meta[property="og:title"]')
      .getAttribute("content");
    expect(ogTitle).toContain("Bangladesh News Monitor");
  });

  test("JSON-LD Person schema is present in DOM", async ({ page }) => {
    await page.goto("/");
    const jsonLd = await page.evaluate(() => {
      const script = document.querySelector('script[type="application/ld+json"]');
      return script?.textContent ?? "";
    });
    expect(jsonLd).toBeTruthy();
    const parsed = JSON.parse(jsonLd);
    expect(parsed["@type"]).toBe("Person");
    expect(parsed.name).toBe("Nafis Fuad Tanvir");
    expect(parsed.jobTitle).toContain("SQA");
  });

  test("sitemap.xml is reachable", async ({ page }) => {
    const res = await page.goto("/sitemap.xml");
    expect(res?.status()).toBe(200);
    const body = await page.content();
    expect(body).toContain("nafisfuadtanvir.com");
  });

  test("robots.txt is reachable and allows /", async ({ page }) => {
    const res = await page.goto("/robots.txt");
    expect(res?.status()).toBe(200);
    const body = await page.content();
    expect(body).toContain("Allow: /");
    expect(body).toContain("Sitemap:");
  });

  // ─── Security headers ─────────────────────────────────────────────────────

  test("X-Frame-Options header is set", async ({ page }) => {
    const res = await page.goto("/");
    const header = res?.headers()["x-frame-options"];
    expect(header).toBe("SAMEORIGIN");
  });

  test("X-Content-Type-Options header is set", async ({ page }) => {
    const res = await page.goto("/");
    const header = res?.headers()["x-content-type-options"];
    expect(header).toBe("nosniff");
  });

  test("Referrer-Policy header is set", async ({ page }) => {
    const res = await page.goto("/");
    const header = res?.headers()["referrer-policy"];
    expect(header).toBe("strict-origin-when-cross-origin");
  });

  // ─── No placeholder text ─────────────────────────────────────────────────

  test("no 'Lorem ipsum' placeholder text anywhere", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const text = await page.locator("body").textContent();
    expect(text?.toLowerCase()).not.toContain("lorem ipsum");
  });

  test("no broken internal links on home page", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Collect all internal hrefs
    const links = await page.locator("a[href^='/']").all();
    const hrefs = new Set<string>();
    for (const link of links) {
      const href = await link.getAttribute("href");
      if (href && !href.startsWith("/resume")) hrefs.add(href); // /resume needs PDF
    }

    for (const href of hrefs) {
      const res = await page.goto(href);
      const status = res?.status() ?? 0;
      expect(status, `${href} returned ${status}`).toBeLessThan(400);
      await page.goto("/"); // back to home
    }
  });

  // ─── Responsive layout checks ─────────────────────────────────────────────

  test("no horizontal scroll at 320px width", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // 2px tolerance
  });

  test("no horizontal scroll at 390px width", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
  });

  test("touch targets are large enough (min 44px) on key buttons", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const ctaBtn = page.locator("#hero .btn-primary").first();
    const box = await ctaBtn.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });

  // ─── Performance proxy checks ─────────────────────────────────────────────

  test("no render-blocking inline scripts (only JSON-LD)", async ({ page }) => {
    await page.goto("/");
    const blockingScripts = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll("script:not([type='application/ld+json']):not([async]):not([defer])"));
      return scripts.filter((s) => !(s as HTMLScriptElement).src.includes("_next")).length;
    });
    expect(blockingScripts).toBe(0);
  });

  // ─── Full-page visual regression at key breakpoints ──────────────────────

  for (const [name, width, height] of [
    ["mobile-320", 320, 568],
    ["mobile-390", 390, 844],
    ["tablet-768", 768, 1024],
    ["desktop-1440", 1440, 900],
  ] as const) {
    test(`visual: full page at ${name}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`polish-full-${name}.png`, {
        fullPage: true,
        animations: "disabled",
        threshold: 0.02,
      });
    });
  }
});
