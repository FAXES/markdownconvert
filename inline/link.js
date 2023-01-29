const main = require('../index.js');

main.registerInline(function(string) {
    string = string.autoLink();
    //check for links [text](url)
    let elements = string.match(/\[.*?\)/g);
    if(elements == null) return false;

    for(el of elements) {
        let txt = el.match(/\[(.*?)\]/)[1];//get only the txt
        let url = el.match(/\((.*?)\)/)[1];//get only the link
        string = string.replace(el, `<a href="${url}" ${main.getStyle('link') ? `class="${main.getStyle('link')}"` : null} target="_blank">${txt}</a>`);
    }


    



    // 
    // if(string.indexOf(pre) == -1) return false;
    // // let first = string.indexOf('**');
    // // let next = string.indexOf('**', first + 2);
    // // console.log(first, next);
    // string = string.replace(pre, '<strong>');
    // string = string.replace(suf, '</strong>');
    return string;
});

String.prototype.autoLink = function () {
    var d, b, g, a, e, f, h;
    e = 1 <= arguments.length ? k.call(arguments, 0) : [];
    f = /(^|[\s\n]|<[A-Za-z]*\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
    if (!(0 < e.length)) return this.replace(f, `$1<a href="$2">$2</a>`);
    a = e[0];
    d = a.callback;
    g = (function () {
        var c;
        c = [];
        for (b in a) (h = a[b]), "callback" !== b && c.push(" " + b + "='" + h + "'");
        return c;
    })().join("");
    return this.replace(f, function (c, b, a) {
        c = ("function" === typeof d ? d(a) : void 0) || `<a href="${a}" ${g}>${a}</a>`;
        return "" + b + c;
    });
};


// var derText = "This is some text with [a link](https://duckduckgo.com) \n\ and break line";
// //replace the linebreaks with <br>
// derText = derText.replace(/(?:\r\n|\r|\n)/g, '<br>');
// //check for links [text](url)
// let elements = derText.match(/\[.*?\)/g);
// if( elements != null && elements.length > 0){
//   for(el of elements){
//     let txt = el.match(/\[(.*?)\]/)[1];//get only the txt
//     let url = el.match(/\((.*?)\)/)[1];//get only the link
//     derText = derText.replace(el,'<a href="'+url+'" target="_blank">'+txt+'</a>')
//   }
// }