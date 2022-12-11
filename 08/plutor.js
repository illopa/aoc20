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
        val: parseInt(m[2])
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

function engine(id, inner, i, acc, v, c) {
    console.log("ID="+id+" I="+i+" ACC="+acc);
    if ( i === size) {
        console.log("END="+i+" ACC="+acc);
        process.exit(0); 
    }   
    if ( v[i] ) { 
        console.log("LOOP="+id);
        return; 
    }
    v[i] = 1;

    let instr = p[i];
    let [i0,acc0] = calc(i, instr.op, instr.val, acc);
    engine(id, (inner+1), i0, acc0, v, c);
    if (!c && canChange(instr.op) ) {
        console.log("CHANGED="+i);
        let [i1,acc1]=  calc(i, changeOp(instr.op), instr.val, acc);
        engine(inner,(inner+1), i1, acc1, Object.assign({}, v), 1);
    }

}

engine(0,0,0,0,{});
