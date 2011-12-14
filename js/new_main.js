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
	    elms = [],
	    getPosition,
	    angle,
	    range,
	    dist = 480,
	    progress,
		getVector,
		getPositionFromVector;

	getVector = function (angle, radius) {
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
	
	getPositionFromVector = function () {
		
	};

	// let's make some coloured elements
	for (a = 0; a < b; a++) {
		elms.push({ '$elm' : $('<div class="node"></div>')});
		elms[a].$elm.css('background-color', 'rgb(' + (Math.floor(Math.random() * 256)) + ', ' + (Math.floor(Math.random() * 256)) + ', ' + (Math.floor(Math.random() * 256)) + ')');
		$('#canvas').append(elms[a].$elm);
	}
	
	// set the range of degrees our elements will spread out to fill 
	range = 90;
	
	while (a) {
		a--;
		// angle is bound to each element by it's index
		angle = ((range / (b - 1)) * a);
		elms[a].vector = getVector(angle, dist);
	}
	
	$(document).bind('frame', function (e, info) {

	});

	$.groupAnimate('frame', {'duration' : 1000})
}());
