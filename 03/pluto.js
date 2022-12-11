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



function countAllTree(stepR, stepD) {
    let j = 0;
    let treeCount = 0;
    for (let i = 0; i < inputA.length; i+=stepD){
        let cur = inputA[i]; 

        let trasf = cur;
        if (cur.charAt(j) === '#') {
            trasf = cur.substr(0,j)+'X'+cur.substr(j+1) ;
            treeCount++;
        } else {
            trasf = cur.substr(0,j)+'O'+cur.substr(j+1) ;
        }
        
       // console.log(trasf+" I="+i+"; J="+j+"; T="+cur.charAt(j)+"; C="+treeCount);
        j = (j+stepR) % cur.length;
    }
    return treeCount;
}

let treeA = Array();
let slops = Array();
slops[0]={ r:1,d:1};
slops[1]={ r:3,d:1};
slops[2]={ r:5,d:1};
slops[3]={ r:7,d:1};
slops[4]={ r:1,d:2};

var res = 1;
for (let s=0; s < slops.length; s++) {
    let stepR = slops[s].r;
    let stepD = slops[s].d;
    let countStep = countAllTree(stepR, stepD);
    res = res * countStep;
    console.log("S="+s+"; CS="+countStep+"; RES="+res);
}
