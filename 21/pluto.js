var fs = require('fs');
var _ = require('lodash');

let data = fs.readFileSync('input.txt').toString().replace(/\r/g,"").split("\n");

/*   mxmxvkd kfcds sqjhc nhms (contains dairy, fish)  */

let can  = data.map(  (l) => {
    let l1 = l.split(' (contains ');
    return [l1[0].split(' '), l1[1].substr(0,(l1[1].length)-1).split(', ')];

})

let tutti = can.reduce( (a,c) => _.union(a,c[0]) ,[]);

console.log(tutti);

let cant = can.map( (c) =>  {
    let [i,a] = c;
    return [ _.difference(tutti,i), a  ];
});

// console.log(cant);

let all = {};

cant.forEach( (c) => {
    let [i,a] = c;
    a.forEach( (a1) => {
        if (!all[a1]) { all[a1]=[];}
        all[a1] = _.union(all[a1],i);
    });
});

// console.log(all);

let allkey = _.keys(all);

let defcant = _.reduce(allkey.slice(1), (r,a) => _.intersection(r, all[a])  , all[allkey[0]] );

console.log(defcant);


let defcan = _.map(can, (c) => [_.difference(c[0],defcant),c[1]] );

console.log(defcan);

let  must = {};

defcan.forEach( (c) => {
    let [i,a] = c;
    a.forEach( (a1) => {
        if (!must[a1]) { must[a1]=i;}
        must[a1] = _.intersection(must[a1],i);
    });
});

console.log('MUST',must);
let mustkey = _.reduce(must, (r,ml,k) => {
    if(ml.length === 1) {
        r = r.concat(k);
    }
    return r;
} ,[]);
console.log('MUSTKEY',mustkey);



while (mustkey.length > 0) {
    // TOGLI UN ALL DA TUTTE LE MUST E METTILO IN DONE
    let m = mustkey.shift();
    _.forEach(must, (ml,k) => {
        let len = ml.length;
        if ( len > 1) {
            let d = _.difference(ml,must[m]);
            must[k] = d;
            if (d.length === 1) { mustkey.push(k)}
        }
    });
    console.log('MUST',must);
    console.log('MUSTKEY',mustkey);
}

let dangerlist = _.reduce(must, (r,ml) => r.concat(ml),[]);
let dangermap = {};
_.forEach(must, (ml,k) => {
    dangermap[ml[0]] = k; 
})

console.log('dangerlist',dangerlist);
console.log('dangermap',dangermap);
dangerlist = dangerlist.sort((a,b) => (dangermap[a]<dangermap[b]) ? -1 : 1);
console.log('dangerlist',dangerlist);

console.log('RES=',dangerlist.join(','));