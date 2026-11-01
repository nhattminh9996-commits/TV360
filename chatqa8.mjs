export default async function run(page, ui) {
  await page.setViewportSize({ width: 1366, height: 768 });
  let snap = await ui.snapshot();

  // Vao website dau tien
  const site = snap.match(/@(e\d+) button[^\n]*Vua S/)?.[1];
  if (site) { await ui.click(site); await page.waitForTimeout(2500); }

  // Bam tran dau tien
  snap = await ui.snapshot();
  const m = snap.match(/@(e\d+) button[^\n]*\d+[:.]\d{2}/)?.[1];
  if (!m) return { error: "no match", snapshot: snap.slice(0, 800) };
  await ui.click(m);
  await page.waitForTimeout(3500);

  const info = await page.evaluate(() => {
    const rail = document.querySelector(".chat-rail");
    const right = document.querySelector(".right");
    const main = document.querySelector(".main");
    const cs = rail ? getComputedStyle(rail) : null;
    return {
      railExists: !!rail,
      railDisplay: cs ? cs.display : null,
      railRect: rail ? (r => ({ x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }))(rail.getBoundingClientRect()) : null,
      railParent: rail ? rail.parentElement.className : null,
      railNextSibling: rail ? (rail.nextElementSibling ? rail.nextElementSibling.className : "none") : null,
      railPrevSibling: rail ? (rail.previousElementSibling ? rail.previousElementSibling.className : "none") : null,
      mainDisplay: getComputedStyle(main).display,
      mainChildren: Array.from(main.children).map(c => c.className),
      rightRect: (r => ({ x: Math.round(r.x), w: Math.round(r.width) }))(right.getBoundingClientRect())
    };
  });
  await page.screenshot({ path: "chat-playing.png" });
  return info;
}
