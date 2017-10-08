(function (modules) {
	'use strict';

	const baseUrl = `${window.location.protocol}//${window.location.host}`;

	/**
	 * Модуль, предоставляющий методы для выполнения HTTP-запросов
	 * @module Http
	 */
	class Http {
		/**
		 * Выполняет GET-запрос по указанному адресу
		 * @param {string} address - адрес запроса
		 * @param {Function} callback - функция-коллбек
		 */
		static Get(address, callback) {
			const url = (Http.BaseUrl || baseUrl) + address;
			const xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.withCredentials = true;

			xhr.onreadystatechange = function () {
				if (xhr.readyState !== 4) return;
				if (+xhr.status >= 400) {
					return callback(xhr, null);
				}

				const response = JSON.parse(xhr.responseText);
				callback(null, response);
			};

			xhr.send();
		}

		/**
		 * Выполняет POST-запрос по указанному адресу
		 * @param {string} address - адрес запроса
		 * @param {*} body - тело запроса (объект)
		 * @param {Function} callback - функция-коллбек
		 */
		static Post(address, body, callback) {
			const url = (Http.BaseUrl || baseUrl) + address;
			const xhr = new XMLHttpRequest();
			xhr.open('POST', url, true);
			xhr.withCredentials = true;
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

			xhr.onreadystatechange = function () {
				if (xhr.readyState !== 4) return;
				if (+xhr.status >= 400) {
					return callback(xhr, null);
				}

				const response = JSON.parse(xhr.responseText);
				callback(null, response);
			};

			xhr.send(JSON.stringify(body));
		}

		/**
		 * Выполняет GET-запрос по указанному адресу, возвращает промис
		 * @param {string} address - адрес запроса
		 * @return {Promise}
		 */
		static PromiseGet(address) {
			return new Promise(function (resolve, reject) {
				const url = (Http.BaseUrl || baseUrl) + address;
				const xhr = new XMLHttpRequest();
				xhr.open('GET', url, true);
				xhr.withCredentials = true;

				xhr.onreadystatechange = function () {
					if (xhr.readyState !== 4) return;
					if (+xhr.status >= 400) {
						reject(xhr);
						return;
					}

					const response = JSON.parse(xhr.responseText);
					resolve(response);
				};

				xhr.send();
			});
		}

		/**
		 * Выполняет POST-запрос по указанному адресу, возвращает промис
		 * @param {string} address - адрес запроса
		 * @param {*} body - тело запроса (объект)
		 * @return {Promise}
		 */
		static PromisePost(address, body) {
			return new Promise(function (resolve, reject) {
				const url = (Http.BaseUrl || baseUrl) + address;
				const xhr = new XMLHttpRequest();
				xhr.open('POST', url, true);
				xhr.withCredentials = true;
				xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

				xhr.onreadystatechange = function () {
					if (xhr.readyState !== 4) return;
					if (+xhr.status >= 400) {
						reject(xhr);
						return;
					}

					const response = JSON.parse(xhr.responseText);
					resolve(response);
				};

				xhr.send(JSON.stringify(body));
			});
		}

		/**
		 * Выполняет GET-запрос по указанному адресу с использованием fetch
		 * @param {string} address - адрес запроса
		 * @return {Promise}
		 */
		static FetchGet(address) {
			const url = (Http.BaseUrl || baseUrl) + address;
			return fetch(url, {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Accept': 'application/json',
				}
			})
				.then(function (response) {
					if (response.status >= 400) {
						throw response;
					}

					return response.json();
				});
		}

		/**
		 * Выполняет POST-запрос по указанному адресу с использованием fetch
		 * @param {string} address - адрес запроса
		 * @param {*} body - тело запроса (объект)
		 * @return {Promise}
		 */
		static FetchPost(address, body) {
			const url = (Http.BaseUrl || baseUrl) + address;
			return fetch(url, {
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			})
				.then(function (response) {
					if (response.status >= 400) {
						throw response;
					}

					return response.json();
				});
		}
	}

	/**
	 * Базовый адрес запросов (если не указан, берётся текущий origin)
	 * @type {string}
	 */
	Http.BaseUrl = null;

	modules.Http = Http;

})(window.___all_modules);
