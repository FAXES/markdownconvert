const main = require('../index.js');

main.registerInline(function(string) {
    if(string.indexOf('<t:') == -1) return false;
    let start = string.indexOf('<t:');
    let end = string.indexOf('>', start + 3);
    let wholething = string.slice(start, end + 1);
    let timestamp = string.slice(start + 3, end);
    if(timestamp.length == 10) timestamp = timestamp * 1000.0;
    let final = `<code><script>document.write(new Date(Number(${timestamp})).toLocaleString());</script></code>`;
    string = string.replace(wholething, final);
    return string;
});