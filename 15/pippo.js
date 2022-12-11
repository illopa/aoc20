let starting = [7,14,0,17,11,1,2];

console.log(starting);

let last = 0;
let turn = 1;
let spoken = {};

// game starting
starting.forEach( (n,i) => {if (i+1 < starting.length) {spoken[n] = turn;} turn++; last = n;} );

console.log(spoken, last, turn);

function game(n,turn) {
    let s = 0;
    if (n in spoken ) { s = turn -1 - spoken[n]; }
    spoken[n] = turn-1;
    return [s,turn+1];
}

let res = game(last, turn);

while (res[1] <= 2020) {
    res = game(res[0], res[1]);
}
// console.log(spoken);
console.log('RES',res[0]);

