const main = require('../index.js');

main.registerBlock(function(string) {
    let pre = '\r\n|', suf = '\r\n\r\n';

    if(string.indexOf(pre) == -1) return false;
    
    let start = string.indexOf(pre);
    let end = string.indexOf(suf, start + 1);
    let ogText = string.substring(start, end + 1);

    var lines = ogText.replace(/\r\n/g,"\n").split("\n");
    var isHeader = true;
    var table = new HTMLTable();
    lines.forEach(function(line) {
        
        if (isHeaderSeparation(line)) {
            isHeader = false;
            return;
        }
        var vals = splitLine(line);
        // if(vals.length <= 0) return;
        table.addRow(vals, isHeader);
    });

    string = string.replace(ogText, table.getHTML())
    return string;

    // return {
    //     html: ,
    //     htmlString: table.getHTMLString()
    // }



    function isHeaderSeparation(line) {
        let match = line.match(/(\|\s*(:)?\s*-{3,}\s*(:)?\s*)+\|/g);
        if (!Array.isArray(match)) return false;
        return match.length > 0;
    }

    // function getAlignment(headerLine) {
    //     let parts = splitLine(headerLine);
    
    //     return parts.map(col => {
    //         if (col.length === 0) return alignments[0];
    //         let firstChar = col.charAt(0),
    //             lastChar = col.slice(-1);
    //         if (firstChar === ':' && lastChar === ':') return alignments[1];
    //         if (lastChar === ':') return alignments[2];
    //         return alignments[0];
    //     })
    // }

    // function getStyleAttribute(alignment) {
    //     if (alignment === alignments[0]) return '';
    //     return ' style="text-align: ' + alignment + ';"';
    // }

    function splitLine(line) {
        return line.split('|').map(x => x.trim()).filter((x, i, a) => { return x.length > 0 || [0, a.length].indexOf(i) === -1})
    }

    function HTMLTable() {
        this.ths = [];
        this.tds = [];
        this.alignments = [];
    
        // this.getHTMLString = function() {
        //     let newline = '\n';
        //     return "<table>" + newline +
        //         this.ths.map((x) => { return this.getRow(x, 'th'); }, this).join(newline) + newline +
        //         this.tds.map((x) => { return this.getRow(x, 'td'); }, this).join(newline) + newline +
        //         "</table>"
        // };
    
        this.getHTML = function() {
            return `<table ${main.getStyle('table') ? `class="${main.getStyle('table')}"` : null}>` +
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
    
        // this.setAlignments = function(alignments) {
        //     this.alignments = alignments;
        // };
    
        // this.getAlignment = function(colIndex) {
        //     if (this.alignments.length <= colIndex) return alignments[0];
        //     return this.alignments[colIndex];
        // }
    }
});