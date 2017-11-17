import {JsxElement} from 'typescript';

const Реакт = {
	createElement(type, props, ...children) {
		return {
			type,
			props,
			children: normalizeChildren(children)
		};
	}
};

export function normalizeChildren(children) {
	return children.reduce((prev, current) => {

		if (Array.isArray(current)) {
			return [
				...prev,
				...normalizeChildren(current)
			];
		}

		return [...prev, current];
	},[]);
}

export function createNode(jsx) {

	if (typeof jsx !== 'object') {
		return document.createTextNode(jsx);
	}

	const { type, props, children} = jsx;
	const domElement = document.createElement(type);

	if (props) {
		Object.keys(props).forEach(key => {
			domElement.setAttribute(key, props[key]);
		});
	}

	children.forEach(child => {
		domElement.appendChild(createNode(child));
	});

	return domElement;
}

export function updateNode(element: HTMLElement, oldJsx, newJsx) {

	if (typeof newJsx !== typeof newJsx) {
		replaceNode(element, newJsx);
		return;
	}

	if (typeof newJsx !== 'object') {
		replaceNode(element, newJsx);
		return;
	}

	if (oldJsx.type !== newJsx.type) {
		replaceNode(element, newJsx);
		return;
	}

	if (Array.isArray(oldJsx) && Array.isArray(newJsx)) {
		updateChildren(element, oldJsx, newJsx);
	}

	updateProps(element, oldJsx.props, newJsx.props);

	updateChildren(element, oldJsx.children, newJsx.children);
}

function replaceNode(element: HTMLElement, jsx) {
	const newElement = createNode(jsx);
	element.parentNode.insertBefore(newElement, element);
	element.parentNode.removeChild(element);
}

function updateProps(element: HTMLElement, oldProps, newProps) {

	if (!newProps) {
		return;
	}


	Object.keys(newProps).forEach(
		key => {
			const oldValue = oldProps[key];
			const newValue = newProps[key];

			if (oldValue !== newValue) {
				element.setAttribute(key, newValue);
			}
		}
	);
}

function updateChildren(element, oldChildren, newChildren) {

	const l = Math.max(oldChildren.length, newChildren.length);

	for (let i = 0; i < l; i++) {

		const oldJsx = oldChildren[i];
		const newJsx = newChildren[i];

		if (!oldJsx) {
			element.appendChild(createNode(newJsx));
			continue;
		}

		const childElement = element.childNodes[i];

		if (!newJsx) {
			element.removeChild(childElement);
			continue;
		}

		updateNode(childElement, oldJsx, newJsx);
	}

}

export default Реакт;
