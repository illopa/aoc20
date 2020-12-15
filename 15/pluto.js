let starting = [7,14,0,17,11,1,2];

let last = 0;
let turn = 1;
let spoken = {};


// game starting
starting.forEach( (n,i) => {if (i+1 < starting.length) {spoken[n] = turn; } turn++; last = n;} );

console.log(spoken, last,turn);

function game(n,turn) {
    let s = 0;
    if (n in spoken ) { s = turn -1 - spoken[n]; }
    spoken[n] = turn-1;
    return [s,turn+1];
    
}

let res = game(last, turn);

while (res[1] <= 30000000) {
    if ( res[1] % 1000000 === 0) { console.log(res);}
    res = game(res[0], res[1]);
   
}
console.log('RES',res[0]);



