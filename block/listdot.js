const main = require('../index.js');

main.registerBlock(function(string) {
    let pre = '\n- ';
    let suf = '\n\n';
    if(string.indexOf(pre) == -1) return false;
    let start = string.indexOf(pre);
    let end = string.indexOf(suf, start + 4);
    let list = string.substring(start, end).split('\n-');
    let ogText = string.substring(start, end);
    let str = `\n<ul${main.getStyle('ul') ? ` class="${main.getStyle('ul')}"`: ''}>`;
    for(let i = 0; i < list.length; i++) {
        if(i == 0) continue;
        const e = list[i];
        str += `<li${main.getStyle('list') ? ` class="${main.getStyle('list')}"`: ''}>${i == 0 ? e.replace('\n-', '').replace('-', '') : e}</li>`
    }
    str += '</ul>\n';
    string = string.replace(ogText, str);
    
    return string;
});