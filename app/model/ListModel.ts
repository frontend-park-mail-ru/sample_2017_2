
import ItemModel from './ItemModel';

export default class ListModel {

	list: ItemModel[] = [];

	[Symbol.iterator]() { return this.getNext() }

	*getNext () {
		yield* this.list;
	}

	get length() {
		return this.list.length;
	}

	handlers: (() => void)[] = [];

	createItem() {
		return new ItemModel(this, {
			id: null
		});
	}

	getById(id): ItemModel {
		return this.list.find(item => item.id === id);
	}

	onUpdate(callback: () => void) {
		this.handlers.push(callback);
	}

	addItem(item: ItemModel) {
		const {list} = this;

		if (item.isNew) {
			item.id = list.length;
		}

		list.push(item);

		this.save();

		this.triggerUpdate();
	}

	triggerUpdate() {
		const {handlers} = this;

		for (const handler of handlers) {
			handler();
		}
	}

	save() {
		localStorage.setItem('model_list', JSON.stringify(
			this.list.map(({id}) => id)
		));
	}

	static load(): ListModel {

		const model = new ListModel();

		try {
			const ids = JSON.parse(
				localStorage.getItem('model_list')
			);

			ids.forEach(id => {
				model.addItem(ItemModel.load(model, id));
			});
		} catch (e) {

		}

		return model;
	}

}
