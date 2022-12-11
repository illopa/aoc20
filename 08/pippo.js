const lineByLine = require('n-readlines');
const liner = new lineByLine('input.txt');

let line;
let i = 0; 
let p=[];
while (line = liner.next()) {
    let cur =(""+line).replace(/[\n\r]/g,'');

    let f = /^([^\s]+) ([+-]{1}[\d]+)$/;
    let m = cur.match(f);

    let instr ={
        line: cur,
        op: m[1],
        val: parseInt(m[2]),
        d: 0
    };
    p[i]=instr;
    console.log("I="+i+" "+instr.op+" "+instr.val);

    i++;    
}

i = 0;
let acc = 0;
while(true) {
    let instr = p[i];
    console.log("I="+i+" "+instr.line+" ACC="+acc);
    if ( instr.d === 1) { return; }
    instr.d = 1;
    switch(instr.op){
        case 'acc':
            acc += instr.val;
        case 'nop':
            i++;
            break;
        case 'jmp':
            i+= instr.val;
            break;
    }
     
}

