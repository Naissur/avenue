require('snapsvg'); //load Snap

module.exports = {
    load: load,
    play: play,


    _timeLine: null,
    _scene : null
}


//loads scene and appends it to the passed element
function load(element, callback){
    var self = this;
    self._scene = Snap(element);

    Snap.load("/assets/stripes_01.svg", function (el) {
        var stripes_mask = el.select("#stripes_01__mask");
        var stripes = el.select("#stripes_01");

        var stripesLeft = el.select("#sripes_01__left");
        stripes.attr({ mask: stripes_mask });


        var logo = el.select("#logo"),
            logo__outer =           logo.select("#logo__outer"),
            logo__middle =          logo.select("#logo__middle"),
            logo__bottom =          logo.select("#logo__bottom"),
            logo__middle_branch =   logo.select("#logo__middle_branch"),
            logo__triangle =        logo.select("#logo__triangle");
            logo__triangle_mask =   logo.select("#logo__triangle_mask");

        logo__triangle.attr({ clip: logo__triangle_mask });

        //declare animation
        var timeLine = new TimelineLite({paused:true});

        timeLine
            .addLabel("start")
            .to(stripes_mask.node, 0.3, {
                transform: "translateY(380px)",
                ease: Linear.easeNone
            })


            .addLabel("logo_start")

            .to(stripes_mask.node, 0.3, {
                transform: "translateY(770px)",
                ease: Linear.easeNone
            }, "logo_start")

            .to(logo__triangle_mask.node, 0.9, {
                x: "400",
                ease: Linear.easeNone
            }, "logo_start+=0.5")

            .staggerFromTo(
                [
                    logo__outer.node,
                    logo__middle.node,
                    logo__bottom.node,
                    logo__middle_branch.node,
                ], 
                0.8, 
                {
                    strokeDasharray: 2000,
                    strokeDashoffset: -2050,
                    ease: Linear.easeNone
                },
                {
                    strokeDasharray: 2000,
                    strokeDashoffset: -50,
                    ease: Linear.easeNone
                },
                0.2,
                "logo_start"
            )

            .addLabel("logo_finish")

            .to(logo.node, 1.6, {
                rotation: -28,
                transformOrigin: "1070px 230px"
            }, "logo_start+=0.4")

        //stripes_mask.animate({ transform: 't0,380' }, 1000, mina.easeout );
        //clipG.animate({ transform: 't200,0' }, 3000, mina.bounce, function() { clipG.animate({ transform: 't0,0' }, 3000, mina.bounce)  }  );


        self._scene.append(el);
        self._timeLine = timeLine;
        callback();
    });
};

function play(){
    if(this._timeLine){
        this._timeLine.play();
        this._timeLine.timeScale(0.6);
    }
};
//console.log(scene);


