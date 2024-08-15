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


function getHttpBlocks(string, blockType) {
    const blockPattern = new RegExp(`/${blockType}(.*?)\/${blockType}`, 'gs');
    const blocks = [];
    let match;
    while ((match = blockPattern.exec(string)) !== null) {
        const blockContent = match[1].trim();
        const [endpointLine, ...rest] = blockContent.split('\n');
        const endpoint = endpointLine.trim();

        const descriptionEndIndex = rest.findIndex(line => line.startsWith('-') || line.startsWith('= ') || line.match(/^\dxx= /));
        const description = descriptionEndIndex >= 0 ? rest.slice(0, descriptionEndIndex).join('\n').trim() : '';

        const params = descriptionEndIndex >= 0 && rest[descriptionEndIndex].startsWith('-')
            ? rest.slice(descriptionEndIndex, rest.findIndex(line => line.startsWith('= ') || line.match(/^\dxx= /))).map(line => line.trim()).filter(line => line)
            : [];
        const responseTypes = ['= ', '2xx= ', '3xx= ', '4xx= ', '5xx= '];
        const responses = responseTypes.reduce((acc, responseType) => {
            const responseIndex = rest.findIndex(line => line.startsWith(responseType));
            if (responseIndex >= 0) {
                const nextResponseIndex = rest.findIndex((line, idx) => idx > responseIndex && responseTypes.some(type => line.startsWith(type)));
                const responseContent = rest.slice(responseIndex, nextResponseIndex >= 0 ? nextResponseIndex : undefined)
                    .join('\n')
                    .replace(new RegExp(`^${responseType}`, 'gm'), '')
                    .trim();
                if (responseContent) acc.push({ code: responseType.trim().replace('=', ''), content: responseContent });
            }
            return acc;
        }, []);

        blocks.push({
            fullMatch: match[0],
            endpoint,
            description,
            params,
            responses,
        });
    }
    return blocks;
}

function formatParams(params) {
    return params.map(param => {
        const [name, ...descParts] = param.replace(/^- /, '').split(' ');
        const desc = descParts.join(' ');
        return `<tr><td><code>${name}</code></td><td>${desc}</td></tr>`;
    }).join('');
}

function get(string, plain) {
    const blockType = 'GET';
    const blocks = getHttpBlocks(string, blockType);
    blocks.forEach(block => {
        const resKey = crypto.randomUUID();
        const key = crypto.randomUUID();
        const formattedResponses = block.responses.map(response => {
            const codeBlock = `<pre${main.getStyle('code', true)}><code>${hljs.highlightAuto(response.content).value}</code></pre>`;
            return `${response.code ? `<p class="convertPara">${response.code}:</p>` : ''}${codeBlock}`;
        }).join('');
        main.updateCache(key, formattedResponses);
        const formattedParams = formatParams(block.params);
        const content = `<div${main.getStyle('httprequest', true)}>
            <p><span class="mdhttpBlue">${blockType}</span><span class="mdhttpEndpoint"> ${block.endpoint}</span></p>
            <p class="mdhttpDesc">${block.description}</p>
            ${block.params.length > 0 ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}
            ${block.responses.length > 0 ? `<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3> <div id="${resKey}" style="display: none;">${key}</div>` : ''}
            </div>`;
        string = string.replace(block.fullMatch, content);
    });
    return string;
}

function put(string, plain) {
    const blockType = 'PUT';
    const blocks = getHttpBlocks(string, blockType);
    blocks.forEach(block => {
        const resKey = crypto.randomUUID();
        const key = crypto.randomUUID();
        const formattedResponses = block.responses.map(response => {
            const codeBlock = `<pre${main.getStyle('code', true)}><code>${hljs.highlightAuto(response.content).value}</code></pre>`;
            return `${response.code ? `<p class="convertPara">${response.code}:</p>` : ''}${codeBlock}`;
        }).join('');
        main.updateCache(key, formattedResponses);
        const formattedParams = formatParams(block.params);
        const content = `<div${main.getStyle('httprequest', true)}>
            <p><span class="mdhttpOrange">${blockType}</span><span class="mdhttpEndpoint"> ${block.endpoint}</span></p>
            <p class="mdhttpDesc">${block.description}</p>
            ${block.params.length > 0 ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}
            ${block.responses.length > 0 ? `<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3> <div id="${resKey}" style="display: none;">${key}</div>` : ''}
            </div>`;
        string = string.replace(block.fullMatch, content);
    });
    return string;
}

