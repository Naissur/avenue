var RSVP = require('rsvp');
var InitialAnimation = require('../initialAnimation/initialAnimation.js');
var Utils = require('../../common/utils.js');

var Storage = require('../storage/storage');

module.exports = {
    load: load,

    play: play,
    seekRelative: seekRelative,
    seekToNext: seekToNext,
    seekToPrev: seekToPrev,


    hasAnimationPassed: hasAnimationPassed,
    saveAnimationPassed: saveAnimationPassed,

    saveAnimationPassed: saveAnimationPassed,

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
                            .call(self.saveAnimationPassed)
                            .addLabel('start')
                            .addLabel('aboutUs');
                    });
    return promise;
}


function saveAnimationPassed(){
    Storage.setItem('initial_animation_passed', 'true');
}

function hasAnimationPassed(){
    return (Storage.getItem('initial_animation_passed') == 'true');
}


function play(){
    if(!this._timeLine){ return; };
    
    this._timeLine.play();


    if(this.hasAnimationPassed()){
        this._timeLine.seek('start');
    }
}


function seekRelative(seconds, scale){
    if(!this._timeLine){ return; };

    var self = this;

    var currentTime = self._timeLine.time()
    var newTime = Utils.padNumber(0, Infinity, currentTime + seconds);

    self._timeLine .tweenTo(newTime, {
        timeScale: scale,
        ease: Power2.easeOut
    });
}

function seekToNext(){
    if(!this._timeLine){ return; };

    var labelAfter = this._timeLine.getLabelAfter();

    if(labelAfter == 'start'){
        this.seekRelative(2.0, 2.0);
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

    if(currentTime < this._timeLine.getLabelTime('start')){
        this.seekRelative(-1.0, 1.0);
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
