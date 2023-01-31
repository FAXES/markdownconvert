const main = require('../index.js');

main.registerBlock(function(string) {
    if(string.indexOf('::: danger') !== -1) {
        string = string.replace('::: danger', `<div${main.getStyle('contDanger') ? ` class="${main.getStyle('contDanger')}"`: ''}>`);
        string = string.replace(':::', '</div>');
        return string;
    }

    if(string.indexOf('::: success') !== -1) {
        string = string.replace('::: success', `<div${main.getStyle('contSuccess') ? ` class="${main.getStyle('contSuccess')}"`: ''}>`);
        string = string.replace(':::', '</div>');
        return string;
    }

    if(string.indexOf('::: info') !== -1) {
        string = string.replace('::: info', `<div${main.getStyle('contInfo') ? ` class="${main.getStyle('contInfo')}"`: ''}>`);
        string = string.replace(':::', '</div>');
        return string;
    }

    if(string.indexOf('::: warning') !== -1) {
        string = string.replace('::: warning', `<div${main.getStyle('contWarning') ? ` class="${main.getStyle('contWarning')}"`: ''}>`);
        string = string.replace(':::', '</div>');
        return string;
    }

    return false;
});