let markdownBlock = [];
let markdownInline = [];
let cache = {};
import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js';
function registerBlock(fun) {
    markdownBlock.push(fun);
}
function registerInline(fun) {
    markdownInline.push(fun);
}
function randomUUID() {
    var result = '', characters = '-ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz-0123456789-';
    var charactersLength = characters?.length;for(var i=0;i<length;i++) {result += characters.charAt(Math.floor(Math.random() * charactersLength));};return result;
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
    for (let key of Object.keys(cache)) {
        if (string.includes(key)) {
            string = string.replace(key, cache[key]);
            delete cache[key];
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

function render(string) {
    return convert(string);
}

export default {
    convert,
    registerBlock,
    registerInline,
    getStyle,
    updateStyle,
    render,
}

registerBlock(function(string) {
    let pre = '```';
    let suf = '```';
    if(string.indexOf(pre) == -1) return false;
    let start = string.indexOf(pre);
    let end = string.indexOf(suf, start + 4);
    let ogText = string.substring(start, end + 3);
    let lang = string.substring(start + 3, string.indexOf(`\n`, start + 4));
    let code = string.substring(string.indexOf(`\n`, start + 4), end);
    const highlightedCode = hljs.getLanguage(lang) ? hljs.highlight(code, {language: lang}).value : lang+code;
    let str = `<pre${getStyle('code') ? ` class="${getStyle('code')}"`: ''}><code>${highlightedCode}</code></pre>`
    let key = randomUUID();
    str = str.replace('\n', '');
    cache[key] = str;
    string = string.replace(ogText, key);
    return string;
});
registerBlock(function(string) {
    let pre = '\n|', suf = '\n\n';

    if(string.indexOf(pre) == -1) return false;
    
    let start = string.indexOf(pre);
    let end = string.indexOf(suf, start + 1);
    let ogText = string.substring(start, end + 1);

    var lines = ogText.split("\n");
    var isHeader = true;
    var table = new HTMLTable();
    lines.forEach(function(line) {
        
        if (isHeaderSeparation(line)) {
            isHeader = false;
            return;
        }
        var vals = splitLine(line);
        table.addRow(vals, isHeader);
    });

    string = string.replace(ogText, table.getHTML())
    return string;


    function isHeaderSeparation(line) {
        let match = line.match(/(\|\s*(:)?\s*-{2,}\s*(:)?\s*)+\|/g);
        if (!Array.isArray(match)) return false;
        return match.length > 0;
    }
    function splitLine(line) {
        return line.split('|').map(x => x.trim()).filter((x, i, a) => { return x.length > 0 || [0, a.length].indexOf(i) === -1})
    }
    function HTMLTable() {
        this.ths = [];
        this.tds = [];
        this.alignments = [];
        this.getHTML = function() {
            return `\n<table${getStyle('table') ? ` class="${getStyle('table')}"`: ''}>` +
                this.ths.map((x, index) => { return this.getRow(x, 'th'); }, this).join('') +
                this.tds.map((x, index) => { return this.getRow(x, 'td'); }, this).join('') +
                '</table>\n'
        };
    
        this.getRow = function(vals, tag) {
            return "<tr>" + vals.map((x, index) => {
                if(x.length > 0 && x !== "") return "<" + tag + ">" + x + "</" + tag + ">"
            }).join('') + "</tr>";
        };
    
        this.addRow = function(vals, isHeader) {
            if (isHeader) {
                this.ths.push(vals);
            }
            else {
                this.tds.push(vals);
            }
        };
    }
});
registerBlock(function(string) {
    string = string.replaceAll(':::danger', '::: danger').replaceAll(':::success', '::: success').replaceAll(':::info', '::: info').replaceAll(':::warning', '::: warning');
    if(string.indexOf('::: danger') !== -1) {
        let pre = '::: danger', suf = ':::', css = 'contDanger';
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + pre.length);
        let ogText = string.substring(start, end + suf.length);
        let str = `${ogText.replace(`${pre}\n`, '').replace(`\n${suf}`, '')}`
        let content = `<div${getStyle(css) ? ` class="${getStyle(css)}"`: ''}>${str}</div>`;
        string = string.replace(ogText, content)
        return string;
    }
    if(string.indexOf('::: success') !== -1) {
        let pre = '::: success', suf = ':::', css = 'contSuccess';
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + pre.length);
        let ogText = string.substring(start, end + suf.length);
        let str = `${ogText.replace(`${pre}\n`, '').replace(`\n${suf}`, '')}`
        let content = `<div${getStyle(css) ? ` class="${getStyle(css)}"`: ''}>${str}</div>`;
        string = string.replace(ogText, content)
        return string;
    }
    if(string.indexOf('::: info') !== -1) {
        let pre = '::: info', suf = ':::', css = 'contInfo';
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + pre.length);
        let ogText = string.substring(start, end + suf.length);
        let str = `${ogText.replace(`${pre}\n`, '').replace(`\n${suf}`, '')}`
        let content = `<div${getStyle(css) ? ` class="${getStyle(css)}"`: ''}>${str}</div>`;
        string = string.replace(ogText, content)
        return string;
    }
    if(string.indexOf('::: warning') !== -1) {
        let pre = '::: warning', suf = ':::', css = 'contWarning';
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + pre.length);
        let ogText = string.substring(start, end + suf.length);
        let str = `${ogText.replace(`${pre}\n`, '').replace(`\n${suf}`, '')}`
        let content = `<div${getStyle(css) ? ` class="${getStyle(css)}"`: ''}>${str}</div>`;
        string = string.replace(ogText, content)
        return string;
    }
    return false;
});
registerBlock(function(string) {
    if(string.indexOf('/POST') !== -1) {
        let pre = '/POST';
        let suf = '/POST';
        let resKey = randomUUID();
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + 5);
        let ogText = string.substring(start, end + 5);
        let endpoint = string.substring(start + 5, string.indexOf(`\n`, start + 4)).replaceAll("\n", "");
        let endEndpoint = string.indexOf(`\n`, start + 4);
        let hasParams = ogText.includes(`\n-`);
        let description = string.substring(endEndpoint, string.indexOf(hasParams ? `\n-` : '\n=', string.indexOf(`\n`, start + 4)));
        let endDescription = string.indexOf(`\n-`, string.indexOf(`\n`, start + 4));
        let params = hasParams ? string.substring(endDescription, string.indexOf(`\n=`, endDescription)).split('\n-') : [];
        let endParams = ogText.indexOf(`\n=`, endDescription);
        let formattedParams = '';
        for(let i = 0; i < params.length; i++) {
            const e = params[i].trim();
            let desc = e.substring(e.indexOf(" "));
            let name = e.substring(0, e.indexOf(" "));
            if(e.length > 3) formattedParams += `<tr><td><code>${name}</code></td><td>${desc}</td></tr>`;
        }
        let result = ogText.substring(endParams + 2, string.indexOf(`\n${suf}`, endParams)).replace(suf, '');
        let key = randomUUID();
        let code = `<pre${getStyle('code') ? ` class="${getStyle('code')}"`: ''} id="${resKey}"><code>${hljs.highlightAuto(result).value}</code></pre>`
        cache[key] = code;
        let content = `<div${getStyle('httprequest') ? ` class="${getStyle('httprequest')}"`: ''}><p><span class="mdhttpGreen">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p>${hasParams ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3>${key}</div>`;
        string = string.replace(ogText, content);
        return string;
    }

    if(string.indexOf('/PATCH') !== -1) {
        let pre = '/PATCH';
        let suf = '/PATCH';
        let resKey = randomUUID();
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + 6);
        let ogText = string.substring(start, end + 6);
        let endpoint = string.substring(start + 6, string.indexOf(`\n`, start + 4)).replaceAll("\n", "");
        let endEndpoint = string.indexOf(`\n`, start + 4);
        let hasParams = ogText.includes(`\n-`);
        let description = string.substring(endEndpoint, string.indexOf(hasParams ? `\n-` : '\n=', string.indexOf(`\n`, start + 4)));
        let endDescription = string.indexOf(`\n-`, string.indexOf(`\n`, start + 4));
        let params = hasParams ? string.substring(endDescription, string.indexOf(`=`, endDescription)).split('\n-') : [];
        let endParams = ogText.indexOf(`=`, endDescription);
        let formattedParams = '';
        for(let i = 0; i < params.length; i++) {
            const e = params[i].trim();
            let desc = e.substring(e.indexOf(" "));
            let name = e.substring(0, e.indexOf(" "));
            if(e.length > 3) formattedParams += `<tr><td><code>${name}</code></td><td>${desc}</td></tr>`;
        }
        let result = ogText.substring(endParams + 2, string.indexOf(`\n${suf}`, endParams)).replace(suf, '');
        let key = randomUUID();
        let code = `<pre${getStyle('code') ? ` class="${getStyle('code')}"`: ''} id="${resKey}"><code>${hljs.highlightAuto(result).value}</code></pre>`
        cache[key] = code;
        let content = `<div${getStyle('httprequest') ? ` class="${getStyle('httprequest')}"`: ''}><p><span class="mdhttpOrange">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p>${hasParams ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3>${key}</div>`;
        string = string.replace(ogText, content);
        return string;
    }

    if(string.indexOf('/PUT') !== -1) {
        let pre = '/PUT';
        let suf = '/PUT';
        let resKey = randomUUID();
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + 5);
        let ogText = string.substring(start, end + 5);
        let endpoint = string.substring(start + 5, string.indexOf(`\n`, start + 4)).replaceAll("\n", "");
        let endEndpoint = string.indexOf(`\n`, start + 4);
        let hasParams = ogText.includes(`\n-`);
        let description = string.substring(endEndpoint, string.indexOf(hasParams ? `\n-` : '\n=', string.indexOf(`\n`, start + 4)));
        let endDescription = string.indexOf(`\n-`, string.indexOf(`\n`, start + 4));
        let params = hasParams ? string.substring(endDescription, string.indexOf(`=`, endDescription)).split('\n-') : [];
        let endParams = ogText.indexOf(`=`, endDescription);
        let formattedParams = '';
        for(let i = 0; i < params.length; i++) {
            const e = params[i].trim();
            let desc = e.substring(e.indexOf(" "));
            let name = e.substring(0, e.indexOf(" "));
            if(e.length > 3) formattedParams += `<tr><td><code>${name}</code></td><td>${desc}</td></tr>`;
        }
        let result = ogText.substring(endParams + 2, string.indexOf(`\n${suf}`, endParams)).replace(suf, '');
        let key = randomUUID();
        let code = `<pre${getStyle('code') ? ` class="${getStyle('code')}"`: ''} id="${resKey}"><code>${hljs.highlightAuto(result).value}</code></pre>`
        cache[key] = code;
        let content = `<div${getStyle('httprequest') ? ` class="${getStyle('httprequest')}"`: ''}><p><span class="mdhttpOrange">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p>${hasParams ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3>${key}</div>`;
        string = string.replace(ogText, content);
        return string;
    }

    if(string.indexOf('/DELETE') !== -1) {
        let pre = '/DELETE';
        let suf = '/DELETE';
        let resKey = randomUUID();
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + 7);
        let ogText = string.substring(start, end + 7);
        let endpoint = string.substring(start + 7, string.indexOf(`\n`, start + 4)).replaceAll("\n", "");
        let endEndpoint = string.indexOf(`\n`, start + 4);
        let hasParams = ogText.includes(`\n-`);
        let description = string.substring(endEndpoint, string.indexOf(hasParams ? `\n-` : '\n=', string.indexOf(`\n`, start + 4)));
        let endDescription = string.indexOf(`\n-`, string.indexOf(`\n`, start + 4));
        let params = hasParams ? string.substring(endDescription, string.indexOf(`=`, endDescription)).split('\n-') : [];
        let endParams = ogText.indexOf(`=`, endDescription);
        let formattedParams = '';
        for(let i = 0; i < params.length; i++) {
            const e = params[i].trim();
            let desc = e.substring(e.indexOf(" "));
            let name = e.substring(0, e.indexOf(" "));
            if(e.length > 3) formattedParams += `<tr><td><code>${name}</code></td><td>${desc}</td></tr>`;
        }
        let result = ogText.substring(endParams + 2, string.indexOf(`\n${suf}`, endParams)).replace(suf, '');
        let key = randomUUID();
        let code = `<pre${getStyle('code') ? ` class="${getStyle('code')}"`: ''} id="${resKey}"><code>${hljs.highlightAuto(result).value}</code></pre>`
        cache[key] = code;
        let content = `<div${getStyle('httprequest') ? ` class="${getStyle('httprequest')}"`: ''}><p><span class="mdhttpRed">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p>${hasParams ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3>${key}</div>`;
        string = string.replace(ogText, content);
        return string;
    }

    if(string.indexOf('/GET') !== -1) {
        let pre = '/GET';
        let suf = '/GET';
        let resKey = randomUUID();
        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + 5);
        let ogText = string.substring(start, end + 5);
        let endpoint = string.substring(start + 5, string.indexOf(`\n`, start + 4)).replaceAll("\n", "");
        let endEndpoint = string.indexOf(`\n`, start + 4);
        let hasParams = ogText.includes(`\n-`);
        let description = string.substring(endEndpoint, string.indexOf(hasParams ? `\n-` : '\n=', string.indexOf(`\n`, start + 4)));
        let endDescription = string.indexOf(`\n-`, string.indexOf(`\n`, start + 4));
        let params = hasParams ? string.substring(endDescription, string.indexOf(`=`, endDescription)).split('\n-') : [];
        let endParams = ogText.indexOf(`=`, endDescription);
        let formattedParams = '';
        for(let i = 0; i < params.length; i++) {
            const e = params[i].trim();
            let desc = e.substring(e.indexOf(" "));
            let name = e.substring(0, e.indexOf(" "));
            if(e.length > 3) formattedParams += `<tr><td><code>${name}</code></td><td>${desc}</td></tr>`;
        }
        let result = ogText.substring(endParams + 2, string.indexOf(`\n${suf}`, endParams)).replace(suf, '');
        let key = randomUUID();
        let code = `<pre${getStyle('code') ? ` class="${getStyle('code')}"`: ''} id="${resKey}"><code>${hljs.highlightAuto(result).value}</code></pre>`
        cache[key] = code;
        let content = `<div${getStyle('httprequest') ? ` class="${getStyle('httprequest')}"`: ''}><p><span class="mdhttpBlue">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p>${hasParams ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3>${key}</div>`;
        string = string.replace(ogText, content);
        return string;
    }
    return false;
});
registerBlock(function(string) {
    let pre = '\n- ';
    let suf = '\n\n';
    if(string.indexOf(pre) == -1) return false;
    let start = string.indexOf(pre);
    let end = string.indexOf(suf, start + 4);
    let list = string.substring(start, end).split('\n-');
    let ogText = string.substring(start, end);
    let str = `\n<ul${getStyle('ul') ? ` class="${getStyle('ul')}"`: ''}>`;
    for(let i = 0; i < list.length; i++) {
        if(i == 0) continue;
        const e = list[i];
        str += `<li${getStyle('list') ? ` class="${getStyle('list')}"`: ''}>${i == 0 ? e.replace('\n-', '').replace('-', '') : e}</li>`
    }
    str += '</ul>\n';
    string = string.replace(ogText, str);
    
    return string;
});
registerBlock(function(string) {
    let pre = '\n1. ';
    let suf = '\n\n';
    if(string.indexOf(pre) == -1) return false;
    let start = string.indexOf(pre);
    let end = string.indexOf(suf, start + 5);
    let list = string.substring(start, end).split('\n');
    let ogText = string.substring(start, end);
    let str = `\n<ol${getStyle('ol') ? ` class="${getStyle('ol')}"`: ''}>`;
    for(let i = 0; i < list.length; i++) {
        if(i == 0) continue;
        const e = list[i].replace('\n', '');
        str += `<li${getStyle('list') ? ` class="${getStyle('list')}"`: ''}>${e.replace(/[0-9]/, '').replace('.', '')}</li>`
    }
    str += '</ol>\n';
    string = string.replace(ogText, str);
    return string;
});
registerBlock(function(string) {
    let pre = '\n\n>', suf = '\n\n';
    if(string.indexOf(pre) == -1) return false;
    let start = string.indexOf(pre);
    let end = string.indexOf(suf, start + 5);
    let ogText = string.substring(start, end);
    let content = `<blockquote${getStyle('quote') ? ` class="${getStyle('quote')}"`: ''}>${ogText.replaceAll('>', '')}</blockquote>`;
    string = string.replace(ogText, content)
    return string;
});

