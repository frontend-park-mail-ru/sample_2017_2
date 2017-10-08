(function (modules) {
	'use strict';

	const BaseView = modules.BaseView;
	const FormBlock = modules.blocks.FormBlock;
	const userService = new modules.services.UserService();
	const signupTemplate = window.signupTemplate;

	const views = modules.views = modules.views || Object.create(null);

	/**
	 * Класс SignupView
	 * @module SignupView
	 * @extends BaseView
	 */
	class SignupView extends BaseView {
		start() {
			this.render();
			this.form = new FormBlock(this.el.querySelector('.signup-form-js'), ['email', 'password', 'age']);
			this.form.onsubmit(function (formdata) {
				this.bus.emit('signup-user', formdata);
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
			this.el.innerHTML = signupTemplate({});
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

	views.SignupView = SignupView;

})(window.___all_modules);
