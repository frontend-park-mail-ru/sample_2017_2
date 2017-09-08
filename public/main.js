'use strict';

//
// function auth(username, email, callback) {
// 	const user = {username, email};
// 	const body = JSON.stringify(user);
//
// 	const xhr = new XMLHttpRequest();
// 	xhr.open('POST', '/auth', true);
// 	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
// 	xhr.withCredentials = true;
// 	xhr.onreadystatechange = function () {
// 		if (xhr.readyState !== 4) return;
// 		if (+xhr.status !== 200) {
// 			return callback(xhr);
// 		}
// 		const response = JSON.parse(xhr.responseText);
// 		callback(null, response);
// 	};
// 	xhr.send(body);
// }
//
// function whoami(callback) {
// 	const xhr = new XMLHttpRequest();
// 	xhr.open('GET', '/me', true);
// 	xhr.withCredentials = true;
// 	xhr.onreadystatechange = function () {
// 		if (xhr.readyState !== 4) return;
// 		if (+xhr.status !== 200) {
// 			return callback(xhr);
// 		}
// 		const response = JSON.parse(xhr.responseText);
// 		callback(null, response);
// 	};
// 	xhr.send();
// }
//
// auth('sawoder', 'a.ostapenko@corp.mail.ru', (err, res) => console.log({err, res}));
//
//
// setTimeout(() => {
// 	whoami((err, res) => console.log({err, res}));
// }, 3000);

const greeting = document.getElementsByClassName('greeting')[0];

greeting.addEventListener('click', () => {
	greeting.classList.add('hidden');
}, false);

// console.log(document.cookie);
