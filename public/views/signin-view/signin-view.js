(function (modules) {
	'use strict';

	const BaseView = modules.BaseView;
	const FormBlock = modules.blocks.FormBlock;
	const userService = new modules.services.UserService();
	const signinTemplate = window.signinTemplate;

	const views = modules.views = modules.views || Object.create(null);

	/**
	 * Класс SigninView
	 * @module SigninView
	 * @extends BaseView
	 */
	class SigninView extends BaseView {
		start() {
			this.render();
			this.form = new FormBlock(this.el.querySelector('.signin-form-js'), ['email', 'password']);
			this.form.onsubmit(function (formdata) {
				this.bus.emit('signin-user', formdata);
			}.bind(this));
			this.bus.on('user:authorized', function () {
				this.form.reset();
			}.bind(this));

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
			this.el.innerHTML = signinTemplate({});
		}

		resume() {
			if (userService.isLoggedIn()) {
				this.user = userService.user;
			}
			if (this.user !== null) {
				this.router.go('/');
				return;
			}
			super.resume();
		}
	}

	views.SigninView = SigninView;

})(window.___all_modules);
