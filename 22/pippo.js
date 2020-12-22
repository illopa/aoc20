var fs = require('fs');
var _ = require('lodash');

let p1 = fs.readFileSync('p1.txt').toString().replace(/\r/g,"").split("\n");
let p2 = fs.readFileSync('p2.txt').toString().replace(/\r/g,"").split("\n");

p1 = p1.map( (e) => parseInt(e));
p2 = p2.map( (e) => parseInt(e));

console.log('P1',p1);
console.log('P2',p2);

function combat(p1,p2) {
    let e1 = p1.shift();
    let e2 = p2.shift();
    if (e1 > e2 ) { p1.push(e1,e2); }
    else {  p2.push(e2,e1); }
    return [p1,p2]
}

function score(p){
    if (p.length === 0) { return 0; }
    let ps = [...p];
    ps.reverse();
    return ps.reduce( (s,v,i) => s+v*(i+1),0);
}

let r = 1;
while (p1.length > 0 && p2.length > 0) {
    console.log('ROUND',r);
    [p1,p2] = combat(p1,p2);
    r++;
    
    console.log('P1',p1);
    console.log('P2',p2);  
    
    
}

let res = score(p1) + score(p2);
console.log('RES',res);