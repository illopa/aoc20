var fs = require('fs');
var _ = require('lodash');

let cl = fs.readFileSync('class.txt').toString().replace(/\r/g,"").split("\n");

// cl = cl.map( (l) => l.split(': ')).map( ([c,rs]) => [c, rs.split(' or ').map( (r) => r.split('-') )]);

let rules = cl.map( (l) => l.split(': ')).map( ([c,rs]) => rs.split(' or ').map( (r) => r.split('-').map( (n) => parseInt(n)) ) ).reduce((a,n) => a.concat(n),[]) ;

console.log(JSON.stringify(rules));

let nby = fs.readFileSync('nearbyticket.txt').toString().replace(/\r/g,"").split("\n");

nby = nby.map( (l) => l.split(',').map((n) => parseInt(n) )).reduce( (a,n) => a.concat(n),[]);

function rvalid(t,r) {
    return ( (t>=r[0]) && (t<=r[1]));
}

function valid(t) {
    return !(_.every(rules, (r) => !rvalid(t,r) ));
}

let res = nby.filter( (t) => !valid(t) ).reduce( (s,t) => s+t,0);

console.log(res);
