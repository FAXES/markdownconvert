const main = require('../index.js');

main.registerInline(function(string) {
    let pre = '__', suf = '__';
    if(string.indexOf(pre) == -1) return false;
    string = string.replace(pre, '<u>');
    string = string.replace(suf, '</u>');
    return string;
});