var fs = require('fs');
var _ = require('lodash');

let board = fs.readFileSync('input.txt').toString().replace("\r","").split("\n");

let rowsnum = board.length;
let colsnum = board[0].length;

// console.log(JSON.stringify(board));
function encode(row,col) { return (row+","+col); }

let space = {};

board.forEach( (b,i) => {
    b.split('').forEach( (c,j) => {
        if ( c === 'L') { space[encode(i,j)] = { P: -1}; }  
    });
});

let dir = {
    "NO": [-1,-1],
    "N": [-1,0],
    "NE": [-1,1],
    "O": [0,-1],
    "E":[0,1],
    "SO":[1,-1],
    "S":[1,0],
    "SE":[1,1]
};

function nextS(row,col,dv) { 
    let [dr,dc] = dv;
    let nr = row+dr; 
    let nc = col+dc;
    if ( (nr < 0) || (nr >= rowsnum) || (nc < 0) || ( nc >= colsnum) ) { return ''; }
    let e = encode(nr,nc);
    if ( space[e] ) { return e; }
    return nextS(nr,nc,dv);
}

_.forEach(space, (o,rc) => {
    let [r,c] = rc.split(","); r = parseInt(r); c = parseInt(c);
    _.forEach(dir, (dv,dn) => {
        o[dn] = nextS(r,c,dv);
    });
});

// console.log(JSON.stringify(space));

function getP(e,sp) {
    return e && sp[e] && sp[e]["P"] || null;
};

function decodeL(e,sp){
    let p = getP(e,sp);
    return ((p && p === 1) ? 0 : 1);
};

function decodeO(e,sp){
    let p = getP(e,sp);
    return  ( (p && p === 1) ? 1 : 0); 
};   


let ch = 0;
let occ = 0;
do {
    ch = 0;
    occ = 0;

    let nextSpace = _.cloneDeep(space);

    _.forEach(space, (o,rc) => {
        let [r,c] = rc.split(","); r = parseInt(r); c = parseInt(c);
        if ( o["P"] === 1) {
            let n = 0;
            _.forEach(dir, (dv,dn) => { 
                n+=  decodeO(o[dn],space);
            });
            if ( n >= 5 ) { nextSpace[rc]["P"] = -1; ch++; } else { occ++; }
        } else {
            let n = 0;
            _.forEach(dir, (dv,dn) => { 
                n+=  decodeL(o[dn],space);
            });
            if ( n === 8 ) {  nextSpace[rc]["P"] = 1; ch++; occ++; }   
        }
    });

    space = nextSpace;
          
    console.log("CH="+ch+" OCC="+occ);

} while (ch > 0);

console.log("OCC="+occ);

