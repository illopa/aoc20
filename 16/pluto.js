var fs = require('fs');
var _ = require('lodash');

// range valid
function rvalid(v,r) {
    return ( (v>=r[0]) && (v<=r[1]));
}

// valid in all ranges
function valid(v) {
    return !(_.every(rules, (r) => !rvalid(v,r) ));
}

// when a class fires for a value
function classFires(v,r) {
    let [ c, a] = r;
    // console.log(v,a[0],a[1]);
    return rvalid(v,a[0]) || rvalid(v,a[1]);
}

// array of classes that fires for a value
function getFires(v) {
    return ocl.filter( (r) => classFires(v,r) ).map( (r) => r[0]);
}


// my ticket
let my = fs.readFileSync('myticket.txt').toString().replace(/\r/g,"").split("\n");
my = my[0].split(',').map((n) => parseInt(n) );

// classes
let cl = fs.readFileSync('class.txt').toString().replace(/\r/g,"").split("\n");
// class ranges
let ocl = cl.map( (l) => l.split(': ')).map( ([c,rs]) => [c, rs.split(' or ').map( (r) => r.split('-') )]);
// all ranges
let rules = cl.map( (l) => l.split(': ')).map( ([c,rs]) => rs.split(' or ').map( (r) => r.split('-').map( (n) => parseInt(n)) ) ).reduce((a,n) => a.concat(n),[]) ;

// nearby tickets
let nby = fs.readFileSync('nearbyticket.txt').toString().replace(/\r/g,"").split("\n");
nby = nby.map( (l) => l.split(',').map((n) => parseInt(n) ));

// valid nearby tickets 
nby = nby.filter(   (t) => {
    let f = t.filter( (v) => !valid(v) );
    return !(f.length > 0);
});

// validity class map for every position in all valid nearby tickets
let classmap = nby.slice(1).reduce( (a,t) => {
    let at = t.map( (v) =>  getFires(v));
    a = a.map( (s,i) => _.intersection(s,at[i]) );
    return a;
},nby[0].map( (v) =>  getFires(v)));

// console.log(classmap);

// determine which field is which
let collected = [];
while(collected.length<classmap.length) {
    let p = classmap.slice(1).reduce( (r,a) => (a.length === 1) && ((_.intersection(collected,a)).length === 0) ? a : r, classmap[0] );
    console.log(p); 
    collected = collected.concat(p[0]);
    classmap = classmap.map( (a) => (a.length === 1) ? a : _.difference(a,collected) );
}
console.log(classmap);

// get the result
let res = classmap.reduce( (m,a,i) => ( a.length === 1 ) && a[0].match(/departure/) ? m*my[i] : m, 1 )

console.log('RES=',res);


