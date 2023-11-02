const main = require('../index.js'), hljs = require('highlight.js'); crypto = require('crypto');


let cPost = {
    open: '/POST',
    close: '/POST',
}
let cPatch = {
    open: '/PATCH',
    close: '/PATCH',
}
let cPut = {
    open: '/PUT',
    close: '/PUT',
}
let cDeleted = {
    open: '/DELETE',
    close: '/DELETE',
}
let cGet = {
    open: '/GET',
    close: '/GET',
}

function post(string, plain) {
    let pre = '/POST';
    let suf = '/POST';
    let resKey = crypto.randomUUID();
    let start = string.indexOf(pre);
    let end = string.indexOf(suf, start + 5);
    let ogText = string.substring(start, end + 5);
    let endpoint = string.substring(start + 5, string.indexOf(`\n`, start + 4)).replaceAll("\n", "");
    let endEndpoint = string.indexOf(`\n`, start + 4);
    let hasParams = ogText.includes(`\n-`);
    let description = string.substring(endEndpoint, string.indexOf(hasParams ? `\n-` : '\n= ', string.indexOf(`\n`, start + 4)));
    let endDescription = string.indexOf(`\n-`, string.indexOf(`\n`, start + 4));
    let params = hasParams ? string.substring(endDescription, string.indexOf(`\n= `)).split('\n-') : [];
    let endParams = ogText.indexOf(`\n= `);
    let formattedParams = '';
    for(let i = 0; i < params.length; i++) {
        const e = params[i].trim();
        let desc = e.substring(e.indexOf(" "));
        let name = e.substring(0, e.indexOf(" "));
        if(e.length > 3) formattedParams += `<tr><td><code>${name}</code></td><td>${desc}</td></tr>`;
    }
    let result = ogText.substring(endParams+3, string.indexOf(`\n${suf}`, endParams)).replace('\n'+suf, '');
    let key = crypto.randomUUID();
    let code = `<pre${main.getStyle('code', true)} id="${resKey}"><code>${hljs.highlightAuto(result).value}</code></pre>`
    main.cache[key] = code;
    main.updateCache(main.cache);
    let content = `<div${main.getStyle('httprequest', true)}><p><span class="mdhttpGreen">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p>${hasParams ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3>${key}</div>`;
    string = string.replace(ogText, content);
    return string;
}

function patch(string, plain) {
    let pre = '/PATCH';
    let suf = '/PATCH';
    let resKey = crypto.randomUUID();
    let start = string.indexOf(pre);
    let end = string.indexOf(suf, start + 5);
    let ogText = string.substring(start, end + 5);
    let endpoint = string.substring(start + 5, string.indexOf(`\n`, start + 4)).replaceAll("\n", "");
    let endEndpoint = string.indexOf(`\n`, start + 4);
    let hasParams = ogText.includes(`\n-`);
    let description = string.substring(endEndpoint, string.indexOf(hasParams ? `\n-` : '\n= ', string.indexOf(`\n`, start + 4)));
    let endDescription = string.indexOf(`\n-`, string.indexOf(`\n`, start + 4));
    let params = hasParams ? string.substring(endDescription, string.indexOf(`\n= `)).split('\n-') : [];
    let endParams = ogText.indexOf(`\n= `);
    let formattedParams = '';
    for(let i = 0; i < params.length; i++) {
        const e = params[i].trim();
        let desc = e.substring(e.indexOf(" "));
        let name = e.substring(0, e.indexOf(" "));
        if(e.length > 3) formattedParams += `<tr><td><code>${name}</code></td><td>${desc}</td></tr>`;
    }
    let result = ogText.substring(endParams+3, string.indexOf(`\n${suf}`, endParams)).replace('\n'+suf, '');
    let key = crypto.randomUUID();
    let code = `<pre${main.getStyle('code', true)} id="${resKey}"><code>${hljs.highlightAuto(result).value}</code></pre>`
    main.cache[key] = code;
    main.updateCache(main.cache);
    let content = `<div${main.getStyle('httprequest', true)}><p><span class="mdhttpOrange">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p>${hasParams ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3>${key}</div>`;
    string = string.replace(ogText, content);
    return string;
}

