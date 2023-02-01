const main = require('../index.js');

main.registerInline(function(string) {
    let pre = '*', suf = '*';
    if(string.indexOf(pre) == -1) return false;
    string = string.replace(pre, '<em>');
    string = string.replace(suf, '</em>');
    return string;
});