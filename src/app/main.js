var InitialAnimation = require('./components/initialAnimation/initialAnimation.js');

InitialAnimation.load(document.querySelector('#scene'), function(){
    InitialAnimation.play();
});

