const main = require('../index.js'), hljs = require('highlight.js'); crypto = require('crypto');

main.registerBlock(function(string) {
    if(string.indexOf('/POST') !== -1) {
        let pre = '/POST';
        let suf = '/POST';
        let resKey = crypto.randomUUID();
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
        let key = crypto.randomUUID();
        let code = `<pre${main.getStyle('code') ? ` class="${main.getStyle('code')}"`: ''} id="${resKey}"><code>${hljs.highlightAuto(result).value}</code></pre>`
        main.cache[key] = code;
        main.updateCache(main.cache);
        let content = `<div${main.getStyle('httprequest') ? ` class="${main.getStyle('httprequest')}"`: ''}><p><span class="mdhttpGreen">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p>${hasParams ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3>${key}</div>`;
        string = string.replace(ogText, content);
        return string;
    }

    if(string.indexOf('/PATCH') !== -1) {
        let pre = '/PATCH';
        let suf = '/PATCH';
        let resKey = crypto.randomUUID();
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
        let key = crypto.randomUUID();
        let code = `<pre${main.getStyle('code') ? ` class="${main.getStyle('code')}"`: ''} id="${resKey}"><code>${hljs.highlightAuto(result).value}</code></pre>`
        main.cache[key] = code;
        main.updateCache(main.cache);
        let content = `<div${main.getStyle('httprequest') ? ` class="${main.getStyle('httprequest')}"`: ''}><p><span class="mdhttpOrange">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p>${hasParams ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3>${key}</div>`;
        string = string.replace(ogText, content);
        return string;
    }

    if(string.indexOf('/PUT') !== -1) {
        let pre = '/PUT';
        let suf = '/PUT';
        let resKey = crypto.randomUUID();
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
        let key = crypto.randomUUID();
        let code = `<pre${main.getStyle('code') ? ` class="${main.getStyle('code')}"`: ''} id="${resKey}"><code>${hljs.highlightAuto(result).value}</code></pre>`
        main.cache[key] = code;
        main.updateCache(main.cache);
        let content = `<div${main.getStyle('httprequest') ? ` class="${main.getStyle('httprequest')}"`: ''}><p><span class="mdhttpOrange">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p>${hasParams ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3>${key}</div>`;
        string = string.replace(ogText, content);
        return string;
    }

    if(string.indexOf('/DELETE') !== -1) {
        let pre = '/DELETE';
        let suf = '/DELETE';
        let resKey = crypto.randomUUID();
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
        let key = crypto.randomUUID();
        let code = `<pre${main.getStyle('code') ? ` class="${main.getStyle('code')}"`: ''} id="${resKey}"><code>${hljs.highlightAuto(result).value}</code></pre>`
        main.cache[key] = code;
        main.updateCache(main.cache);
        let content = `<div${main.getStyle('httprequest') ? ` class="${main.getStyle('httprequest')}"`: ''}><p><span class="mdhttpRed">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p>${hasParams ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3>${key}</div>`;
        string = string.replace(ogText, content);
        return string;
    }

    if(string.indexOf('/GET') !== -1) {
        let pre = '/GET';
        let suf = '/GET';
        let resKey = crypto.randomUUID();
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
        let key = crypto.randomUUID();
        let code = `<pre${main.getStyle('code') ? ` class="${main.getStyle('code')}"`: ''} id="${resKey}"><code>${hljs.highlightAuto(result).value}</code></pre>`
        main.cache[key] = code;
        main.updateCache(main.cache);
        let content = `<div${main.getStyle('httprequest') ? ` class="${main.getStyle('httprequest')}"`: ''}><p><span class="mdhttpBlue">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p>${hasParams ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3>${key}</div>`;
        string = string.replace(ogText, content);
        return string;
    }
    return false;
});