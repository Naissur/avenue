require('snapsvg'); //load Snap
var RSVP = require('rsvp');

var StripesAnimation =      require('./stripesAnimation');
var LogoAnimation =         require('./logoAnimation');
var BackgroundAnimation =   require('./backgroundAnimation');

module.exports = {
    load: load,

    getTimeLine: getTimeLine,


    _timeLine: null,
    _scene : null
}


//loads scene and appends it to the passed element
function load(element, callback){
    var self = this;
    self._scene = Snap(element);


    var stripesScene = element.querySelector('#scene__stripes');
    var logoScene = element.querySelector('#scene__logo');
    var backgroundScene = element.querySelector('#scene__backdrop');


    var stripesPromise = StripesAnimation.load(stripesScene)
    var logoPromise = LogoAnimation.load(logoScene);
    var backgroundPromise = BackgroundAnimation.load(backgroundScene);

    var promise = RSVP.all([stripesPromise, logoPromise, backgroundPromise])
    return promise;
};


function getTimeLine(){
    var stripesTimeline = StripesAnimation._timeLine;
    var logoTimeline = LogoAnimation.getTimeLine();
    var backgroundTimeline = BackgroundAnimation.getTimeLine();

    var master = new TimelineMax();

    master.add(stripesTimeline, 0)
          .add(logoTimeline, 1)
          .add(backgroundTimeline, 1);


    //master.seek(1);

    window.tl = master;

    return master;
}

//console.log(scene);


