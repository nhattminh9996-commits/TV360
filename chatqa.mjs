export default async function run(page, ui) {
  const snap = await ui.snapshot();
  const ref = snap.match(/@(e\d+) button "?\s*💬 Chat"?/)?.[1] ||
              snap.match(/@(e\d+) button.*Chat/)?.[1];
  if (!ref) return { error: "no chat button", snapshot: snap };
  await ui.click(ref);
  await page.waitForTimeout(800);
  const state = await page.evaluate(() => {
    const rail = document.querySelector(".chat-rail");
    const r = rail.getBoundingClientRect();
    return { open: rail.classList.contains("open"), w: r.width, x: Math.round(r.x), visible: r.width > 0 };
  });
  await page.screenshot({ path: "chat-open.png" });
  return state;
}
