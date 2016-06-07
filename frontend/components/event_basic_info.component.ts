import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
// angular2-material
import { MD_CARD_DIRECTIVES } from '@angular2-material/card'
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list'
// custom models
import { Event } from '../models/event.model'
// custom services
import { StateService } from '../services/state.service'
import { Toolbox } from '../services/toolbox.service'
// config
import { constants } from '../config/constants'

@Component({
	selector: 'event-basic-info',
	templateUrl: 'frontend/templates/event_basic_info.html',
	styleUrls: ['frontend/styles/styles.css'],
	directives: [MD_CARD_DIRECTIVES, MD_GRID_LIST_DIRECTIVES],
	providers: [Event, Toolbox]
})

export class EventBasicInfoComponent implements OnInit {
	private startDateTimeString: string
	private endDateTimeString: string
	@Input() event: Event
	constructor(private stateService: StateService, private toolbox: Toolbox) {}
	ngOnInit() {
		this.startDateTimeString = this.toolbox.formatDate(this.event.start)
		this.endDateTimeString = this.toolbox.formatDate(this.event.end)
	}
	showEventDetails() {
		// change state info in singleton stateService to notify AppComponent to change route
		this.stateService.params = this.event
		this.stateService.setState(constants.eventDetailsState)
	}
}