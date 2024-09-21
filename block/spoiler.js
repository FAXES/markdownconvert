const main = require('../index.js');

let conf = {
    open: '\n\n>! ',
    close: '\n\n',
}

function convert(string, plain) {
    if (plain) return string.replaceAll(conf.open, '');
    let start = string.indexOf(conf.open);
    let end = string.indexOf(conf.close, start + 5);
    let ogText = string.substring(start, end);
    let cleanedText = ogText.replace(/^>!\s*/, '');
    let [summary, ...contentLines] = cleanedText.split('\n').filter(line => line.trim() !== ''); // Filter out empty lines
    let content = contentLines.join('\n').trim();
    let contentEndIndex = content.indexOf('\n\n');
    if (contentEndIndex !== -1) {content = content.substring(0, contentEndIndex).trim();}
    let html = `<details class="convertdetails"><summary>${summary.replace(">! ", "")}</summary>${content}</details>`;
    string = string.replace(ogText, html.trim());
    return string;
}
main.registerBlock({open: conf.open,close: conf.close,exec: convert});