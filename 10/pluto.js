var fs = require('fs');
var _ = require('lodash');

let n = fs.readFileSync('input.txt').toString().replace("\r","").split("\n").map( (v) => parseInt(v));

n = n.sort((a,b) => (a-b));

function calc(p,n,i,o) {
    let res = 0;

    function step(j) {
        let v = n[i+j] || 0;
        if ( v === 0 ) { ; }
        else if ( (v-p) <= 3) {
            if ( !o[i+j+1]) { o = calc(v,n,i+j+1,o); }     
            res += o[i+j+1];
        }        
    };

    step(2);
    step(1);
    step(0);

    if (!n[i]) { res++; }

    o[i] = res;
    return o;
}

let o  = calc(0,n,0,{});

console.log("R="+o[0]);
