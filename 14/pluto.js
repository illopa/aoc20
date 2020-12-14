var fs = require('fs');
var _ = require('lodash');

let program = fs.readFileSync('input.txt').toString().replace(/\r/g,"").split("\n");

function isMask(l){
    return ( l[1] === 'a'); 
}

function getMask(l) {
    return l.substr('7');
}

function decodeMem(l) {
    let m =  l.match(/mem\[(\d*)\] = (\d*)/);
    return [m[1],m[2]];
}

function toBinary(s){
    return parseInt(s).toString(2).padStart(36,'0');
}

function doMask(m,b) {
    return m.split('').reduce( (s,c,i) => {
        let a = ( c === 'X') ? 'X' : ( ( c === '0') ?  b[i] : '1');
        s+=''+a;
        return s;
    },'');
}

function fAddress(m, a){
    if (m === '') { return a; }
    let c = m.substr(-1);
    let an = [];
    if ( c !== 'X') {
        an = a.map( (v) => ''+c+v );
    } else {
        an = a.reduce( (r,v) => {
            r = r.concat(['0'+v,'1'+v]);
            return r;
        },[]);
    }
    return fAddress(m.substr(0,m.length-1),an);
}

mem = {};
let res = 0;
let mask =  '';

program.forEach( (l) => {
    if ( isMask(l) ) { mask = getMask(l); }
    else {
        let v = decodeMem(l);
        let fmask = doMask(mask,toBinary(v[0]));
        let al = fAddress(fmask, ['']);
        al.forEach( (a) =>{
            mem[a] = parseInt(v[1]);
        });
    }
})
// console.log(mem);

res = _.reduce(mem, (r,v,i) => {
    return (r+v); 
},0);
console.log('RES',res);