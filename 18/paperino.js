var fs = require('fs');

/*

    exp = [ [op,exp1],[op,exp2],[op,exp3],..   ]
    exp = value

 */

const get_exp1 = function (stem,exp) {
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
        let pe = get_exp1(sub,[]) 
        exp.push([op,pe]);
    } else {
        exp.push([op,c]);
    }

    return get_exp1(stem,exp);
};

const get_exp2 = function(stem,exp) {
    // console.log('EXP',exp);
    if (stem.length === 0) { return exp; }
    let op = stem.shift();
    let c = stem.shift();
    // console.log('OP C',op,c);
    if ( op === '*') {
        stem.unshift(c);
        stem.unshift('+');
        // console.log('*',stem)
        let pe = get_exp2(stem,[]) 
        exp.push([op,pe]);
        return exp;
    } else if ( c === '(') {
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
        // console.log('(',sub);
        let pe = get_exp2(sub,[]) 
        exp.push([op,pe]);
    } else {
        exp.push([op,c]);
    }

    return get_exp2(stem,exp);
};

function do_calc(exp,tot) {
    if (!tot) { tot = 0; }
    if (exp.length === 0) { return tot; }
    let [op, e ] = exp.shift();
    let n = 0;
    if ( Array.isArray(e)) {
        n = do_calc(e,0);
    } else { n = parseInt(e); }
    if (op === '+') { tot += n;}
    if (op === '*') { tot = tot * n;}
    return do_calc(exp,tot);
}

function do_hw(hw,fn) {
    return hw.reduce( (r,line) => {
        let stem = line.replace(/\(/g,'( ').replace(/\)/g,' )').split(' ',);
        stem.unshift('+');
        let exp = fn.call(this,stem,[]);    
        let lineres = do_calc(exp,0);
        // console.log('LC',lineres)
        return r + lineres;
    },0);
}

let hw = fs.readFileSync('input.txt').toString().replace(/\r/g,"").split("\n");

let res = do_hw(hw,get_exp1);

console.log('RES PART 1',res);

res = do_hw(hw,get_exp2);

console.log('RES PART 2',res);