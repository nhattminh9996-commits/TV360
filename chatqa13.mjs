export default async function run(page, ui) {
  await page.setViewportSize({ width: 1366, height: 768 });
  const before = await page.evaluate(() => ({
    leftHidden: document.querySelector(".left").classList.contains("hidden"),
    leftW: Math.round(document.querySelector(".left").getBoundingClientRect().width),
    playerW: Math.round(document.querySelector(".player-box").getBoundingClientRect().width),
    railW: Math.round(document.querySelector(".chat-rail").getBoundingClientRect().width)
  }));
  // Bam nut chatToggle qua DOM truc tiep (van goi onclick)
  await page.evaluate(() => document.getElementById("chatToggle").click());
  await page.waitForTimeout(600);
  const after = await page.evaluate(() => ({
    leftHidden: document.querySelector(".left").classList.contains("hidden"),
    leftW: Math.round(document.querySelector(".left").getBoundingClientRect().width),
    playerW: Math.round(document.querySelector(".player-box").getBoundingClientRect().width),
    railW: Math.round(document.querySelector(".chat-rail").getBoundingClientRect().width)
  }));
  await page.evaluate(() => document.getElementById("chatToggle").click());
  await page.waitForTimeout(600);
  const reopened = await page.evaluate(() => document.querySelector(".left").classList.contains("hidden"));
  await page.screenshot({ path: "chat-toggle.png" });
  return { chatOpen: before, chatClosed: after, reopened };
}
