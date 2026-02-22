import { type Page } from "@playwright/test";

type DismissAdPopupOptions = {
  dismissSelector?: string;
  timeoutMs?: number;
  pollIntervalMs?: number;
};

export async function dismissAdPopupIfVisible(
  page: Page,
  options: DismissAdPopupOptions = {},
) {
  const dismissSelector = options.dismissSelector ?? "#dismiss-button";
  const timeoutMs = options.timeoutMs ?? 5_000;
  const pollIntervalMs = options.pollIntervalMs ?? 250;
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    for (const frame of page.frames()) {
      const dismissButton = frame.locator(dismissSelector).first();

      if (await dismissButton.isVisible().catch(() => false)) {
        await dismissButton.click({ force: true }).catch(() => undefined);

        if (!(await dismissButton.isVisible().catch(() => false))) {
          return;
        }
      }
    }

    await page.waitForTimeout(pollIntervalMs);
  }
}
