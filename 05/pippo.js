const lineByLine = require('n-readlines');
const liner = new lineByLine('input.txt');

let rep = {F: "0", B: "1", L: "0", R:"1"};

let line;
let i = 0; 
let max = 0;
while (line = liner.next()) {
    let cur =""+line;
    let row = cur.substr(0,7).replace(/[FB]/g, c => rep[c]);
    let col = cur.substr(7,10).replace(/[LR]/g, c => rep[c]);
    var seatID = parseInt(row,2) * 8 + parseInt(col,2)
    console.log("I="+i+";  R="+row+"; C="+col+" "+parseInt(row,2)+" "+parseInt(col,2)+" ID="+seatID+" "+parseInt(cur.replace(/[FBLR]/g, c => rep[c]),2)+" M="+max);
    if (seatID > max ) {max = seatID; }
    i++;
    
    
}