function put(string, plain) {
    let pre = '/PUT';
    let suf = '/PUT';
    let resKey = crypto.randomUUID();
    let start = string.indexOf(pre);
    let end = string.indexOf(suf, start + 5);
    let ogText = string.substring(start, end + 5);
    let endpoint = string.substring(start + 5, string.indexOf(`\n`, start + 4)).replaceAll("\n", "");
    let endEndpoint = string.indexOf(`\n`, start + 4);
    let hasParams = ogText.includes(`\n-`);
    let description = string.substring(endEndpoint, string.indexOf(hasParams ? `\n-` : '\n= ', string.indexOf(`\n`, start + 4)));
    let endDescription = string.indexOf(`\n-`, string.indexOf(`\n`, start + 4));
    let params = hasParams ? string.substring(endDescription, string.indexOf(`\n= `)).split('\n-') : [];
    let endParams = ogText.indexOf(`\n= `);
    let formattedParams = '';
    for(let i = 0; i < params.length; i++) {
        const e = params[i].trim();
        let desc = e.substring(e.indexOf(" "));
        let name = e.substring(0, e.indexOf(" "));
        if(e.length > 3) formattedParams += `<tr><td><code>${name}</code></td><td>${desc}</td></tr>`;
    }
    let result = ogText.substring(endParams+3, string.indexOf(`\n${suf}`, endParams)).replace('\n'+suf, '');
    let key = crypto.randomUUID();
    let code = `<pre${main.getStyle('code', true)} id="${resKey}"><code>${hljs.highlightAuto(result).value}</code></pre>`
    main.cache[key] = code;
    main.updateCache(main.cache);
    let content = `<div${main.getStyle('httprequest', true)}><p><span class="mdhttpOrange">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p>${hasParams ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3>${key}</div>`;
    string = string.replace(ogText, content);
    return string;
}

function deleted(string, plain) {
    let pre = '/DELETE';
    let suf = '/DELETE';
    let resKey = crypto.randomUUID();
    let start = string.indexOf(pre);
    let end = string.indexOf(suf, start + 5);
    let ogText = string.substring(start, end + 5);
    let endpoint = string.substring(start + 5, string.indexOf(`\n`, start + 4)).replaceAll("\n", "");
    let endEndpoint = string.indexOf(`\n`, start + 4);
    let hasParams = ogText.includes(`\n-`);
    let description = string.substring(endEndpoint, string.indexOf(hasParams ? `\n-` : '\n= ', string.indexOf(`\n`, start + 4)));
    let endDescription = string.indexOf(`\n-`, string.indexOf(`\n`, start + 4));
    let params = hasParams ? string.substring(endDescription, string.indexOf(`\n= `)).split('\n-') : [];
    let endParams = ogText.indexOf(`\n= `);
    let formattedParams = '';
    for(let i = 0; i < params.length; i++) {
        const e = params[i].trim();
        let desc = e.substring(e.indexOf(" "));
        let name = e.substring(0, e.indexOf(" "));
        if(e.length > 3) formattedParams += `<tr><td><code>${name}</code></td><td>${desc}</td></tr>`;
    }
    let result = ogText.substring(endParams+3, string.indexOf(`\n${suf}`, endParams)).replace('\n'+suf, '');
    let key = crypto.randomUUID();
    let code = `<pre${main.getStyle('code', true)} id="${resKey}"><code>${hljs.highlightAuto(result).value}</code></pre>`
    main.cache[key] = code;
    main.updateCache(main.cache);
    let content = `<div${main.getStyle('httprequest', true)}><p><span class="mdhttpRed">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p>${hasParams ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3>${key}</div>`;
    string = string.replace(ogText, content);
    return string;
}

function get(string, plain) {
    let pre = '/GET';
    let suf = '/GET';
    let resKey = crypto.randomUUID();
    let start = string.indexOf(pre);
    let end = string.indexOf(suf, start + 5);
    let ogText = string.substring(start, end + 5);
    let endpoint = string.substring(start + 5, string.indexOf(`\n`, start + 4)).replaceAll("\n", "");
    let endEndpoint = string.indexOf(`\n`, start + 4);
    let hasParams = ogText.includes(`\n-`);
    let description = string.substring(endEndpoint, string.indexOf(hasParams ? `\n-` : '\n= ', string.indexOf(`\n`, start + 4)));
    let endDescription = string.indexOf(`\n-`, string.indexOf(`\n`, start + 4));
    let params = hasParams ? string.substring(endDescription, string.indexOf(`\n= `)).split('\n-') : [];
    let endParams = ogText.indexOf(`\n= `);
    let formattedParams = '';
    for(let i = 0; i < params.length; i++) {
        const e = params[i].trim();
        let desc = e.substring(e.indexOf(" "));
        let name = e.substring(0, e.indexOf(" "));
        if(e.length > 3) formattedParams += `<tr><td><code>${name}</code></td><td>${desc}</td></tr>`;
    }
    let result = ogText.substring(endParams+3, string.indexOf(`\n${suf}`, endParams)).replace('\n'+suf, '');
    let key = crypto.randomUUID();
    let code = `<pre${main.getStyle('code', true)} id="${resKey}"><code>${hljs.highlightAuto(result).value}</code></pre>`
    main.cache[key] = code;
    main.updateCache(main.cache);
    let content = `<div${main.getStyle('httprequest', true)}><p><span class="mdhttpBlue">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p>${hasParams ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3>${key}</div>`;
    string = string.replace(ogText, content);
    return string;
}

main.registerBlock({open: cPost.open,close: cPost.close,exec: post});
main.registerBlock({open: cPatch.open,close: cPatch.close,exec: patch});
main.registerBlock({open: cPut.open,close: cPut.close,exec: put});
main.registerBlock({open: cDeleted.open,close: cDeleted.close,exec: deleted});
main.registerBlock({open: cGet.open,close: cGet.close,exec: get});