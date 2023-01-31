const main = require('../index.js');

main.registerInline(function(string) {
    if(string.indexOf('######') !== -1) {
        let start = string.indexOf('######');
        let end = string.indexOf('\n', start + 6);
        let ogHead = string.substring(start, end)
        let head = string.substring(start, end).replace('######', `<h6${main.getStyle('h6') ? ` class="${main.getStyle('h6')}"`: ''}>`).replace('\r', '</h6>');
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('#####') !== -1) {
        let start = string.indexOf('#####');
        let end = string.indexOf('\n', start + 5);
        let ogHead = string.substring(start, end)
        let head = string.substring(start, end).replace('#####', `<h5${main.getStyle('h5') ? ` class="${main.getStyle('h5')}"`: ''}>`).replace('\r', '</h5>');
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('####') !== -1) {
        let start = string.indexOf('####');
        let end = string.indexOf('\n', start + 4);
        let ogHead = string.substring(start, end)
        let head = string.substring(start, end).replace('####', `<h4${main.getStyle('h4') ? ` class="${main.getStyle('h4')}"`: ''}>`).replace('\r', '</h4>');
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('###') !== -1) {
        let start = string.indexOf('###');
        let end = string.indexOf('\n', start + 3);
        let ogHead = string.substring(start, end)
        let head = string.substring(start, end).replace('###', `<h3${main.getStyle('h3') ? ` class="${main.getStyle('h3')}"`: ''}>`).replace('\r', '</h3>');
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('##') !== -1) {
        let start = string.indexOf('##');
        let end = string.indexOf('\n', start + 2);
        let ogHead = string.substring(start, end)
        let head = string.substring(start, end).replace('##', `<h2${main.getStyle('h2') ? ` class="${main.getStyle('h2')}"`: ''}>`).replace('\r', '</h2>');
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('#') !== -1) {
        let start = string.indexOf('#');
        let end = string.indexOf('\n', start + 1);
        let ogHead = string.substring(start, end)
        let head = string.substring(start, end).replace('#', `<h1 ${main.getStyle('h1') ? `class="${main.getStyle('h1')}"`: ''}>`).replace('\r', '</h1>');
        string = string.replace(ogHead, head);
        return string;
    }
    return false;
});