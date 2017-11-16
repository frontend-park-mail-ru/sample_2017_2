import ListModel from './ListModel';

interface Values {
	id: number;
	name?: string;
	phoneNumber?: string;
}

type OnItemChangeCallback = (
	key: keyof Values,
	value: Values[typeof key]
) => void;

export default class ItemModel {

	constructor(private list: ListModel, private values: Values) {}

	get isNew() {
		return this.id === null;
	}

	get id() {
		return this.values.id;
	}

	set id(value: number) {
		this.setValue('id', value);
	}

	get name(): string {
		return this.values.name || '';
	}

	set name(value: string) {
		this.setValue('name', value)
	}

	get phoneNumber(): string {
		return this.values.phoneNumber || '';
	}

	set phoneNumber(value: string) {
		this.setValue('phoneNumber', value)
	}

	save() {
		const {isNew, list} = this;

		if (isNew) {
			list.addItem(this)
		}

		localStorage.setItem(
			`model_${this.id}`,
			JSON.stringify(this.values)
		);
	}

	reset() {
		if (this.isNew) {
			return;
		}

		this.load();
	}

	load() {
		const values = JSON.parse(
			localStorage.getItem(`model_${this.id}`)
		);

		Object.keys(values).forEach(key => this.setValue(key as any, values[key]));
	}

	onUpdate(callback: OnItemChangeCallback) {
		this.handlers.push(callback);
	}

	private handlers: OnItemChangeCallback[] = [];

	private setValue(
		key: keyof Values,
		value: Values[typeof key]
	) {
		const {values, handlers} = this;

		if (values[key] === value) {
			return;
		}

		values[key] = value;

		for (const handler of handlers) {
			handler(key, value);
		}

	}

	static load(list: ListModel, id: number): ItemModel {
		const model = new ItemModel( list, { id });
		model.load();
		return model;
	}


}
