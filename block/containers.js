const main = require('../index.js');

main.registerBlock(function(string) {
    let pre = [
        '::: danger', 
        '::: success',
        '::: info',
        '::: warning',
    ];

    if(string.indexOf('::: danger') !== -1) {
        // let start = string.indexOf(`::: danger`);
        string = string.replace('::: danger', `<div ${main.getStyle('contDanger') ? `class="${main.getStyle('contDanger')}"` : null}>`);
        string = string.replace(':::', '</div>');
        return string;
    }

    if(string.indexOf('::: success') !== -1) {
        let start = string.indexOf(`::: success`);
        string = string.replace('::: success', `<div ${main.getStyle('contSuccess') ? `class="${main.getStyle('contSuccess')}"` : null}>`);
        string = string.replace(':::', '</div>');
        return string;
    }

    if(string.indexOf('::: info') !== -1) {
        let start = string.indexOf(`::: info`);
        string = string.replace('::: info', `<div ${main.getStyle('contInfo') ? `class="${main.getStyle('contInfo')}"` : null}>`);
        string = string.replace(':::', '</div>');
        return string;
    }

    if(string.indexOf('::: warning') !== -1) {
        let start = string.indexOf(`::: warning`);
        string = string.replace('::: warning', `<div ${main.getStyle('contWarning') ? `class="${main.getStyle('contWarning')}"` : null}>`);
        string = string.replace(':::', '</div>');
        return string;
    }

    return false;
});