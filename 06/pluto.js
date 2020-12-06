const lineByLine = require('n-readlines');
const liner = new lineByLine('input.txt');

let line;
let i = 0; 
let answer=false;
let sum = 0;
let j = 0;
while (line = liner.next()) {
    let cur =(""+line).replace(/[\n\r]/g,'');
    if ( cur === "") {
        sum += Object.keys(answer).filter( c => (answer[c] === j)).length;
        console.log("I="+i+" C="+cur+"; A="+Object.keys(answer).filter( c => (answer[c] === j)).join()+"; S="+sum);
        answer=false;
    } else {
        if (!answer) {
            answer = {};
            cur.split('').forEach(function(c) {  answer[c]=1;  });  
            j = 1;           
        } else {
            cur.split('').forEach(function(c) {  answer[c] && (answer[c]++);  });
            j++;

        }
        console.log("I="+i+" C="+cur.split('').join()+"; A="+JSON.stringify(answer)+"; S="+sum);    
    }
    
    i++;  
}

