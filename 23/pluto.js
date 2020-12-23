function get_destination(c,pick,rem) {

    while ( rem.indexOf(c) < 0) {
        c--;
        if ( c <= 0) { c = 9; }
    }
    let pd = rem.indexOf(c);
    let cup = [].concat(rem.slice(0,pd+1),pick,rem.slice(pd+1));

    return [c,cup,pd];
}

function move(cup,i,round) {
    // console.log('-- move:',round),'--';
    // console.log('cups:',cup.slice(0,20));
    let pick, rem, double;
    let c = cup[i];
    // console.log('cups:', [].concat(cup.slice(0,i), ['('+c+')'], cup.slice(i+1)).join(' ')   );

    if (i < (cup.length -4)) {
        pick = cup.slice(i+1,i+4);
        rem = [].concat(cup.slice(0,i+1),cup.slice(i+4));
    } else {
        double = cup.concat(cup);
        pick = double.slice(i+1,i+4);
        rem = [].concat(double.slice(0,i+1),double.slice(i+4));
        rem = rem.slice(i,i+cup.length-3);   
        i = 0;        
    }

    // console.log('pick up:',pick.join(' '));
    // console.log('remain:',rem.join(' '));
    
    let [d,cupd,pd] = get_destination(c-1,pick,rem);
    if (pd < i) { i = i+3;}
    // console.log('destination:',d);
    // console.log('');
    // console.log('cup:',cupd.join(' '));
    return [cupd,i+1];
}

// example let puzzle = "389125467";
let puzzle = "215694783";
let cup = puzzle.split('').map( (n) => parseInt(n));

let max = 1000000;
cup[max-1]=max;
for(let n=10; n<= max; n++) {
    cup[n-1]=n;  
}
// console.log(cup);

console.log('STARTING');

let start = new Date().getTime();

let i = 0;
let numrounds = 10000000;
for(let round= 1; round <= numrounds; round++) {
    [cup,i] =  move(cup,i,round);
    let step = new Date().getTime();
    if (round % 1000 === 0 ) {
        let j = cup.indexOf(1);
        console.log('ROUND',round,'TIME',(step-start)/1000,'j',j,'cup[j]',cup[j], 'cup[j+1]', cup[j+1], 'cup[j+2]', cup[j+2]);
    }
}
console.log('-- final --')
// console.log('cups:', [].concat(cup.slice(0,i), ['('+cup[i]+')'], cup.slice(i+1)).join(' ')   );
console.log('cups:',cup.slice(0,20));
console.log('');

let j = cup.indexOf(1);

console.log('illopa says:','j',j,'cup[j]',cup[j], 'cup[j+1]', cup[j+1], 'cup[j+2]', cup[j+2], 'cup[0]', cup[0], 'cup[1]', cup[1] );


