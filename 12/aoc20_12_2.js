const aoc201202 = function() {

    function decode(instr){
        return [instr[0],parseInt(instr.substr(1))];
    }
    
    let engine = {
    
            N: function(s,c) {
                s.WN += c;
                return s;
            },
            S: function(s,c) {
                s.WN -= c;
                return s;
            },  
            E: function(s,c) {
                s.WE += c;
                return s;
            },
            W: function(s,c) {
                s.WE -= c;
                return s;
            },   
            F: function(s,c) {
                s.E += s.WE * c;
                s.N += s.WN * c;
    
                return s;
            },   
            WL: function(e,n)  {
                return [(-1)*n,e];
            },
            WR: function(e,n)  {
                return [n,(-1)*e];
            },       
            L: function(s,c){
                let i = parseInt(c/90);
                while (i>0) {
                    [s.WE,s.WN] = engine.WL.call(this,s.WE,s.WN);
                    i--;
                }
                return s;
            },
            R: function(s,c){
                let i = parseInt(c/90);
                while (i>0) {
                    [s.WE,s.WN] = engine.WR.call(this,s.WE,s.WN);
                    i--;
                }
                return s;
            },
               
    
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
(typeof module !== "undefined") && (module.exports = aoc201202);