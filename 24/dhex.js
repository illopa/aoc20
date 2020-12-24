
const dhex = function(st,pu) {

    var stage = st;
    var pu = pu;

    const f = 0.866;
    const r = 1;
    const d = r*f;

    function drawHex(x,y,v) {
        let pHex = [];
        let point = [x,y+r];

        pHex.push([x+d,y+r/2]);
        pHex.push([x+d,y-r/2]);
        pHex.push([x,y-r]);
        pHex.push([x-d,y-r/2]);
        pHex.push([x-d,y+r/2]);
        pHex.push([x,y+r]);

        point = [ pu.trasfX(point[0]), pu.trasfY(point[1])  ];
        pHex = pHex.map ( (p) => [ pu.trasfX(p[0]), pu.trasfY(p[1]) ] );

        // draw and fill
        let hex = stage.path().moveTo(point[0],point[1]);
        pHex.forEach( (p) => { hex = hex.lineTo(p[0],p[1]); });
        hex.fill('red')
    }

    return {
        draw: function(x,y) {
            drawHex(x,y);
        }
    }

};
(typeof module !== "undefined") && (module.exports = dhex);