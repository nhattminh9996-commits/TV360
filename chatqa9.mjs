export default async function run(page, ui) {
  await page.setViewportSize({ width: 1366, height: 768 });
  // Bam "Vua San Co TV" (nut hoac the bat ky chua chu nay)
  let snap = await ui.snapshot();
  const site = snap.match(/@(e\d+) [^\n]*Vua S/)?.[1];
  if (site) { await ui.click(site); await page.waitForTimeout(2500); }

  // Lay snapshot sau khi vao trang -> tim nut tran
  snap = await ui.snapshot();
  // nut tran thuong co dang @eN button "HH:MM ..." hoac card chua ten tran
  const line = snap.split("\n").find(l => /\d{1,2}[:h]\d{2}/.test(l) && /@e\d+/.test(l) && !/Tiế|Âm|1x/i.test(l));
  const m = line?.match(/@(e\d+)/)?.[1];
  if (!m) return { error: "still no match", snapshot: snap.slice(0, 1500) };
  await ui.click(m);
  await page.waitForTimeout(3500);

  const info = await page.evaluate(() => {
    const rail = document.querySelector(".chat-rail");
    const r = rail.getBoundingClientRect();
    return { disp: getComputedStyle(rail).display,
             rail: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } };
  });
  await page.screenshot({ path: "chat-playing.png" });
  return info;
}
