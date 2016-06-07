import { Component, OnInit } from '@angular/core'
import { FORM_DIRECTIVES } from '@angular/common'
// angular2 material dependencies
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar'
// custom components
import { EditorComponent } from './editor.component'
import { DatePicker } from './datepicker.component'
// custom models
import { Event } from '../models/event.model'
// custom services
import { EventService } from '../services/event.service'

@Component({
	selector: 'new-event',
	templateUrl: 'frontend/templates/new_event.html',
	styleUrls: ['frontend/styles/styles.css'],
	directives: [EditorComponent, MD_INPUT_DIRECTIVES, DatePicker, FORM_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES],
	providers: [EditorComponent, EventService]
})

export class NewEventComponent implements OnInit {
	private event: Event
	private hasCreationFailed: boolean = false
	private creationHintMessage: string
	private isCreatingNewEvent: boolean = false
	constructor(private eventService: EventService) {}
	ngOnInit() {
		this.event = new Event()
	}
	descriptionChanged(changedDescription) {
		this.event.description = changedDescription
	}
	createNewEvent() {
		this.hasCreationFailed = false
		this.creationHintMessage = null
		// make sure all fields are entered
		if (!this.event.title ||
			!this.event.image_url ||
			!this.event.start ||
			!this.event.end ||
			!this.event.status ||
			!this.event.registration_limit ||
			!this.event.remaining_seats ||
			!this.event.description) {
			this.hasCreationFailed = true
			this.creationHintMessage = 'Please enter all field'
			return
		}
		this.isCreatingNewEvent = true
		this.eventService.createNewEvent(this.event).subscribe(
			data => {
				// clear user input
				this.event = new Event()

				this.isCreatingNewEvent = false
				this.hasCreationFailed = false
				this.creationHintMessage = 'New event successfully created'
			},
			error => {
				this.isCreatingNewEvent = false
				this.hasCreationFailed = true
				this.creationHintMessage = 'New event creation failed'
			}
		)
	}
}