function displaynext(cup,next,i) {
    let display = [];
    let c = cup[i];
    display.push('('+c+')');
    let n = i;
    let r = 0;
    do {
        n = next[n];
        display.push(cup[n]);
        r++;
    } while ( n !== i && r < 5)
    display.pop();
    return display;
}

function movebetter(cup, max, next, pos, i, round) {
    // console.log('-- move:',round),'--';
    let c = cup[i];
    // console.log('cups:',  displaynext(cup,next,i).join(' ')   );

    // console.log('next:',next);
    let p0 = next[i];
    let p1 = next[p0];
    let p2 = next[p1];
    let p3 = next[p2];

    next[i] = p3;
    next[p2] = null;

    let pick = [ cup[p0], cup[p1], cup[p2] ];
    // console.log('pick up:',pick.join(' '));

    let d = c-1;
    if ( d <= 0) { d = max; }
    while ( pick.indexOf(d) >= 0 ) {
        d--;
        if ( d <= 0) { d = max; }
    }
    // console.log('destination:',d);

    let posd = pos[d];
    let nexd = next[posd];
    next[posd] = p0;
    next[p2] = nexd;

    i = next[i];

    // console.log('');
    return [next,i];
}


// let puzzle = "389125467";
let puzzle = "215694783";
let cup = puzzle.split('').map( (n) => parseInt(n));
console.log(cup);

let max = 1000000;
let next = [];
let pos = [];
cup.forEach( (c,i) => { pos[c]= i; next[i] = i+1;} );

cup[max-1]=max;
for(let n=10; n<= max; n++) {
    cup[n-1]=n;  

    pos[n]= n-1; 
    next[n-1] = n;    
}

next[cup.length-1] = 0;

/*
pos[0] = '';
console.log('POS',pos.slice(0,15));
console.log('CUP',cup.slice(0,15));
console.log('NEXT',next.slice(0,15));

console.log('POS',pos.slice(max-2));
console.log('CUP',cup.slice(max-2));
console.log('NEXT',next.slice(max-2));
*/

console.log('STARTING');

let start = new Date().getTime();

let j =pos[1];

let i = 0;
let numrounds = 10000000;
for(let round= 1; round <= numrounds; round++) {
    [next,i] =  movebetter(cup, max, next, pos, i, round);

    if (round % 100000 === 0 ) {
        let step = new Date().getTime();
        let j = cup.indexOf(1);
        console.log('ROUND',round,'TIME',(step-start)/1000,'I',i, displaynext(cup,next,i).join(' '),'J',j, displaynext(cup,next,j).join(' '));
    }    
}

let cupfd = displaynext(cup,next,j);

console.log('-- final --')
console.log('cups:', cupfd.join(' ')   );
console.log('');

let res = cupfd[1]*cupfd[2];

console.log('illopa says:', res )


