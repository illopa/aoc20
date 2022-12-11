const lineByLine = require('n-readlines');
const liner = new lineByLine('input.txt');

let line;
let inputA = Array();
let i = 0; 
while (line = liner.next()) {
    inputA[i] = parseInt(line);
    console.log("I="+i+" "+inputA[i]);
    i++;
}

let diff = {};

for (let i = 0; i < inputA.length; i++) {
    let element = 2020-inputA[i];
    diff[element] = i;
}

for (let i = 0; i < inputA.length; i++) {
    let element = inputA[i];
    if ( diff[element] != undefined) {
        var res = ( element * (2020-element));
        console.log("I="+i+" "+inputA[i]+"; J="+diff[element]+" "+inputA[diff[element]]+"; "+res);
        return
    } 
}
console.log("KO");
