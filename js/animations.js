const element = document.querySelector('.rect');
const ball = popmotion.styler(element); 

const ballWidth = 40;

function startAnim() {
	
	var screenWidth = $( document ).width();

	console.log(screenWidth);


	// popmotion.tween({ to: screenWidth/2-(ballWidth/2), duration: 500 })
  	//	.start(v => ball.set('x', v));

  	/*
  	popmotion.tween({ 
  	    from: { 
  	        scale: 0,
  	        x: 0,
  	        opacity: 0
  	    },
  	    to: { 
  	        scale: 1,
  	        x: screenWidth/2-(ballWidth/2),
  	        opacity: 1
  	    },
  	    duration: 1000
  	})
  	.start(ball.set);
*/
  	popmotion.timeline([
  	  { track: 'x', from: 0, to: screenWidth/2-(ballWidth/2), duration: 1000 },
  	  '-1000',
  	  { track: 'opacity', from: 0, to: 1, duration: 650}
  	])
  	.start(ball.set)
}


/*
const container = popmotion.styler(document.querySelector('.login-form'));
const formElements = document.querySelector('.inner');
const msgPop = popmotion.styler(document.querySelector('.msg'));

popmotion.tween({ 
    from: { 
        scale: .7
    },
    to: { 
        scale: 1
    },
    duration: 1000
})
.start(container.set);
*/