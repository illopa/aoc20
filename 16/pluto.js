var fs = require('fs');
var _ = require('lodash');

let my = fs.readFileSync('myticket.txt').toString().replace(/\r/g,"").split("\n");
my = my[0].split(',').map((n) => parseInt(n) );

let cl = fs.readFileSync('class.txt').toString().replace(/\r/g,"").split("\n");

let ocl = cl.map( (l) => l.split(': ')).map( ([c,rs]) => [c, rs.split(' or ').map( (r) => r.split('-') )]);
let rules = cl.map( (l) => l.split(': ')).map( ([c,rs]) => rs.split(' or ').map( (r) => r.split('-').map( (n) => parseInt(n)) ) ).reduce((a,n) => a.concat(n),[]) ;

// console.log(JSON.stringify(rules));

let nby = fs.readFileSync('nearbyticket.txt').toString().replace(/\r/g,"").split("\n");

nby = nby.map( (l) => l.split(',').map((n) => parseInt(n) ));

console.log(nby);


function rvalid(t,r) {
    return ( (t>=r[0]) && (t<=r[1]));
}

function valid(t) {
    return !(_.every(rules, (r) => !rvalid(t,r) ));
}


nby = nby.filter(   (t) => {
    let f = t.filter( (v) => !valid(v) );
    return !(f.length > 0);
});

let reft = nby[0];

// console.log(reft);

console.log(ocl);

function ruleFire(v,r) {
    let [ c, a] = r;
    // console.log(v,a[0],a[1]);
    return rvalid(v,a[0]) || rvalid(v,a[1]);
}

function getValid(v,refc) {

    for(let i=0; i<refc.length;i++) {
        let r=refc[i];
        if (r && ruleFire(v,r)) { refc[i]=null; return r[0]; }
    }

}


reft = nby[0];
let mc = [];
let refc = _.cloneDeep(ocl);
reft.forEach( (v,i) => {
    mc[i] = getValid(v,refc);
});
console.log(reft,JSON.stringify(mc));

let res = mc.reduce( (m,c,i) => {
    if ( c.match(/departure/) ) { m = m*my[i];}
    return m
},1);
console.log('RES=',res);


