(function (modules) {
	'use strict';

	const Http = modules.Http;
	const EventBus = modules.EventBus;

	const services = modules.services = modules.services || Object.create(null);

	/**
	 * Сервис для работы с юзерами
	 * @module UserService
	 */
	class UserService {
		constructor() {
			if (UserService.__instance) {
				return UserService.__instance;
			}
			this.bus = new EventBus();
			this.user = null;
			this.users = [];
			this.bus.on('users:fetch-users', this.loadUsersList.bind(this));
			this.bus.on('signup-user', function (data) {
				const user = data.payload;
				this.signup(user.email, user.password, +user.age);
			}.bind(this));
			this.bus.on('signin-user', function (data) {
				const user = data.payload;
				this.login(user.email, user.password);
			}.bind(this));

			UserService.__instance = this;
		}

		/**
		 * Регистрирует нового пользователя
		 * @param {string} email
		 * @param {string} password
		 * @param {number} age
		 * @return {Promise}
		 */
		signup(email, password, age) {
			return Http.FetchPost('/signup', {email, password, age})
				.then(function (response) {
					this.login(email, password);
					return response;
				}.bind(this));
		}

		/**
		 * Авторизация пользователя
		 * @param {string} email
		 * @param {string} password
		 * @return {Promise}
		 */
		login(email, password) {
			return Http.FetchPost('/login', {email, password})
				.then(function (response) {
					this.getData(true);
					return response;
				}.bind(this));
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

			return Http.FetchGet('/me')
				.then(function (userdata) {
					this.user = userdata;
					this.bus.emit('user:authorized', this.user);
					return userdata;
				}.bind(this));
		}

		/**
		 * Загружает список всех пользователей
		 * @return {Promise}
		 */
		loadUsersList() {
			return Http.FetchGet('/users')
				.then(function (users) {
					this.users = users;

					if (this.isLoggedIn()) {
						this.users = this.users.map(function (user) {
							user.me = user.email === this.user.email;
							return user;
						}.bind(this));
					}

					this.bus.emit('users:fetched', this.users);

					return this.users;
				}.bind(this));
		}
	}

	services.UserService = UserService;

})(window.___all_modules);
