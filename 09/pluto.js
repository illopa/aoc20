var fs = require('fs');
var _ = require('lodash');

let n = fs.readFileSync('input.txt').toString().replace("\r","").split("\n").map( (v) => parseInt(v));

let checkValue=1639024365; 

let l = 0, r = 0;
let sum = n[0];
while( (sum !== checkValue) && (r < n.length) ){
    if (sum < checkValue ) { r++; sum += n[r]}
    else { sum -= n[l]; l++; }
}

let res = n.slice(l,(r+1)).reduce( (o,v) => {
    if ( !o.vmin || (v < o.vmin) ) { o.vmin = v; }
    if ( !o.vmax || (v > o.vmax) ) { o.vmax = v; }
    return o;
},{});

console.log("MIN="+res.vmin+" MAX="+res.vmax+" S="+(res.vmin+res.vmax));
