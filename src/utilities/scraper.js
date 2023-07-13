// Scrape variable names & codes from NASDAQ API variable list page
const puppeteer = require('puppeteer');

async function scrapeTables(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle0' });

    // Get the number of tables
    const numberOfTables = await page.$$eval('table', tables => tables.length);
    console.log(`Number of tables found: ${numberOfTables}`);

    const result = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        const data = {};

        // Loop through each table starting from the second one
        for (let i = 1; i < tables.length; i++) {
            const table = tables[i];
            const rows = table.querySelectorAll('tbody > tr');

            // Loop through each row
            for (let j = 0; j < rows.length; j++) {
                const cells = rows[j].querySelectorAll('td');
                
                // Make sure the row has at least 3 cells
                if (cells.length > 2) {
                    // Get the text content of the first and third cells
                    const key = cells[0].textContent.trim().toString();
                    const value = cells[2].textContent.trim().toString();
                    
                    // Add the key and value to the data object
                    data[key] = value;
                }
            }
        }

        return data;
    });

    await browser.close();

    return result;
}

// Export the scrapeTables function
module.exports = {
    scrapeTables
};

// Example usage:
const url = 'https://blog.data.nasdaq.com/api-for-commodity-data';
scrapeTables(url).then((data) => {
    console.log(data);
}).catch((error) => {
    console.error('An error occurred:', error);
});
