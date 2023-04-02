const main = require('../index.js');

main.registerInline(function(string) {
    let pre = '\n---\n';
    if(string.indexOf(pre) == -1) return false;
    string = string.replace(pre, `\n<hr${main.getStyle('hr') ? ` class="${main.getStyle('hr')}"`: ''} />\n`);
    return string;
});
