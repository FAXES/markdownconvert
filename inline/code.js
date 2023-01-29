const main = require('../index.js'), hljs = require('highlight.js');


main.registerInline(function(string) {
    let pre = '```';
    let suf = '```';

    if(string.indexOf(pre) !== -1) {
        // console.log(1)
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + 4);
        let ogText = string.substring(start, end + 3);

        // console.log(ogText)
        
        let lang = string.substring(start + 3, string.indexOf(`\n`, start + 4));
        let code = string.substring(string.indexOf(`\n`, start + 4), end);

        const highlightedCode = hljs.highlightAuto(code).value;
        let str = `<pre ${main.getStyle('code') ? `class="${main.getStyle('code')}"` : null}><code>`
        str += highlightedCode
        str += '</code></pre>';

        // console.log(ogText);
        string = string.replace(ogText, str);
        // // console.log(string);
        return string;
    }
    // let html = hljs.highlight(code[0], {language: lang})?.value;
    // try {
    //     html = 
    // } catch (err) {
    //     console.log(2222222222)
    //     html = hljs.highlight(code[0], {language: 'txt'})?.value;
    // }

    // console.log(highlightedCode);


    
    
    // let list = string.substring(start, end).split('\r\n-');
    // let ogText = string.substring(start, end);
    // let str = '<ul>';

    // for(let i = 0; i < list.length; i++) {
    //     const e = list[i];
    //     str += `<li>${i == 0 ? e.replace('\n-', '').replace('-', '') : e}</li>`
    // }
    // str += '</ul>';
    // string = string.replace(ogText, str);
    // return string;

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