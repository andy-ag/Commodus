import dataJSON from '../../src/time_series_analysis.json'
const getTimeSeries = require('../../src/utilities/getTimeSeries.js')
const commodityList = require('../../src/utilities/filteredResults_final.json')
const { spawn } = require('child_process');
const pythonScriptPath = '../../src/utilities/analysis.py'

async function index(req, res){
    const commodities = [];
    for (let commodity of commodityList) {
        const entry = await getTimeSeries(commodity.name, commodity.apiParams);
        commodities.push(entry);
    }
    return res.json(commodities)
}

async function analyse(req, res){
    const python = spawn('python', [pythonScriptPath]);
    python.stdin.write(JSON.stringify(dataJSON));
    python.stdin.end(); 
    let outputData = '';
    python.stdout.on('data', (data) => {
        outputData += data.toString();
    });
    python.on('close', (code) => {
        outputData = JSON.parse(outputData);
        res.json(outputData);
    });
}


module.exports = {
    index,
    analyse,
}