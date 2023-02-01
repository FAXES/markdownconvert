const main = require('../index.js'), hljs = require('highlight.js');

main.registerInline(function(string) {
    let pre = '```';
    let suf = '```';
    if(string.indexOf(pre) !== -1) {
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + 4);
        let ogText = string.substring(start, end + 3);
        let lang = string.substring(start + 3, string.indexOf(`\n`, start + 4));
        let code = string.substring(string.indexOf(`\n`, start + 4), end);

        const highlightedCode = hljs.highlightAuto(code).value;
        let str = `<pre${main.getStyle('code') ? ` class="${main.getStyle('code')}"`: ''}><code>`
        str += highlightedCode
        str += '</code></pre>';
        string = string.replace(ogText, str);
        return string;
    }
    if(string.indexOf('`') !== -1) {
        let start = string.indexOf('`');
        let end = string.indexOf('`', start + 2);
        let ogText = string.substring(start, end + 1);
        let content = ogText.replaceAll('`', '');
        string = string.replace(ogText, `<code>${content}</code>`);
        return string;
    }
    return false;
});