// angular2
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
// angular2-material
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button'

@Component({
	selector: 'pagination',
	templateUrl: 'frontend/templates/pagination.html',
	styleUrls: ['frontend/styles/styles.css'],
	directives: [MD_BUTTON_DIRECTIVES]
})

export class PaginationComponent implements OnInit {
	private currentPage: number = 1
	private showingPageIndexes: number[]
	@Input() totalPages: number
	@Output() currentPageChanged = new EventEmitter<number>()
	constructor() {}
	ngOnInit() {
		this.showingPageIndexes = []
		// calculate the showing page indexes, maximum 5 page index buttons will be showing
		if (this.totalPages <= 5) {
			for (var i = 1; i <= this.totalPages; i ++) {
				this.showingPageIndexes.push(i)
			}
		} else {
			if (this.currentPage <= 3) {
				this.showingPageIndexes = [1, 2, 3, 4, 5]
			} else if ((this.totalPages - this.currentPage) <= 2) {
				for (var i = this.totalPages - 4; i <= this.totalPages; i ++) {
					this.showingPageIndexes.push(i)
				}
			} else {
				for (var i = this.currentPage - 2; i <= this.currentPage + 2; i ++) {
					this.showingPageIndexes.push(i)
				}
			}
		}
	}
	notifyOfCurrentPageChanged(pageIndex: number) {
		if (pageIndex != this.currentPage) {
			this.currentPage = pageIndex
			this.currentPageChanged.emit(this.currentPage)
		}
	}
}