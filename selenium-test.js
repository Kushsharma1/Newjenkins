const { Builder, By, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('http://localhost:3000'); // Update this URL to your application's URL
    let title = await driver.getTitle();
    console.log('Page title is: ' + title);
  } finally {
    await driver.quit();
  }
})();
