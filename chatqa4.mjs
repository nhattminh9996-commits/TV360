export default async function run(page, ui) {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.waitForTimeout(500);
  const info = await page.evaluate(() => {
    const r = document.querySelector(".chat-rail");
    if (!r) return { rail: false };
    const b = r.getBoundingClientRect();
    const cs = getComputedStyle(r);
    return { rail: true, cls: r.className, disp: cs.display,
             x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height),
             parent: r.parentElement.className };
  });
  await page.screenshot({ path: "chat5.png" });
  return info;
}
