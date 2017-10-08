(function (modules) {
	'use strict';

	const Block = modules.Block;

	const blocks = modules.blocks = modules.blocks || Object.create(null);

	/**
	 * Компонент FormBlock
	 * @module FormBlock
	 * @extends Block
	 */
	class FormBlock extends Block {
		/**
		 *
		 * @param {HTMLElement} [element]
		 * @param {string[]} fields
		 */
		constructor(element, fields) {
			super(element);
			this.fields = fields;
		}

		reset() {
			this.el.reset();
		}

		unsubscribe() {
			this.unsub();
		}

		onsubmit(callback) {
			this.unsub = this.on('submit', function (event) {
				event.preventDefault();

				const elements = this.el.elements;
				const formdata = Object.create(null);

				this.fields.forEach(function (field) {
					formdata[field] = elements[field].value;
				});

				callback(formdata);
			}.bind(this));
		}
	}

	blocks.FormBlock = FormBlock;

})(window.___all_modules);
