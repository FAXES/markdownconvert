const main = require('../index.js');

main.registerInline(function(string) {
    if(string.indexOf('\n######') !== -1) {
        let start = string.indexOf('\n######');
        let end = string.indexOf('\n', start + 6);
        let ogHead = string.substring(start, end)
        let head = `<h6${main.getStyle('h6') ? ` class="${main.getStyle('h6')}"`: ''}>${ogHead.replace('\n######', '').replace('\n', '')}</h6>`
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n#####') !== -1) {
        let start = string.indexOf('\n#####');
        let end = string.indexOf('\n', start + 5);
        let ogHead = string.substring(start, end);
        let head = `<h5${main.getStyle('h5') ? ` class="${main.getStyle('h5')}"`: ''}>${ogHead.replace('\n#####', '').replace('\n', '')}</h5>`;
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n####') !== -1) {
        let start = string.indexOf('\n####');
        let end = string.indexOf('\n', start + 4);
        let ogHead = string.substring(start, end );
        let head = `<h4${main.getStyle('h4') ? ` class="${main.getStyle('h4')}"`: ''}>${ogHead.replace('\n####', '').replace('\n', '')}</h4>`;
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n###') !== -1) {
        let start = string.indexOf('\n###');
        let end = string.indexOf('\n', start + 3);
        let ogHead = string.substring(start, end);
        let head = `<h3${main.getStyle('h3') ? ` class="${main.getStyle('h3')}"`: ''}>${ogHead.replace('\n###', '').replace('\n', '')}</h3>`;
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n##') !== -1) {
        let start = string.indexOf('\n##');
        let end = string.indexOf('\n', start + 2);
        let ogHead = string.substring(start, end);
        let head = `<h2${main.getStyle('h2') ? ` class="${main.getStyle('h2')}"`: ''}>${ogHead.replace('\n##', '').replace('\n', '')}</h2>`;
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n#') !== -1) {
        let start = string.indexOf('\n#');
        let end = string.indexOf('\n', start + 1);
        let ogHead = string.substring(start, end)
        let head = `<h1${main.getStyle('h1') ? ` class="${main.getStyle('h1')}"`: ''}>${ogHead.replace('\n#', '').replace('\n', '')}</h1>`;
        string = string.replace(ogHead, head);
        return string;
    }
    return false;
});