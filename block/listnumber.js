const main = require('../index.js');

let conf = {
    open: '\n1. ',
    close: '\n\n',
}

function convert(string) {
    // let pre = '\n1. ';
    // let suf = '\n\n';
    // if(string.indexOf(conf.open) == -1) return false;
    let start = string.indexOf(conf.open);
    let end = string.indexOf(conf.close, start + 5);
    let list = string.substring(start, end).split('\n');
    let ogText = string.substring(start, end);
    let str = `\n<ol${main.getStyle('ol') ? ` class="${main.getStyle('ol')}"`: ''}>`;
    for(let i = 0; i < list.length; i++) {
        if(i == 0) continue;
        const e = list[i].replace('\n', '');
        str += `<li${main.getStyle('list') ? ` class="${main.getStyle('list')}"`: ''}>${e.replace(/[0-9]/, '').replace('.', '')}</li>`
    }
    str += '</ol>\n';
    string = string.replace(ogText, str);
    return string;
};

main.registerBlock({open: conf.open,close: conf.close,exec: convert});