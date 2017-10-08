(function (modules) {
	'use strict';

	/**
	 * Модуль базового блока-компонента
	 * @module Block
	 */
	class Block {
		/**
		 * @param {HTMLElement} [element]
		 * @param {{tagName: string, classLists: string[], attrs:*, textContent: string}} [options]
		 * @constructor
		 */
		constructor(element, options) {
			options = options || {};
			this.el = element || document.createElement(options.tagName || 'div');
			this.el.classList.add.apply(this.el.classList, options.classLists || []);
			const attrs = options.attrs || {};
			for (const attr in attrs) {
				this.el.setAttribute(attr, attrs[attr]);
			}
			if (options.textContent) {
				this.el.textContent = options.textContent;
			}
		}

		show() {
			this.el.removeAttribute('hidden');
		}

		hide() {
			this.el.setAttribute('hidden', 'hidden');
		}

		on(event, callback) {
			this.el.addEventListener(event, callback);

			return function () {
				this.el.removeEventListener(event, callback);
			}.bind(this);
		}
	}

	modules.Block = Block;

})(window.___all_modules);
