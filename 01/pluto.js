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
    let elI = inputA[i];
    for (let j = 0; j < inputA.length; j++) {
        if ( j !== i) {
            let elJ = inputA[j];
            let addIJ = elI + elJ;
            if ( ( diff[addIJ] != undefined) && ( diff[addIJ] !== i )  && ( diff[addIJ] !== j ) ) {
                var res = ( elI * elJ * (2020-addIJ));
                console.log("I="+i+" "+elI+"; J="+j+" "+elJ+"; D="+diff[addIJ]+" "+inputA[diff[addIJ]]+"; "+res);
                return;
            }
        }
    }

}

console.log("KO");
