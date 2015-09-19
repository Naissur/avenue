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
    }
}
