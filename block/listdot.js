const main = require('../index.js');

let conf = {
    open: '\n- ',
    close: '\n\n',
}

function convert(string, plain) {
    if(plain) return string.replaceAll(conf.open, '');
    let start = string.indexOf(conf.open);
    let end = string.indexOf(conf.close, start + 4);
    let list = string.substring(start, end).split('\n-');
    let ogText = string.substring(start, end);
    let str = `\n<ul${main.getStyle('ul') ? ` class="${main.getStyle('ul')}"`: ''}>`;
    for(let i = 0; i < list.length; i++) {
        if(i == 0) continue;
        const e = list[i];
        str += `<li${main.getStyle('list') ? ` class="${main.getStyle('list')}"`: ''}>${i == 0 ? e.replace('\n-', '').replace('-', '') : e}</li>`
    }
    str += '</ul>';
    string = string.replace(ogText, str);
    return string;
}
main.registerBlock({open: conf.open,close: conf.close,exec: convert});
