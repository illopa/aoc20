const _ = require('lodash');

const lineByLine = require('n-readlines');
const liner = new lineByLine('input.txt');

let line;
let i = 0; 
let answer=false;
let sum = 0;
while (line = liner.next()) {
    let cur =(""+line).replace(/[\n\r]/g,'');
    if ( cur === "") {
        sum += answer.length;
        console.log("I="+i+" C="+cur+"; A="+answer.join()+"; S="+sum);
        answer=false;
    } else {
        if (!answer) {
            answer = cur.split('');
        } else {
            answer = _.intersection(answer,cur.split(''));
        }
        console.log("I="+i+" C="+cur.split('').join()+"; A="+answer.join()+"; S="+sum);    
    }
    
    i++;  
}

