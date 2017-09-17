(function () {
	'use strict';

	const Block = window.Block;

	class Form extends Block {
		constructor(fields = []) {
			const el = document.createElement('form');
			super(el);

			fields.forEach(function (field) {
				const f = Block.Create('input', field.attrs || {}, field.classes || []);
				this.append(f);
			}.bind(this));
		}

		onSubmit(callback) {
			this.el.addEventListener('submit', function (e) {
				e.preventDefault();
				const formdata = {};
				const elements = this.el.elements;
				for (let name in elements) {
					formdata[name] = elements[name].value;
				}

				callback(formdata);
			}.bind(this));
		}

		reset() {
			this.el.reset();
		}
	}

	window.Form = Form;

})();
