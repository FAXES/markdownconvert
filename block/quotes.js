const main = require('../index.js');

let conf = {
    open: '\n\n>',
    close: '\n\n',
}

function convert(string) {
    let start = string.indexOf(conf.open);
    let end = string.indexOf(conf.close, start + 5);
    let ogText = string.substring(start, end);
    let content = `<blockquote${main.getStyle('quote', true)}>${ogText.replaceAll('>', '')}</blockquote>`;
    string = string.replace(ogText, content)
    return string;
};
main.registerBlock({open: conf.open,close: conf.close,exec: convert});