import { Component, EventEmitter, Output } from '@angular/core'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input'
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar'
import { MdIcon, MdIconRegistry } from '@angular2-material/icon'
// custom service
import { SalesforceUserService } from '../services/salesforce_user.service'

@Component({
	selector: 'login',
	templateUrl: 'frontend/templates/login.html',
	styleUrls: ['frontend/styles/styles.css'],
	directives: [MD_BUTTON_DIRECTIVES, MdIcon, MD_INPUT_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES],
	providers: [MdIconRegistry, SalesforceUserService]
})

export class LoginComponent {
	private salesforceEmail: string
	private salesforcePassword: string
	private loginHintMessage: string
	private hasLoginSucceeded: boolean
	private isLoggingIn: boolean
	@Output() stateAnounced = new EventEmitter<string>()
	constructor(private salesforceUserService: SalesforceUserService) {}
	submitSalesforceUserLogin() {
		this.loginHintMessage = '' 
		this.isLoggingIn = true
		this.salesforceUserService.login(this.salesforceEmail, this.salesforcePassword).subscribe(
			data => {
				this.isLoggingIn = false
				this.hasLoginSucceeded = true
				this.loginHintMessage = 'Login Succeeded'
			},
			error => {
				this.isLoggingIn = false
				this.hasLoginSucceeded = false
				this.loginHintMessage = 'Login Failed'
			}
		)
	}
}