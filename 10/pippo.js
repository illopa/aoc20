var fs = require('fs');
var _ = require('lodash');

let n = fs.readFileSync('input.txt').toString().replace("\r","").split("\n").map( (v) => parseInt(v));

n = n.sort((a,b) => (a-b));

// console.log(JSON.stringify(n));

let res = n.reduce( (o,v) => {
    let p = o.p || 0; o.p = v;
    let d = v-p;
    o[d] = o[d] || 0; o[d]++;
    return o; 
},{});

console.log("1="+res[1]+" 3="+(res[3]+1)+" O="+(res[1]*(res[3]+1)));


