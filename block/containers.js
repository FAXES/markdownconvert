const main = require('../index.js');

main.registerBlock(function(string) {
    if(string.indexOf('::: danger') !== -1) {
        let pre = '::: danger', suf = ':::', css = 'contDanger';
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + pre.length);
        let ogText = string.substring(start, end + suf.length);
        let content = `<div${main.getStyle(css) ? ` class="${main.getStyle(css)}"`: ''}>${ogText.replace(pre, '').replace(suf, '')}</div>`;
        string = string.replace(ogText, content)
        return {string: string, start: start, end: end};
    }
    if(string.indexOf('::: success') !== -1) {
        let pre = '::: success', suf = ':::', css = 'contSuccess';
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + pre.length);
        let ogText = string.substring(start, end + suf.length);
        let content = `<div${main.getStyle(css) ? ` class="${main.getStyle(css)}"`: ''}>${ogText.replace(pre, '').replace(suf, '')}</div>`;
        string = string.replace(ogText, content)
        return {string: string, start: start, end: end};
    }
    if(string.indexOf('::: info') !== -1) {
        let pre = '::: info', suf = ':::', css = 'contInfo';
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + pre.length);
        let ogText = string.substring(start, end + suf.length);
        let content = `<div${main.getStyle(css) ? ` class="${main.getStyle(css)}"`: ''}>${ogText.replace(pre, '').replace(suf, '')}</div>`;
        string = string.replace(ogText, content)
        return {string: string, start: start, end: end};
    }
    if(string.indexOf('::: warning') !== -1) {
        let pre = '::: warning', suf = ':::', css = 'contWarning';
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + pre.length);
        let ogText = string.substring(start, end + suf.length);
        let content = `<div${main.getStyle(css) ? ` class="${main.getStyle(css)}"`: ''}>${ogText.replace(pre, '').replace(suf, '')}</div>`;
        string = string.replace(ogText, content)
        return {string: string, start: start, end: end};
    }
    return false;
});