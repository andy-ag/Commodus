require('dotenv').config();
const varNames = require('./path/to/scrapedNames')

async function getCommodityData(key){
    const url = `https://data.nasdaq.com/api/v3/datasets/${key}/data.json?api_key=${process.env.NASDAQ_API}&start_date=2022-07-06`
    console.log(url)
    try {
        const res = await fetch(url)
        const data = await res.json()

        if (data && data.dataset_data) {
            const freq = data.dataset_data.frequency
            return { [key]: freq }
        } else {
            console.error('Invalid response data format')
            return null
        }
        
    } catch (error) {
        console.error('An error occurred while fetching the data:', error);
        return null; 
    }
}

(async () => {
    try {
        const result = await getCommodityData('ODA/PLOGORE_USD');
        console.log(result);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();