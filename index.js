let markdownBlock = [];
let markdownInline = [];
const fs = require('fs');
function registerBlock(fun) {
    markdownBlock.push(fun);
}
function registerInline(fun) {
    markdownInline.push(fun);
}

let cssStyles = {
    h1: null,
    h2: null,
    h3: null,
    h4: null,
    h5: null,
    h6: null,
    p: "convertPara",
    hr: "convertHr",
    link: "convertLink",
    list: "convertli",
    ul: "convertul",
    ol: "convertol",
    table: "convertTable",
    image: "convertImage",
    code: "hljs",
    quote: "convertQuote",
    contInfo: "convertinfo",
    contWarning: "convertwarning",
    contDanger: "convertdanger",
    contSuccess: "convertsuccess",
    httprequest: "mdhttpRequest",
};

function getStyle(index) {
    return cssStyles[index] || null;
}

function updateStyle(index, property) {
    cssStyles[index] = property;
    return cssStyles[index];
}

function convert(string) {
    string = `\n${string.replaceAll("\r", "")}\n\n`;
    for (let i = 0; i < markdownBlock.length; i++) {
        const func = markdownBlock[i];
        while (func(string) !== false) {
            let r = func(string);
            string = r;
        }
    }
    for(let i = 0; i < markdownInline.length; i++) {
        const func = markdownInline[i];
        while (func(string) !== false) {
            let r = func(string);
            string = r
        }
    }

    string = string.replace(/(?:\n\n|\n)/g, '<br>');
    for (let key of Object.keys(module.exports.cache)) {
        if (string.includes(key)) {
            string = string.replace(key, module.exports.cache[key]);
            delete module.exports.cache[key];
        };
    };
    let lines = string.split('<br>');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if(line.includes('<hr')) continue;
        if(line.includes('<br')) continue;
        if(line.includes('<table')) continue;
        if(line.includes('<img')) continue;
        if(line.includes('<ol')) continue;
        if(line.length > 0) lines[i] = `<p${getStyle('p') ? ` class="${getStyle('p')}"`: ''}>${line}</p>`;
    }
    string = lines.join('<br>');
    string = string.replaceAll('<br><p', '<p').replaceAll('</p><br>', '</p>');
    return string;
   
}

function render(string) {
    return convert(string);
}
function updateCache(cache) {
    module.exports.cache = cache;
}

module.exports = {
    convert,
    registerBlock,
    registerInline,
    getStyle,
    updateStyle,
    render,
    cache: {},
    updateCache
}

for (let i = 0; i < fs.readdirSync(`${__dirname}/block`).length; i++) {const e = fs.readdirSync(`${__dirname}/block`)[i];require(`./block/${e}`);}
for (let i = 0; i < fs.readdirSync(`${__dirname}/inline`).length; i++) {const e = fs.readdirSync(`${__dirname}/inline`)[i];require(`./inline/${e}`);}