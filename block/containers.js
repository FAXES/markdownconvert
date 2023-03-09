const main = require('../index.js');

main.registerBlock(function(string) {
    string = string.replaceAll(':::danger', '::: danger').replaceAll(':::success', '::: success').replaceAll(':::info', '::: info').replaceAll(':::warning', '::: warning');
    if(string.indexOf('::: danger') !== -1) {
        let pre = '::: danger', suf = ':::', css = 'contDanger';
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + pre.length);
        let ogText = string.substring(start, end + suf.length);
        let str = `${ogText.replace(`${pre}\n`, '').replace(`\n${suf}`, '')}`
        let content = `<div${main.getStyle(css) ? ` class="${main.getStyle(css)}"`: ''}>${str}</div>`;
        string = string.replace(ogText, content)
        return string;
    }
    if(string.indexOf('::: success') !== -1) {
        let pre = '::: success', suf = ':::', css = 'contSuccess';
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + pre.length);
        let ogText = string.substring(start, end + suf.length);
        let str = `${ogText.replace(`${pre}\n`, '').replace(`\n${suf}`, '')}`
        let content = `<div${main.getStyle(css) ? ` class="${main.getStyle(css)}"`: ''}>${str}</div>`;
        string = string.replace(ogText, content)
        return string;
    }
    if(string.indexOf('::: info') !== -1) {
        let pre = '::: info', suf = ':::', css = 'contInfo';
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + pre.length);
        let ogText = string.substring(start, end + suf.length);
        let str = `${ogText.replace(`${pre}\n`, '').replace(`\n${suf}`, '')}`
        let content = `<div${main.getStyle(css) ? ` class="${main.getStyle(css)}"`: ''}>${str}</div>`;
        string = string.replace(ogText, content)
        return string;
    }
    if(string.indexOf('::: warning') !== -1) {
        let pre = '::: warning', suf = ':::', css = 'contWarning';
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + pre.length);
        let ogText = string.substring(start, end + suf.length);
        let str = `${ogText.replace(`${pre}\n`, '').replace(`\n${suf}`, '')}`
        let content = `<div${main.getStyle(css) ? ` class="${main.getStyle(css)}"`: ''}>${str}</div>`;
        string = string.replace(ogText, content)
        return string;
    }
    return false;
});