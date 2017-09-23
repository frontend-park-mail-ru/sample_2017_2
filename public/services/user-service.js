(function () {
	'use strict';

	const Http = window.Http;

	/**
	 * Сервис для работы с юзерами
	 * @module UserService
	 */
	class UserService {
		constructor() {
			this.user = null;
			this.users = [];
		}

		/**
		 * Регистрирует нового пользователя
		 * @param {string} email
		 * @param {string} password
		 * @param {number} age
		 * @return {Promise}
		 */
		signup(email, password, age) {
			return Http.PromisePost('/signup', {email, password, age});
		}

		/**
		 * Авторизация пользователя
		 * @param {string} email
		 * @param {string} password
		 * @return {Promise}
		 */
		login(email, password) {
			return Http.PromisePost('/login', {email, password});
		}

		/**
		 * Проверяет, авторизован ли пользователь
		 * @return {boolean}
		 */
		isLoggedIn() {
			return !!this.user;
		}

		/**
		 * Загружает данные о текущем пользователе
		 * @param {boolean} [force=false] - игнорировать ли кэш?
		 * @return {Promise}
		 */
		getData(force = false) {
			if (this.isLoggedIn() && !force) {
				return Promise.resolve(this.user);
			}

			return Http.PromiseGet('/me')
				.then(function (userdata) {
					this.user = userdata;
					return userdata;
				}.bind(this));
		}

		/**
		 * Загружает список всех пользователей
		 * @return {Promise}
		 */
		loadUsersList() {
			return Http.PromiseGet('/users')
				.then(function (users) {
					this.users = users;

					if (this.isLoggedIn()) {
						this.users = this.users.map(function (user) {
							user.me = user.email === this.user.email;
							return user;
						});
					}

					return users;
				}.bind(this));
		}
	}

	window.UserService = UserService;

})();
