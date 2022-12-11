var fs = require('fs');
var _ = require('lodash');

function recursiveCombat(p1,p2,i,st) {
    console.log('GAME',i,'STACK',st);  

    let stop = false;
    let r = 1;
    while (!stop) {
        // console.log('GAME',i,'ROUND',r);
        // console.log('P1',p1);
        // console.log('P2',p2);
        
        let w = 0;
        let pr1 = [];
        let pr2 = [];        
    
        if (p1.length === 0 ) {
            // console.log('P1',p1);
            // console.log('P2',p2); 
            console.log('GAME',i,'WINS',2,'P1 HAS NO CARDS');          
            return [p1,p2,2];
        }
    
        if (p2.length === 0 ) {
            // console.log('P1',p1);
            // console.log('P2',p2); 
            console.log('GAME',i,'WINS',1,'P2 HAS NO CARDS');                     
            return [p1,p2,1];
        }   
    
        if ( checkEncode(p1,p2,i) ) { 
            // console.log('P1',p1);
            // console.log('P2',p2); 
            console.log('GAME',i,'WINS',1,'PREVENT INFINITE GAMES');                      
            return [p1,p2,1]; 
        }

        if (!game[i]) { game[i] = {}; }
        game[i][encode(p1,p2)] = 1;

        let e1 = p1.shift();
        let e2 = p2.shift();

        if ( (p1.length >= e1) &&  (p2.length >= e2) ) {
        
            g++;
            pr1 = [...p1];
            pr2 = [...p2];
            [pr1,pr2,w] =  recursiveCombat(pr1.slice(0,e1),pr2.slice(0,e2),g,st.concat(i));
           
            delete game[g];
  
            if ( w === 1)  { p1.push(e1,e2); }
            else {  p2.push(e2,e1); }    

            // console.log('RESUME GAME',i,'ROUND',r);
            // console.log('P1',p1);
            // console.log('P2',p2); 
         } else {
            if (e1 > e2 ) { p1.push(e1,e2); }
            else {  p2.push(e2,e1); }
         }

        r++;
         
    }

     return [pr1,pr2,0];
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

function checkEncode(p1,p2,gc) {
    let en = encode(p1,p2);
    return game[gc] && game[gc][en] && true || false;
}


let p1 = fs.readFileSync('p1.txt').toString().replace(/\r/g,"").split("\n");
let p2 = fs.readFileSync('p2.txt').toString().replace(/\r/g,"").split("\n");

p1 = p1.map( (e) => parseInt(e));
p2 = p2.map( (e) => parseInt(e));


let game = {};
let g = 1;

let wins = 0;
[p1,p2,wins] = recursiveCombat(p1,p2,g,[]);


console.log('WINS',wins);
console.log('P1 SCORES',score(p1));
console.log('P2 SCORES',score(p2));
