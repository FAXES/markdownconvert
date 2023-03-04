const main = require('../index.js');

main.registerInline(function(string) {
    let pre = '`';
    if(string.indexOf(pre) == -1) return false
    let start = string.indexOf('`');
    let end = string.indexOf('`', start + 2);
    let ogText = string.substring(start, end + 1);
    let content = ogText.replaceAll('`', '');
    string = string.replace(ogText, `<code>${content}</code>`);
    return string;
});