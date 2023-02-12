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

var getFromBetween = {
    results:[],
    string:"",
    getFromBetween:function (sub1,sub2) {
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var SP = this.string.indexOf(sub1)+sub1.length;
        var string1 = this.string.substr(0,SP);
        var string2 = this.string.substr(SP);
        var TP = string1.length + string2.indexOf(sub2);
        return this.string.substring(SP,TP);
    },
    removeFromBetween:function (sub1,sub2) {
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var removal = sub1+this.getFromBetween(sub1,sub2)+sub2;
        this.string = this.string.replace(removal,"");
    },
    getAllResults:function (sub1,sub2) {
        // first check to see if we do have both substrings
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

        // find one result
        var result = this.getFromBetween(sub1,sub2);
        // push it to the results array
        this.results.push([this.string.indexOf(sub1), this.string.indexOf(sub2)]);
        // remove the most recently found one from the string
        this.removeFromBetween(sub1,sub2);

        // if there's more substrings
        if(this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
            this.getAllResults(sub1,sub2);
        }
        else return;
    },
    get:function (string,sub1,sub2) {
        this.results = [];
        this.string = string;
        this.getAllResults(sub1,sub2);
        return this.results;
    }
};


function convert(string) {
    string = `\n${string}\n`;
    // let tokens = [];

    for (let i = 0; i < markdownBlock.length; i++) {
        const func = markdownBlock[i];
        while (func(string) !== false) {
            let r = func(string);
            // tokens.push([r.start, r.end]);
            string = r;
        }
    }
    for(let i = 0; i < markdownInline.length; i++) {
        const func = markdownInline[i];
        // var result = getFromBetween.get(str,"<code>","</code>");

        while (func(string) !== false) {
            let r = func(string);
            string = r
        }
    }
    

    string = string.replace(/(?:\r\n|\r\n\r\n|\n\n)/g, '<br>');

    for (let key of Object.keys(module.exports.cache)) {
        if (string.includes(key)) {
            string = string.replace(key, module.exports.cache[key]);
            delete module.exports.cache[key];
        };
    };

    let lines = string.split('<br>');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // let x = string.indexOf(line);
        // const find = tokens.find(e => x >= e[0] && x <= e[1]);
        if(line.includes('<hr')) continue;
        if(line.includes('<br')) continue;
        if(line.includes('<table')) continue;
        if(line.includes('<img')) continue;
        if(line.includes('<ol')) continue;
        if(line.length > 0) lines[i] = `<p${getStyle('p') ? ` class="${getStyle('p')}"`: ''}>${line}</p>`;

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
    


    // console.log(string);
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