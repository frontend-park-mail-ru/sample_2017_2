(function () {
	'use strict';

	function wait(time) {
		return new Promise(function (resolve) {
			setTimeout(resolve, time);
		});
	}

	window.Utils = {
		wait: wait,
	};

})();
