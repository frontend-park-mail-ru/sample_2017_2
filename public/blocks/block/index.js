(function () {
	'use strict';

	/**
	 * Базовый класс блока
	 * @module Block
	 */
	class Block {
		/**
		 * @param {HTMLElement} el - корневой элемент блока
		 * @constructor
		 */
		constructor(el) {
			this.el = el;
		}

		/**
		 * Фабричный метод, который ползволяет удобро создавать блоки с заданными характеристиками
		 * @param {string} [tagName='div'] - tagName блока
		 * @param {*} [attrs={}] - объект с атрибутами блока
		 * @param {string[]} [classes=[]] - список имён классов
		 * @param {string|null} [text=null] - опциональный текст блока
		 * @return {Block}
		 * @constructor
		 */
		static Create(tagName = 'div', attrs = {}, classes = [], text = null) {
			const el = document.createElement(tagName);
			classes.forEach(function (className) {
				el.classList.add(className);
			});
			for (let name in attrs) {
				el.setAttribute(name, attrs[name]);
			}
			if (text) {
				el.textContent = text;
			}
			return new Block(el);
		}

		/**
		 * Установить новый текст для блока
		 * @param {string} text
		 */
		setText(text) {
			this.el.textContent = text;
		}

		/**
		 * Очищает содержимое блока
		 */
		clear() {
			this.el.innerHTML = '';
		}

		/**
		 * Скрывает блок
		 */
		hide() {
			this.el.setAttribute('hidden', 'hidden');
		}

		/**
		 * Отображает блок
		 */
		show() {
			this.el.removeAttribute('hidden');
		}

		/**
		 * Добавляет к текущему блоку дочерний
		 * @param {Block} block
		 * @return {Block}
		 */
		append(block) {
			this.el.appendChild(block.el);
			return this;
		}

		/**
		 * Позволяет подписаться на событие
		 * @param {string} event
		 * @param {EventListener} callback
		 * @return {function(this:Block)} - функция отписки от события
		 */
		on(event, callback) {
			this.el.addEventListener(event, callback);
			return function () {
				this.el.removeEventListener(event, callback);
			}.bind(this);
		}
	}

	window.Block = Block;

})();
