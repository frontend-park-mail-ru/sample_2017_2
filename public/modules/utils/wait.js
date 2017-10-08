(function (modules) {
	'use strict';

	const utils = modules.utils = modules.utils || Object.create(null);

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

	utils.wait = wait;

})(window.___all_modules);
