const main = require('../index.js');

let conf = {
    open: ':::danger',
    close: ':::',
}

function convert(string, plain) {
    if(plain) return string.replaceAll(conf.open, '').replaceAll(conf.close, '');
    let start = string.indexOf(conf.open);
    let end = string.indexOf(conf.close, start + conf.open.length);
    let ogText = string.substring(start, end + conf.close.length);
    let str = `${ogText.replace(`${conf.open}`, '').replace(`${conf.close}`, '')}`
    let content = `<div${main.getStyle('contDanger', true)}>${str}</div>`;
    string = string.replace(ogText, content)
    return string;
}

main.registerBlock({open: conf.open,close: conf.close,exec: convert});