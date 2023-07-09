const { scrapeData } = require('../src/scraper');
scrapeData()
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error scraping data:', error);
  });