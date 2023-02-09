const main = require('../index.js');

main.registerBlock(function(string) {
    let pre = '\n- ';
    let suf = '\r\n\r\n';
    if(string.indexOf(pre) == -1) return false;
    let start = string.indexOf(pre);
    let end = string.indexOf(suf, start + 4);
    let list = string.substring(start, end).split('\r\n-');
    let ogText = string.substring(start, end);
    let str = `<ul${main.getStyle('ul') ? ` class="${main.getStyle('ul')}"`: ''}>`;
    for(let i = 0; i < list.length; i++) {
        const e = list[i];
        str += `<li${main.getStyle('list') ? ` class="${main.getStyle('list')}"`: ''}>${i == 0 ? e.replace('\n-', '').replace('-', '') : e}</li>`
    }
    str += '</ul>';
    string = string.replace(ogText, str);
    return string;
});