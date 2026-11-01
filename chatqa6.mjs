export default async function run(page, ui) {
  await page.setViewportSize({ width: 1366, height: 768 });
  let snap = await ui.snapshot();
  const site = snap.match(/@(e\d+) button[^\n]*Vua S/)?.[1];
  if (site) { await ui.click(site); await page.waitForTimeout(2500); }
  snap = await ui.snapshot();
  const m = snap.match(/@(e\d+) button[^\n]*\d+[:.]\d{2}/)?.[1];
  if (m) { await ui.click(m); await page.waitForTimeout(3000); }
  return await page.evaluate(() => {
    const g = s => { const el = document.querySelector(s); if (!el) return null;
      const b = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { x: Math.round(b.x), w: Math.round(b.width), display: cs.display, minW: cs.minWidth }; };
    return {
      win: innerWidth,
      main: g(".main"), left: g(".left"), right: g(".right"),
      rail: g(".chat-rail"), player: g(".player-box"), video: g("video"),
      rightScrollW: document.querySelector(".right").scrollWidth,
      bodyScrollW: document.body.scrollWidth
    };
  });
}
