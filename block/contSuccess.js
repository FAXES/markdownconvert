const main = require('../index.js');

let conf = {
    open: ':::success',
    close: ':::',
}

function convert(string) {
    let start = string.indexOf(conf.open);
    let end = string.indexOf(conf.close, start + conf.open.length);
    let ogText = string.substring(start, end + conf.close.length);
    let str = `${ogText.replace(`${conf.open}\n`, '').replace(`\n${conf.close}`, '')}`
    let content = `<div${main.getStyle('contSuccess', true)}>${str}</div>`;
    string = string.replace(ogText, content)
    return string;
}

main.registerBlock({open: conf.open,close: conf.close,exec: convert});