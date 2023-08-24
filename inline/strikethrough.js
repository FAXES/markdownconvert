const main = require('../index.js');

let conf = {
    open: '~~',
    close: '~~'
}
function convert(string) {
    string = string.replace(conf.open, '<s>');
    string = string.replace(conf.close, '</s>');
    return string;
}
main.registerInline({open: conf.open,close: conf.close,exec: convert});