import { Component, EventEmitter, Output } from '@angular/core'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { MdIcon, MdIconRegistry } from '@angular2-material/icon'
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router'

@Component({
	selector: 'login',
	templateUrl: 'frontend/templates/login.html',
	styleUrls: ['frontend/styles/styles.css'],
	directives: [MD_BUTTON_DIRECTIVES, MdIcon, ROUTER_DIRECTIVES],
	providers: [MdIconRegistry, ROUTER_PROVIDERS]
})

export class LoginComponent {
	@Output() stateAnounced = new EventEmitter<string>()
	constructor() {
	}
	emitEvent() {
		this.stateAnounced.emit('go to a new state')
	}
}