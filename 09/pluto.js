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

let checkValue=1639024365; 
let checkj=653;

let start = n.length;
let range = { };
range.d = start;
range.sums = {};
range.sums[start] = n[start];

function  adds_contiguos(range, i ) {
    let v = n[i];
   //  let obj =  { d: i, sums: {i: v} } ;

    let obj = { };
    obj.d = i;
    obj.sums = {};
    obj.sums[i] = v;

    let r = Object.keys(range.sums);
    for(let j= 0; j < r.length; j++) {
        let k = r[j];
        let a = range.sums[k];
        let s = v + a; 
        if ( s == checkValue) {
            obj.sums[k] = s;
            obj.u = k;
            return obj;
        } else if ( s < checkValue){
            obj.sums[k] = s;
        }
    }
    return obj;

};

function minmax(d,u) {
    let vmin = n[d];
    let vmax = n[d];
    for(let j=d+1; j<=u; j++){
        if ( n[j] < vmin ) { vmin = n[j]; }
        if ( n[j] > vmax ) { vmax = n[j]; }
    }
    return [vmin,vmax];
}

console.log("I="+start+" "+JSON.stringify(range))
for (let i=start-1; i >= 0; i--) {
    range = adds_contiguos(range, i);
    console.log("I="+i+" "+JSON.stringify(range));

    if ( range.u ) {
        let [vmin,vmax] = minmax(range.d,range.u);
        console.log("MIN="+vmin+" MAX="+vmax+" S="+(vmin+vmax));
        return;
    }
}