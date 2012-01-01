(function( $ ){

 	if (typeof $.groupScroll === 'undefined') {
		$.groupScroll = function(evtName, scrollPercent) {
			var onScroll = function (e) {

				var scrollAmount = $(window).scrollTop() / scrollPercent;

				$(document).trigger(evtName, {
						'now' : scrollAmount
					}
				);

			};
			
			$(window).scroll(onScroll);
		};
	}
}( jQuery ));

(function () {
	var a,
	    b = 50,
	    rings = [],
	    numOfRings = 10,
	    vectors = [],
	    getPosition,
	    angle,
	    range,
	    dist = 480,
	    offsetTop = 250,
	    offsetLeft = 508,
	    progress,
	    getVector,
	    getPositionFromVector,
	    windowHeight = $(window).height(),
	    totalScroll = $(document).height() - windowHeight;

	/**
	 * Private function to get the points of a vector from its angle and length
	 *
	 * @function
	 * @private
	 * @param {Float} angle The angle of the vector
	 * @param {Float} length The length of the vector
	 * @returns {Object} The x,y co-ordinates of the vector
	*/
	getVector = function (angle, length) {
		var circ,
		    percent,
		    dist,
		    radians,
		    opp,
		    adj;

		circ = 2 * Math.PI * length;
                percent = angle / 360;
                dist = circ * percent;
                radians = dist / length;

                opp = Math.sin(radians) * length;
                adj = Math.cos(radians) * length;

	        return {
				'x' : opp,
                'y' : adj
		};
	};
	
	/**
	 * Private function to move a point along a vector
	 *
	 * @function
	 * @private
	 * @param {Object} point The x,y of the point to translate
	 * @param {Float} multiplier The value to translate the vector by
	 * @returns {Object} The new x,y co-ordinates of the point
	*/
	translateByVector = function (point, multiplier) {
		var result = {
			x : point.x * multiplier,
			y : point.y * multiplier
		};
		
		return result;
	};
	
	/**
	 * Private function to make a function to run every frame of animating an expanding ring of elements
	 *
	 * @function
	 * @private
	 * @param {Float} radius The final size to animate the ring to (as a percent of the largest size)
	 * @param {Array} elms Array of elements to animate as part of the ring
	 * @returns {Function} The function to run every frame
	*/
	generateFrameForRing = function (radiusScale, elms) {
		var finalPositions = [],
			a = vectors.length;
		
		while (a--) {
			finalPositions[a] = translateByVector(vectors[a], radiusScale)
		}
		
		return function (e, info) {
			var top,
			    left,
			    a = elms.length,
			    pos = info.now;
				
			while(a--) {
				top = (finalPositions[a].y * pos);
				left = (finalPositions[a].x * pos);

				elms[a].$elm.css({
					'top' : top + offsetTop + 'px',
					'left' : left + offsetLeft + 'px'
				})
			}
		}
	};
	
	/**
	 * Private function to make a ring of elements
	 *
	 * @function
	 * @private
	*/ 
	makeRing = function () {
		var a, 
		    idx = (rings.length);

		rings.push([]);

		// let's make some coloured elements
		for (a = 0; a < b; a++) {
			rings[idx].push({ '$elm' : $('<div class="node"></div>')});
			rings[idx][a].$elm.css('background-color', 'rgb(' + (Math.floor(Math.random() * 256)) + ', ' + (Math.floor(Math.random() * 256)) + ', ' + (Math.floor(Math.random() * 256)) + ')');
			$('#canvas').append(rings[idx][a].$elm);
		}
	};
	
	// set the range of degrees our elements will spread out to fill 
	range = 360;
	
	for (a = 0; a < b; a++) {
		// angle is bound to each element by it's index
		angle = ((range / (b - 1)) * a);
		vectors.push(getVector(angle, dist));
	}

	for (a = 0; a < numOfRings; a++) {
		makeRing(a);
		// each step of the animation, draw a ring of divs
		$(document).bind('frame', generateFrameForRing((1 / (a + 1)), rings[a]));
	}

	$.groupScroll('frame', (totalScroll));
}());
