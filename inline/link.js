const main = require('../index.js');

String.prototype.mdconvertAutoLink = function () {
    var d, b, g, a, e, f, h;
    e = 1 <= arguments.length ? k.call(arguments, 0) : [];
    f = /(^|[\s\n]|<[A-Za-z]*\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
    if (!(0 < e.length)) return this.replace(f, `$1<a href="$2"${main.getStyle('link', true)}>$2</a>`);
    a = e[0];
    d = a.callback;
    g = (function () {
        var c;
        c = [];
        for (b in a) (h = a[b]), "callback" !== b && c.push(" " + b + "='" + h + "'");
        return c;
    })().join("");
    return this.replace(f, function (c, b, a) {
        c = ("function" === typeof d ? d(a) : void 0) || `<a href="${a}"${main.getStyle('link', true)} ${g}>${a}</a>`;
        return "" + b + c;
    });
};

function convert(string) {
    string = string.mdconvertAutoLink();
    let elements = string.match(/\[.*?\)/g);
    if(elements == null) return -1;
    for(const el of elements) {
        let txt = el.match(/\[(.*?)\]/)?.[1] || null;
        let url = el.match(/\((.*?)\)/)?.[1] || null;
        if(!txt || !url) continue;
        string = string.replace(el, `<a href="${url}"${main.getStyle('link', true)} target="_blank">${txt}</a>`);
    }
    return string;
};

main.registerInline({exec: convert});