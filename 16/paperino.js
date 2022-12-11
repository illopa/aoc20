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
    return rvalid(v,a[0]) || rvalid(v,a[1]) && 1 || 0;
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

function arrayOp(a,b,op) {
    return a.map( (ai,i) => op.call(this,ai,b[i]));
}

function matrixOp(a,b,op) {
    return a.map( (ai,i) => ai.map( (aij,j) => op.call(this,aij,b[i][j])));
}

// validity map matrix r(i,j,z) = {0,1} i,j,z ticket,field,class
let r = nby.map( (t) => ( t.map( (v) =>  ( ocl.map( (r) => classFires(v,r) ) ) ) ) );
// intersection validity map m(j,z) = {0,1} j,z field,class
let m = r.reduce( (o,vr) => !o ? vr : matrixOp(o,vr, (a,b) => a && b && 1 || 0) ,null ); //  vr.map( (v,j) => (v.map( (r,z) => r && o[j][z] && 1 || 0))

// s[z] = o;  o is the order of class z; o is the number of valid fields for class z
let s = m.reduce( (o,v,j) => arrayOp(o,v, (a,b) => a+b), Array(m[0].length).fill(0)  );

// p[z] = w; w is the weigth, the sum of the index j of valid fields for class z
let p = m.reduce( (o,v,j) => arrayOp(o,v, (a,b) => a+(j+1)*b), Array(m[0].length).fill(0) );


let s1 = [], f = [];
// s1 is the opposit mapping of s; s[z] = o; s1[o] = z 
s.forEach( (sz,z) => { s1[sz-1] = z;});

// f is the mapping of field j with class name f[j] = cname
s1.forEach( (z,o) => { let j = p[z]-(o===0?0:p[s1[o-1]])-1; f[j] = ocl[z][0]; } );


console.log(m);
console.log(s);
// console.log(p);
console.log(s1);
console.log(f);

// get the result
let res = f.reduce( (r,cname,j) => cname.match(/departure/) ? r*my[j] : r, 1 );

console.log('RES=',res);