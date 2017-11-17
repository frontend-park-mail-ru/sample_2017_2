import ItemModel from '../model/ItemModel';

export function autoBind(domElement: HTMLElement, model: ItemModel) {
	const elements = {};

	domElement.querySelectorAll('[data-bind]').forEach(element => {
		const key = element.getAttribute('data-bind');

		elements[key] = element;

		reverseBind(element, value => model[key] = value);
		updateValue(element, model[key]);
	});

	model.onUpdate((key, value) => {
		if (!elements[key]) {
			return;
		}

		updateValue(elements[key], value);
	});

}

function updateValue(domElement, value) {

	if (domElement instanceof HTMLInputElement) {
		domElement.value = value;
	} else {
		domElement.innerHTML = value;
	}

}

function reverseBind(domElement, onInput) {
	if (domElement instanceof HTMLInputElement) {
		domElement.oninput = () => onInput(domElement.value);
	}
}
