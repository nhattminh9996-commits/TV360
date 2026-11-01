export default async function run(page, ui) {
  await page.setViewportSize({ width: 1366, height: 768 });
  let snap = await ui.snapshot();
  // chon website dau tien
  const site = snap.match(/@(e\d+) button[^\n]*Vua S/)?.[1];
  if (site) { await ui.click(site); await page.waitForTimeout(2500); }
  snap = await ui.snapshot();
  // bam tran dau tien trong danh sach
  const m = snap.match(/@(e\d+) button[^\n]*\d+[:.]\d{2}/)?.[1] || snap.match(/@(e\d+) button/)?.[6];
  if (m) { await ui.click(m); await page.waitForTimeout(3000); }
  const info = await page.evaluate(() => {
    const rail = document.querySelector(".chat-rail");
    const b = rail.getBoundingClientRect();
    const right = document.querySelector(".right").getBoundingClientRect();
    return { railCls: rail.className, disp: getComputedStyle(rail).display,
             rail: { x: Math.round(b.x), w: Math.round(b.width), h: Math.round(b.height) },
             right: { x: Math.round(right.x), w: Math.round(right.width) },
             winW: innerWidth };
  });
  await page.screenshot({ path: "chat6.png" });
  return info;
}
