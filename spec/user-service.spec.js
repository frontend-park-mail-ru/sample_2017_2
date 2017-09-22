const assert = require('assert');

let actualUrl, actualData, actualCallback;

global.window = {
	Http: {
		Post: function(url, data, callback) {
			actualUrl = url;
			actualData = data;
			actualCallback = callback;
		}
	}
};

require('../public/services/user-service');

const UserService = window.UserService;

const userService = new UserService();

let callbackResp;
let callbackErr;

userService.login('petya1@bk.ru', 'qwerty', function callback(err, resp) {
	callbackErr = err;
	callbackResp = resp;
});

assert.equal(actualUrl, '/login');

assert.deepEqual(actualData, {
	email: 'petya1@bk.ru',
	password: 'qwerty'
});

actualCallback(null, 'response');

setTimeout(function() {
	assert.equal(callbackErr, null);
	assert.equal(callbackResp, 'response');
}, 1000);






