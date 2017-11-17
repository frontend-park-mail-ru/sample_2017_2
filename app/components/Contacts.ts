import Component from '../framework/Component';
import {ADD_NEW, EDIT} from '../events';
import ListModel from '../model/ListModel';
import ItemModel from '../model/ItemModel';
import {autoBind} from '../framework/autoBind';
interface ContactsOptions {
	model: ListModel;
}

export default class Contacts extends Component {

	constructor(private options: ContactsOptions) {
		super();
	}

	render(): string {
		const {model} = this.options;

		const rows = [...model].map(({ id, name, phoneNumber}, index) => `
			<tr data-item-id="${id}">
			  <th scope="row">${index+1}</th>
			  <td data-bind="name"></td>
			  <td data-bind="phoneNumber"></td>
			</tr>
		`);

		return `<div>
			<div class="py-2">
			  <button 
				data-name="addNew"
				type="button" 
				class="btn btn-primary"
			  >Добавить новый</button>
			</div>
			<table class="table table-hover">
				  <thead>
					<tr>
					  <th scope="col">#</th>
					  <th scope="col">Имя</th>
					  <th scope="col">Номер телефона</th>
					</tr>
				  </thead>
				  <tbody>
					${rows.length ? rows.join('') : `
						<tr>
							<td colspan="3" style="text-align: center">Книга пуста</td>
						</tr>
					`}
				  </tbody>
			</table>
		</div>`;
	}

	get addNewElement() {
		return this.domElement.querySelector('[data-name="addNew"]');
	}

	handleAddNew = () => this.triggerEvent(ADD_NEW);

	handleTrClick = (model: ItemModel) => () => this.triggerEvent(EDIT, model);

	onRender() {
		const {addNewElement, domElement, options} = this;
		const {model} = options;

		addNewElement.onclick = this.handleAddNew;

		domElement.querySelectorAll('[data-item-id]').forEach((trElement) => {
			const itemId = trElement.getAttribute('data-item-id');
			const itemModel = model.getById(parseInt(itemId));

			trElement.onclick = this.handleTrClick(itemModel);

			autoBind(trElement, itemModel);
		})
	}

	onFirstRender() {
		const {model} = this.options;
		model.onUpdate(() => this.update());
	}
}
