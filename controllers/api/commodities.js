const getTimeSeries = require('../../src/utilities/getTimeSeries.js')
const commodityList = require('../../src/utilities/filteredResults_final.json')
const { spawn } = require('child_process');
const path = require('path');
const pythonScriptPath = path.join(__dirname, '../../src/utilities/analysis.py');


async function index(req, res){
    const commodities = [];
    for (let commodity of commodityList) {
        const entry = await getTimeSeries(commodity.apiParams);
        commodities.push(entry);
    }
    return res.json(commodities)
}

async function analyse(req, res){
    const commodityCode = decodeURIComponent(req.params.params)
    const timeSeriesData = await getTimeSeries(commodityCode);
    const python = spawn('/opt/homebrew/bin/python3', [pythonScriptPath]);
    python.stdin.write(JSON.stringify(timeSeriesData));
    python.stdin.end(); 
    let outputData = '';
    let errorOccurred = false;

    python.stdout.on('data', (data) => {
        outputData += data.toString();
    });

    python.stderr.on('data', (data) => {
        console.error(`Python script error output: ${data}`);
    });

    python.on('error', (error) => {
        console.error(`Error occurred in Python child process: ${error.message}`);
        res.status(500).json({error: 'An error occurred in the Python child process'});
        errorOccurred = true;
    });

    python.stdout.on('error', (error) => {
        console.error(`An error occurred while reading from stdout: ${error.message}`);
    });
    
    python.stderr.on('error', (error) => {
        console.error(`An error occurred while reading from stderr: ${error.message}`);
    });

    python.on('close', (code) => {
        if (!errorOccurred) {
            try {
                outputData = JSON.parse(outputData);
                res.json(outputData);
            } catch (error) {
                console.error(`Error parsing Python child process output: ${error.message}`);
                res.status(500).json({error: 'An error occurred while parsing the Python child process output'});
            }
    }});
}


module.exports = {
    index,
    analyse,
}