function patch(string, plain) {
    const blockType = 'PATCH';
    const blocks = getHttpBlocks(string, blockType);
    blocks.forEach(block => {
        const resKey = crypto.randomUUID();
        const key = crypto.randomUUID();
        const formattedResponses = block.responses.map(response => {
            const codeBlock = `<pre${main.getStyle('code', true)}><code>${hljs.highlightAuto(response.content).value}</code></pre>`;
            return `${response.code ? `<p class="convertPara">${response.code}:</p>` : ''}${codeBlock}`;
        }).join('');
        main.updateCache(key, formattedResponses);
        const formattedParams = formatParams(block.params);
        const content = `<div${main.getStyle('httprequest', true)}>
            <p><span class="mdhttpOrange">${blockType}</span><span class="mdhttpEndpoint"> ${block.endpoint}</span></p>
            <p class="mdhttpDesc">${block.description}</p>
            ${block.params.length > 0 ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}
            ${block.responses.length > 0 ? `<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3> <div id="${resKey}" style="display: none;">${key}</div>` : ''}
            </div>`;
        string = string.replace(block.fullMatch, content);
    });
    return string;
}

function post(string, plain) {
    const blockType = 'POST';
    const blocks = getHttpBlocks(string, blockType);
    blocks.forEach(block => {
        const resKey = crypto.randomUUID();
        const key = crypto.randomUUID();
        const formattedResponses = block.responses.map(response => {
            const codeBlock = `<pre${main.getStyle('code', true)}><code>${hljs.highlightAuto(response.content).value}</code></pre>`;
            return `${response.code ? `<p class="convertPara">${response.code}:</p>` : ''}${codeBlock}`;
        }).join('');
        main.updateCache(key, formattedResponses);
        const formattedParams = formatParams(block.params);
        const content = `<div${main.getStyle('httprequest', true)}>
            <p><span class="mdhttpGreen">${blockType}</span><span class="mdhttpEndpoint"> ${block.endpoint}</span></p>
            <p class="mdhttpDesc">${block.description}</p>
            ${block.params.length > 0 ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}
            ${block.responses.length > 0 ? `<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3> <div id="${resKey}" style="display: none;">${key}</div>` : ''}
            </div>`;
        string = string.replace(block.fullMatch, content);
    });
    return string;
}

function deleted(string, plain) {
    const blockType = 'DELETE';
    const blocks = getHttpBlocks(string, blockType);
    blocks.forEach(block => {
        const resKey = crypto.randomUUID();
        const key = crypto.randomUUID();
        const formattedResponses = block.responses.map(response => {
            const codeBlock = `<pre${main.getStyle('code', true)}><code>${hljs.highlightAuto(response.content).value}</code></pre>`;
            return `${response.code ? `<p class="convertPara">${response.code}:</p>` : ''}${codeBlock}`;
        }).join('');
        main.updateCache(key, formattedResponses);
        const formattedParams = formatParams(block.params);
        const content = `<div${main.getStyle('httprequest', true)}>
            <p><span class="mdhttpRed">${blockType}</span><span class="mdhttpEndpoint"> ${block.endpoint}</span></p>
            <p class="mdhttpDesc">${block.description}</p>
            ${block.params.length > 0 ? `<h3>Parameters:</h3><table class="mdhttpParam">${formattedParams}</table>` : ''}
            ${block.responses.length > 0 ? `<h3 id="httpReqRes-${resKey}">Response: <sup>[Expand]</sup></h3> <div id="${resKey}" style="display: none;">${key}</div>` : ''}
            </div>`;
        string = string.replace(block.fullMatch, content);
    });
    return string;
}

main.registerBlock({open: cPost.open,close: cPost.close,exec: post});
main.registerBlock({open: cPatch.open,close: cPatch.close,exec: patch});
main.registerBlock({open: cPut.open,close: cPut.close,exec: put});
main.registerBlock({open: cDeleted.open,close: cDeleted.close,exec: deleted});
main.registerBlock({open: cGet.open,close: cGet.close,exec: get});