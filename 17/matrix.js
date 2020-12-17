
var matrix = function() {
    return {
        // V(m,coord) return m[coord] es. V(m) return m, V(m,[]) return m V(m,[i]) return m[i], V(m,[i,j]) return m[i][j], ...
        V: function(m,coord) {
            // console.log(m, coord.length, coord);
            if (coord && coord.length > 0) {
                return m && m[coord[0]] && this.V.call(this, m[coord[0]], coord.slice(1)) || 0;
            } else { return m; }
        },
        // S(m,coord,v) -> m[coord] = v es. V(m) return, V(m,[],v) return, V(m,[i],v) ->  m[i] = v, V(m,[i,j], v) -> m[i][j], = v
        S: function(m,coord,v) {
            if (m && coord && coord.length > 0) {
                if ( coord.length === 1) { m[coord[0]]  = v; }
                else {
                    if ( !m[coord[0]] ) { m[coord[0]] = []; }
                    this.S.call(this,m[coord[0]],coord.slice(1),v);
                } 
            }
        },
        /*
        U: function(m,n,v) {
            let mu = [];
            if ( n <= 0 ) { return mu; } 
            mu[0] = v;
            if ( n == 1 ) { mu.concat} 
            m.reduce( (mr,mi,i) => mr.concat(this.U(mi,n-1,v), mu)
            mu = mu.concat  this.U(m[i],n-1,v])
            }
        } 
        */

    };
}();


let a = [];
a[1] = 10;
a[0] = [1,2,3];
a[3] = [0,[1,2,3],3];
console.log('A=',matrix.V(a));
console.log('A=',matrix.V(a,[]));
console.log('A:0,2=',matrix.V(a,[0,2]));
console.log('A:3,1,1=',matrix.V(a,[3,1,1]));
console.log('A:0=',matrix.V(a,[0]));

console.log('5:4,3=',matrix.V(5,[4,3]));
console.log('null',matrix.V(null));
// console.log('undef',matrix.V(f));

matrix.S(a,[3,1,1],7);
console.log('A:3,1,1=',matrix.V(a,[3,1,1]));

matrix.S(a,[10,1,1],[1,2,3]);
console.log('a:10,1,1=',matrix.V(a,[10,1,1]));
matrix.S(a,[9,1],5);
console.log('A=',matrix.V(a));
// TODO S = set, U = unshift