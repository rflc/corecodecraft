// Global variables
var vh;
var offset;
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
    var one = function(pct) {
	let tl = new TimelineMax({paused: true});
	tl.set('#imask', {attr:{display: 'visible'}})
	  .set('#hand', {opacity: 1})
	  .set('#i2',{attr:{y:'27%'}})
	  .set('#i3',{attr:{y:'33%'}})
	  .set('#i4,#i5,#i6',{attr:{visibility:'hidden'}})
	  .to('#i1',.5,{attr:{visibility:'visible'}})
	  .to('#i1',.2,{attr:{visibility:'hidden'}})
	  .to('#i2,#i3',.2,{attr:{visibility:'hidden'}})
	  .to('#i2,#i3',2,{attr:{visibility:'visible'}})
	  .to('#i2',2,{attr:{y:'-10%'}},2)
	  .to('#i3',2,{attr:{y:'100%'}},2)
	  .to('#i4,#i5,#i6',2,{attr:{visibility:'visible'}})
	  .to('#hand', 2, {opacity: 0})
	  .to('#imask',.2, {attr:{display: 'none'}}, 1.8);
	tl.progress(pct);
    }

    // Scene two
    var two = function(pct){
	let tl = new TimelineMax({paused: true});
	tl.progress(pct);
    }

    // Scene three
    var three = function(pct){
	let tl = new TimelineMax({paused: true});
	tl.progress(pct);
    }
    
    // Scene Four
    var four = function(pct){
	let tl = new TimelineMax({paused: true});
	tl.set('#lw',{attr:{transform:'translate(-100 0)'}});
	tl.progress(pct);
    }

    var five = function(pct){
	let tl = new TimelineMax({paused: true});
	tl.progress(pct);
    }
   
    var arr = [one, two, three, four, five];

    return arr;
})();


var play = (function(){

  // closure scope
  let lastY = null;
  let i = 0;

  //function called by the event listener
  return function(e){
    let frame = scene[i].getBoundingClientRect();
    let cam   = camera[i].getBoundingClientRect(); // replace with clientHeight
    var length = cam.height - window.innerHeight;

    // Determine scroll direction
    if (lastY < window.pageYOffset && frame.bottom < 0) {
	i++;
      }
    else if (frame.top > window.innerHeight && (i > 0)) {
	i--;
    }
      if (frame.top ==  0 && frame.bottom == window.innerHeight) {
	  // Get camera scroll percentage
	  let pct = ((~cam.top+1) / length);
	  animate[i](pct);
	  console.log(pct);
	  pct = null;
      }

    lastY = window.pageYOffset;
  }
})();

// Event Listeners
document.addEventListener("DOMContentLoaded", init);
document.addEventListener('scroll', play);
