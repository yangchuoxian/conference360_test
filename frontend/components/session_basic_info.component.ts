import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
// angular2-material
import { MD_CARD_DIRECTIVES } from '@angular2-material/card'
// custom models
import { Session } from '../models/session.model'
// custom services
import { Toolbox } from '../services/toolbox.service'

@Component({
	selector: 'session-basic-info',
	templateUrl: 'frontend/templates/session_basic_info.html',
	styleUrls: ['frontend/styles/styles.css'],
	directives: [MD_CARD_DIRECTIVES],
	providers: [Session, Toolbox]
})

export class SessionBasicInfoComponent implements OnInit {
	private startDateTimeString: string
	private endDateTimeString: string
	private isSessionSelected: boolean
	@Output() sessionToggled = new EventEmitter<string>()
	@Input() session: Session
	constructor(private toolbox: Toolbox) {}
	ngOnInit() {
		this.startDateTimeString = this.toolbox.formatDate(this.session.start)
		this.endDateTimeString = this.toolbox.formatDate(this.session.end)
		this.isSessionSelected = false
	}
	notifyChangedSessionSelection() {
		this.isSessionSelected = !this.isSessionSelected
		this.sessionToggled.emit(this.session.Id)
	}
}