(function (modules) {
	'use strict';

	const Http = modules.Http;
	const Router = modules.Router;
	const EventBus = modules.EventBus;
	const UserService = modules.services.UserService;
	const ApplicationView = modules.views.ApplicationView;
	const views = modules.views;

	if (window.location.host === 'super-frontend.herokuapp.com') {
		// enable CORS
		Http.BaseUrl = 'https://super-frontend-backend.herokuapp.com';
	}

	const bus = new EventBus();
	const userService = new UserService();
	const application = new ApplicationView(document.body);

	const router = new Router(application.getElement(), application.getViewsContainerElement());
	router
		.register('/', views.MenuView)
		.register('/about', views.AboutView)
		.register('/game', views.GameView)
		.register('/profile', views.ProfileView)
		.register('/scoreboard', views.ScoreboardView)
		.register('/signin', views.SigninView)
		.register('/signup', views.SignupView)
		.start();

	userService
		.getData(true)
		.catch(function (error) {
			// ignore
		});

})(window.___all_modules);
