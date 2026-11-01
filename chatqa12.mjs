export default async function run(page, ui) {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.getByText("Vua Sân Cỏ TV", { exact: false }).first().click();
  await page.waitForTimeout(3500);

  const info = await page.evaluate(() => {
    const rail = document.querySelector(".chat-rail");
    const r = rail.getBoundingClientRect();
    const cs = getComputedStyle(rail);
    const vid = document.querySelector(".player-box").getBoundingClientRect();
    return {
      railDisplay: cs.display,
      rail: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      player: { x: Math.round(vid.x), w: Math.round(vid.width) },
      railAlignRight: Math.abs((r.x + r.width) - innerWidth) < 4,
      overlapWithPlayer: (r.x < vid.x + vid.width) && (vid.x < r.x + r.width) && (r.y < vid.y + vid.height) && (vid.y < r.y + r.height)
    };
  });
  await page.screenshot({ path: "chat-playing.png" });
  return info;
}
