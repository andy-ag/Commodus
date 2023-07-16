const varNames = require('./scrapedNames') 

async function getTimeSeries(params){
    const url = `https://data.nasdaq.com/api/v3/datasets/${params}/data.json?api_key=${process.env.NASDAQ_API}`
    const variable = Object.keys(varNames).find(key => varNames[key] === params)
    try {
        const res = await fetch(url)
        const data = await res.json()

        if (data && data.dataset_data) {
            const freq = data.dataset_data.frequency
            const colNames = data.dataset_data.column_names
            const endDate = data.dataset_data.end_date
            const ts = data.dataset_data.data
            return {
                name: variable,
                apiParams: params,
                frequency: freq,
                colNames: colNames,
                endDate: endDate,
                timeSeries: ts,

            };
        } else {
            console.error(`Invalid response data format for ${params}`);
            console.log(data);
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

module.exports = getTimeSeries