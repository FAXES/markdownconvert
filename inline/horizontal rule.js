const main = require('../index.js');

main.registerInline(function(string) {
    let pre = '---';
    if(string.indexOf(pre) == -1) return false;
    string = string.replace(pre, `<hr${main.getStyle('hr') ? ` class="${main.getStyle('hr')}"`: ''} />`);
    return string;
});