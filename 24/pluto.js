var fs = require('fs');
var _ = require('lodash');

var board = function() {
    var tiles = {};

    let mX = 0, mY = 0;

    function encode(x,y) {
        return ''+x+','+y;
    }

    function decode(xy) {
        return xy.split(',')
    }    

    function flip(x,y) {
        // console.log(x,y);
        tiles[encode(x,y)] = !tiles[encode(x,y)];
        if ( Math.abs(x) > mX ) { mX = Math.abs(x); }
        if ( Math.abs(y) > mY ) { mY = Math.abs(y); }
    }

    function decodeline(line) {
        let r = line.split('').reduce( (r,c) => {
            if (r.b) {
                c = r.b+c;
                r.b = 0;
                r.a.push(c)
            } else  if ( c === 's' || c === 'n' ) {
                r.b = c;
            } else {
                r.a.push(c)
            }
            return r;
        },{a:[],b:0});
        return r.a;
    }  
    
    function move(x,y,d){
        switch(d) {
            case 'e':
                x = x+2;
                break;
            case 'w':
                x = x-2;
                break;
            case 'ne':
                x = x+1;
                y = y+1;
                break;
            case 'nw':
                x = x-1;
                y = y+1;
                break;
            case 'se':
                x = x+1;
                y = y-1;
                break;
            case 'sw':
                x = x-1;
                y = y-1;
                break;            
        }
        return [x,y];
    }    

    function nb(x,y) {
        let list = [];
        list.push(tiles[encode(x+2,y)]); // e
        list.push(tiles[encode(x-2,y)]); // w
        list.push(tiles[encode(x+1,y+1)]); // ne
        list.push(tiles[encode(x-1,y+1)]); // nw
        list.push(tiles[encode(x+1,y-1)]); // se
        list.push(tiles[encode(x-1,y-1)]); // sw  
        return list;      
    }

    function flipbyrule(x,y) {
        let list = nb(x,y);
        let n = list.reduce( (s,v) => s+( v && 1 || 0), 0);

        if ( tiles[encode(x,y)] && ( n === 0 || n > 2) ) {
            return true;
        } else if ( !tiles[encode(x,y)] && ( n === 2)) {
            return true;
        }
        return false;

    }

    return {

        moveandflip: function(line) {
            let m = decodeline(line);
            let n = m.reduce( (r,d) => {
                [r.x,r.y] = move(r.x,r.y,d);
                // console.log(r);
                return r;
            },{x:0,y:0});
            flip(n.x,n.y);
        },

        display: function(){
            console.log(tiles);
        },

        count: function() {
            let n = _.reduce(tiles, (s,v) => s+( v && 1 || 0), 0);

            console.log('illopa says:'+n);
        },

        daycount: function(day) {
            let n = _.reduce(tiles, (s,v) => s+( v && 1 || 0), 0);

            console.log('Day '+day+':'+n);
        },        

        turn: function() {
            let list = [];
            for( let i = -mX-2; i <= mX+2; i++) {
                for(let j = -mY-2; j <= mY+2; j++) {
                    if ( ( (Math.abs(j) % 2) === 0 && (Math.abs(i) % 2) === 0 ) || ( (Math.abs(j) % 2) === 1 && (Math.abs(i) % 2) === 1 ) ) {
                        // console.log(i,j);
                        if ( flipbyrule(i,j)) { list.push(encode(i,j)); }
                    }
                }
            }

            list.forEach( (e) => {
                let [x,y] = decode(e);
                flip(x,y);
            })

        }

    }

}();

let lines = fs.readFileSync('input.txt').toString().replace(/\r/g,"").split("\n");

lines.forEach( (l) => board.moveandflip(l) );

board.daycount(0);

let howmany = 100;
for( let i = 1; i <= howmany; i++) {
    board.turn();
    board.daycount(i);
}