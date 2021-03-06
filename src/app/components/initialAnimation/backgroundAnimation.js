var Utils = require('../../common/utils');
var RSVP = require('rsvp');

module.exports = {
    load: load,
    getTimeLine: getTimeLine,

    _scene : null
}

function getTimeLine(){
    var backdrop = this._scene.querySelector('#scene__backdrop');

    var timeline =  (new TimelineLite())
                        .to(
                            backdrop,
                            2.5,
                            {
                                opacity: 0.6,
                                scale: 1.1,
                                ease: Sine.easeOut
                            }
                        )

    return timeline;
}

function load(element){
    this._scene = element;

    var backdrop = document.createElement('div');
    backdrop.id = 'scene__backdrop';
    this._scene.appendChild(backdrop);


    var deferred = RSVP.defer();
    deferred.resolve();

    return deferred.promise;
};
