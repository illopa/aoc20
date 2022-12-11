var fs = require('fs');
var _ = require('lodash');

function pc(a,b) {
    let c = b.map( sb => a.map(sa => sa+sb ) );
    c = c.reduce( (b,a) => b.concat(a),[]);
    return c;
}

function rulecomb(i) {
    // console.log('rulecomb',i)
    if ( leaf[i]) { return leaf[i]; }
   let rl = rules[i];
   let res = rl.reduce( (o,l) => {
                return o.concat(l.reduce( (a1,b1) => pc(a1,rulecomb(b1)) ,['']));
            },[]);
    leaf[i] = res;
    // console.log(i,res.length)
    return res;
}

function rulesconcat(i,a) {
    if ( !rules[i] || rules[i].length > 1 ) { return a.concat(i); }
    let r0 = rules[i][0];
    // console.log('I',i,'R0',r0);
    return a.concat(r0.reduce( (p, ri) => rulesconcat(ri,p), []));
}

let rules = {};
let leaf = {};

let message = fs.readFileSync('message.txt').toString().replace(/\r/g,"").split("\n");

let ri = fs.readFileSync('rules.txt').toString().replace(/\r/g,"").split("\n");

ri = ri.map( (l) => l.split(': '));
ri.forEach( ([n,v]) => {
    if (v.match('"')) {
        leaf[n] = [v.replace(/"/g,'')];
    } else {
        rules[n] = v.split(' | ').map( s => s.split(' '));
        
    }
 });

// console.log(rules);
// console.log(leaf);

let rc0 = rulesconcat('0',[]);
// console.log(rc0);

let rf = {}

rf.f0 = rc0.map( (r) => rulecomb(r) );
rf.fl = rf.f0.map( (f) => f[0].length);
rf.len = rf.fl.reduce( (c,l) => c+l);
rf.re = rf.f0.map( (f) => f.map ( (s) => RegExp('^'+s+'$')));

// console.log('fl',rf.fl);
// console.log('len',rf.len);
// console.log('filter',rf.re);

function mf(m,rf) {
    if (m.length !== rf.len ) { return false; }
    let ms = [];
    let s = 0;
    for(let i = 0; i< rf.fl.length; i++) {
        ms[i] = m.substr(s,rf.fl[i]);
        s+=rf.fl[i];
    }
    return _.every(rf.f0, (f,i) => !(_.every(f, (re) => !ms[i].match(re) )) )
}

let mm = message.filter( (m) => mf(m,rf) ); 

console.log('MM',mm);
console.log('RES',mm.length);

