import Component from '../framework/Component';
import {ADD_NEW} from '../events';

export default class Help extends Component {

	render(): string {
		return `<div class="card">
		  <div class="card-body">
			<h4 class="card-title">Инструкция</h4>
			<p class="card-text">
				Кликните по контакту в таблице слева чтобы отредактировать его.
			</p>
			<p class="card-text">
				Чтобы добавить новый контакт воспользуйтесь кнопкой или ссылкой ниже.
			</p>
			<a href="#" 
				class="card-link" 
				data-name="addNew"
			>Добавить новый контакт</a>
		  </div>
		</div>`;
	}

	handleAddNew = () => this.triggerEvent(ADD_NEW);

	onRender() {
		const {domElement} = this;

		domElement.querySelector('[data-name="addNew"]').onclick = this.handleAddNew;
	}
}
