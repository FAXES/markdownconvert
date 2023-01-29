const main = require('../index.js');

main.registerInline(function(string) {
    let pre = '**', suf = '**';
    if(string.indexOf(pre) == -1) return false;
    // let first = string.indexOf('**');
    // let next = string.indexOf('**', first + 2);
    // console.log(first, next);
    string = string.replace(pre, '<strong>');
    string = string.replace(suf, '</strong>');
    return string;
});