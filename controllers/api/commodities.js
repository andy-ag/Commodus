const getTimeSeries = require('../../src/utilities/getTimeSeries.js')
const commodityList = require('../../src/utilities/filteredResults_final.json')
const { spawn } = require('child_process');
const path = require('path');
const pythonScriptPath = path.join(__dirname, '../../src/utilities/analysis.py');
const User = require('../../models/user.js')


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

async function favourite(req, res) {
    try {
        console.log(req.user)
        console.log(req.body)
        const user = await User.findOne({email: req.user.email})
        const commodity = req.body

        const index = user.commodities.findIndex(c => c === commodity.apiParams)
        if (index !== -1) {
            // The commodity already exists, remove it
            user.commodities.splice(index, 1);
            await user.save();
            res.json('removed');
        } else {
            // The commodity doesn't exist, add it
            user.commodities.unshift(commodity);
            await user.save();
            res.json('added');
        }
    } catch (error) {
        console.error(`Error manipulating favourites: ${error.message}`)
        res.status(500).json({error: 'An error occurred while manipulating favourites'});
    }
}

async function isFavourite(req, res) {
    try {
        const user = await User.findOne({email: req.user.email})
        const commodity = req.body

        const index = user.commodities.findIndex(c => c === commodity.apiParams)
        if (index !== -1) {
            res.json('true')
        } else {
            res.json('false')
        } 
    } catch (error) {
        console.error(`Error checking favourites: ${error.message}`)
        res.status(500).json({error: 'An error occurred while checking favourites'});
    }
}

module.exports = {
    index,
    analyse,
    favourite,
    isFavourite
}