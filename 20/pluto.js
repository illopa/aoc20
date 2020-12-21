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

// console.log(tile);

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
ac = W
ba = n
bd = e
dc = s
ca = w


*/


// border value calc

const bcalc = {

    encode: function(c){
        return c.join(',');
    },

    decode: function(c){
        return c.split(',');
    },

    reverse: function(s){
        return s.split("").reverse().join("");
    },

    N: function(t){
        return t[0];
    },

    E: function(t){
        return t.reduce( (s,c) => s+c[9],'');
    },    

    S: function (t){
        return t[9];
    },

    W: function(t){
        return t.reduce( (s,c) => s+c[0],'');
    },

    n: function(t) {
        return this.reverse(this.N(t));
    },

    e: function(t) {
        return this.reverse(this.E(t));
    },

    s: function(t) {
        return this.reverse(this.S(t));
    },

    w: function(t) {
        return this.reverse(this.W(t));
    },

    get: function(t){
        let a = {};
        a.N=this.N(t);
        a.E=this.E(t);
        a.S=this.S(t);
        a.W=this.W(t);
        a.n=this.n(t);
        a.e=this.e(t);
        a.s=this.s(t);
        a.w=this.w(t);
        return a;
    }

};

const btrasf= {
    opposite: function(d) {
        let opp = {
            N: 'S',
            E: 'W',
            S: 'N',
            W: 'E'
        };
        return opp[d];
    },

    reverse: function(s) {
        return s.split("").reverse().join("");
    },
    
    reverseRow: function(t) {
        return t.map( (s) => this.reverse(s) );
    },

    reverseCol: function(t) {
        return t.reverse();
    }, 
    
    traspose: function(t) {
        return t.map( (s,i) => t.reduce( (r,s1) => r+s1[i],''));
    },

    NE: function(t) {
        return t;
    },

    NW: function(t) {
        return this.reverseRow(t);
    },
    
    SE: function(t) {
        return this.reverseCol(t);
    },
    
    SW: function(t) {
        return this.reverseCol(this.reverseRow(t));;
    },    

    ES: function(t) {
        return this.reverseCol(this.traspose(t));
    },

    WS: function(t) {
        return this.traspose(t);
    },
    
    EN: function(t) {
        return this.reverseRow(this.reverseCol(this.traspose(t)));
    },
    
    WN: function(t) {
        return this.reverseRow(this.traspose(t));
    },     

};

// map tiles -> border -> direction
let border = {};

// map all borders -> tiles 
let map = {};

_.forEach(tile, (t,k) => {
    let bb = bcalc.get(t);;
    border[k] = {};
    _.forEach(bb, (s,i) => { 
        if (!map[s]) { map[s]=[];}
        map[s].push(k)
        border[k][s]=i.toUpperCase();
    });
});


// console.log(map);
// console.log(border);

// tiles relations
let mapt = {};

_.forEach(map, (a,s) => {
    if ( a.length > 1) {
        let [ t1, t2] = a;
        if (!mapt[t1]) {mapt[t1] ={}; }
        mapt[t1][t2]=s;
        if (!mapt[t2]) {mapt[t2] ={}; }
        mapt[t2][t1]=s;        
    }
});

// console.log(mapt);

// relation number for tile
let mapc = _.mapValues(mapt, (a,t) => _.size(a));

// tiles with 2 relations are in corners
let mapf = _.reduce(mapc, (p,c,k) => {
    if ( c === 2 ) {  
        return p.concat(k); 
    } 
    return p;
},[]);

console.log('CORNERS',mapf);


// get tiles disposition 
let temp = _.mapValues(mapt, (o) => _.keys(o));

let count = Math.sqrt(_.size(temp));

// image composition
let sat = {};

let t00 = mapf[0];
sat[bcalc.encode([0,0])] = t00;

let [t10,t01] = temp[t00];
sat[bcalc.encode([1,0])] = t10;
sat[bcalc.encode([0,1])] = t01;

temp[t00] = [];
temp[t10] = _.difference(temp[t10],[t00]);
temp[t01] = _.difference(temp[t01],[t00]);

