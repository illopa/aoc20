const lineByLine = require('n-readlines');
const liner = new lineByLine('input.txt');

let line;
let i = 0; 
let bags={};
let bagsI={};
while (line = liner.next()) {
    let cur =(""+line).replace(/[\n\r]/g,'');
    let filter = /^(.*) bags contain (.*)$/;
    let m = cur.match(filter);
    let ct = m[1];
    bags[ct] = {};
    // console.log(m[2]);
    if ( m[2] !== "no other bags."){
        let s = m[2].split(',');
    
        s.forEach( (c) => {

                let f2 = /^[\s]*(\d)+[\s]+(.*)[\s]+bag[s]{0,1}[\.]*$/;
                let m2 = c.match(f2);
                // console.log(JSON.stringify(m2));
                bags[ct][m2[2]]=m2[1];

                if (!bagsI[m2[2]]) { bagsI[m2[2]] = {};}
                bagsI[m2[2]][ct] = m2[1];

        });

    }

    // console.log("I="+i+" C="+ct+"; "+JSON.stringify(bags));
    // console.log("I="+i+" C="+ct+"; "+JSON.stringify(bagsI));

    i++;    
}

console.log("D shiny gold="+JSON.stringify(bags['shiny gold']));


function calc(name) {
    console.log(name);
    let sum = 0;
    let s = bags[name];
    Object.keys(s) && Object.keys(s).forEach( (b) => {
        sum += s[b]*(1+calc(b));
    });

    return sum;
}

let sum = calc('shiny gold');
console.log("SUM="+sum);