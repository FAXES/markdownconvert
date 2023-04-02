const main = require('../index.js');

main.registerInline(function(string) {
    if(string.indexOf('\n######') !== -1) {
        let start = string.indexOf('\n######');
        let end = string.indexOf('\n', start + 6);
        let ogHead = string.substring(start, end);
        let head = `\n<h6${main.getStyle('h6') ? ` class="${main.getStyle('h6')}"`: ''} id="${ogHead.replace('\n###### ', '').replace('\n', '').replace(/\s+/g, '-').toLowerCase()}">${ogHead.replace('\n######', '').replace('\n', '')}</h6>`
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n#####') !== -1) {
        let start = string.indexOf('\n#####');
        let end = string.indexOf('\n', start + 5);
        let ogHead = string.substring(start, end);
        let head = `\n<h5${main.getStyle('h5') ? ` class="${main.getStyle('h5')}"`: ''} id="${ogHead.replace('\n##### ', '').replace('\n', '').replace(/\s+/g, '-').toLowerCase()}">${ogHead.replace('\n#####', '').replace('\n', '')}</h5>`;
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n####') !== -1) {
        let start = string.indexOf('\n####');
        let end = string.indexOf('\n', start + 4);
        let ogHead = string.substring(start, end );
        let head = `\n<h4${main.getStyle('h4') ? ` class="${main.getStyle('h4')}"`: ''} id="${ogHead.replace('\n#### ', '').replace('\n', '').replace(/\s+/g, '-').toLowerCase()}">${ogHead.replace('\n####', '').replace('\n', '')}</h4>`;
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n###') !== -1) {
        let start = string.indexOf('\n###');
        let end = string.indexOf('\n', start + 3);
        let ogHead = string.substring(start, end);
        let head = `\n<h3${main.getStyle('h3') ? ` class="${main.getStyle('h3')}"`: ''} id="${ogHead.replace('\n### ', '').replace('\n', '').replace(/\s+/g, '-').toLowerCase()}">${ogHead.replace('\n###', '').replace('\n', '')}</h3>`;
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n##') !== -1) {
        let start = string.indexOf('\n##');
        let end = string.indexOf('\n', start + 2);
        let ogHead = string.substring(start, end);
        let head = `\n<h2${main.getStyle('h2') ? ` class="${main.getStyle('h2')}"`: ''} id="${ogHead.replace('\n## ', '').replace('\n', '').replace(/\s+/g, '-').toLowerCase()}">${ogHead.replace('\n##', '').replace('\n', '')}</h2>`;
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n#') !== -1) {
        let start = string.indexOf('\n#');
        let end = string.indexOf('\n', start + 1);
        let ogHead = string.substring(start, end)
        let head = `\n<h1${main.getStyle('h1') ? ` class="${main.getStyle('h1')}"`: ''} id="${ogHead.replace('\n# ', '').replace('\n', '').replace(/\s+/g, '-').toLowerCase()}">${ogHead.replace('\n#', '').replace('\n', '')}</h1>`;
        string = string.replace(ogHead, head);
        return string;
    }
    return false;
});