for(let i = 0; i < count; i++) {
    for(let j = 0; j < count; j++) {
        let tX = sat[bcalc.encode([i,j])];
        let tn, tnI, tnJ, tP;
        // console.log(i,j);

        if ( ( i+1 < count) && (!sat[bcalc.encode([i+1,j])]) ) {
            // i+1,j
            if ( j === 0) { 
                tn = temp[tX];
                tnI = tn[0];
                sat[bcalc.encode([i+1,j])] = tnI;
                temp[tX] = _.difference(temp[tX],[tnI]);
                temp[tnI] = _.difference(temp[tnI],[tX]);
            } else {
                tP = sat[bcalc.encode([i+1,j-1])];

                tn = _.intersection(temp[tX],temp[tP])
                tnI = tn[0];
                sat[bcalc.encode([i+1,j])] = tnI;
       
                temp[tX] = _.difference(temp[tX],[tnI]);
                temp[tnI] = _.difference(temp[tnI],[tX]);  
                temp[tP] = _.difference(temp[tP],[tX,tnI]);                            
            }
            
        }

        if ( ( j+1 < count) && (!sat[bcalc.encode([i,j+1])]) ) {
            tn = temp[tX];
            tnJ = tn[0];
            sat[bcalc.encode([i,j+1])] = tnJ;
            temp[tX] = _.difference(temp[tX],[tnJ]);
            temp[tnJ] = _.difference(temp[tnJ],[tX]);            

        }        
        
    }
}

// 
console.log('TILES DISPOSITION');
console.log(sat);

// rotating and flipping tiles

// find tle trasformation from tiles - border relation 
// for every tiles find the border disposition 'dir' than apply the trasformation 'btrasf[dir]'
let def = {};

for(let i = 0; i < count; i++) {
    for(let j = 0; j < count; j++) {
        let t = sat[bcalc.encode([i,j])];

        let tN, tE, tS, tW;
        let bN, bE, bS, bW;
        let dir;

        if ( (i === 0) && (j === count-1) ) {
            // top right cell - ref. SW
            tS = sat[bcalc.encode([i+1,j])];
            tW = sat[bcalc.encode([i,j-1])];

            bS = mapt[t][tS];
            bW = mapt[t][tW];
            
            dir = btrasf.opposite(border[t][bS]) + btrasf.opposite(border[t][bW]); 

        }  else if ( (i === 0) && (j < count-1) ) {
            // first row - ref. ES
            tE = sat[bcalc.encode([i,j+1])];
            tS = sat[bcalc.encode([i+1,j])];
            
            bE = mapt[t][tE];
            bS = mapt[t][tS];

            dir =  btrasf.opposite(border[t][bS]) + border[t][bE]; 

        } else if ( (i > 0) && (j === count-1) ) {
            // last column - ref WN
            tW = sat[bcalc.encode([i,j-1])];
            tN = sat[bcalc.encode([i-1,j])]; 

            bN = mapt[t][tN];
            bW = mapt[t][tW];

            dir = border[t][bN] + btrasf.opposite(border[t][bW]);

        }  else {
            // all others cell - ref. NE
            tN = sat[bcalc.encode([i-1,j])]; 
            tE = sat[bcalc.encode([i,j+1])];

            bN = mapt[t][tN];
            bE = mapt[t][tE];

            dir = border[t][bN] + border[t][bE];  

        }  

        def[bcalc.encode([i,j])] = btrasf[dir](tile[t]);

    }
}

// console.log(def);

// remove the tiles borders
let image = [];

for(let j = 0; j < count; j++) {
    for(let i = 0; i < count; i++) {
        let t = def[bcalc.encode([i,j])];

        let len = t.length -2;

        for(let h = 1; h <= len; h++) {
            let z = i*len + h-1;
            if (!image[z]) { image[z]=''; }
            image[z] += t[h].substr(1,len);
        }
    }
}

// console.log(image);

// the regexp monster
let monster1Re = RegExp('^..................#.');
let monster2Re = RegExp('^#....##....##....###');
let monster3Re = RegExp('^.#..#..#..#..#..#...');

let imagelen = image.length;

function checkMonster(i,j){
    let s1 = image[i].substr(j);
    let s2 = image[i+1].substr(j);
    let s3 = image[i+2].substr(j); 
    
    let m1 = s1.match(monster1Re);
    let m2 = s2.match(monster2Re);
    let m3 = s3.match(monster3Re); 

    if (m1 && m2 && m3) { return true; }

    return false;
}

function checkAllMonster() {
    for(let i = 0; i < imagelen-2; i++){
        // let i = 2;
        for(let j = 0; j < imagelen -19; j++) {
            let found =  checkMonster(i,j);
            if ( found ) { monster.push([i,j]); }
        }
    }
}

let imageOrig = _.cloneDeep(image);

let monster = [];

let pd = ['NE','NW','SE','SW','ES','WS','EN','WN'];

// try all puzzle disposition until find monsters
pd.forEach( (dir) => {
    monster = [];
    image = _.cloneDeep(imageOrig);
    image = btrasf[dir](image);
    checkAllMonster();
    if (monster.length > 0 ) {
        console.log('IMAGE RIGTH DISPOSITION');
        console.log(image);
        console.log('monsters coordinates'+dir,monster);

        let gates = imageOrig.reduce( (r,s) => r+(s.match(/#/g)||[]).length ,0);
        console.log('gates',gates,'res',(gates-15*monster.length))  // <--- the results   
        process.exit(0);     
    }

});
