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
    contPrimary: "convertprimary"
};

function getStyle(index, incCSS = false) {
    if(incCSS) return cssStyles[index] ? ` class="${cssStyles[index]}"` : '';
    return cssStyles[index] || null;
}

function updateStyle(index, property) {
    cssStyles[index] = property;
    return cssStyles[index];
}

function convert(string, sanitize = false) {
    if(sanitize) string = string.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    string = `\n${string.replaceAll("\r", "")}\n\n`;
    for (let i = 0; i < markdownBlock.length; i++) {
        const block = markdownBlock[i];

        if(block.open && block.close) {
            while(findNextMatch(string, block.open, block.close, 0) !== -1) {
                let r = block.exec(string);
                string = r;
            }
        }
    }
    for(let i = 0; i < markdownInline.length; i++) {
        const inline = markdownInline[i];
        if(inline.open && inline.close) {
            while(findNextMatch(string, inline.open, inline.close, 0) !== -1) {
                let r = inline.exec(string);
                string = r;
            }
        } else {
            while (inline.exec(string) !== -1) {
                let r = inline.exec(string);
                string = r
            }
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
        if(line.length < 1) continue;
        if(line.includes('<hr')) continue;
        if(line.includes('<br')) continue;
        if(line.includes('<table')) continue;
        if(line.includes('<img')) continue;
        if(line.includes('<ol')) continue;
        if(line.includes('<ul')) continue;
        if(line) lines[i] = `<p${getStyle('p') ? ` class="${getStyle('p')}"`: ''}>${line}</p>`;
    }
    string = lines.join('<br>');
    string = string.replaceAll('<br><p', '<p').replaceAll('</p><br>', '</p>').replaceAll('[[|-]]', '`');
    return string;
   
}

function render(string, sanitize = false) {
    return convert(string, sanitize);
}
function updateCache(cache) {
    module.exports.cache = cache;
}

function findNextMatch(string, initial, ending, startPosition) {
    let initialPosition = string.indexOf(initial, startPosition);
    if(initialPosition === -1) return -1;
    if(initialPosition !== -1) {
        let endingPosition = string.indexOf(ending, initialPosition + initial.length);
        if(endingPosition === -1) return -1;
        return endingPosition
    }
    return -1;
}

module.exports = {
    convert,
    registerBlock,
    registerInline,
    getStyle,
    updateStyle,
    render,
    cache: {},
    updateCache,
    findNextMatch
}

for (let i = 0; i < fs.readdirSync(`${__dirname}/block`).length; i++) {const e = fs.readdirSync(`${__dirname}/block`)[i];require(`./block/${e}`);}
for (let i = 0; i < fs.readdirSync(`${__dirname}/inline`).length; i++) {const e = fs.readdirSync(`${__dirname}/inline`)[i];require(`./inline/${e}`);}