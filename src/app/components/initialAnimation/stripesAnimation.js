require('snapsvg');
var RSVP = require('rsvp');
var Utils = require('../../common/utils');

module.exports = {
    load: load,

    getTimeLine: getTimeLine,

    _scene : null
}

function load(element){
    var deferred = RSVP.defer();

    var self = this;
    self._scene = Snap(element);


    Snap.load("/assets/stripes_01.svg", function (el) {
        self._scene.append(el);
        self._scene.select('svg').attr({
            width: "100%"
        });

        deferred.resolve();
    });

    return deferred.promise;
};



function getTimeLine(){
    var stripes = this._scene.select("#stripes_01");
    var stripes_mask = this._scene.select("#stripes_01__mask");
    stripes.attr({ mask: stripes_mask });


    var stripesLeft = this._scene.select("#stripes_01__left");


    var logo =           this._scene.select("#A_logo"),
        logo__outer =           logo.select("#A_logo__outer"),
        logo__middle =          logo.select("#A_logo__middle"),
        logo__bottom =          logo.select("#A_logo__bottom"),
        logo__middle_branch =   logo.select("#A_logo__middle_branch"),
        logo__triangle =        logo.select("#A_logo__triangle");
        logo__triangle_mask =   logo.select("#A_logo__triangle_mask");

    logo__triangle.attr({ clip: logo__triangle_mask });




    var timeLine = new TimelineLite();
    timeLine
        .addLabel("A_logo_start")

        .to(stripes_mask.node, 0.3, {
            transform: "translateY(770px)",
            ease: Linear.easeNone
        }, "A_logo_start")

        .to(logo__triangle_mask.node, 0.9, {
            x: "400",
            ease: Linear.easeNone
        }, "A_logo_start+=0.5")

        .staggerFromTo(
            [
                logo__outer.node,
                logo__middle.node,
                logo__bottom.node,
                logo__middle_branch.node,
            ], 
            1.2, 
            Utils.svgAnimatePathFrom(2200, 0),
            Utils.svgAnimatePathTo(2200, 0),
            0.04,
            "A_logo_start-=0.2"
        )

        .addLabel("A_logo_finish")

        .to(logo.node, 2.1, {
            rotation: -28,
            transformOrigin: "1070px 230px",
            ease: Power2.easeInOut
        }, "A_logo_start+=0.4")


    return timeLine;
}
