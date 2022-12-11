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

let res = defcant.reduce( (r,i) => r+can.reduce( (r1,i1) => r1+_.intersection([i],i1[0]).length,0 ),0  );

console.log('res',res);
