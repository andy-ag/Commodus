const getTimeSeries = require('../../src/utilities/getTimeSeries.js')
const commodityList = require('../../src/utilities/filteredResults_final.json')

async function index(req, res){
    const commodities = await Promise.all(commodityList.map(async commodity => {
        return getTimeSeries(commodity.name, commodity.apiParams);
    }));
    return res.json(commodities)
}

module.exports = {
    index
}