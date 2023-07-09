const getTimeSeries = require('../../src/utilities/getTimeSeries.js')
const commodityList = require('../../src/utilities/filteredResults_final.json')

async function index(req, res){
    const commodities = [];
    for (let commodity of commodityList) {
        const entry = await getTimeSeries(commodity.name, commodity.apiParams);
        commodities.push(entry);
    }
    return res.json(commodities)
}

module.exports = {
    index
}