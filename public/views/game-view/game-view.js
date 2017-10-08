(function (modules) {
	'use strict';

	const BaseView = modules.BaseView;
	const gameTemplate = window.gameTemplate;

	const views = modules.views = modules.views || Object.create(null);

	/**
	 * Класс GameView
	 * @module GameView
	 * @extends BaseView
	 */
	class GameView extends BaseView {
		start() {
			this.render();
		}

		render() {
			this.el.innerHTML = gameTemplate({});
		}
	}

	views.GameView = GameView;

})(window.___all_modules);
