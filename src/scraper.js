const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeData() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.realitytvrevisited.com/2013/01/list-of-all-episodes-posts.html');

  // Get the list of restaurant rows
  const restaurantRows = await page.$$('div > p');

  // Array to store the scraped data
  const scrapedData = [];

  for (const restaurantRow of restaurantRows) {
    // Extract the restaurant name and link
    const restaurantLinkElement = await restaurantRow.$('a');
    if (!restaurantLinkElement) continue; // Skip if link element not found
    const restaurantName = await page.evaluate(element => element.textContent, restaurantLinkElement);
    const restaurantLink = await page.evaluate(element => element.href, restaurantLinkElement);

    // Extract the open/closed status
    const openClosedStatusElement = await restaurantRow.$('b');
    const openClosedStatus = openClosedStatusElement ? await page.evaluate(element => element.textContent.trim(), openClosedStatusElement) : 'Status not available';

    // Extract the description
    const description = await page.evaluate(element => element.textContent.trim(), restaurantRow);

    // Add the scraped data to the array
    scrapedData.push({
      name: restaurantName,
      status: openClosedStatus,
      description: description,
      link: restaurantLink
    });
  }

  // Close the browser
  await browser.close();

  // Return the scraped data
  return scrapedData;
}

scrapeData()
  .then(data => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile('scrapedData.json', jsonData, err => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Scraped data exported to scrapedData.json');
      }
    });
  })
  .catch(error => {
    console.error('Error scraping data:', error);
  });
