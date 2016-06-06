import { Component, OnInit } from '@angular/core'
// angular2-material
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list'
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar'
import { MD_CARD_DIRECTIVES } from '@angular2-material/card'
// custom models
import { Event } from '../models/event.model'
import { Session } from '../models/session.model'
// custom services
import { StateService } from '../services/state.service'
import { SessionService } from '../services/session.service'
import { Toolbox } from '../services/toolbox.service'
// custom components
import { SessionBasicInfoComponent } from './session_basic_info.component'
import { NewAttendeeComponent } from './new_attendee.component'

@Component({
	selector: 'event-details',
	templateUrl: 'frontend/templates/event_details.html',
	styleUrls: ['frontend/styles/styles.css'],
	directives: [MD_BUTTON_DIRECTIVES, MD_GRID_LIST_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, MD_CARD_DIRECTIVES, SessionBasicInfoComponent, NewAttendeeComponent],
	providers: [Event, Session, Toolbox, SessionService]
})

export class EventDetailsComponent implements OnInit {
	event: Event
	sessions: Session[]
	selectedSessionIds: string[]
	isFetchingDataFromServer: boolean = false 
	private startDateTimeString: string
	private endDateTimeString: string
	private errorMessage: string
	constructor(private stateService: StateService, private toolbox: Toolbox, private sessionService: SessionService) {}
	ngOnInit() {
		this.event = this.stateService.params
		this.startDateTimeString = this.toolbox.formatDate(this.event.start)
		this.endDateTimeString = this.toolbox.formatDate(this.event.end)
		// Retrieve sessions for this event from server
		this.sessions = []
		this.isFetchingDataFromServer = true
		this.sessionService.getSessionsForEvent(this.event.Id).subscribe(
			sessions => {
				this.isFetchingDataFromServer = false
				this.sessions = sessions
			},
			error => this.errorMessage = <any>error
		)
		this.selectedSessionIds = []
	}
	toggleSessionSelection(toggledSessionId) {
		let index = this.selectedSessionIds.indexOf(toggledSessionId)
		if (index != -1) {
			// the toggled session id exists in selectedSessionIds and should be now UNSELECTED
			this.selectedSessionIds.splice(index, 1)
		} else {
			// the toggled session id does not exist in selectedSessionIds and should be now SELECTED
			this.selectedSessionIds.push(toggledSessionId)
		}
	}
	registerAttendee() {
		
	}
}