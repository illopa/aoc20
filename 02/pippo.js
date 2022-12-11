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
    let recount = new RegExp(found[3],'g');
    let pippo = (found[4].match(recount) || []).length;
    if ( ( pippo >= inputA[i].min ) && ( pippo <= inputA[i].max ) ) { quanti++; }
    console.log("I="+i+"; C="+pippo+"; Q="+quanti+"; "+JSON.stringify(inputA[i]));
    i++;
}

