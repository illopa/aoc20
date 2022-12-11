var fs = require('fs');
var _ = require('lodash');

let mem = fs.readFileSync('input.txt').toString().replace("\r","").split("\n");

let est = parseInt(mem[0]);
let bus = mem[1].split(',').filter( (b) => (b!=='x')).map( (b) => parseInt(b));

let wb = {};
let dep = bus.map( (b) => {
    let w = (b -(est % b ));
    wb[w]=b;
    return w;
});

let res = _.reduce(wb, (r,b,k) => {
    let w = parseInt(k);
    
    if ( (r.b === 0)  || ( w < r.w )   ) { r.b = b; r.w = w;  r.res = w * b; console.log(w); }
    return r;
}, { b: 0});


console.log(bus, est);
console.log(dep);
console.log(wb);
console.log(res);