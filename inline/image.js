const main = require('../index.js');

main.registerInline(function(string) {
    let elements = string.match(/!\[(.*?)]\((https?:\/\/\S+\.\w+)\)/gm);
    if(elements == null) return false;
    for(el of elements) {
        string = string.replace(/!\[(.*?)]\((https?:\/\/\S+\.\w+)\)/gm, `<img alt="$1" src="$2"${main.getStyle('image') ? ` class="${main.getStyle('image')}"`: ''} />`);
    }
    return string;
});