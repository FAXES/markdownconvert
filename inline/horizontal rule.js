const main = require('../index.js');

function convert(string) {
    let pre = '\n---\n';
    if(string.indexOf(pre) == -1) return -1;
    string = string.replace(pre, `\n<hr${main.getStyle('hr', true)} />\n`);
    return string;
};

main.registerInline({exec: convert});