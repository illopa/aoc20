var fs = require('fs');
var _ = require('lodash');

let program = fs.readFileSync('input.txt').toString().replace("\r","").split("\n");

function isMask(l){
    return ( l[1] === 'a'); 
}

function getMask(l) {
    return l.substr('7');
}

function decodeMask(m) {
    return [m.replace(/X/g,'1'),m.replace(/X/g,'0')];
}

function decodeMem(l) {
    let m =  l.match(/^mem\[(\d*)\] = (\d*)$/);
    return [m[1],m[2]];
}

function toBinary(s){
    return parseInt(s).toString(2).padStart(36,'0');
}


let mask =  decodeMask(getMask(program[0]));

let mem = decodeMem(program[1]);

let b = toBinary(mem[1]);

console.log(mask);

console.log(mask[1]);

console.log(b);

console.log(parseInt(b));

console.log(parseInt(mask[1]&parseInt(b)))



