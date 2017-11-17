import {createNode, updateNode} from './Реакт';

export default abstract class Component {

	update() {
		this.renderTo(this.domElement.parentNode);
	}

	renderTo(parentElement: HTMLElement) {
		const renderResult = this.render();

		if (!this.isRendered) {
			const element = this.domElement = createNode(renderResult);

			parentElement.innerHTML = '';
			parentElement.appendChild(element);

			this.onFirstRender();
		} else {
			updateNode(this.domElement, this.lastRenderResult, renderResult);
		}

		this.lastRenderResult = renderResult;
		this.isRendered = true;

		this.onRender();
	}

	protected domElement = null;
	private lastRenderResult = null;

	protected onFirstRender() {}
	protected onRender() {}

	protected abstract render(): string;

	protected triggerEvent<D>(eventName: string, detail?: D) {
		this.domElement.dispatchEvent(
			new CustomEvent(eventName, {
				bubbles: true,
				detail,
			}),
		);

		return false;
	}

	private isRendered = false;
}
