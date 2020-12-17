var fs = require('fs');
var _ = require('lodash');

function V(m,w,z,i,j) {
    return  m[w] && m[w][z] && m[w][z][i] && m[w][z][i][j] || 0;
}

function S(m,w,z,i,j,v){
    // console.log(w,z,i,j,v)
    if ( !(w in m) ) { m[w] = []; }
    if ( !(z in m[w]) ) { m[w][z] = []; }
    if ( !(i in m[w][z]) ) { m[w][z][i] = []; }
    m[w][z][i][j] = v;
}


function N(m,w,z,i,j) {
    return _.range(w-1,w+2).reduce( (sd,d) => sd+ _.range(z-1,z+2).reduce( (sa,a) => sa+ _.range(i-1,i+2).reduce( (sb,b) =>  sb+_.range(j-1,j+2).reduce( (sc,c) => sc+V(m,d,a,b,c), 0), 0) ,0) ,0) -V(m,w,z,i,j);
}

function T(v,n) {
    if (v && ( (n === 2) || (n===3) ) ) { return 1; }
    if (!v && (n===3) ) { return 1; }
    return 0;
}

function U(m) {
    let mu = [];
    for(let w=0; w <= m.length; w++) {
        for(let z=0; z <= m[0].length; z++) {
            for(let i=0; i <= m[0][0].length; i++) {
                for(let j=0; j <= m[0][0][0].length; j++) {
                    S(mu,w,z,i,j,V(m,w-1,z-1,i-1,j-1));
                }
            }
        }
    }
    return mu;
}

function ST(m) {
    let mt = [];
    for(let w=0; w <= 1+m.length; w++) {
        for(let z=0; z <= 1+m[0].length; z++) {
            for(let i=0; i <= 1+m[0][0].length; i++) {
                for(let j=0; j <= 1+m[0][0][0].length; j++) {
                    let v = V(m,w,z,i,j);
                    let n = N(m,w,z,i,j)
                    S(mt,w,z,i,j,T(v,n));
                }
            }
        }
    }
    return mt;
}

function C(m) {
    let s = 0;
    for(let w=0; w < m.length; w++) {
        for(let z=0; z < m[0].length; z++) {
            for(let i=0; i < m[0][0].length; i++) {
                for(let j=0; j < m[0][0][0].length; j++) {
                    s += V(m,w,z,i,j);
                }
            }
        }
    }
    return s;
}

let space = [];
space[0] = [];

space[0][0] = fs.readFileSync('input.txt').toString().replace(/\r/g,"").split("\n");

space[0][0] = space[0][0].map( (si,i) => si.split('').map( (sij,j) => sij === '#' ? 1 :0 ) );

// console.log(space);

let spaceU = null, spaceT = space;

// h=iteration
for(let h=1; h<=6; h++){
    spaceU = U(spaceT);
    spaceT = ST(spaceU)
}


console.log('RES',C(spaceT));