require('dotenv').config();
const varNames = require('./scrapedNames.js')
const fs = require('fs')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getCommodityData(variable, params){
    const url = `https://data.nasdaq.com/api/v3/datasets/${params}/data.json?api_key=${process.env.NASDAQ_API}&start_date=2022-07-06`
    console.log(url)
    try {
        const res = await fetch(url)
        const data = await res.json()

        if (data && data.dataset_data) {
            const freq = data.dataset_data.frequency
            const colNames = data.dataset_data.column_names
            const endDate = data.dataset_data.end_date
            return {
                name: variable,
                apiParams: params,
                frequency: freq,
                colNames: colNames,
                endDate: endDate,
            };
        } else {
            console.error(`Invalid response data format for ${params}`);
            console.log(data); // Log the response data to see what's wrong
            return {
                name: variable,
                apiParams: params,
                error: 'Invalid response data format'
            };
        }
        
    } catch (error) {
        console.error(`An error occurred while fetching the data for ${params}:`, error);
        return {
            name: variable,
            apiParams: params,
            error: error.message
        };
    }
}

(async () => {
    try {
        const commodities = [];
        for (const [variable, params] of Object.entries(varNames)) {
            const data = await getCommodityData(variable, params);
            commodities.push(data);
            await sleep(2000)
        }
        // Write the result to a JSON file
        fs.writeFileSync('results_rich.json', JSON.stringify(commodities, null, 2));
        console.log('Results saved to results_rich.json');

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();


