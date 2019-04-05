// Global variables
var vh;
var scene;
var camera;
var height;
var hStyle;
var timer = null;


var init = function(){
    // Logo Animation
    var star = document.getElementById("str");
    var arc  = document.getElementById('arc');
    var ant  = document.getElementById('ant');
    var rng  = document.getElementById('rng');

    var arcLength = arc.getTotalLength();
    var antLength = ant.getTotalLength();
    var rngLength = rng.getTotalLength();


    arc.style.strokeDasharray = arcLength;
    ant.style.strokeDasharray = antLength;
    rng.style.strokeDasharray = rngLength;

    arc.style.strokeDashoffset = arcLength;
    ant.style.strokeDashoffset = antLength;
    rng.style.strokeDashoffset = rngLength;

    var tl = new TimelineMax();
    tl.set('#str', {opacity: 0})
      .set('#iphone', {opacity: 0})
      .to(arc, .6, {strokeDashoffset: 0}, .3)
      .to(ant, .6, {strokeDashoffset: 0}, .3)
      .to(rng, .9, {strokeDashoffset: 0}, .6)
      .to(str, .7, {opacity: 1}, 1.5)
      .to('#iphone', .1, {opacity: 1}, 1.9);
  
    // Get vh dimensions
  /*
    var el = document.createElement('div');
    nt.body.appendChil
    el.style.height = '100vh';
    vh = el.getBoundingClientRect().height;
    document.body.removeChild(el);
    console.log(vh);
   */

  scene  = document.getElementsByClassName('scene');
  camera   = document.getElementsByClassName('camera');
}

// Function unpdated on scroll
var animate = (function(){
    // Scene one
    var one = function(pct, rwd) {
	let tl = new TimelineMax({paused: true});
	if (rwd)
	    tl.reverse(pct);
	tl.to('#hand', 2, {opacity: 0})
	    .set('#ip', {attr:{mask: ""}}, 1.5);
	 tl.progress(pct);
    }

    // Scene two
    var two = function(pct, fwd){
	let tl = new TimelineMax({paused: true});
    }

    // Scene three

    var three = function(pct, fwd){
	let tl = new TimelineMax({paused: true});
    }
    // Scene Four

    var four = function(ptc, fwd){
	let tl = new TimelineMax({paused: true});
    }
   
    var arr = [one, two, three, four];

    return arr;
})();


var play = (function(){

  // closure scope
  let length;
  let lastY = null;
  let i = 0;

  //function called by the event listener
  return function(e){
    let frame = scene[i].getBoundingClientRect();
    let cam   = camera[i].getBoundingClientRect();
    length    = cam.height - window.innerHeight;
    // Determine scroll direction
    if (lastY < window.pageYOffset) {
      if (frame.top >=  0 && frame.bottom <= window.innerHeight) {
	// Get camera scroll percentage
	let pct = ((cam.top / length) * -1).toFixed(2);
        animate[i](pct, 0);
      }
      else if (frame.bottom < 0) {
	i++;
      }
    }
    else {
      if (frame.top <=  0 && frame.bottom <= window.innerHeight) {
	// Camera scroll percentage
	let pct = ((cam.top / length) * -1).toFixed(2);
	// ANIMTION REWIND GOES HERE
	animate[i](pct, 1);
      }
      else if (frame.top > window.innerHeight && (i > 0)) {
	i--;
      }
    }

    lastY = window.pageYOffset;
  }
})();

// Event Listeners
document.addEventListener("DOMContentLoaded", init);
document.addEventListener('scroll', play);
