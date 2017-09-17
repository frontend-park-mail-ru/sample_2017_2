(function () {
	'use strict';

	const Block = window.Block;
	const ProfileTemplate = window.profileTemplate;

	class Profile extends Block {
		constructor() {
			const el = document.createElement('div');
			super(el);
		}

		update(user) {
			this.clear();

			this.el.innerHTML = ProfileTemplate({user});
		}
	}

	window.Profile = Profile;

})();
