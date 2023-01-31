const main = require('../index.js');

main.registerBlock(function(string) {
    let pre = '\r\n\r\n>', suf = '\r\n\r\n';
    if(string.indexOf(pre) == -1) return false;
    let start = string.indexOf(pre);
    let end = string.indexOf(suf, start + 10);
    let ogText = string.substring(start, end);
    let content = `<blockquote${main.getStyle('quote') ? ` class="${main.getStyle('quote')}"`: ''}>${ogText.replaceAll('>', '')}</blockquote>`;
    string = string.replace(ogText, content)
    return string;
});