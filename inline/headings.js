const main = require('../index.js');


function convert(string, plain) {
    if(string.indexOf('\n######') !== -1) {
        if(plain) return string.replace('\n######', '');
        let start = string.indexOf('\n######');
        let end = string.indexOf('\n', start + 6);
        let ogHead = string.substring(start, end);
        let head = `\n<h6${main.getStyle('h6', true)} id="${ogHead.replace('\n###### ', '').replace('\n', '').replace(/\s+/g, '-').toLowerCase()}">${ogHead.replace('\n######', '').replace('\n', '')}</h6>`
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n#####') !== -1) {
        if(plain) return string.replace('\n#####', '');
        let start = string.indexOf('\n#####');
        let end = string.indexOf('\n', start + 5);
        let ogHead = string.substring(start, end);
        let head = `\n<h5${main.getStyle('h5', true)} id="${ogHead.replace('\n##### ', '').replace('\n', '').replace(/\s+/g, '-').toLowerCase()}">${ogHead.replace('\n#####', '').replace('\n', '')}</h5>`;
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n####') !== -1) {
        if(plain) return string.replace('\n####', '');
        let start = string.indexOf('\n####');
        let end = string.indexOf('\n', start + 4);
        let ogHead = string.substring(start, end );
        let head = `\n<h4${main.getStyle('h4', true)} id="${ogHead.replace('\n#### ', '').replace('\n', '').replace(/\s+/g, '-').toLowerCase()}">${ogHead.replace('\n####', '').replace('\n', '')}</h4>`;
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n###') !== -1) {
        if(plain) return string.replace('\n###', '');
        let start = string.indexOf('\n###');
        let end = string.indexOf('\n', start + 3);
        let ogHead = string.substring(start, end);
        let head = `\n<h3${main.getStyle('h3', true)} id="${ogHead.replace('\n### ', '').replace('\n', '').replace(/\s+/g, '-').toLowerCase()}">${ogHead.replace('\n###', '').replace('\n', '')}</h3>`;
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n##') !== -1) {
        if(plain) return string.replace('\n##', '');
        let start = string.indexOf('\n##');
        let end = string.indexOf('\n', start + 2);
        let ogHead = string.substring(start, end);
        let head = `\n<h2${main.getStyle('h2', true)} id="${ogHead.replace('\n## ', '').replace('\n', '').replace(/\s+/g, '-').toLowerCase()}">${ogHead.replace('\n##', '').replace('\n', '')}</h2>`;
        string = string.replace(ogHead, head);
        return string;
    }
    if(string.indexOf('\n#') !== -1) {
        if(plain) return string.replace('\n#', '');
        let start = string.indexOf('\n#');
        let end = string.indexOf('\n', start + 1);
        let ogHead = string.substring(start, end)
        let head = `\n<h1${main.getStyle('h1', true)} id="${ogHead.replace('\n# ', '').replace('\n', '').replace(/\s+/g, '-').toLowerCase()}">${ogHead.replace('\n#', '').replace('\n', '')}</h1>`;
        string = string.replace(ogHead, head);
        return string;
    }
    return -1;
};

main.registerInline({exec: convert});