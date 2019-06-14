// Global variables
var vh;
var offset;
var scene;
var camera;
var height;
var hStyle;
var timer = null;
var callToAction;


var init = function(){//{{{
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
      .set('#plane', {opacity: 0})
      .to(arc, .6, {strokeDashoffset: 0}, .3)
      .to(ant, .6, {strokeDashoffset: 0}, .3)
      .to(rng, .9, {strokeDashoffset: 0}, .6)
      .to(str, .7, {opacity: 1}, 1.5)
      .to('#iphone', .1, {opacity: 1}, 1.9)
      .to('#plane',.1,{opacity: 1},2.3);
  

    //Contact Form
//   callToAction = document.getElementById('c2a');
//   callToAction.addEventListener('click', dispatcher);
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
}//}}}

var animate = (function(){//{{{
    // Scene one
    var f0 = function(pct) {
	let tl = new TimelineMax({paused: true});

	tl.set('#iphone',{attr:{viewBox: '0 0 446.22 754.69'}})
	  .set('#i2',{attr:{y:'27%'}})
	  .set('#i3',{attr:{y:'33%'}})
	  .set('#i4,#i5,#i6',{attr:{display:'none'}})
	  .to('#i1',1.5,{attr:{display:''}})
	  .to('#i1',.2,{attr:{display:'none'}})
	  .to('#i2,#i3',.2,{attr:{display:'none'}})
	  .to('#i2,#i3',2,{attr:{display:'',visibility:'visible'}})
	  .to('#i2',2,{attr:{y:'-10%'}},2)
	  .to('#i3',2,{attr:{y:'100%'}},2)
	  .set('#i2,#i3',{attr:{display:'none'}})
	  .to('#i4,#i5,#i6',2,{attr:{display:''}})
	  .to('#iphone',3,{attr:{viewBox: '218 200 74.37 125.78'}});
/*	  .to('body',4,{backgroundColor:'black'});
	  .to('#hand', 2, {opacity: 0})
	  .to('#imask',.2, {attr:{display: 'none'}}, 1.8);
*/
	tl.progress(pct);
    }

    // Scene two
    var f1 = function(pct){
	let tl = new TimelineMax({paused: true});
	tl.progress(pct);
    }

    // Scene three
    var f2 = function(pct){
	let tl = new TimelineMax({paused: true});
	tl.progress(pct);
    }
    
    // Scene Four
    var f3 = function(pct){
	let tl = new TimelineMax({paused: true});
	tl.set('#lw',{autoAlpha:1,attr:{transform:'translate(-220 -85) scale(1.2)'}})
	  .set('#rw',{autoAlpha:1,attr:{transform:'translate(145 -85) scale(1.2)'}})
	  .to('#lw',3,{attr:{transform:'translate(0 0) scale(1)'}})
	  .to('#rw',3,{attr:{transform:'translate(0 0) scale(1)'}},0);
	tl.progress(pct);
    }

    // Scene Five
    var f4 = function(pct){
	let tl = new TimelineMax({paused: true});
	tl.set('#wasm,#clang,#devil,#web,#pony,#aws,#swift',{autoAlpha:0})
	  .to('#stack h2, #stack p',0.1,{visibility:'hidden'})
	  .to('#stack h2',1,{autoAlpha:1})
	  .to('#stack p',1,{autoAlpha:1},1)
	  .to('#wasm',1,{autoAlpha:1},2)
	  .to('#clang',1,{autoAlpha:1},3)
	  .to('#devil',1,{autoAlpha:1},4)
	  .to('#web',1,{autoAlpha:1},5)
	  .to('#pony',1,{autoAlpha:1},6)
	  .to('#aws',1,{autoAlpha:1},7)
	  .to('#swift',1,{autoAlpha:1},8);
	tl.progress(pct);
    }

    // Scene Six
    var f5 = function(pct){
	return;
    }

    // Email animation
    var f6 = function(){
	let tl = new TimelineMax({paused: true});
	/*
	tl.to('#c2a',1,{transform:'rotateY(0)'})
	  .set('#lable',{autoAlpha: 0})
	  .set('#email',{autoAlpha: 1})
	  */
	  tl.to('#c2a',3,{width: '100em'});
	  /*.to('#c2a rect',2,{attr:{transformOrigin:"100% 50%", width: '95%', height:'80%',},ease:Expo.easeInOut});*/
	tl.play();
    }
   
    var arr = [f0, f1, f2, f3, f4, f5, f6];

    return arr;
})();//}}}

var play = (function(){//{{{

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
})();//}}}

function validateEmail(email){//{{{
      var re = '/^([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
  return re.test(email);
}//}}}

var dispatcher = (function(){//{{{
    var message = document.getElementById('message');
    var box   = {
	b:   1, // button
	e:   2, // email
	t:   4, // text
	s:   8  // submitted
    };
    var state = box.b;

    return function(e){
	e.stopPropagation();
	/*
	if (state & box.b) {
	    callToAction.addEventListener('click', dispatcher);
	    animate[0](); // Animate fade out to bttm
	    return;
	}
	*/
	
	if(state & box.b){
	    state ^= box.b;
	    state = box.e;
	    callToAction.removeEventListener('click', dispatcher);
	    animate[5](); // reveal email input
	    let snd = document.getElementById('snd');
	    snd.addEventListener('click', dispatcher);
	    let email = document.getElementById('email');
	    email.addEventListener('keyup', function(e){
		if (e.keyCode == 13) {
		    dispatcher();
		}
	    });
	    document.addEventListener('click', function(e){
		if(e.target.closest('#c2a')){
		    console.log('click');
		    return;
		}
		else {
		    console.log('exit');
		    return;
		    // close box and set state & box.b;
		}
		
	    });
	    return;
	}
	
	if(state & box.e){
	    console.log('email');
	    state ^= box.e;
	    state = box.t;
	    return;
	    /*
	    if (validateEmail(email.value)) {
		animate[0](); // reveal textArea
		return;
	    }
	    else {
		animamate[0](); // ivalid animation (shake)
		return;
	    }
	    */
	}
	
	 if (state & box.t) {
	     console.log('text');
	     if (message.value) {
		 // submit it
		 animate[0](); // display thank you
	     }
	 }
    }
})();//}}}

// Event Listeners
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('scroll', play);
