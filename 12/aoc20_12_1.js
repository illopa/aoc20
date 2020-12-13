const aoc201201 = function() {

    function decode(instr){
        return [instr[0],parseInt(instr.substr(1))];
    }
    
    let facing  = {
        E: 0,
        N: 1,
        W: 2,
        S: 3
    };
    
    let facingR= ['E','N','W','S'];

    let engine = {
        
        N: function(s,c) {
            s.N += c;
            return s;
        },
        S: function(s,c) {
            s.N -= c;
            return s;
        },  
        E: function(s,c) {
            s.E += c;
            return s;
        },
        W: function(s,c) {
            s.E -= c;
            return s;
        },   
        F: function(s,c) {
            return engine[s.F].call(this,s,c);
        },   
        L: function(s,c){
            let i = parseInt(c/90);
            let f = (facing[s.F] + i) % 4;
            s.F = facingR[f];
            return s;
        },
        R: function(s,c){
            let i = parseInt(c/90);
            let f = (( (facing[s.F] - i) % 4) +4 ) % 4;
            s.F = facingR[f];
            return s;
        }                              

    };    

    return {
        
         step: function(s,instr){
             if (!instr) {return s; }
            // console.log(s,instr);
            let [op,c] = decode(instr);
        
            return engine[op].call(this,s,c);
        
        }

    };
}();
(typeof module !== "undefined") && (module.exports = aoc201201);