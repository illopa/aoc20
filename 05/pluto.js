const lineByLine = require('n-readlines');
const liner = new lineByLine('input.txt');

let rep = {F: "0", B: "1", L: "0", R:"1"};

let seat= [];
for(let i=0;i<128;i++){
    seat[i]="........";
}

let line;
let i = 0; 
let min = 1024;
let max = 0;
let ids = {};
while (line = liner.next()) {
    let cur =""+line;
    let row = cur.substr(0,7).replace(/[FB]/g, c => rep[c]);
    let col = cur.substr(7,10).replace(/[LR]/g, c => rep[c]);
    let r = parseInt(row,2);
    let c = parseInt(col,2);
    var seatID = r * 8 + c;
    if (seatID > max ) {max = seatID; }
    if (seatID < min ) {min = seatID; }
    
    ids[seatID]=1;
    let rr = seat[r];
    seat[r] = rr.substr(0,c)+'X'+rr.substr(c+1);
    console.log("P="+rr+"; R="+r+"; C="+c+" N="+seat[r]);
    i++;
 
}
for(let i=0;i<128;i++){
    console.log(seat[i]+" "+i);
}
for(let j=min+1;j<max;j++){
    if ( !ids[j] && ids[j-1] &&ids[j+1] ) {
        console.log("MYSEATID="+j);
        return;
    }
    
}

