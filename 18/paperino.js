/*

1 + 2 * 3 + 4 * 5 + 6

1 + (2 * 3) + (4 * (5 + 6))

((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2

*/

const { isArray } = require("lodash");

let line ="((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2";

let stem = line.replace(/\(/g,'( ').replace(/\)/g,' )').split(' ',);


function doexp(stem,exp) {
    // console.log('EXP',exp);
    if (stem.length === 0) { return exp; }
    let op = stem.shift();
    let c = stem.shift();
    // console.log('OP C',op,c);
    if ( c === '(') {
        let p = 1;
        let e;
        let sub = [];
        while ( p ) {
            e = stem.shift();
            // console.log('E',e);
            if ( e === ')') { p--; }
            if ( e === '(') { p++; }
            if ( p ) { sub.push(e); } 
            // console.log('S',sub);           
        } 
        sub.unshift('+');
        let pe = doexp(sub,[]) 
        exp.push([op,pe]);
    } else {
        exp.push([op,c]);
    }

    return doexp(stem,exp);
}

function doexpmprec(stem,exp) {
    // console.log('EXP',exp);
    if (stem.length === 0) { return exp; }
    let op = stem.shift();
    let c = stem.shift();
    // console.log('OP C',op,c);
    if ( c === '(') {
        let p = 1;
        let e;
        let sub = [];
        while ( p ) {
            e = stem.shift();
            // console.log('E',e);
            if ( e === ')') { p--; }
            if ( e === '(') { p++; }
            if ( p ) { sub.push(e); } 
            // console.log('S',sub);           
        } 
        sub.unshift('+');
        let pe = doexpmprec(sub,[]) 
        exp.push([op,pe]);
    } else if ( op === '*') {
        stem.unshift(c);
        stem.unshift('+');
        let pe = doexpmprec(stem,[]) 
        exp.push([op,pe]);
        return exp;
    } else {
        exp.push([op,c]);
    }

    return doexpmprec(stem,exp);
}

function docalc(exp,tot) {
    if (!tot) { tot = 0; }
    if (exp.length === 0) { return tot; }
    let [op, e ] = exp.shift();
    let n = 0;
    if ( Array.isArray(e)) {
        n = docalc(e,0);
    } else { n = parseInt(e); }
    if (op === '+') { tot += n;}
    if (op === '*') { tot = tot * n;}
    return docalc(exp,tot);
}

stem.unshift('+');
console.log(stem);

// let exp = doexp(stem,[]);
let exp = doexpmprec(stem,[]);

console.log('EXP',JSON.stringify(exp,null,2));

let res = docalc(exp,0);

console.log('RES',res);

