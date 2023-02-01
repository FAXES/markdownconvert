const main = require('../index.js'), hljs = require('highlight.js');

main.registerBlock(function(string) {
    if(string.indexOf('/POST') !== -1) {
        let pre = '/POST';
        let suf = '/POST';

        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + 5);
        let ogText = string.substring(start, end + 5);
        let endpoint = string.substring(start + 5, string.indexOf(`\n`, start + 4)).replaceAll("\n", "");
        let endEndpoint = string.indexOf(`\n`, start + 4);
        let description = string.substring(endEndpoint, string.indexOf(`\n-`, string.indexOf(`\n`, start + 4)));
        let endDescription = string.indexOf(`\n-`, string.indexOf(`\n`, start + 4));
        let params = string.substring(endDescription, string.indexOf(`=`, endDescription)).split('\n-');
        let endParams = string.indexOf(`=`, endDescription);
        let formattedParams = '';
        for(let i = 0; i < params.length; i++) {
            const e = params[i].trim();
            let desc = e.substring(e.indexOf(" "));
            let name = e.substring(0, e.indexOf(" "));
            if(e.length > 3) formattedParams += `<tr><td><code>${name}</code></td><td>${desc}</td></tr>`;
        }
        let result = string.substring(endParams + 1, string.indexOf(suf, endParams))
        let content = `<div${main.getStyle('httprequest') ? ` class="${main.getStyle('httprequest')}"`: ''}><p><span class="mdhttpGreen">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p><h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table><h3>Response:</h3><pre><code>${hljs.highlightAuto(result).value}</code></pre></div>`;
        string = string.replace(ogText, content);
        return {string: string, start: start, end: end};
    }

    if(string.indexOf('/PATCH') !== -1) {
        let pre = '/PATCH';
        let suf = '/PATCH';

        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + 5);
        let ogText = string.substring(start, end + 5);
        let endpoint = string.substring(start + 5, string.indexOf(`\n`, start + 4)).replaceAll("\n", "");
        let endEndpoint = string.indexOf(`\n`, start + 4);
        let description = string.substring(endEndpoint, string.indexOf(`\n-`, string.indexOf(`\n`, start + 4)));
        let endDescription = string.indexOf(`\n-`, string.indexOf(`\n`, start + 4));
        let params = string.substring(endDescription, string.indexOf(`=`, endDescription)).split('\n-');
        let endParams = string.indexOf(`=`, endDescription);
        let formattedParams = '';
        for(let i = 0; i < params.length; i++) {
            const e = params[i].trim();
            let desc = e.substring(e.indexOf(" "));
            let name = e.substring(0, e.indexOf(" "));
            if(e.length > 3) formattedParams += `<tr><td><code>${name}</code></td><td>${desc}</td></tr>`;
        }
        let result = string.substring(endParams + 1, string.indexOf(suf, endParams))
        let content = `<div${main.getStyle('httprequest') ? ` class="${main.getStyle('httprequest')}"`: ''}><p><span class="mdhttpOrange">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p><h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table><h3>Response:</h3><pre><code>${hljs.highlightAuto(result).value}</code></pre></div>`;
        string = string.replace(ogText, content);
        return {string: string, start: start, end: end};
    }

    if(string.indexOf('/PUT') !== -1) {
        let pre = '/PUT';
        let suf = '/PUT';

        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + 5);
        let ogText = string.substring(start, end + 5);
        let endpoint = string.substring(start + 5, string.indexOf(`\n`, start + 4)).replaceAll("\n", "");
        let endEndpoint = string.indexOf(`\n`, start + 4);
        let description = string.substring(endEndpoint, string.indexOf(`\n-`, string.indexOf(`\n`, start + 4)));
        let endDescription = string.indexOf(`\n-`, string.indexOf(`\n`, start + 4));
        let params = string.substring(endDescription, string.indexOf(`=`, endDescription)).split('\n-');
        let endParams = string.indexOf(`=`, endDescription);
        let formattedParams = '';
        for(let i = 0; i < params.length; i++) {
            const e = params[i].trim();
            let desc = e.substring(e.indexOf(" "));
            let name = e.substring(0, e.indexOf(" "));
            if(e.length > 3) formattedParams += `<tr><td><code>${name}</code></td><td>${desc}</td></tr>`;
        }
        let result = string.substring(endParams + 1, string.indexOf(suf, endParams))
        let content = `<div${main.getStyle('httprequest') ? ` class="${main.getStyle('httprequest')}"`: ''}><p><span class="mdhttpOrange">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p><h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table><h3>Response:</h3><pre><code>${hljs.highlightAuto(result).value}</code></pre></div>`;
        string = string.replace(ogText, content);
        return {string: string, start: start, end: end};
    }

    if(string.indexOf('/DELETE') !== -1) {
        let pre = '/DELETE';
        let suf = '/DELETE';

        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + 5);
        let ogText = string.substring(start, end + 5);
        let endpoint = string.substring(start + 5, string.indexOf(`\n`, start + 4)).replaceAll("\n", "");
        let endEndpoint = string.indexOf(`\n`, start + 4);
        let description = string.substring(endEndpoint, string.indexOf(`\n-`, string.indexOf(`\n`, start + 4)));
        let endDescription = string.indexOf(`\n-`, string.indexOf(`\n`, start + 4));
        let params = string.substring(endDescription, string.indexOf(`=`, endDescription)).split('\n-');
        let endParams = string.indexOf(`=`, endDescription);
        let formattedParams = '';
        for(let i = 0; i < params.length; i++) {
            const e = params[i].trim();
            let desc = e.substring(e.indexOf(" "));
            let name = e.substring(0, e.indexOf(" "));
            if(e.length > 3) formattedParams += `<tr><td><code>${name}</code></td><td>${desc}</td></tr>`;
        }
        let result = string.substring(endParams + 1, string.indexOf(suf, endParams))
        let content = `<div${main.getStyle('httprequest') ? ` class="${main.getStyle('httprequest')}"`: ''}><p><span class="mdhttpRed">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p><h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table><h3>Response:</h3><pre><code>${hljs.highlightAuto(result).value}</code></pre></div>`;
        string = string.replace(ogText, content);
        return {string: string, start: start, end: end};
    }

    if(string.indexOf('/GET') !== -1) {
        let pre = '/GET';
        let suf = '/GET';

        let start = string.indexOf(pre);
        let end = string.indexOf(suf, start + 5);
        let ogText = string.substring(start, end + 5);
        let endpoint = string.substring(start + 5, string.indexOf(`\n`, start + 4)).replaceAll("\n", "");
        let endEndpoint = string.indexOf(`\n`, start + 4);
        let description = string.substring(endEndpoint, string.indexOf(`\n-`, string.indexOf(`\n`, start + 4)));
        let endDescription = string.indexOf(`\n-`, string.indexOf(`\n`, start + 4));
        let params = string.substring(endDescription, string.indexOf(`=`, endDescription)).split('\n-');
        let endParams = string.indexOf(`=`, endDescription);
        let formattedParams = '';
        for(let i = 0; i < params.length; i++) {
            const e = params[i].trim();
            let desc = e.substring(e.indexOf(" "));
            let name = e.substring(0, e.indexOf(" "));
            if(e.length > 3) formattedParams += `<tr><td><code>${name}</code></td><td>${desc}</td></tr>`;
        }
        let result = string.substring(endParams + 1, string.indexOf(suf, endParams))
        let content = `<div${main.getStyle('httprequest') ? ` class="${main.getStyle('httprequest')}"`: ''}><p><span class="mdhttpBlue">${pre.replace("/", "")}</span><span class="mdhttpEndpoint"> ${endpoint}</span></p><p class="mdhttpDesc">${description}</p><h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table><h3>Response:</h3><pre><code>${hljs.highlightAuto(result).value}</code></pre></div>`;
        string = string.replace(ogText, content);
        return {string: string, start: start, end: end};
    }
    return false;
});