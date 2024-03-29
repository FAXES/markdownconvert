const main = require('../index.js');

let conf = {
    open: '__',
    close: '__'
}
function convert(string, plain) {
    if(plain) return string.replaceAll('__', '');
    string = string.replace(conf.open, '<u>');
    string = string.replace(conf.close, '</u>');
    return string;
}
main.registerInline({open: conf.open,close: conf.close,exec: convert});