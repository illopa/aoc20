const cupcircle = function() {

    let cup = [];
    let max = 0;
    let num = 0;

    let current = 0;

    let nextincircle = [];

    function val(p) {
        return p;
    }

    function pos(v){
        return v;
    }

    function next(p) {
        return nextincircle[p] || p+1;
    }
    
    function prev(p) {
        return (p-1) || max;
    }

    function movebetter(round) {
        // console.log('-- move:',round),'--';
        let i = current; 
        let c = val(i);
        // console.log('cups:',  displaynext(i,9) );
    
        let p0 = next(i);
        let p1 = next(p0);
        let p2 = next(p1);
        let p3 = next(p2);
    
        nextincircle[i] = p3;
        nextincircle[p2] = null;
    
        let pick = [ p0, p1, p2 ];
        // console.log('pick up:',pick.join(' '));
    
        let d = prev(c);
        while ( pick.indexOf(d) >= 0 ) {
            d = prev(d);
        }
        // console.log('destination:',d);
    
        let nexd = next(d);
        nextincircle[d] = p0;
        nextincircle[p2] = nexd;
    
        current = next(i);
    
        // console.log('');
    }    

    function displaynext(i,maxd) {
        let display = [];
        let c = val(i);
        display.push('('+c+')');
        let n = i;
        let r = 0;
        do {
            n = next(n);
            display.push(val(n));
            r++;
        } while ( n !== i && (!maxd || (r < maxd) ))
        display.pop();
        return display.join(' ');
    }    

    return {
        init_part2: function(puzzle,maxcircle,numrounds){
            num = numrounds;
            max = maxcircle;
            cup  = puzzle.split('').map( (n) => parseInt(n));
            current = cup[0];

            cup.forEach( (v,i) => { nextincircle[v] = cup[i+1] || i+2;} );
            console.log(cup);
            console.log(nextincircle);
            nextincircle[max] = current;

        },
        do: function(maxdisplay) {
            console.log('STARTING');

            let start = new Date().getTime();

            let j  = 1;
          
            for(let round= 1; round <= num; round++) {
                movebetter(round);
            
                if (round % 100000 === 0 ) {
                    let step = new Date().getTime();
                    console.log('ROUND',round,'TIME',(step-start)/1000,'CURR',current, displaynext(current,maxdisplay),'J',j, displaynext(j,maxdisplay));
                }    
            }
            
        
        },

        part2: function(maxdisplay) {
            let j  = 1;

            let cupfd = displaynext(j,maxdisplay);
            
            console.log('-- final --')
            console.log('cups:', cupfd  );
            console.log('');
            
            let cupfda = cupfd.split(' ');
            let res = cupfda[1]*cupfda[2];
            
            console.log('illopa says:', res )    
        }
    }
}();


// let puzzle = "389125467";
let puzzle = "215694783";
let max = 1000000;
let numrounds = 10000000;

cupcircle.init_part2(puzzle,max,numrounds);

cupcircle.do(3);

cupcircle.part2(3);