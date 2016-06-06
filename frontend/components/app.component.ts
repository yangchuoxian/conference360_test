// angular2
import { Component, OnInit } from '@angular/core'
import { Router, Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router'
// angular2-material
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { MD_CARD_DIRECTIVES } from '@angular2-material/card'
// custom components
import { EventListComponent } from './event_list.component'
import { LoginComponent } from './login.component'
import { EditorComponent } from './editor.component'
import { EventDetailsComponent } from './event_details.component'
import { NewEventComponent } from './new_event.component'
// custom services
import { StateService } from '../services/state.service'
import { SalesforceUserService } from '../services/salesforce_user.service'
// config
import { constants } from '../config/constants'

@Routes([
	{ path: '/', component: EventListComponent },
	{ path: '/login', component: LoginComponent },
	{ path: '/editor', component: EditorComponent },

	{ path: '/events', component: EventListComponent },
	{ path: '/event_details', component: EventDetailsComponent },
	{ path: '/new_event', component: NewEventComponent }
])

@Component({
	selector: 'vt-app',
	templateUrl: 'frontend/templates/app.html',
	directives: [ROUTER_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_CARD_DIRECTIVES],
	providers: [ROUTER_PROVIDERS, SalesforceUserService]
})

export class AppComponent implements OnInit {
	constructor(private router: Router, private stateService: StateService, private salesforceUserService: SalesforceUserService) {}
	ngOnInit() {
		this.stateService.stateChanged.subscribe(
			(state) => {
				if (state == constants.eventDetailsState) {
					this.router.navigate(['/event_details'])
				}
			}
		)
	}
	goCreateEventOrLoginFirst() {
		this.salesforceUserService.hasUserLoggedIn().subscribe(
			// user has already logged in
			data => this.router.navigate(['/new_event']),
			// user has NOT logged in, now show login view
			error => this.router.navigate(['/login'])
		)
	}
}