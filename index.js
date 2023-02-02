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
    let tokens = [];
    for (let i = 0; i < markdownBlock.length; i++) {
        const func = markdownBlock[i];
        while (func(string) !== false) {
            let r = func(string);
            tokens.push([r.start, r.end]);
            string = r.string;

        }
    }
    for(let i = 0; i < markdownInline.length; i++) {
        const func = markdownInline[i];
        while (func(string) !== false) {
            let r = func(string);
            // console.log(markdownInline[i].toString())
            string = r
        }
    }

    string = string.replace(/(?:\r\n|\r|\n)/g, '<br>');
    let lines = string.split('<br>');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let x = string.indexOf(line);
        const find = tokens.find(e => x >= e[0] && x <= e[1]);
        if(line.length > 0 && !find) lines[i] = `<p${getStyle('p') ? ` class="${getStyle('p')}"`: ''}>${line}</p>`;

        /*
            Changes to be made here;
                - Not put paragraphes in front of HR, TABLE, IMG, OL, HEADING.
                - Paras also going inside code blocks.
                - Tokens positions are changing as the file gets larger with more content so it seems to be going out of whack.
                  Need to find a way to check for certain tags either side of a point and see if any of the matches are present.
                  Eg; Pos 1 has <code>, pos 10 has </code>, it wants ti insert P at pos 6 but wont be allowed as it's within the matched area.
                  Same logic as with present token system. However, it needs to run after all changes are made for the file and as the paras are inserted.
            After these changes CSS needs to be fixed and all ashould work after that for proper testing.
            HTMl saved to dev folder. 
        */

    }
    string = lines.join('<br>');
    
    

    console.log(string);
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
    updateStyle,
    render
}

for (let i = 0; i < fs.readdirSync(`${__dirname}/block`).length; i++) {const e = fs.readdirSync(`${__dirname}/block`)[i];require(`./block/${e}`);}
for (let i = 0; i < fs.readdirSync(`${__dirname}/inline`).length; i++) {const e = fs.readdirSync(`${__dirname}/inline`)[i];require(`./inline/${e}`);}