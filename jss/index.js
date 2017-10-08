/*
 * 1. Изменяем бордеры в твиттере
 * Для компонентов button, .contenteditable
 */


const buttonStyles = {
	selector: 'button',
	styles: {
		'border-radius': '100px',
	}
};

const editableStyles = {
	selector: '.contenteditable',
	styles: {
		'border-radius': '8px',
	}
};

const createStylesheet = (styles) => {
	return styles.reduce((stylesheet, current) => {
		const properties = Object.entries(current.styles)
			.map(prop => prop[0] + ':' + prop[1] + ';');

		stylesheet += `${current.selector} {${properties}}\n`;

		return stylesheet;
	}, '');
};

const appendStylesheet = (stylesheet) => {
	let styleTag = document.getElementById('theme-styles');

	styleTag.innerHTML = stylesheet;
};


// К сути
let hasTheme = false;
let styles = createStylesheet([buttonStyles, editableStyles]);

document
	.getElementById('theme-switch')
	.addEventListener('click', function (evt) {
		let stylesheet = hasTheme ? '' : styles;

		appendStylesheet(stylesheet);
		hasTheme = !hasTheme;
	});
