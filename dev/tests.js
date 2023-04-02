const mdconvert = require('../index.js');
const fs = require('fs');

singleLine = fs.readFileSync('./dev/text.md');

// string = singleLine.toString().split('this');

// console.log(string);

let htmlBS = mdconvert.convert(singleLine.toString());
console.log(htmlBS);
