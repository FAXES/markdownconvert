const main = require('../index.js');

main.registerBlock(function(string) {
    let pre = '\n\n>', suf = '\n\n';
    if(string.indexOf(pre) == -1) return false;
    let start = string.indexOf(pre);
    let end = string.indexOf(suf, start + 5);
    let ogText = string.substring(start, end);
    let content = `<blockquote${main.getStyle('quote') ? ` class="${main.getStyle('quote')}"`: ''}>${ogText.replaceAll('>', '')}</blockquote>`;
    string = string.replace(ogText, content)
    return string;
});