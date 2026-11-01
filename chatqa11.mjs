export default async function run(page, ui) {
  await page.setViewportSize({ width: 1366, height: 768 });
  // Nut site nam trong text "V Vua San Co TV" -> dung getByText
  await page.getByText("Vua Sân Cỏ TV", { exact: false }).first().click();
  await page.waitForTimeout(3000);
  const snap = await ui.snapshot();
  // Tim bat ky nut nao kha nhan nhu mot tran (co gio hoac ten doi)
  const lines = snap.split("\n").filter(l => /@e\d+/.test(l));
  await page.screenshot({ path: "chat-list.png" });
  return { count: lines.length, sample: lines.slice(0, 30) };
}
