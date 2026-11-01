export default async function run(page) {
  const out = {};
  for (const w of [1366, 1093, 900, 700, 480]) {
    await page.setViewportSize({ width: w, height: 768 });
    await page.waitForTimeout(300);
    out[w] = await page.evaluate(() => {
      const r = document.querySelector(".chat-rail");
      if (!r) return "NO RAIL";
      const b = r.getBoundingClientRect();
      return `${getComputedStyle(r).display} w=${Math.round(b.width)} x=${Math.round(b.x)}`;
    });
  }
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.waitForTimeout(300);
  await page.screenshot({ path: "chat-final2.png" });
  return out;
}
