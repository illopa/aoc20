var fs = require('fs');

function simple(stem) {
    let tot = 0;
    let op = '+';
    for (let i = 0; i < stem.length; i++) {
        let c = stem[i];
        
        if ( ( c === '+') || ( c === '*') ) { op = c; }
        else if (c && (c !== '(') ) { 
            if ( op === '+')  { tot = tot + parseInt(c); }
            if ( op === '*')  { tot = tot * parseInt(c); }  
        }
    }
    // console.log('T',tot);
    return tot;
}

/*
    1 + (2 * 3) + (4 * (5 + 6))

    the matrix m depicts the expression levels
    
    1
    +
    (   
        2
        *
        3
        )
    +   
    (
        4
        *
        (
            5
            +
            6
            )
        )
 */

function calc(stem) {

    let m=[];
    let p = 0;
    let pmax = 0;
    for (let i = 0; i<stem.length; i++){
        m[i]=[];
        m[i][p]=stem[i];
        if ( stem[i] ==='(') { p++; }
        if ( stem[i] ===')') { p--; }
        if ( p > pmax) { pmax = p; }
    }
  
    let inner = [];
    for (let j=pmax; j>=0;j--) {
        for (let i = 0; i<stem.length; i++){
            let x = m[i][j];
            if ( x === ')' ) {
                let part = simple(inner);
                m[i][j-1] = part;
                inner = [];
            } else if ( x ) { inner.push(x); }
        }
    }
    return simple(inner);
}

let hw = fs.readFileSync('input.txt').toString().replace(/\r/g,"").split("\n");

let res = hw.reduce( (r,line) => {
    let stem = line.replace(/\(/g,'( ').replace(/\)/g,' )').split(' ',);
    let lineres = calc(stem);
    // console.log('LC',lineres)
    return r + lineres;
},0);


console.log('RES',res);

