const lineByLine = require('n-readlines');
const { exit } = require('process');
const liner = new lineByLine('input.txt');

function addKey(obj,cur) {
    let curA = cur.split(" ");
    for (let i= 0; i < curA.length; i++){
        let term = curA[i].split(":");
        obj[term[0]] = term[1];
    }
    return obj;
}

function fourdigit(val){
    let myre = /^\d{4}$/;
    let m = val.match(myre);
    console.log("m="+JSON.stringify(m));
    return !!m;
}

function ninedigit(val){
    let myre = /^\d{9}$/;
    let m = val.match(myre);
    console.log("m="+JSON.stringify(m));
    return !!m;
}

function height(val){
    let myre = /^\d*(cm|in)$/;
    let m = val.match(myre);
    console.log("m="+JSON.stringify(m));
    return !!m;
}

function color(val){
    let myre = /^#[0-9a-f]{6}$/;
    let m = val.match(myre);
    console.log("m="+JSON.stringify(m));
    return !!m;
}

function namecolor(val) {
    let check = { amb:1, blu:1, brn:1, gry:1, grn:1, hzl:1, oth:1 };
    return !!check[val];
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
              ) { 
                /*
                byr (Birth Year) - four digits; at least 1920 and at most 2002. */
                console.log("byr="+obj.byr+"; 4D="+fourdigit(obj.byr));
                if ( !fourdigit(obj.byr) ) { return 0; }
                let y = parseInt(obj.byr);
                if ( (y < 1920) || (y > 2002) )  { return 0; }

                /*
                iyr (Issue Year) - four digits; at least 2010 and at most 2020. */
                console.log("iyr="+obj.iyr+"; 4D="+fourdigit(obj.iyr));
                if ( !fourdigit(obj.iyr) ) { return 0; }
                y = parseInt(obj.iyr);
                if ( (y < 2010) || (y > 2020) )  { return 0; }                
                
                /* 
                eyr (Expiration Year) - four digits; at least 2020 and at most 2030. */              
                console.log("eyr="+obj.eyr+"; 4D="+fourdigit(obj.eyr));  
                if ( !fourdigit(obj.eyr) ) { return 0; }
                y = parseInt(obj.eyr);
                if ( (y < 2020) || (y > 2030) )  { return 0; }                 
                
                /*
                hgt (Height) - a number followed by either cm or in:
                    If cm, the number must be at least 150 and at most 193.
                    If in, the number must be at least 59 and at most 76. */
                console.log("hgt="+obj.hgt+"; h="+height(obj.hgt)); 
                if ( !height(obj.hgt) ) { return 0; }
                let h = obj.hgt.replace("cm","");
                if ( h === obj.hgt) {
                    h = obj.hgt.replace("in","");
                    if ( h === obj.hgt) { return 0; }  
                    h = parseInt(h);
                    if ( (h < 59) || (h > 76) )  { return 0; }                     
                } else {
                    h = parseInt(h);
                    if ( (h < 150) || (h > 193) )  { return 0; } 
                }

                /*                    
                hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f. */
                console.log("hcl="+obj.hcl+"; color="+color(obj.hcl));  
                if ( !color(obj.hcl) ) { return 0; }
                
                /*
                ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth. */
                console.log("ecl="+obj.ecl+"; namecolor="+namecolor(obj.ecl));  
                if ( !namecolor(obj.ecl) ) { return 0; }               

                /*
                pid (Passport ID) - a nine-digit number, including leading zeroes. */
                console.log("pid="+obj.pid+"; 9D="+ninedigit(obj.pid)); 
                if ( !ninedigit(obj.pid) ) { return 0; }

                /*
                cid (Country ID) - ignored, missing or not. */                                
                return 1; 
            }

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
    // console.log("I="+i+" "+cur);
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
