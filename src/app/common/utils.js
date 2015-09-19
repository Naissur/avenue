module.exports = {

    svgAnimatePathFrom: function(length, offset){
        return {
            strokeDasharray: length,
            strokeDashoffset: -length - offset,
            ease: Power2.easeInOut
        }
    },

    svgAnimatePathTo: function(length, offset){
        return {
            strokeDasharray: length,
            strokeDashoffset: -offset,
            ease: Power2.easeInOut
        }
    },



    padNumber: function(a, b, n){
        if( typeof n !== 'number'){ return n; }

        if(a > b){
            return n;
        }

        if(n < a){
            return a;
        }

        if(n > b){
            return b;
        }

        return n;
    }
}
