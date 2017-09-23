(function () {
	'use strict';

	const Utils = window.Utils;
	const Block = window.Block;
	const Form = window.Form;
	const Scoreboard = window.Scoreboard;
	const Profile = window.Profile;
	const loginFields = window.loginFields;
	const signupFields = window.signupFields;
	const UserService = window.UserService;
	const userService = new UserService();

	const app = new Block(document.getElementById('application'));
	const title = Block.Create('a', {}, ['application-header'], 'Frontend-sample application');

	const sections = {
		menu: Block.Create('section', {}, ['menu-section']),
		login: Block.Create('section', {}, ['login-section']),
		signup: Block.Create('section', {}, ['signup-section']),
		scores: Block.Create('section', {}, ['scores-section']),
		profile: Block.Create('section', {}, ['profile-section']),
		game: Block.Create('section', {}, ['game-section']),
		hide() {
			this.menu.hide();
			this.login.hide();
			this.signup.hide();
			this.scores.hide();
			this.profile.hide();
			this.game.hide();
		},
	};

	sections.hide();

	app
		.append(title)
		.append(sections.menu)
		.append(sections.login)
		.append(sections.signup)
		.append(sections.scores)
		.append(sections.profile)
		.append(sections.game);

	function onSubmitLoginForm(formdata) {
		return userService
			.login(formdata.email, formdata.password)
			.then(function () {
				return userService.getData(true);
			})
			.then(function () {
				sections.login.loginform.reset();
				openMenu();
			})
			.catch((err) => alert(`Some error ${err.status}: ${err.responseText}`));
	}

	function openLogin() {
		if (!sections.login.ready) {
			sections.login.loginform = new Form(loginFields);
			sections.login.loginform.onSubmit(onSubmitLoginForm);
			sections.login
				.append(Block.Create('h2', {}, [], 'Войдите'))
				.append(sections.login.loginform);
			sections.login.ready = true;
		}
		sections.hide();
		if (userService.isLoggedIn()) {
			return openMenu();
		}
		sections.login.show();
	}

	function onSubmitSignupForm(formdata) {
		return userService
			.signup(formdata.email, formdata.password, +formdata.age)
			.then(function () {
				sections.signup.signupform.reset();
				openMenu();
			})
			.catch((err) => alert(`Some error ${err.status}: ${err.responseText}`));
	}

	function openSignup() {
		if (!sections.signup.ready) {
			sections.signup.signupform = new Form(signupFields);
			sections.signup.signupform.onSubmit(onSubmitSignupForm);
			sections.signup
				.append(Block.Create('h2', {}, [], 'Зарегистрируйтесь'))
				.append(sections.signup.signupform);
			sections.signup.ready = true;
		}
		sections.hide();
		if (userService.isLoggedIn()) {
			return openMenu();
		}
		sections.signup.show();
	}

	function onStartGame() {
		return Promise.resolve()
			.then(function () {
				sections.game.start.el.setAttribute('disabled', 'disabled');
				sections.game.game.setText('3');
				return Utils.wait(1000);
			})
			.then(function () {
				sections.game.game.setText('2');
				return Utils.wait(1000);
			})
			.then(function () {
				sections.game.game.setText('1');
				return Utils.wait(1000);
			})
			.then(function () {
				sections.game.game.setText('You win!');
				sections.game.start.el.removeAttribute('disabled');
			});
	}

	function openGame() {
		if (!sections.game.ready) {
			sections.game.start = Block.Create('input', {type: 'button', value: 'Играть!'}, ['game__start-button']);
			sections.game.start.on('click', onStartGame);
			sections.game.game = Block.Create('div', {}, ['game__game']);
			sections.game
				.append(Block.Create('h2', {}, [], 'Игра'))
				.append(sections.game.start)
				.append(sections.game.game);
			sections.game.ready = true;
		}
		sections.hide();
		if (!userService.isLoggedIn()) {
			return openMenu();
		}
		sections.game.show();
	}

	function openScores() {
		if (!sections.scores.ready) {
			sections.scores.scoreboard = new Scoreboard();
			sections.scores
				.append(Block.Create('h2', {}, [], 'Список лидеров'))
				.append(sections.scores.scoreboard);
			sections.scores.ready = true;
		}
		sections.hide();
		userService.loadUsersList()
			.then(function (users) {
				sections.scores.scoreboard.update(users);
				sections.scores.show();
			})
			.catch((err) => alert(`Some error ${err.status}: ${err.responseText}`));
	}

	function openProfile() {
		if (!sections.profile.ready) {
			sections.profile.profile = new Profile();
			sections.profile
				.append(Block.Create('h2', {}, [], 'Мой профиль'))
				.append(sections.profile.profile);
			sections.profile.ready = true;
		}
		sections.hide();
		if (!userService.isLoggedIn()) {
			return openMenu();
		}
		userService.getData()
			.then(function (user) {
				sections.profile.profile.update(user);
				sections.profile.show();
			})
			.catch((err) => alert(`Some error ${err.status}: ${err.responseText}`));
	}

	function openMenu() {
		if (!sections.menu.ready) {
			sections.menu.items = {
				login: Block.Create('a', {'data-section': 'login'}, [], 'Открыть форму входа'),
				signup: Block.Create('a', {'data-section': 'signup'}, [], 'Открыть форму регистрации'),
				scores: Block.Create('a', {'data-section': 'scores'}, [], 'Открыть таблицу лидеров'),
				profile: Block.Create('a', {'data-section': 'profile'}, [], 'Посмотреть мой профиль'),
				game: Block.Create('a', {'data-section': 'game'}, [], 'Играть!'),
			};
			sections.menu.on('click', function (event) {
				event.preventDefault();
				const target = event.target;
				const section = target.getAttribute('data-section');
				switch (section) {
					case 'login':
						openLogin();
						break;
					case 'signup':
						openSignup();
						break;
					case 'scores':
						openScores();
						break;
					case 'profile':
						openProfile();
						break;
					case 'game':
						openGame();
						break;
				}
			});
			sections.menu
				.append(Block.Create('h2', {}, [], 'Меню'))
				.append(sections.menu.items.login)
				.append(sections.menu.items.signup)
				.append(sections.menu.items.scores)
				.append(sections.menu.items.profile)
				.append(sections.menu.items.game);
			sections.menu.ready = true;
		}
		sections.hide();
		if (userService.isLoggedIn()) {
			sections.menu.items.login.hide();
			sections.menu.items.signup.hide();
			sections.menu.items.scores.show();
			sections.menu.items.profile.show();
			sections.menu.items.game.show();
		} else {
			sections.menu.items.login.show();
			sections.menu.items.signup.show();
			sections.menu.items.scores.show();
			sections.menu.items.profile.hide();
			sections.menu.items.game.hide();
		}
		sections.menu.show();
	}

	title.on('click', openMenu);
	openMenu();

	userService.getData()
		.then(function () {
			openMenu();
		})
		.catch(function (error) {
			// ignore this error
		});

})();
