import Реакт from '../framework/Реакт';
import Component from '../framework/Component';
import Contacts from './Contacts';
import Edit from './Edit';
import ItemModel from '../model/ItemModel';
import Help from './Help';
import {ADD_NEW, CLOSE_FORM, EDIT} from '../events';
import ListModel from '../model/ListModel';

export default class App extends Component {

	model = ListModel.load();

	render(): string {
		return <div class=".container-fluid p-3">
			<h1>Контакты</h1>
			<div class="row">
				<div class="col-6" data-child="contacts"></div>
				<div class="col-6" data-child="edit"></div>
			</div>
		</div>;
	}

	get contactsElement() {
		return this.domElement.querySelector(
			'[data-child="contacts"]'
		);
	}

	get editElement() {
		return this.domElement.querySelector(
			'[data-child="edit"]'
		);
	}

	onRender() {
		const {domElement} = this;

		domElement.addEventListener(ADD_NEW, this.handleAddNew);
		domElement.addEventListener(EDIT, this.handleEdit);
		domElement.addEventListener(CLOSE_FORM, this.handleCloseForm);

		this.showContacts();
		this.showHelp();
	}

	handleAddNew = () => {
		this.showEdit(this.model.createItem())
	};

	handleEdit = ({detail}) => {
		this.showEdit(detail)
	};

	handleCloseForm = () => {
		this.showHelp()
	};

	handleSubmit = () => {
		this.showHelp();
	};

	showContacts() {
		const contacts = new Contacts({
			model: this.model
		});

		contacts.renderTo(this.contactsElement);
	}

	showHelp() {
		const help = new Help();

		help.renderTo(this.editElement);
	}

	showEdit(model: ItemModel) {
		const contacts = new Edit({ model });

		contacts.renderTo(this.editElement);
	}
}
