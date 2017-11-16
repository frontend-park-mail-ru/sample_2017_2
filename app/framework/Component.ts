export default abstract class Component {

	update() {
		this.renderTo(this.domElement.parentNode);
	}

	renderTo(element: HTMLElement) {
		element.innerHTML = this.render();
		this.domElement = element.childNodes[0];

		if (!this.isRendered) {
			this.isRendered = true;
			this.onFirstRender();
		}

		this.onRender();
	}

	protected domElement = null;

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
