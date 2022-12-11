function displaynext(cup,next,i) {
    let display = [];
    let c = cup[i];
    display.push('('+c+')');
    let n = i;
    do {
        n = next[n];
        display.push(cup[n]);
    } while ( n !== i)
    display.pop();
    return display;
}

function movebetter(cup, max, next, pos, i, round) {
    console.log('-- move:',round),'--';
    let c = cup[i];
    console.log('cups:',  displaynext(cup,next,i).join(' ')   );

    // console.log('next:',next);
    let p0 = next[i];
    let p1 = next[p0];
    let p2 = next[p1];
    let p3 = next[p2];

    next[i] = p3;
    next[p2] = null;

    let pick = [ cup[p0], cup[p1], cup[p2] ];
    console.log('pick up:',pick.join(' '));

    let d = c-1;
    if ( d <= 0) { d = max; }
    while ( pick.indexOf(d) >= 0 ) {
        d--;
        if ( d <= 0) { d = max; }
    }
    console.log('destination:',d);

    let posd = pos[d];
    let nexd = next[posd];
    next[posd] = p0;
    next[p2] = nexd;

    i = next[i];

    console.log('');
    return [next,i];
}


// let puzzle = "389125467";
let puzzle = "215694783";
let cup = puzzle.split('').map( (n) => parseInt(n));
console.log(cup);

let max = 9;
let next = [];
let pos = [];
cup.forEach( (c,i) => { pos[c]= i; next[i] = i+1;} );
next[cup.length-1] = 0;


let i = 0;
let numrounds = 100;
for(let round= 1; round <= numrounds; round++) {
    [next,i] =  movebetter(cup, max, next, pos, i, round);
}

console.log('-- final --')
console.log('cups:',  displaynext(cup,next,i).join(' ')   );
console.log('');

let j =pos[1];
console.log('illopa says:', displaynext(cup,next,j).slice(1).join('') )


