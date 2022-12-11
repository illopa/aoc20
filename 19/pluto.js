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
    console.log('I',i,'R0',r0);
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

/*

0: 8 11
8: 42 | 42 8
11: 42 31 | 42 11 31

42*h 42*k 31*k =>  h, k > 1     aab aaabb aaaaaaab aaaaaabb    abbb
 */

let reg = {
    42: rulecomb('42'),
    31: rulecomb('31')
};

// console.log(reg);

let fl42 = reg['42'][0].length;
let fl31 = reg['31'][0].length;

function make_re11(re42,re31) {
    let c42 = re42.join('|');
    let c31 = re31.join('|');
    let re11s = '^('+c42+')+('+c31+')+$';
    // console.log(re11s)
    return RegExp(re11s);
}

function make_re31(re31) {
    let c31 = re31.join('|');
    let re31s = '('+c31+')$';
    // console.log(re31s)
    return RegExp(re31s);
}

function make_re42(re42) {
    let c42 = re42.join('|');
    let re42s = '^('+c42+')';
    // console.log(re42s)
    return RegExp(re42s);
}

function make_re42all(re42) {
    let c42 = re42.join('|');
    let re42s = '^('+c42+')+$';
    // console.log(re42s)
    return RegExp(re42s);
}

let re11 = make_re11(reg['42'],reg['31']);
let re31 = make_re31(reg['31']);
let re42 = make_re42(reg['42']);
let re42all = make_re42all(reg['42']);

function mf42(m42,f42){
    return !(_.every(f42, (re) => !m42.match(re) ))
}

function mf11(m11) {
    if ( m11 === '') { return true; }
    if ( m11.length  < (fl42+fl31) ) {  return m11.match(re42all); }
    if ( m11.match(re31)  && m11.match(re42) ) { 
        return mf11( m11.substr(fl42, m11.length -(fl42+fl31)));
    }
    return m11.match(re42all); 
}

function mfpart2(m) {
    let ms = [ m.substr(0,fl42),  m.substr(fl42) ];

    return mf42(ms[0],reg['42']) &&  ms[1].match(re31) && ms[1].match(re42) &&  mf11(ms[1]);
}


let mm = message.filter( (m) => mfpart2(m) ); 

console.log('MM',mm);
console.log('RES',mm.length);

