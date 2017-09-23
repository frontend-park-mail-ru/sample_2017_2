// импортируем модуль для проведения проверок для тестов
// @see https://nodejs.org/api/assert.html
const assert = require('assert');

let actualUrl, actualData, actualResolve;

// т.к. мы запускаем тесты в окружении Node.js, то нам необходимо замокать
// окружение браузера
global.window = {
	Http: {
		PromisePost: function (url, data) {
			// здесь мы сохраняем, с какими аргументами был вызван метод PromisePost
			actualUrl = url;
			actualData = data;
			return new Promise(function (resolve) {
				actualResolve = resolve;
			});
		}
	}
};

require('../public/services/user-service');

const UserService = window.UserService;

const userService = new UserService();

let resolvedValue;

// делаем вызов userService.login
userService
	.login('petya1@bk.ru', 'qwerty')
	.then(function (response) {
		resolvedValue = response;
	})
;

// Проверяем, какой запрос в итоге отправился

assert.equal(actualUrl, '/login');

assert.deepEqual(actualData, {
	email: 'petya1@bk.ru',
	password: 'qwerty'
});

// Мокаем ответ на запрос
actualResolve('response');

// Проверяем, правильный ли ответ вернулся из промиса

setTimeout(function () {
	assert.equal(resolvedValue, 'response');
	console.log('All tests in `user-service.spec.js` passed');
}, 100);
