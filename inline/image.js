const main = require('../index.js');

main.registerInline(function(string) {

    let elements = string.match(/!\[(.*?)]\((https?:\/\/\S+\.\w+)\)/gm);
    if(elements == null) return false;

    for(el of elements) {
        string = string.replace(/!\[(.*?)]\((https?:\/\/\S+\.\w+)\)/gm, `<img alt="$1" src="$2" ${main.getStyle('image') ? `class="${main.getStyle('image')}"` : null} />`);
    }
    // //check for links [text](url)
    // let elements = string.match(/\[.*?\)/g);
    // console.log(elements)
    // if(elements == null) return false;

    // for(el of elements) {
    //     let txt = el.match(/\[(.*?)\]/)[1];//get only the txt
    //     let url = el.match(/\((.*?)\)/)[1];//get only the link
    //     string = string.replace(el, `<a href="${url}" target="_blank">${txt}</a>`);
    // }


    



    // 
    // if(string.indexOf(pre) == -1) return false;
    // // let first = string.indexOf('**');
    // // let next = string.indexOf('**', first + 2);
    // // console.log(first, next);
    // string = string.replace(pre, '<strong>');
    // string = string.replace(suf, '</strong>');
    return string;
});