var fs = require('fs');
var _ = require('lodash');

function stackedCombat() {
    let pp = 1;
    while(true) {
        // if ( pp % 20000 === 0 ) { console.log('STACK',JSON.stringify(stack)); }
        pp++;
         
        if (stack.length === 0) { return [null,null,null]; }
        let cur = stack.pop()
        let i = cur.i;
        let p1 = cur.p1;
        let p2 = cur.p2;

        // console.log('GAME',i);  

        let stop = false;
        let r = 1;
        while (!stop) {
            // console.log('GAME',i,'ROUND',r);
            // console.log('P1',p1);
            // console.log('P2',p2);
            

            let w = 0;
            let pr1 = [];
            let pr2 = [];        

            let res = null;

            if (p1.length === 0 ) {
                // console.log('P1',p1);
                // console.log('P2',p2); 
                console.log('GAME',i,'WINS',2,'P1 HAS NO CARDS');          
                res = [p1,p2,2];
            }
        
            if (p2.length === 0 ) {
                // console.log('P1',p1);
                // console.log('P2',p2); 
                console.log('GAME',i,'WINS',1,'P2 HAS NO CARDS');                     
                res = [p1,p2,1];
            }   
        
            if ( checkEncode(p1,p2,i) ) { 
                // console.log('P1',p1);
                // console.log('P2',p2); 
                console.log('GAME',i,'WINS',1,'PREVENT INFINITE GAMES');                      
                res = [p1,p2,1]; 
            }

            if (res) {
                // game i finito              
                delete game[i];

                if (stack.length === 0) { return res; }
                let resume = stack.pop();

                if ( res[2] === 1)  { resume.p1.push(resume.e1,resume.e2); }
                else {  resume.p2.push(resume.e2,resume.e1); } 

                stack.push( {"i":resume.i,"e1":null,"e2":null,"p1": resume.p1,"p2": resume.p2,"g":g});
                stop = true;
            } else {
                

                if (!game[i]) { game[i] = {}; }
                game[i][encode(p1,p2)] = 1;

                let e1 = p1.shift();
                let e2 = p2.shift();

                if ( (p1.length >= e1) &&  (p2.length >= e2) ) {
        
                    g++;
                    pr1 = [...p1];
                    pr2 = [...p2];
                    stack.push( {"i":i,"e1":e1,"e2":e2,"p1": p1,"p2": p2,"g":g});
                    stack.push( {"i":g,"e1":null,"e2":null,"p1": pr1.slice(0,e1),"p2": pr2.slice(0,e2),"g":g});
                    stop = true;

                } else {
                    if (e1 > e2 ) { p1.push(e1,e2); }
                    else {  p2.push(e2,e1); }
                }
            }

            r++;
         
        }
    }
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

let memory = {};

let game = {};

console.log(encode(p1,p2));

let stack = [];

let g = 1;

let wins = 0;
stack.push( {"i":1,"e1":null,"e2":null,"p1":p1,"p2":p2,"g":g});
let strStack = JSON.stringify(stack);
// console.log(strStack);
stack = JSON.parse(strStack);
[p1,p2,wins] = stackedCombat();


console.log('WINS',wins);
console.log('P1 SCORES',score(p1));
console.log('P2 SCORES',score(p2));


// console.log(memory)