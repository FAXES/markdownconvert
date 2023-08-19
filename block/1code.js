const main = require('../index.js'), hljs = require('highlight.js'), crypto = require('crypto');

let conf = {
    open: '```',
    close: '```',
}

function convert(string) {
    let start = string.indexOf(conf.open);
    let end = string.indexOf(conf.close, start + 4);
    let ogText = string.substring(start, end + 3);
    let lang = string.substring(start + 3, string.indexOf(`\n`, start + 4));
    let code = string.substring(string.indexOf(`\n`, start + 4), end);
    const highlightedCode = hljs.getLanguage(lang) ? hljs.highlight(code, {language: lang}).value : lang+code;
    let str = `<pre${main.getStyle('code', true)}><code>${highlightedCode}</code></pre>`
    let key = crypto.randomUUID();
    str = str.replace('\n', '');
    main.cache[key] = str;
    main.updateCache(main.cache);
    string = string.replace(ogText, key);
    return string;
}

main.registerBlock({open: conf.open,close: conf.close,exec: convert});