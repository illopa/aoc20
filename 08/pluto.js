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
    // console.log("I="+i+" "+instr.op+" "+instr.val);

    i++;    
}

function calc(i, op, val, acc) {
    switch(op){
        case 'acc':
            acc += val;
        case 'nop':
            i++;
            break;
        case 'jmp':
            i += val;
            break;
    }
    return [i,acc];
};

function canChange(op) {
    return !( op === "acc");
};

function changeOp(op) {
    return ( op === "nop" ? "jmp" : (op === "jmp" ? "nop" : op) );
};


let size = p.length;

while(true) {

    let acc = 0;
    let v = {};
    let restart = false;
    let changed = false;
    i = 0;
    while(!restart) {  
        if ( i === size) {
            console.log("END="+i+" ACC="+acc);
            return; 
        }
        let instr = p[i];
        console.log("I="+i+" "+instr.line+" ACC="+acc);
        
        if ( v[i] ) { 
            // restart
            restart = true; 
            console.log("LOOP");       
        } else {
            v[i] = 1;
            if (!changed && !instr.c && canChange(instr.op)) {
                instr.c = 1;
                changed = true;
                console.log("CHANGED="+i); 
                [i, acc] = calc(i, changeOp(instr.op), instr.val, acc);
            } else {
                [i, acc] = calc(i, instr.op, instr.val, acc);
            }               

        }
    
    }

}