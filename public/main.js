(function () {
	'use strict';

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
		hide() {
			this.menu.hide();
			this.login.hide();
			this.signup.hide();
			this.scores.hide();
			this.profile.hide();
		},
	};

	sections.hide();

	app
		.append(title)
		.append(sections.menu)
		.append(sections.login)
		.append(sections.signup)
		.append(sections.scores)
		.append(sections.profile);

	function onSubmitLoginForm(formdata) {
		return userService.login(formdata.email, formdata.password)
			.then(() => sections.login.loginform.reset())
			.then(openMenu)
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

	function openSignup() {
		if (!sections.signup.ready) {
			sections.signup.signupform = new Form(signupFields);
			sections.signup.signupform.onSubmit(function (formdata) {
				userService.signup(formdata.email, formdata.password, +formdata.age, function (err, resp) {
					if (err) {
						alert(`Some error ${err.status}: ${err.responseText}`);
						return;
					}

					sections.signup.signupform.reset();
					openMenu();
				});
			});
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

	function openScores() {
		if (!sections.scores.ready) {
			sections.scores.scoreboard = new Scoreboard();
			sections.scores
				.append(Block.Create('h2', {}, [], 'Список лидеров'))
				.append(sections.scores.scoreboard);
			sections.scores.ready = true;
		}
		sections.hide();
		userService.loadUsersList(function (err, users) {
			if (err) {
				alert(`Some error ${err.status}: ${err.responseText}`);
				return openMenu();
			}

			sections.scores.scoreboard.update(users);
			sections.scores.show();
		}, true);
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
		if (userService.isLoggedIn()) {
			userService.getData(function (err, user) {
				if (err) {
					alert(`Some error ${err.status}: ${err.responseText}`);
					return openMenu();
				}

				sections.profile.profile.update(user);
				sections.profile.show();
			}, true);
			return;
		}
		return openMenu();
	}

	function openMenu() {
		if (!sections.menu.ready) {
			sections.menu.items = {
				login: Block.Create('a', {'data-section': 'login'}, [], 'Открыть форму входа'),
				signup: Block.Create('a', {'data-section': 'signup'}, [], 'Открыть форму регистрации'),
				scores: Block.Create('a', {'data-section': 'scores'}, [], 'Открыть таблицу лидеров'),
				profile: Block.Create('a', {'data-section': 'profile'}, [], 'Посмотреть мой профиль'),
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
				}
			});
			sections.menu
				.append(Block.Create('h2', {}, [], 'Меню'))
				.append(sections.menu.items.login)
				.append(sections.menu.items.signup)
				.append(sections.menu.items.scores)
				.append(sections.menu.items.profile);
			sections.menu.ready = true;
		}
		sections.hide();
		if (userService.isLoggedIn()) {
			sections.menu.items.login.hide();
			sections.menu.items.signup.hide();
			sections.menu.items.scores.show();
			sections.menu.items.profile.show();
		} else {
			sections.menu.items.login.show();
			sections.menu.items.signup.show();
			sections.menu.items.scores.show();
			sections.menu.items.profile.hide();
		}
		sections.menu.show();
	}

	title.on('click', openMenu);
	openMenu();

	userService.getData(function (err, resp) {
		if (err) {
			return;
		}
		openMenu();
	}, true);

})();
