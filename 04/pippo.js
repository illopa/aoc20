const lineByLine = require('n-readlines');
const liner = new lineByLine('input.txt');

function addKey(obj,cur) {
    let curA = cur.split(" ");
    for (let i= 0; i < curA.length; i++){
        let term = curA[i].split(":");
        obj[term[0]] = term[1];
    }
    return obj;
}


function checkPassport(obj) {
    if (    obj &&
            obj.byr &&  // byr (Birth Year)
            obj.iyr &&  // iyr (Issue Year)
            obj.eyr &&  // eyr (Expiration Year)
            obj.hgt &&  // hgt (Height)
            obj.hcl &&  // hcl (Hair Color)
            obj.ecl &&  // ecl (Eye Color)
            obj.pid &&  // pid (Passport ID)
            true // cid (Country ID) OPTIONAL
              ) { return 1; }

    return 0;
}


let line;
let inputA = Array();
let i = 0; 
let j = 0;
let obj = {};
let valid = 0;
while (line = liner.next()) {
    let cur =(""+line).replace(/[\n\r]/g,'');

    console.log("I="+i+" "+cur);
    i++;
    
    if ( cur === "") {
        valid += checkPassport(obj);
        inputA[j] = obj;
        console.log("J="+j+"; "+JSON.stringify(inputA[j])+"; VALID="+valid);
        obj = {};
        j++;
    } else {
        obj = addKey(obj,cur);
    }
    
}
