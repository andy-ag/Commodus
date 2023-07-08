const fs = require('fs')

let data = require('./results_rich.json');
let filteredData = data.filter(item => !item.error && item.endDate.includes('2023'))
fs.writeFileSync('./filteredResults_final.json', JSON.stringify(filteredData, null, 2))
