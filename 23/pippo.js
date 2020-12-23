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
    console.log('-- move:',round),'--';
    let pick, rem, double;
    let c = cup[i];
    console.log('cups:', [].concat(cup.slice(0,i), ['('+c+')'], cup.slice(i+1)).join(' ')   );

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

    console.log('pick up:',pick.join(' '));
    console.log('remain:',rem.join(' '));
    
    let [d,cupd,pd] = get_destination(c-1,pick,rem);
    if (pd < i) { i = i+3;}
    console.log('destination:',d);
    console.log('cup:',cupd.join(' '));
    console.log('');
    
    return [cupd,i+1];
}

// let puzzle = "389125467";
let puzzle = "215694783";
let cup = puzzle.split('').map( (n) => parseInt(n));
console.log(cup);

let i = 0;
let numrounds = 100;
for(let round= 1; round <= numrounds; round++) {
    [cup,i] =  move(cup,i,round);
}
console.log('-- final --')
console.log('cups:', [].concat(cup.slice(0,i), ['('+cup[i]+')'], cup.slice(i+1)).join(' ')   );
console.log('');

let j = cup.indexOf(1);
let double = cup.concat(cup);
console.log('illopa says:',double.slice(j+1,j+cup.length).join('') )


