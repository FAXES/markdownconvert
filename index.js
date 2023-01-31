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
    contInfo: "convertInfo",
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
    for(let i = 0; i < markdownBlock.length; i++) {
        const func = markdownBlock[i](string);
//         const func = markdownBlock[i];
//         while (func(string) !== false) {
//             string = func(string);
//         }
        while (func !== false) {
            string = func(string);
        }
    }
    for(let i = 0; i < markdownInline.length; i++) {
        const func = markdownInline[i];
        while (func(string) !== false) {
            string = func(string);
        }
    }
    string = string.replace(/(?:\r\n|\r|\n)/g, '<br>');
    return string;
}

function render(string) {
    return convert(string);
}

module.exports = {
    convert,
    registerBlock,
    registerInline,
    getStyle,
    updateStyle
}

for (let i = 0; i < fs.readdirSync(`${__dirname}/block`).length; i++) {
const e = fs.readdirSync(`${__dirname}/block`)[i];
    require(`./block/${e}`);
}
for (let i = 0; i < fs.readdirSync(`${__dirname}/inline`).length; i++) {const e = fs.readdirSync(`${__dirname}/inline`)[i];require(`./inline/${e}`);}
