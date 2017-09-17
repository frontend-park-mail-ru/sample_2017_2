(function () {
	'use strict';

	window.signupFields = [
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
				type: 'text',
				name: 'password',
				placeholder: 'Придумайте пароль длиннее 4 символов',
				required: 'required',
				pattern: '^\\S{4,}$',
			},
		},
		{
			attrs: {
				type: 'text',
				name: 'age',
				placeholder: 'Сколько вам лет?',
				required: 'required',
				pattern: '^\\d+$',
			},
		},
		{
			attrs: {
				type: 'submit',
				value: 'Sign Up',
			},
		},
	];

})();
