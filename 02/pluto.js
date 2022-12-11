const lineByLine = require('n-readlines');
const liner = new lineByLine('input.txt');

let line;
let inputA = Array();
let i = 0; 
var quanti = 0;
while (line = liner.next()) {
    let re = /(\d+)-(\d+) ([a-z]): ([a-z]+)/;
    line = ""+line;
    let found = line.match(re);
    // console.log("line="+line);
    // console.log("found="+found);

    inputA[i] = {
        min: parseInt(found[1]),
        max: parseInt(found[2]),
        c: found[3],
        s: found[4]
    };

    var ok = (found[4][inputA[i].min-1] === found[3]) ? 1 : 0;
    ok += (found[4][inputA[i].max-1] === found[3]) ? 1 : 0;
    if ( ok === 1 ) { quanti++; }
    console.log("I="+i+"; C="+ok+"; Q="+quanti+"; "+JSON.stringify(inputA[i]));
    i++;
    
}

