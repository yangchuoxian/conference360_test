import { Component, Output, OnInit } from '@angular/core'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input'
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar'
import { MdIcon, MdIconRegistry } from '@angular2-material/icon'
// custom service
import { SalesforceUserService } from '../services/salesforce_user.service'
import { StateService } from '../services/state.service'

@Component({
	selector: 'login',
	templateUrl: 'frontend/templates/login.html',
	styleUrls: ['frontend/styles/styles.css'],
	directives: [MD_BUTTON_DIRECTIVES, MdIcon, MD_INPUT_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES],
	providers: [MdIconRegistry, SalesforceUserService]
})

export class LoginComponent implements OnInit {
	private salesforceEmail: string
	private salesforcePassword: string
	private loginHintMessage: string
	private hasLoginSucceeded: boolean
	private isLoggingIn: boolean
	constructor(private salesforceUserService: SalesforceUserService, private stateService: StateService) {}
	ngOnInit() {}
	submitSalesforceUserLogin() {
		this.loginHintMessage = '' 
		this.isLoggingIn = true
		this.salesforceUserService.login(this.salesforceEmail, this.salesforcePassword).subscribe(
			data => {
				this.isLoggingIn = false
				this.hasLoginSucceeded = true
				this.loginHintMessage = 'Login Succeeded'
				// while user successfully logged in, the router should redirect the user to where the user initially asked for
				this.stateService.setState(this.stateService.afterLoginState)
			},
			error => {
				this.isLoggingIn = false
				this.hasLoginSucceeded = false
				this.loginHintMessage = 'Login Failed'
			}
		)
	}
}