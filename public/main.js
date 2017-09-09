'use strict';


function auth(username, email, callback) {
	const xhr = new XMLHttpRequest();
	xhr.open('POST', '/auth', true);
	xhr.withCredentials = true;

	const user = {username, email};
	const body = JSON.stringify(user);

	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

	xhr.onreadystatechange = function () {
		if (xhr.readyState !== 4) return;
		if (+xhr.status !== 200) {
			return callback(xhr, null);
		}

		const response = JSON.parse(xhr.responseText);
		callback(null, response);
	};

	xhr.send(body);
}

function whoami(callback) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', '/me', true);
	xhr.withCredentials = true;

	xhr.onreadystatechange = function () {
		if (xhr.readyState !== 4) return;
		if (+xhr.status !== 200) {
			return callback(xhr, null);
		}

		const response = JSON.parse(xhr.responseText);
		callback(null, response);
	};

	xhr.send();
}

const sections = [
	['login', 'Окно логина'],
	['profile', 'Мой профиль'],
	['about', 'Об игре'],
];


const application = document.querySelector('#application');
const nav = document.getElementById('navigation');

const loginForm = document.getElementById('login-form');

const usernameDiv = document.getElementById('username-div');
const emailDiv = document.getElementById('email-div');
const countDiv = document.getElementById('count-div');

for (let section of sections) {
	const button = document.createElement('input');
	button.setAttribute('type', 'button');
	button.setAttribute('data-section', section[0]);
	button.value = section[1];
	nav.appendChild(button);
}

const liveSectionsCollection = application.getElementsByTagName('section');

nav.addEventListener('click', function (event) {
	const sectionId = event.target.getAttribute('data-section');
	const liveSectionsArray = Array.from(liveSectionsCollection);

	if (sectionId === 'profile') {
		liveSectionsArray.forEach(function (sectionElement) {
			sectionElement.hidden = true;
		});
		whoami(function (err, resp) {
			if (err) {
				return alert(`AUTH Error: ${err.status}`);
			}
			emailDiv.textContent = resp.email;
			usernameDiv.textContent = resp.username;
			countDiv.textContent = resp.count;
			liveSectionsArray
				.find(section => section.id === 'profile')
				.hidden = false;
		});
		return;
	}

	liveSectionsArray.forEach(function (sectionElement) {
		sectionElement.hidden = sectionElement.id !== sectionId;
	});
});

loginForm.addEventListener('submit', function (event) {
	event.preventDefault();
	console.log(loginForm.elements);
	const email = loginForm.elements['email'].value;
	const username = loginForm.elements['username'].value;

	auth(username, email, function (err, resp) {
		if (err) {
			return alert(`AUTH Error: ${err.status}`);
		}

		loginForm.reset();
	});
});
