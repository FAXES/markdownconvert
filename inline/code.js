const main = require('../index.js');

let conf = {
    open: '`',
    close: '`'
}
function convert(string, plain) {
    if(plain) return string.replaceAll('`', '');
    string = string.replace(conf.open, '<code>');
    string = string.replace(conf.close, '</code>');
    return string;
}
main.registerInline({open: conf.open,close: conf.close,exec: convert});