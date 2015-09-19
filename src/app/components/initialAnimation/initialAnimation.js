require('snapsvg'); //load Snap
var RSVP = require('rsvp');

var StripesAnimation =      require('./stripesAnimation');
var LogoAnimation =         require('./logoAnimation');
var BackgroundAnimation =   require('./backgroundAnimation');

module.exports = {
    load: load,

    getTimeLine: getTimeLine,


    _scene : null
}


function load(element, callback){
    var self = this;
    self._scene = Snap(element);

    var backgroundScene = document.createElement('div');
    backgroundScene.id = 'scene__backdrop';
    element.appendChild(backgroundScene);

    var stripesScene = document.createElement('div');
    stripesScene.id = "scene__stripes";
    element.appendChild(stripesScene);

    var logoScene = document.createElement('div');
    logoScene.id = 'scene__logo';
    element.appendChild(logoScene);



    var stripesPromise = StripesAnimation.load(stripesScene)
    var logoPromise = LogoAnimation.load(logoScene);
    var backgroundPromise = BackgroundAnimation.load(backgroundScene);

    var promise = RSVP.all([stripesPromise, logoPromise, backgroundPromise])
    return promise;
};


function getTimeLine(){
    var stripesTimeline = StripesAnimation.getTimeLine();
    var logoTimeline = LogoAnimation.getTimeLine();
    var backgroundTimeline = BackgroundAnimation.getTimeLine();

    var timeline = new TimelineMax();

    timeline.add(stripesTimeline, 0)
          .add(logoTimeline, 1)
          .add(backgroundTimeline, 1);


    return timeline;
}

//console.log(scene);


