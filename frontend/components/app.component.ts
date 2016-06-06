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
// custom services
import { StateService } from '../services/state.service'
// config
import { constants } from '../config/constants'

@Routes([
	{ path: '/', component: EventListComponent },
	{ path: '/login', component: LoginComponent },
	{ path: '/editor', component: EditorComponent },

	{ path: '/events', component: EventListComponent },
	{ path: '/event_details', component: EventDetailsComponent }
])

@Component({
	selector: 'vt-app',
	templateUrl: 'frontend/templates/app.html',
	directives: [ROUTER_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_CARD_DIRECTIVES, LoginComponent],
	providers: [ROUTER_PROVIDERS]
})

export class AppComponent implements OnInit {
	stateService: StateService
	constructor(private router: Router, stateService: StateService) {
		this.stateService = stateService
	}
	ngOnInit() {
		this.stateService.stateChanged.subscribe(
			(state) => {
				if (state == constants.eventDetailsState) {
					this.router.navigate(['/event_details'])
				}
			}
		)
	}
}