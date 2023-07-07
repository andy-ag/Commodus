const fs = require('fs')

let data = require('../../results.json');
let filteredData = data.filter(item => !item.error);
fs.writeFileSync('./filteredResults.json', JSON.stringify(filteredData, null, 2));
