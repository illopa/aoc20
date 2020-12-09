var fs = require('fs');
var _ = require('lodash');

let n = fs.readFileSync('input.txt').toString().replace("\r","").split("\n").map( (v) => parseInt(v));

// console.log(JSON.stringify(n));

function adds(n,len,r) {
    let l = r+1-len; l = l < 0 ? 0 : l;
    let a = n[r];
    return n.slice(l,r).reduce( (o,b,i) => {
        if ( a !== b) { o[(a+b)] = l+i; }
        return o;
    },{});
}

function check(v,sums,len,i) {
    return _.every(sums.slice(i-len,i), (o) => !o[v] || (o[v] < (i-len) ) );
}

let len = 25;
let sums = [];
sums[0]={};

for(let i=1; i<n.length; i++){
    if (i >= len) {
        if ( check(n[i],sums,len,i) ) { console.log("NOT_VALID="+n[i]+" I="+i); return;}
    }
    sums[i]=adds(n,len,i);
}
