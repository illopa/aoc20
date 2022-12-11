const { isString } = require('lodash');
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

i = 0;
let acc = 0;
let stack = [];
let size = p.length;
let j = 0;
let v = {};
let last = null;
while(true) { 
    if ( i === size) {
        console.log("END="+i+" ACC="+acc);
        return; 
    }     
    let instr = p[i];
    console.log("I="+i+" "+instr.line+" ACC="+acc);

    
    if ( v[i]) { 
        // BACK
        let goback = true;
        let s;        
        v[i] = 0;
        do {
            j--;
            s = stack[j];
            instr = p[s.i];
            v[s.i] = 0;
            if ( j === last) {
                instr.op = changeOp(instr.op);
            } else if (  (last === null || j < last) &&  canChange(instr.op) && !instr.c) {
                goback = false;
                
                instr.op = changeOp(instr.op);
                instr.c = 1;
                last = j;
                
            }
            
        } while(goback);
        

        acc = s.acc;
        i = s.i;
        console.log("CHANGED="+i+" ACC="+acc);
      
    } 
    stack[j] = {
        acc: acc,
        i: i
    };
    j++;
    v[i]=1;
    [i, acc] = calc(i, instr.op, instr.val, acc)

}

