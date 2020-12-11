var fs = require('fs');
var _ = require('lodash');

let board = fs.readFileSync('input.txt').toString().replace("\r","").split("\n");

// console.log(JSON.stringify(board));

let s = board.map( (b) => {
    return b.split('').reduce( (o,c,i)=> {
        if ( c === 'L') { o[i] = -1; }
        return o;
    },{});
});

let ch = 0;
let occ = 0;
do {
    ch = 0;
    occ = 0;

    s = s.map( (r,j) => {
        // console.log(JSON.stringify(r));
        function getS(x,y) {
            // console.log(x+" "+y);
            return s[x] && s[x][y] || null;
        };
        function decodeL(x,y){
            let o = getS(x,y);
            // console.log(o);
            return ((o && o === 1) ? 0 : 1);
        };
        
        function decodeO(x,y){
            let o = getS(x,y);
            // console.log(o);
            return  ( (o && o === 1) ? 1 : 0); 
        };        

        return _.reduce(r, (o,v,i) => {
            i = parseInt(i);
            if ( v === 1) {
                let n = decodeO(j-1,i-1) + decodeO(j-1,i) + decodeO(j-1,i+1) +
                        decodeO(j,i-1) + decodeO(j,i+1) +
                        decodeO(j+1,i-1) + decodeO(j+1,i) + decodeO(j+1,i+1);
                if ( n >= 4 ) { o[i] = -1; ch++; } else { occ++; }
            } else {
                let n = decodeL(j-1,i-1) + decodeL(j-1,i) + decodeL(j-1,i+1) +
                        decodeL(j,i-1) + decodeL(j,i+1) +
                        decodeL(j+1,i-1) + decodeL(j+1,i) + decodeL(j+1,i+1);
                if ( n === 8 ) { o[i] = 1; ch++; occ++; }                
            }
            
            return o;
        },Object.assign({},r));
    });
    console.log("CH="+ch+" OCC="+occ);

} while (ch > 0);


console.log("OCC="+occ);

