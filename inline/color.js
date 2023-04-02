const main = require('../index.js');

main.registerInline(function(string) {
    // false stops checking
    const regex = /\[(.*?)\]\{(.*?)\}/g;
    if (!string.match(regex)) return false;
    const outputString = string.replace(regex, '<span style="color: $2">$1</span>');
    return outputString;    
});