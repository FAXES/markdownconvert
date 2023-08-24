const main = require('../index.js');

let conf = {
    open: '**',
    close: '**'
}
function convert(string) {
    string = string.replace(conf.open, '<strong>');
    string = string.replace(conf.close, '</strong>');
    return string;
}
main.registerInline({open: conf.open,close: conf.close,exec: convert});