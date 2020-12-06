const lineByLine = require('n-readlines');
const liner = new lineByLine('input.txt');

let line;
let i = 0; 
let answer={};
let sum = 0;
while (line = liner.next()) {
    let cur =(""+line).replace(/[\n\r]/g,'');
    if ( cur === "") {
        answer={};
    } else {
        cur.split('').forEach(function(c) {
            if ( !answer[c] ) { sum++; answer[c]=1;}
        }); 
    }
    console.log("I="+i+" C="+cur.split('').join()+"; A="+Object.keys(answer).join()+"; S="+sum);

    i++;    
}

