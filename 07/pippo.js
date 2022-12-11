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

console.log("R shiny gold="+JSON.stringify(bagsI['shiny gold']));

let visited = {};
function containBag(name){
    let ce = !!visited[name];
    visited[name] = 1;
    console.log(Object.keys(visited).length+" "+name);
    if ( !ce && bagsI[name] ) {    
        Object.keys(bagsI[name]).forEach( (b) => {
            containBag(b);
        });
    }
}

containBag('shiny gold');
console.log(JSON.stringify(Object.keys(visited))+" SUM="+((Object.keys(visited).length)-1));