let starting = [7,14,0,17,11,1,2];

let last = 0;
let turn = 1;
let spoken =[];
let count = 0;

let timestart = new Date().getTime();

// game starting
starting.forEach( (n,i) => {if (i+1 < starting.length) {spoken[n] = turn; count++; } turn++; last = n;} );

console.log(spoken, last,turn);

spoken[30000000]= 0;

function game(n,turn) {
    let s = 0;
    if (spoken[n]) { s = turn -1 - spoken[n]; }
    else { count++; }
    spoken[n] = turn-1;
    return [s,turn+1];
    
}

function steptime() {
    return ( ( (new Date().getTime() )- timestart)/1000).toFixed(3);
}

let res = game(last, turn);

while (res[1] <= 30000000) {
    if ( res[1] % 1000000 === 0) { console.log(res, count, steptime());}
    res = game(res[0], res[1]);
   
}
console.log('RES',res[0],'COUNT',count, 'TIME',steptime());



