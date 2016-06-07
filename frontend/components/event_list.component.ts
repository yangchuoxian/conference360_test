import { Component, OnInit } from '@angular/core'
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router'
// angular2-material
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input'
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar'
import { MdIcon, MdIconRegistry } from '@angular2-material/icon'
import { MD_RADIO_DIRECTIVES, MdRadioDispatcher } from '@angular2-material/radio'
// custom services
import { EventService } from '../services/event.service'
// custom models
import { Event } from '../models/event.model'
// custom components
import { PaginationComponent } from './pagination.component'
import { EventBasicInfoComponent } from './event_basic_info.component'

@Component({
	selector: 'event-list',
	templateUrl: 'frontend/templates/event_list.html',
	styleUrls: ['frontend/styles/styles.css'],
	directives: [ROUTER_DIRECTIVES, MD_INPUT_DIRECTIVES, MdIcon, MD_RADIO_DIRECTIVES, MD_PROGRESS_BAR_DIRECTIVES, PaginationComponent, EventBasicInfoComponent],
	providers: [ROUTER_PROVIDERS, MdIconRegistry, MdRadioDispatcher, Event, EventService]
})

export class EventListComponent implements OnInit {
	private searchKeyword: string
	private currentEventStatus: string
	private events: Event[] = []
	private errorMessage: string
	private totalPages: number
	private currentPage: number
	private canShowPagination: boolean
	private isFetchingDataFromServer: boolean
	constructor(private eventService: EventService) {}
	ngOnInit() {
		this.currentPage = 1
		this.searchKeyword = null
		this.currentEventStatus = null
		this.fetchEvents('/get_events')
	}
	getEventsWithStatus(status: string) {
		if (this.currentEventStatus != status) {
			this.currentEventStatus = status

			this.searchKeyword = null
			this.fetchEvents('/get_events?status=' + status)
		}
	}
	searchEvents() {
		if (!this.searchKeyword) {
			return
		}
		this.currentEventStatus = null
		this.fetchEvents('/get_events?keyword=' + this.searchKeyword)
	}
	changeCurrentPage(newPage: number) {
		this.currentPage = newPage
		if (this.searchKeyword) {
			// get paginated search results
			this.fetchEvents('/get_events?keyword=' + this.searchKeyword + '&page=' + newPage)
		} else if (this.currentEventStatus) {
			// get paginated events with specific status
			this.fetchEvents('/get_events?status=' + this.currentEventStatus + '&page=' + newPage)
		} else {
			// get paginated events with no specific criteria
			this.fetchEvents('/get_events?page=' + newPage)
		}
	}
	fetchEvents(url: string) {
		this.isFetchingDataFromServer = true
		this.canShowPagination = false
		this.eventService.getEvents(url).subscribe(
			data => {
				this.isFetchingDataFromServer = false
				this.canShowPagination = true
				this.totalPages = data.totalPages
				this.events = data.events
			},
			error => this.errorMessage = <any>error
		)
	}
}