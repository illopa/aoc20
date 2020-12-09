const lineByLine = require('n-readlines');
const liner = new lineByLine('input.txt');

let line;
let i = 0; 
let n=[];
while (line = liner.next()) {
    let cur =(""+line).replace(/[\n\r]/g,'');

    n[i] = parseInt(cur);
    // console.log("I="+i+"; N="+n[i]);
    i++;    
}

let sums = [];

function adds(n,l,i) {
    let obj = {};
    let a = n[i];
    for(let j=i-1; (j >= 0) && ( j > (i-l) ); j--) {
        let b = n[j];
        let s = (a+b);
        if (a !== b) {obj[s]=1;}
    }
    // console.log("I="+i+" "+JSON.stringify(obj));
    return obj;
}

function check(v,sums,l,i) {
    for(let j=i-1; j > (i-l); j--){
        let o = sums[j];
        // console.log("J="+j+" V="+v+" "+JSON.stringify(o));
        if ( o && o[v] ) { return true; }
    }
    return false;
}

let l = 25;
sums[0]={};
for(let i=1; i<n.length; i++){
    if (i >= l) {
        if ( !check(n[i],sums,l,i) ) { console.log("NOT_VALID="+n[i]+" I="+i); return;}
    }
    sums[i]=adds(n,l,i);
}

