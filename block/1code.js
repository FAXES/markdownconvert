const main = require('../index.js'), hljs = require('highlight.js'), crypto = require('crypto');

main.registerBlock(function(string) {
    let pre = '```';
    let suf = '```';
    if(string.indexOf(pre) == -1) return false;
    let start = string.indexOf(pre);
    let end = string.indexOf(suf, start + 4);
    let ogText = string.substring(start, end + 3);
    let lang = string.substring(start + 3, string.indexOf(`\n`, start + 4));
    let code = string.substring(string.indexOf(`\n`, start + 4), end);
    const highlightedCode = hljs.getLanguage(lang) ? hljs.highlight(code, {language: lang}).value : lang+code;
    let str = `<pre${main.getStyle('code') ? ` class="${main.getStyle('code')}"`: ''}><code>${highlightedCode}</code></pre>`
    let key = crypto.randomUUID();
    str = str.replace('\n', '');
    main.cache[key] = str;
    main.updateCache(main.cache);
    string = string.replace(ogText, key);
    return string;
});