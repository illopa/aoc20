var fs = require('fs');
var _ = require('lodash');

function combat(p1,p2) {
    let e1 = p1.shift();
    let e2 = p2.shift();
    if (e1 > e2 ) { p1.push(e1,e2); }
    else {  p2.push(e2,e1); }
    return [p1,p2];
}

function score(p){
    if (p.length === 0) { return 0; }
    let ps = [...p];
    ps.reverse();
    return ps.reduce( (s,v,i) => s+v*(i+1),0);
}

function encode(p1,p2) {
    return p1.join(',')+'#'+p2.join(',');
}

function checkEncode(p1,p2,g) {
    let en = encode(p1,p2);
    return game[g] && game[g][en] && true || false;
}


let p1 = fs.readFileSync('p1.txt').toString().replace(/\r/g,"").split("\n");
let p2 = fs.readFileSync('p2.txt').toString().replace(/\r/g,"").split("\n");

p1 = p1.map( (e) => parseInt(e));
p2 = p2.map( (e) => parseInt(e));

let memory = {};

let game = [];
let g = 1;

console.log('P1',p1);
console.log('P2',p2);

function recursiveCombat(p1,p2,i,r) {
    let w = 0;
    let pr1 = [];
    let pr2 = [];

    console.log('GAME',i,'ROUND',r);
    
    if (memory[encode(p1,p2)]) { 
        w = memory[encode(p1,p2)]; 
        console.log('P1',p1);
        console.log('P2',p2); 
        console.log('I HAVE MEMORY');
        console.log('GAME',i,'WINS',w);          
        return [p1,p2,2];        
    }

    if (p1.length === 0 ) {
        console.log('P1',p1);
        console.log('P2',p2); 
        console.log('P1 HAS NO CARDS');
        console.log('GAME',i,'WINS',2);          
        return [p1,p2,2];
    }

    if (p2.length === 0 ) {
        console.log('P1',p1);
        console.log('P2',p2); 
        console.log('P2 HAS NO CARDS');
        console.log('GAME',i,'WINS',1);         
        return [p1,p2,1];
    }   

    if ( checkEncode(p1,p2,i) ) { 
        console.log('P1',p1);
        console.log('P2',p2); 
        console.log('PREVENT INFINITE GAMES');
        console.log('GAME',i,'WINS',1);          
        return [p1,p2,1]; 
    }

    if (!game[i]) { game[i] = {}; game[i][encode(p1,p2)] = 1;}

    let e1 = p1.shift();
    let e2 = p2.shift();
     
    if ( (p1.length >= e1) &&  (p2.length >= e2) ) {
        
        g++;
        pr1 = [...p1];
        pr2 = [...p2];
        [pr1,pr2,w] =  recursiveCombat(pr1,pr2,g,0);
        memory[encode(p1,p2)] = w;
        memory[encode(p2,p1)] = ( w === 1 ? 2 : 1);
        

        if ( w === 1)  { p1.push(e1,e2); }
        else {  p2.push(e2,e1); }
        console.log('RESUME GAME',i,'ROUND',r);
     } else {
        if (e1 > e2 ) { p1.push(e1,e2); }
        else {  p2.push(e2,e1); }
     }
     console.log('P1',p1);
     console.log('P2',p2);   
     r++; 
     pr1 = [...p1];
     pr2 = [...p2];       
     [pr1,pr2,w] = recursiveCombat(pr1,pr2,i,r);
     memory[encode(p1,p2)] = w;
     memory[encode(p2,p1)] = ( w === 1 ? 2 : 1);
     return [pr1,pr2,w];
}

let wins = 0;
[p1,p2,wins] = recursiveCombat(p1,p2,g,1);


console.log('WINS',wins);
console.log('P1 SCORES',score(p1));
console.log('P2 SCORES',score(p2));