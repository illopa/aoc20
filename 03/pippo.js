const lineByLine = require('n-readlines');
const liner = new lineByLine('input.txt');

let line;
let inputA = Array();
let i = 0; 
while (line = liner.next()) {
    inputA[i] =(""+line).replace(/[\n\r]/g,'');
    console.log("I="+i+" "+inputA[i]);
    i++;
}

let j = 0;
let treeCount = 0;
for (let i = 0; i < inputA.length; i++){
    let cur = inputA[i]; 

    let trasf = cur;
    if (cur.charAt(j) === '#') {
        trasf = cur.substr(0,j)+'X'+cur.substr(j+1) ;
        treeCount++;
    } else {
        trasf = cur.substr(0,j)+'O'+cur.substr(j+1) ;
    }
    
    
    console.log(trasf+" I="+i+"; J="+j+"; T="+cur.charAt(j)+"; C="+treeCount);
    j = (j+3) % cur.length;
}
