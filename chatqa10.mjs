export default async function run(page, ui) {
  await page.setViewportSize({ width: 1366, height: 768 });
  let snap = await ui.snapshot();
  const site = snap.match(/@(e\d+) [^\n]*Vua S/)?.[1];
  if (!site) return { error: "no site" };
  await ui.click(site);
  await page.waitForTimeout(3000);
  const tree = await ui.snapshot({ full: true });
  await page.screenshot({ path: "chat-list.png" });
  return tree.slice(0, 2500);
}
