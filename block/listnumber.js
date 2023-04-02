const main = require('../index.js');

main.registerBlock(function(string) {
    let pre = '\n1. ';
    let suf = '\n\n';
    if(string.indexOf(pre) == -1) return false;
    let start = string.indexOf(pre);
    let end = string.indexOf(suf, start + 5);
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
});