export default async function run(page) {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.evaluate(() => {
    // Mo rong lai danh sach ben trai de co the bam chon website
    document.querySelector(".left").classList.remove("hidden");
  });
  await page.waitForTimeout(300);
  await page.locator(".channel-name", { hasText: "Vua Sân Cỏ TV" }).first().click({ force: true });
  await page.waitForTimeout(3500);
  await page.locator(".vn-match-card").first().click({ force: true });
  await page.waitForTimeout(3500);

  const info = await page.evaluate(() => {
    const rail = document.querySelector(".chat-rail");
    const left = document.querySelector(".left");
    const r = rail.getBoundingClientRect();
    const vid = document.querySelector(".player-box").getBoundingClientRect();
    return {
      leftHidden: left.classList.contains("hidden"),
      railW: Math.round(r.width),
      playerW: Math.round(vid.width),
      railX: Math.round(r.x),
      railRightAligned: Math.abs((r.x + r.width) - innerWidth) < 4
    };
  });
  await page.screenshot({ path: "chat-playing.png" });
  return info;
}
