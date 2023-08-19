const main = require('../index.js');

function convert(string) {
    let elements = string.match(/!\[(.*?)]\((https?:\/\/\S+\.\w+)\)/gm);
    if(elements == null) return -1;
    for(el of elements) {
        string = string.replace(/!\[(.*?)]\((https?:\/\/\S+\.\w+)\)/gm, `<img alt="$1" src="$2"${main.getStyle('image') ? ` class="${main.getStyle('image')}"`: ''} />`);
    }
    return string;
};

main.registerInline({exec: convert});