const main = require('../index.js');

main.registerBlock(function(string) {
    let pre = '\n|', suf = '\n\n';

    if(string.indexOf(pre) == -1) return false;
    
    let start = string.indexOf(pre);
    let end = string.indexOf(suf, start + 1);
    let ogText = string.substring(start, end + 1);

    var lines = ogText.split("\n");
    var isHeader = true;
    var table = new HTMLTable();
    lines.forEach(function(line) {
        
        if (isHeaderSeparation(line)) {
            isHeader = false;
            return;
        }
        var vals = splitLine(line);
        table.addRow(vals, isHeader);
    });

    string = string.replace(ogText, table.getHTML())
    return string;


    function isHeaderSeparation(line) {
        let match = line.match(/(\|\s*(:)?\s*-{2,}\s*(:)?\s*)+\|/g);
        if (!Array.isArray(match)) return false;
        return match.length > 0;
    }
    function splitLine(line) {
        return line.split('|').map(x => x.trim()).filter((x, i, a) => { return x.length > 0 || [0, a.length].indexOf(i) === -1})
    }
    function HTMLTable() {
        this.ths = [];
        this.tds = [];
        this.alignments = [];
        this.getHTML = function() {
            return `<table${main.getStyle('table') ? ` class="${main.getStyle('table')}"`: ''}>` +
                this.ths.map((x, index) => { return this.getRow(x, 'th'); }, this).join('') +
                this.tds.map((x, index) => { return this.getRow(x, 'td'); }, this).join('') +
                '</table>'
        };
    
        this.getRow = function(vals, tag) {
            return "<tr>" + vals.map((x, index) => {
                if(x.length > 0 && x !== "") return "<" + tag + ">" + x + "</" + tag + ">"
            }).join('') + "</tr>";
        };
    
        this.addRow = function(vals, isHeader) {
            if (isHeader) {
                this.ths.push(vals);
            }
            else {
                this.tds.push(vals);
            }
        };
    }
});