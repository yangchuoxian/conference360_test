import { Component, OnInit } from '@angular/core'
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input'
import { EditorComponent } from './editor.component'

@Component({
	selector: 'new-event',
	templateUrl: 'frontend/templates/new_event.html',
	styleUrls: ['frontend/styles/styles.css'],
	directives: [EditorComponent, MD_INPUT_DIRECTIVES],
	providers: [EditorComponent]
})

export class NewEventComponent implements OnInit {
	constructor() {}
	ngOnInit() {}
}