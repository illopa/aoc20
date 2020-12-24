
var grutil = function() {
    var grafico = {
        x: {
            min: 0,
            max: 0
        },
        y:  {
            min: 0,
            max: 0
        }
    };
    var scala = {
        x: {
            min: 0,
            max: 0
        },
        y:  {
            min: 0,
            max: 0
        }        
    };
    var wG = 0;
    var wS = 0;
    var hG = 0;
    var hS = 0;

    return {
        setGrafico: function (xMin,xMax,yMin,yMax){
            grafico = {
                x: {
                    min: xMin,
                    max: xMax
                },
                y:  {
                    min: yMin,
                    max: yMax
                }
            };
            wG = grafico.x.max - grafico.x.min;
            hG = grafico.y.max - grafico.y.min;
        },
        setScala: function (xMin,xMax,yMin,yMax){
            scala = {
                x: {
                    min: xMin,
                    max: xMax
                },
                y:  {
                    min: yMin,
                    max: yMax
                }
            };
            wS = scala.x.max - scala.x.min;
            hS = scala.y.max - scala.y.min;

        },   

        trasfX: function(x) {
            var x0 = x - scala.x.min;
            var x1 = x0 * (wG/wS) + grafico.x.min;
            return x1;
        },
        trasfY: function(y) {
            var y0 = y - scala.y.min;
            var y1 = grafico.y.max - y0 * (hG/hS) ;
            return y1;
        },
        
        trasfW: function(w) {
            var w1 = w * (wG/wS);
            return w1;
        },
        trasfH: function(h) {
            var h1 = h * (hG/hS) ;
            return h1;
        }         
    }

};
(typeof module !== "undefined") && (module.exports = grutil);
