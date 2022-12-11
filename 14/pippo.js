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
        let a = ( c === 'X') ? b[i] : c;
        s+=''+a;
        return s;
    },'');
}

mem = {};

let mask =  getMask(program[0]);

program.slice(1).forEach( (l) => {
    if ( isMask(l) ) { mask = getMask(l); }
    else {
        let v = decodeMem(l);
        mem[v[0]] = parseInt(doMask(mask,toBinary(v[1])),2);
    }
})
// console.log(mem);

let res = _.reduce(mem, (r,v) => r+v ,0);
console.log('RES',res);







