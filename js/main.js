(function( $ ){

 	if (typeof $.groupAnimate === 'undefined') {
		$.groupAnimate = function(evtName, opts) {
			// create a fake element not attached to the DOM
			var $fakeElem = $('<div style="width:0px;"></div>');
		
			if (opts === undefined) {
				opts = {};
			}

			// set a step callback to beacon a custom event
			opts.step = function (now, fx) {
				$(document).trigger(evtName, {
						'now' : now,
						'fx' : fx
					}
				);
			};

			$fakeElem.animate({'width' : '100px'}, opts);
		};
	}
}( jQuery ));

(function () {
	var a,
	    b = 100,
	    $elms = [],
	    getPosition,
	    angle,
	    range,
	    dist = 480,
	    progress;

	var getPosition = function (angle, radius) {
		var circ,
		    percent,
		    dist,
		    radians,
		    opp,
		    adj;

		circ = 2 * Math.PI * radius;
                percent = angle / 360;
                dist = circ * percent;
                radians = dist / radius;

                opp = Math.sin(radians) * radius;
                adj = Math.cos(radians) * radius;

	        return {
	       		 'x' : opp,
                         'y' : adj
		};
	};

	// let's make some coloured elements
	for (a = 0; a < b; a++) {
		$elms.push($('<div class="node"></div>'));
		$elms[a].css('background-color', 'rgb(' + (Math.floor(Math.random() * 256)) + ', ' + (Math.floor(Math.random() * 256)) + ', ' + (Math.floor(Math.random() * 256)) + ')');
		$('#canvas').append($elms[a]);
	}

	// set the range of degrees our elements will spread out to fill 
	range = 90;
	
	$(document).bind('frame', function (e, info) {
		var vector;

		// don't do anything if the animation hasn't progressed
		if (info.now === 0) { return; }

		/*
		 * each ring of elements progresses to a percentage of the final distance except the last one
		 * so ring 1 = (info.now / 5) * 1 for 20%
		 * so ring 2 = (info.now / 5) * 2 for 40%
		 *
		 * also need to set up the rings as arrays of $elm arrays
		*/ 
		while (a) {
			a--;
			// angle is bound to each element by it's index
			angle = ((range / (b - 1)) * a);
			// progress is distance along the radius
			progress = (dist / 100) * info.now;
			// if progress is 0, only move along the x axis
			if (progress === 0) {
				vector = { 'x' : dist, 'y' : 0 };
			}
			// get vector based on angle and progres along radius
			vector = getPosition(angle, progress);
			// turn this to CSS position
			$elms[a].css({
				'top' : vector.y + 'px',
				'left' : vector.x + 'px'
			});
		}
		a = b;
	});

	$.groupAnimate('frame', {'duration' : 1000})
}());
