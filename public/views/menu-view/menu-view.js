(function (modules) {
	'use strict';

	const BaseView = modules.BaseView;
	const userService = new modules.services.UserService();
	const menuTemplate = window.menuTemplate;

	const views = modules.views = modules.views || Object.create(null);

	/**
	 * Класс MenuView
	 * @module MenuView
	 * @extends BaseView
	 */
	class MenuView extends BaseView {
		start() {
			this.user = null;
			this.bus.on('user:authorized', function (data) {
				this.user = data.payload;
				this.resume();
			}.bind(this));
			this.bus.on('user:unauthorized', function (data) {
				this.user = null;
				this.resume();
			}.bind(this));
		}

		render() {
			const data = {
				authorized: this.user !== null,
			};
			if (this.user) {
				data.username = this.user.email;
			}
			this.el.innerHTML = menuTemplate(data);
		}

		resume() {
			if (userService.isLoggedIn()) {
				this.user = userService.user;
			}
			this.render();
			super.resume();
		}
	}

	views.MenuView = MenuView;

})(window.___all_modules);
