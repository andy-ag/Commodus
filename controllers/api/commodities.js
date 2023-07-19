const getTimeSeries = require('../../src/utilities/getTimeSeries.js')
const commodityList = require('../../src/utilities/filteredResults_final.json')
const { spawn } = require('child_process');
const path = require('path');
const pythonScriptPath = path.join(__dirname, '../../src/utilities/analysis.py');
const compareScriptPath = path.join(__dirname, '../../src/utilities/compare.py');
const User = require('../../models/user.js')
const Commodity = require('../../models/commodity.js');



async function index(req, res){
    try {
        let commodities = await Commodity.find({})
        // If data is more than a day old, make API call
        if (!commodities || commodities.length === 0 || Date.now() - new Date(commodities[0].updatedAt).getTime() > 24 * 60 * 60 * 1000) {
            console.log('API path')
            commodities = []
            for (let commodity of commodityList) {
                const entry = await getTimeSeries(commodity.apiParams);
                commodities.push({
                    apiParams: entry.apiParams,
                    name: entry.name,
                    frequency: entry.frequency,
                    colNames: entry.colNames,
                    endDate: entry.endDate,
                    timeSeries: entry.timeSeries,
                    analysisResult: {},
                  });
            }
            await Commodity.deleteMany({});
            await Commodity.insertMany(commodities);
        }
        commodities = commodities.map(commodity => {
            return {
                ...commodity,
                timeSeries: commodity.timeSeries.map(series => {
                    return [
                        series[0], // keep date as string
                        ...series.slice(1).map(value => parseFloat(value)), // convert remaining values to numbers
                    ];
                }),
            };
        });
        return res.json(commodities)
        
    } catch (error) {
        console.error(`Error getting commodity data: ${error.message}`);
        res.status(500).json({error: 'An error occurred while getting commodity data'});
    }
}

async function analyse(req, res){
    const commodityCode = decodeURIComponent(req.params.params)
    let commodity = await Commodity.findOne({apiParams: commodityCode});
    if (!commodity || !commodity.analysisResult || Date.now() - new Date(commodity.updatedAt).getTime() > 24 * 60 * 60 * 1000) {
        console.log('API path')
        const timeSeriesData = await getTimeSeries(commodityCode);
        
        // Different Python spawn syntax for local & Heroku
        // const python = spawn('/opt/homebrew/bin/python3', [pythonScriptPath]);
        const python = spawn('python', [pythonScriptPath]);

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

        python.on('close', async (code) => {
            if (!errorOccurred) {
                try {
                    outputData = JSON.parse(outputData);
                    if (commodity) {
                        commodity.analysisResult = outputData;
                        await commodity.save();
                    } else {
                        // if commodity doesn't exist, create a new one
                        await Commodity.create({
                            apiParams: commodityCode,
                            name: timeSeriesData.name,
                            frequency: timeSeriesData.frequency,
                            colNames: timeSeriesData.colNames,
                            endDate: timeSeriesData.endDate,
                            timeSeries: timeSeriesData.timeSeries,
                        });
                    }
                    res.json(outputData);
                } catch (error) {
                    console.error(`Error parsing Python child process output: ${error.message}`);
                    res.status(500).json({error: 'An error occurred while parsing the Python child process output'});
                }
        }});
    } else {
        console.log('DB path')
        res.json(commodity.analysisResult);
    }
}

async function compare(req, res){
    const params = decodeURIComponent(req.params.params).split(',');
    const commodityCode1 = params[0];
    const commodityCode2 = params[1];
    const timeSeriesData1 = await getTimeSeries(commodityCode1);
    const timeSeriesData2 = await getTimeSeries(commodityCode2);

    // Different Python spawn syntax for local & Heroku
    // const python = spawn('/opt/homebrew/bin/python3', [compareScriptPath]);
    const python = spawn('python', [compareScriptPath]);

    python.stdin.write(JSON.stringify({ data1: timeSeriesData1, data2: timeSeriesData2 }));
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
        const user = await User.findOne({email: req.user.email})
        const commodity = req.body

        const index = user.commodities.findIndex(c => c.apiParams === commodity.apiParams)
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
        const commodity = req.params.params

        const index = user.commodities.findIndex(c => c.apiParams === commodity)
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

async function getFavourites(req, res) {
    try {
      const user = await User.findOne({email: req.user.email})
      res.json(user.commodities);
    } catch (error) {
      console.error(`Error fetching favourites: ${error.message}`)
      res.status(500).json({error: 'An error occurred while fetching favourites'});
    }
  }

module.exports = {
    index,
    analyse,
    favourite,
    isFavourite,
    getFavourites,
    compare
}