export default async function run(page, ui) {
  // Vao trang chon website bong da VN
  let snap = await ui.snapshot();
  const site = snap.match(/@(e\d+) button[^]*?Vua S[Cc]n C/)?.[1] ||
               snap.match(/@(e\d+)[^\n]*Vua S/)?.[1];
  if (site) { await ui.click(site); await page.waitForTimeout(2500); }

  // Bam tran dau tien
  snap = await ui.snapshot();
  const match = snap.match(/@(e\d+) button[^\n]*tr[âa]n/i)?.[1] ||
                snap.match(/@(e\d+)[^\n]*(?:Xem|Ph[aá]t)/i)?.[1];
  if (match) { await ui.click(match); await page.waitForTimeout(3000); }

  // Mo chat
  snap = await ui.snapshot();
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
  await page.screenshot({ path: "chat-match.png" });
  return state;
}
