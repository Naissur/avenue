var RSVP = require('rsvp');
var InitialAnimation = require('../initialAnimation/initialAnimation.js');

var Storage = require('../storage/storage');

module.exports = {
    load: load,

    play: play,
    seekRelative: seekRelative,
    seekToNext: seekToNext,
    seekToPrev: seekToPrev,


    _timeLine: null
}

function load(){
    var self = this;

    var promise = InitialAnimation.load(document.querySelector('#scene'))
                    .then(function(){
                        self._timeLine = new TimelineMax();

                        self._timeLine
                            .addLabel('initialAnimation')
                            .add(InitialAnimation.getTimeLine())
                            .addLabel('aboutUs');
                    });
    return promise;
}

function seekRelative(seconds){
    if(!this._timeLine){ return; };

    var self = this;

    var currentTime = self._timeLine.time()
    var newTime = currentTime + seconds;

    if(newTime > 0){
        self._timeLine .tweenTo(newTime, {
            ease: Power2.easeOut
        });
    }else{
        self._timeLine .tweenTo(0, {
            ease: Power2.easeOut
        });
    }
}

function seekToNext(){
    if(!this._timeLine){ return; };

    var labelAfter = this._timeLine.getLabelAfter();

    if(labelAfter == 'aboutUs'){
        this.seekRelative(1.0);
        return;
    }

    this._timeLine.tweenTo( this._timeLine.getLabelAfter(),
                    {
                        ease: Power2.easeOut
                    } );
}

function seekToPrev(){
    if(!this._timeLine){ return; };

    var currentTime = this._timeLine.time();

    var labelAfter = this._timeLine.getLabelAfter();
    var labelBefore = this._timeLine.getLabelBefore();

    if(currentTime < this._timeLine.getLabelTime('aboutUs')){
        this.seekRelative(-1.0);
        return;
    }

    if(labelBefore == 'initialAnimation'){
        return;
    }

    this._timeLine.tweenTo( this._timeLine.getLabelBefore(),
                    {
                        ease: Power2.easeOut
                    } );
}

function reverse(){
    if(!this._timeLine){ return; };

    this._timeLine.tweenTo(0.0, {
        ease: Power2.easeOut
    });
}

function play(){
    if(!this._timeLine){ return; };

    this._timeLine.play();
}
