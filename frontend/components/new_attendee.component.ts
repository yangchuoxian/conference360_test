import { Component, Input } from '@angular/core'
// angular2-material
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar'
// custom models
import { Attendee } from '../models/attendee.model'
// custom services
import { AttendeeService } from '../services/attendee.service'

@Component({
	selector: 'new-attendee',
	templateUrl: 'frontend/templates/new_attendee.html',
	styleUrls: ['frontend/styles/styles.css'],
	directives: [MD_INPUT_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES],
	providers: [Attendee, AttendeeService]
})

export class NewAttendeeComponent {
	private registrationHintMessage: string
	isRegisteringNewAttendee: boolean = false
	hasRegistrationFailed: boolean = false
	hasRegistrationSucceeded: boolean = false
	attendee: Attendee
	@Input() selectedSessionIds: string[]
	@Input() eventId: string
	constructor(private attendeeService: AttendeeService) {
		this.attendee = new Attendee()
	}
	registerAttendee() {
		this.hasRegistrationFailed = false
		this.hasRegistrationSucceeded = false
		this.isRegisteringNewAttendee = true
		this.attendeeService.registerUserForEventAndSessions(this.attendee, this.eventId, this.selectedSessionIds).subscribe(
			data => {
				// clear user input
				this.attendee = new Attendee()

				this.hasRegistrationSucceeded = true
				this.hasRegistrationFailed = false
				this.isRegisteringNewAttendee = false
				this.registrationHintMessage = 'Registration succeeded'
			},
			error => {
				this.hasRegistrationSucceeded = false
				this.hasRegistrationFailed = true
				this.isRegisteringNewAttendee = false
				this.registrationHintMessage = 'Registration failed'
			}
		)
	}
}