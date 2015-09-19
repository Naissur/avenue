require('snapsvg');
var Utils = require('../../common/utils');
var RSVP = require('rsvp');

module.exports = {
    load: load,
    getTimeLine: getTimeLine,

    _scene : null
}

function load(element){
    var self = this;
    var deferred = RSVP.defer();

    self._scene = Snap(element);

    Snap.load("/assets/logo.svg", function (el) {
        self._scene.append(el);

        deferred.resolve();
    });

    return deferred.promise;
};

function getTimeLine(){
    var logo = this._scene.select('#logo');

    var topCaption =        logo.select('#logo__top_caption__text');
    var topCaption_mask =   logo.select('#logo__top_caption__mask');

    topCaption.select('tspan').attr({ y: "" }); // fixing tspan y for preventing text translation blocking
    topCaption.attr({
        mask: topCaption_mask
    });


    var bottomCaption = logo.select('#logo__bottom_caption__text');
    var bottomCaption_mask = logo.select('#logo__bottom_caption__mask');

    bottomCaption.select('tspan').attr({ y: "" }); // fixing tspan y for preventing text translation blocking
    bottomCaption.attr({
        mask: bottomCaption_mask
    });

    var allPaths = logo.selectAll('path').items;


    var timeline =  new TimelineLite()
                        .staggerFromTo(
                            allPaths.map(function(path){
                                return path.node;
                            }), 
                            1.2, 
                            Utils.svgAnimatePathFrom(130, 0),
                            Utils.svgAnimatePathTo(130, 0),
                            0.03
                        )
                        .to(
                            topCaption.node,
                            0.7,
                            {
                                attr: { y: 955 },
                                ease: Power2.easeInOut
                            },
                            "-=1.1"
                        )
                        .to(
                            bottomCaption.node,
                            0.6,
                            {
                                attr: { y: 1065 },
                                ease: Power2.easeInOut
                            },
                            "-=0.7"
                        )

    return timeline;
}

