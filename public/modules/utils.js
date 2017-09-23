(function () {
	'use strict';

	/**
	 * Приостановить выполнение на time миллисекунд
	 * @param {number} time - время в миллисекундах
	 * @return {Promise}
	 */
	function wait(time) {
		return new Promise(function (resolve) {
			setTimeout(resolve, time);
		});
	}

	window.Utils = {
		wait: wait,
	};

})();
