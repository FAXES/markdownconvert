const mdconvert = require('../index.js');
const fs = require('fs');

singleLine = fs.readFileSync('./text.md');

// string = singleLine.toString().split('this');

// console.log(string);

// let htmlBS = mdconvert.convert(singleLine.toString());
// console.log(htmlBS);

let rendered = mdconvert.convert(singleLine.toString(), {plainText: false});
fs.writeFileSync('./test.html', rendered, 'utf8');
console.log('Done!');