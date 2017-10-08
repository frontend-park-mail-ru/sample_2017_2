(function (modules) {
	'use strict';

	const BaseView = modules.BaseView;
	const scoreboardTemplate = window.scoreboardTemplate;

	const views = modules.views = modules.views || Object.create(null);

	/**
	 * Класс ScoreboardView
	 * @module ScoreboardView
	 * @extends BaseView
	 */
	class ScoreboardView extends BaseView {
		start() {
			this.bus.on('users:fetched', function (data) {
				this.users = data.payload;
				this.render(this.users);
			}.bind(this));
			this.render([]);
		}

		render(users) {
			this.el.innerHTML = scoreboardTemplate({users});
		}

		resume() {
			this.bus.emit('users:fetch-users');
			super.resume();
		}
	}

	views.ScoreboardView = ScoreboardView;

})(window.___all_modules);
