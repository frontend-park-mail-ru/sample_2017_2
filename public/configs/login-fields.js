(function () {
	'use strict';

	window.loginFields = [
		{
			attrs: {
				type: 'email',
				name: 'email',
				placeholder: 'Введите ваш E-Mail',
				required: 'required',
			},
		},
		{
			attrs: {
				type: 'password',
				name: 'password',
				placeholder: 'Введите пароль',
				required: 'required',
			},
		},
		{
			attrs: {
				type: 'submit',
				value: 'Log In',
			},
		},
	];

})();
