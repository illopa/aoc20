var fs = require('fs');
var _ = require('lodash');

let data = fs.readFileSync('input.txt').toString().replace(/\r/g,"").split("\n");

let tile = {};

let t = "";
let s = [];
let j = 0;

// load tiles
for (let i=0;i< data.length;i++) {
    if ( j === 0 ) {
        t = data[i];
    } else if ( j <= 10) {
        s[j-1] = data[i];
    } else { 
        t = parseInt(t.substr(5,4));
        tile[t]= s;
        t = "";
        s = [];
        j = -1;
    }
    j++;
}

console.log(tile);

/* 

ab    ca    dc   bd       
cd    db    ba   ac

cd    ac    ba   db
ab    bd    dc   ca

=====

abcd   ab bd cd ac
cadb   ca ab db cd
dcba   dc ca ba db
bdac   bd dc ac ba
cdab   cd db ab ca
acbd   ac cd bd ab 
badc   ba ac dc bd
dbca   db ba ca dc

ab = N
bd = E
cd = S
ac = O
ba = n
bd = e
dc = s
ca = o


*/

function reverse(s){
    return s.split("").reverse().join("");
}

// border value calc

const bcalc = {

    ab: function(t){
        return t[0];
    },

    cd: function (t){
        return t[9];
    },

    bd: function(t){
        return t.reduce( (s,c) => s+c[9],'');
    },

    ac: function(t){
        return t.reduce( (s,c) => s+c[0],'');
    },

    ba: function(t) {
        return reverse(this.ab(t));
    },

    db: function(t) {
        return reverse(this.bd(t));
    },

    dc: function(t) {
        return reverse(this.cd(t));
    },

    ca: function(t) {
        return reverse(this.ac(t));
    },

    /*
ab = N
bd = E
cd = S
ac = O
ba = n
db = e
dc = s
ca = o    
     */    

    get: function(t){
        let a = [];
        a[0]=this.ab(t);
        a[1]=this.bd(t);
        a[2]=this.cd(t);
        a[3]=this.ac(t);
        a[4]=this.ba(t);
        a[5]=this.db(t);
        a[6]=this.dc(t);
        a[7]=this.ca(t);
        return a;
    }

};


let border = {};
let map = {};

_.forEach(tile, (t,k) => {
    let bb = bcalc.get(t);;
    border[k] = bb;
    bb.forEach( (s) => { 
        if (!map[s]) { map[s]=[];}
        map[s].push(k)
    });
});


// console.log(map);

let mapt = {};

_.forEach(map, (a) => {
    if ( a.length > 1) {
        let [ t1, t2] = a;
        if (!mapt[t1]) {mapt[t1] ={}; }
        mapt[t1][t2]=1;
        if (!mapt[t2]) {mapt[t2] ={}; }
        mapt[t2][t1]=1;        
    }
});

console.log(mapt);

let mapc = _.mapValues(mapt, (a,t) => _.size(a));

console.log(mapc);

let mapf = _.reduce(mapc, (p,c,k) => {
    if ( c === 2 ) { return p*parseInt(k); } 
    return p;
},1);

console.log(mapf);