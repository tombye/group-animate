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
	    b = 50,
	    elms = [],
		rings = [],
		vectors = [],
	    getPosition,
	    angle,
	    range,
	    dist = 480,
	    progress,
		getVector,
		getPositionFromVector;

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
		point.x = point.x * multiplier;
		point.y = point.y * multiplier;
		
		return point;
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
				pos = info.fx.pos;
				
			while(a--) {
				top = (finalPositions[a].y * pos);
				left = (finalPositions[a].x * pos);
				
				elms[a].$elm.css({
					'top' : top + 'px',
					'left' : left + 'px'
				})
			}
		}
	};

	rings.push([]);

	// let's make some coloured elements
	for (a = 0; a < b; a++) {
		rings[0].push({ '$elm' : $('<div class="node"></div>')});
		rings[0][a].$elm.css('background-color', 'rgb(' + (Math.floor(Math.random() * 256)) + ', ' + (Math.floor(Math.random() * 256)) + ', ' + (Math.floor(Math.random() * 256)) + ')');
		$('#canvas').append(rings[0][a].$elm);
	}
	
	rings.push([]);
	
	// let's make some coloured elements
	for (a = 0; a < b; a++) {
		rings[1].push({ '$elm' : $('<div class="node"></div>')});
		rings[1][a].$elm.css('background-color', 'rgb(' + (Math.floor(Math.random() * 256)) + ', ' + (Math.floor(Math.random() * 256)) + ', ' + (Math.floor(Math.random() * 256)) + ')');
		$('#canvas').append(rings[1][a].$elm);
	}
	
	// set the range of degrees our elements will spread out to fill 
	range = 90;
	
	for (a = 0; a < b; a++) {
		// angle is bound to each element by it's index
		angle = ((range / (b - 1)) * a);
		vectors.push(getVector(angle, dist));
	}
	
	$(document).bind('frame', generateFrameForRing(1, rings[0]));
	$(document).bind('frame', generateFrameForRing(0.8, rings[1]));

	$.groupAnimate('frame', {'duration' : 1000});
}());
