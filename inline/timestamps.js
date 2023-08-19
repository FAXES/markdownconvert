const main = require('../index.js');

let conf = {
    open: '<t:',
    close: '>'
}
function convert(string) {
    // if(string.indexOf(conf.open) == -1) return false;
    let start = string.indexOf(conf.open);
    let end = string.indexOf(conf.close, start + 3);
    let wholething = string.slice(start, end + 1);
    let timestamp = string.slice(start + 3, end);
    if(timestamp.length == 10) timestamp = timestamp * 1000.0;
    let final = `<code><script>document.write(new Date(Number(${timestamp})).toLocaleString());</script></code>`;
    string = string.replace(wholething, final);
    return string;
}
main.registerInline({open: conf.open,close: conf.close,exec: convert});