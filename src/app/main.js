var RSVP = require('rsvp');
var masterAnimation = require('./components/masterAnimation/masterAnimation');


masterAnimation.load().then(function(){
    masterAnimation.play();
});

window.addEventListener('mousewheel', function(e){
    var deltaY = e.deltaY;
    if(deltaY < 0){
        masterAnimation.seekToPrev();
    }else{
        masterAnimation.seekToNext();
    }
});

