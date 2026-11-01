export default async function run(page, ui) {
  // Mo chat ngay, khong can chon tran
  let snap = await ui.snapshot();
  const chat = snap.match(/@(e\d+) button[^\n]*Chat/)?.[1];
  if (!chat) return { error: "no chat btn", snapshot: snap };
  await ui.click(chat);
  await page.waitForTimeout(1200);

  const state = await page.evaluate(() => {
    const rail = document.querySelector(".chat-rail");
    if (!rail) return { rail: false };
    const r = rail.getBoundingClientRect();
    return { rail: true, open: rail.classList.contains("open"),
             x: Math.round(r.x), w: Math.round(r.width), h: Math.round(r.height) };
  });
  await page.screenshot({ path: "chat-open2.png" });
  return state;
}
