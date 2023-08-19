const main = require('../index.js');

function convert(string) {
    const regex = /\[(.*?)\]\{(.*?)\}/g;
    if (!string.match(regex)) return -1;
    const outputString = string.replace(regex, '<span style="color: $2">$1</span>');
    return outputString;  
}
main.registerInline({exec: convert});