registerInline(function(string) {
    let pre = '**', suf = '**';
    if(string.indexOf(pre) == -1) return false;
    string = string.replace(pre, '<strong>');
    string = string.replace(suf, '</strong>');
    return string;
});
registerInline(function(string) {
    let pre = '`', suf = '`';
    if(string.indexOf(pre) == -1) return false;
    string = string.replace(pre, '<code>');
    string = string.replace(suf, '</code>');
    return string;
});
registerInline(function(string) {
    const regex = /\[(.*?)\]\{(.*?)\}/g;
    if (!string.match(regex)) return false;
    const outputString = string.replace(regex, '<span style="color: $2">$1</span>');
    return outputString;    
});
registerInline(function(string) {
    if(string.indexOf('\n######') !== -1) {
        let start = string.indexOf('\n######');
        let end = string.indexOf('\n', start + 6);
        let ogHead = string.substring(start, end);
        let head = `\n<h6${getStyle('h6') ? ` class="${getStyle('h6')}"`: ''} id="${ogHead.replace('\n###### ', '').replace('\n', '').replace(/\s+/g, '-').toLowerCase()}">${ogHead.replace('\n######', '').replace('\n', '')}</h6>`
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n#####') !== -1) {
        let start = string.indexOf('\n#####');
        let end = string.indexOf('\n', start + 5);
        let ogHead = string.substring(start, end);

        let head = `\n<h5${getStyle('h5') ? ` class="${getStyle('h5')}"`: ''} id="${ogHead.replace('\n##### ', '').replace('\n', '').replace(/\s+/g, '-').toLowerCase()}">${ogHead.replace('\n#####', '').replace('\n', '')}</h5>`;
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n####') !== -1) {
        let start = string.indexOf('\n####');
        let end = string.indexOf('\n', start + 4);
        let ogHead = string.substring(start, end );
        let head = `\n<h4${getStyle('h4') ? ` class="${getStyle('h4')}"`: ''} id="${ogHead.replace('\n#### ', '').replace('\n', '').replace(/\s+/g, '-').toLowerCase()}">${ogHead.replace('\n####', '').replace('\n', '')}</h4>`;
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n###') !== -1) {
        let start = string.indexOf('\n###');
        let end = string.indexOf('\n', start + 3);
        let ogHead = string.substring(start, end);
        let head = `\n<h3${getStyle('h3') ? ` class="${getStyle('h3')}"`: ''} id="${ogHead.replace('\n### ', '').replace('\n', '').replace(/\s+/g, '-').toLowerCase()}">${ogHead.replace('\n###', '').replace('\n', '')}</h3>`;
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n##') !== -1) {
        let start = string.indexOf('\n##');
        let end = string.indexOf('\n', start + 2);
        let ogHead = string.substring(start, end);
        let head = `\n<h2${getStyle('h2') ? ` class="${getStyle('h2')}"`: ''} id="${ogHead.replace('\n## ', '').replace('\n', '').replace(/\s+/g, '-').toLowerCase()}">${ogHead.replace('\n##', '').replace('\n', '')}</h2>`;
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n#') !== -1) {
        let start = string.indexOf('\n#');
        let end = string.indexOf('\n', start + 1);
        let ogHead = string.substring(start, end)
        let head = `\n<h1${getStyle('h1') ? ` class="${getStyle('h1')}"`: ''} id="${ogHead.replace('\n# ', '').replace('\n', '').replace(/\s+/g, '-').toLowerCase()}">${ogHead.replace('\n#', '').replace('\n', '')}</h1>`;
        string = string.replace(ogHead, head);
        return string;
    }
    return false;
});
registerInline(function(string) {
    let pre = '\n---\n';
    if(string.indexOf(pre) == -1) return false;
    string = string.replace(pre, `\n<hr${getStyle('hr') ? ` class="${getStyle('hr')}"`: ''} />\n`);
    return string;
});
registerInline(function(string) {
    let elements = string.match(/!\[(.*?)]\((https?:\/\/\S+\.\w+)\)/gm);
    if(elements == null) return false;
    for(el of elements) {
        string = string.replace(/!\[(.*?)]\((https?:\/\/\S+\.\w+)\)/gm, `<img alt="$1" src="$2"${getStyle('image') ? ` class="${getStyle('image')}"`: ''} />`);
    }
    return string;
});
registerInline(function(string) {
    let pre = '*', suf = '*';
    if(string.indexOf(pre) == -1) return false;
    string = string.replace(pre, '<em>');
    string = string.replace(suf, '</em>');
    return string;
});
registerInline(function(string) {
    string = string.mdconvertAutoLink();
    let elements = string.match(/\[.*?\)/g);
    if(elements == null) return false;
    for(el of elements) {
        let txt = el.match(/\[(.*?)\]/)?.[1] || null;
        let url = el.match(/\((.*?)\)/)?.[1] || null;
        if(!txt || !url) continue;
        string = string.replace(el, `<a href="${url}"${getStyle('link') ? ` class="${getStyle('link')}"`: ''} target="_blank">${txt}</a>`);
    }
    return string;
});
String.prototype.mdconvertAutoLink = function () {
    var d, b, g, a, e, f, h;
    e = 1 <= arguments.length ? k.call(arguments, 0) : [];
    f = /(^|[\s\n]|<[A-Za-z]*\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
    if (!(0 < e.length)) return this.replace(f, `$1<a href="$2"${getStyle('link') ? ` class="${getStyle('link')}"`: ''}>$2</a>`);
    a = e[0];
    d = a.callback;
    g = (function () {
        var c;
        c = [];
        for (b in a) (h = a[b]), "callback" !== b && c.push(" " + b + "='" + h + "'");
        return c;
    })().join("");
    return this.replace(f, function (c, b, a) {
        c = ("function" === typeof d ? d(a) : void 0) || `<a href="${a}"${getStyle('link') ? ` class="${getStyle('link')}"`: ''} ${g}>${a}</a>`;
        return "" + b + c;
    });
};
registerInline(function(string) {
    let pre = '~~', suf = '~~';
    if(string.indexOf(pre) == -1) return false;
    string = string.replace(pre, '<s>');
    string = string.replace(suf, '</s>');
    return string;
});
registerInline(function(string) {
    if(string.indexOf('<t:') == -1) return false;
    let start = string.indexOf('<t:');
    let end = string.indexOf('>', start + 3);
    let wholething = string.slice(start, end + 1);
    let timestamp = string.slice(start + 3, end);
    if(timestamp.length == 10) timestamp = timestamp * 1000.0;
    let final = `<code><script>document.write(new Date(Number(${timestamp})).toLocaleString());</script></code>`;
    string = string.replace(wholething, final);
    return string;
});
registerInline(function(string) {
    let pre = '__', suf = '__';
    if(string.indexOf(pre) == -1) return false;
    string = string.replace(pre, '<u>');
    string = string.replace(suf, '</u>');
    return string;
});