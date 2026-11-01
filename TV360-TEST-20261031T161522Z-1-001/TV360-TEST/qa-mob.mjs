export default async function run(page, ui) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => fetch(location.href, {cache: 'reload'}));
  await page.reload({ waitUntil: 'load' });
  await page.screenshot({ path: 'mob-2-390.png', timeout: 15000, animations: 'disabled' });
  await page.evaluate(() => document.querySelector('#list').scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'mob-2-list.png', timeout: 15000, animations: 'disabled' });
  const info = await page.evaluate(() => ({
    innerWidth: innerWidth,
    topH: document.querySelector('.top')?.offsetHeight,
    playerH: document.querySelector('.player-box')?.offsetHeight,
    listItems: document.querySelectorAll('.match, .channel').length,
  }));
  return info;
}
