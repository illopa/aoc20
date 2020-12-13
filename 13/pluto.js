var fs = require('fs');

let mem = fs.readFileSync('input.txt').toString().replace("\r","").split("\n");

let busmap = mem[1].split(',').map( (b,i) => (b === 'x' ? 'x' : [parseInt(b),i])).filter( (b) => (b!=='x'));
console.log(JSON.stringify(busmap));

let r = busmap.slice(1).reduce((r,o) => {
    // from the previous iteration min is OK when min = min0 + s * k for k in [0,1,2,...]
    let min = r.min0, s =r.s;

    // in this iteration min (minute) + i (the position) must be divisible for b (bus number) => ((min +i) % b) === 0   
    let i = o[1], b = o[0];

    let m = min + i;
    let rest = m % b;
    console.log('Z', 'MIN', min, 'S', s, 'I', i, 'M', m, 'B', b, 'REST', rest);

    // check every min until rest = 0 
    while( rest !== 0 ) {
        min += s;
        m = min +i;  
        rest = m % b;
        console.log('W', 'MIN', min, 'S', s, 'I', i, 'M', m, 'B', b, 'REST', rest);
    }
    let min1 = min;

    // this condition is true every min2 = min1 + (s*b) * k for k in [0,1,2,...]
    // but maybe if is not prime number for min2 = min1 + mcm(s,b) * k for k in [0,1,2,...] 

    let s2 = s;
    let min2 = min1 + s2; 
    m = min2 +i; 
    rest = m % b;
    console.log('X', 'MIN1', min1, 'MIN2', min2, 'S2', s2, 'S*B', (s*b), 'I', i, 'M', m, 'B', b, 'REST', rest);
    while( rest !== 0 ) {
        s2 += s;
        min2 = min1 + s2;
        m = min2 +i; 
        rest = m % b;
        console.log('X', 'MIN1', min1, 'MIN2', min2, 'S2', s2, 'S*B', (s*b), 'I', i, 'M', m, 'B', b, 'REST', rest);
    }
    r.min0 = min1;
    r.s = s2;
    console.log('K',r);
    return r;
},{ min0: busmap[0][1], s: busmap[0][0]})

console.log('K',r);