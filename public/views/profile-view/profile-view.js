(function (modules) {
	'use strict';

	const BaseView = modules.BaseView;
	const profileTemplate = window.profileTemplate;
	const userService = new modules.services.UserService();

	const views = modules.views = modules.views || Object.create(null);

	/**
	 * Класс ProfileView
	 * @module ProfileView
	 * @extends BaseView
	 */
	class ProfileView extends BaseView {
		start() {
			this.user = null;
			this.bus.on('user:authorized', function (data) {
				this.user = data.payload;
				this.render();
			}.bind(this));
			this.bus.on('user:unauthorized', function (data) {
				this.user = null;
				this.resume();
			}.bind(this));
		}

		render() {
			this.el.innerHTML = profileTemplate({user: this.user});
		}

		resume() {
			if (userService.isLoggedIn()) {
				this.user = userService.user;
			}
			if (this.user === null) {
				this.pause();
				this.router.go('/');
				return;
			}
			this.render();
			super.resume();
		}
	}

	views.ProfileView = ProfileView;

})(window.___all_modules);
