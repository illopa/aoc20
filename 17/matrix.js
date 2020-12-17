const matrix = function() {
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

        // matrix dimensions
        D: function(m) {
            if ( !Array.isArray(m) ) { return null; }
            let l = m.length;
            if (!l) { return null;}
            let c = this.D(m[0]);
            if ( !c ) { return [l]; }
            return [l].concat(c); 
        },

        // unshift
        U: function(m,v) {
            let mu = _.cloneDeep(m);
            let c = this.D(mu);
            let uu = [];
            this.S(uu,c,v);
            mu = mu.map( (mi) => this.U(mi,v) );
            mu.unshift(uu);
        }

    };
}();
(typeof module !== "undefined") && (module.exports = matix);