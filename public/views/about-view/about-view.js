(function (modules) {
	'use strict';

	const BaseView = modules.BaseView;
	const aboutTemplate = window.aboutTemplate;

	const views = modules.views = modules.views || Object.create(null);

	/**
	 * Класс AboutView
	 * @module AboutView
	 * @extends BaseView
	 */
	class AboutView extends BaseView {
		start() {
			this.render();
		}

		render() {
			this.el.innerHTML = aboutTemplate({});
		}
	}

	views.AboutView = AboutView;

})(window.___all_modules);
