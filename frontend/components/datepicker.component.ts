import { Component, ViewContainerRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core'
import { MdIcon, MdIconRegistry } from '@angular2-material/icon'
import { NgIf, NgFor, NgClass, NgModel, FORM_DIRECTIVES, ControlValueAccessor } from '@angular/common'
import * as moment from 'moment'


@Component({
	selector: 'datepicker[ngModel]',
	templateUrl: 'frontend/templates/datepicker.html',
	styleUrls: ['frontend/styles/styles.css'],
	providers: [MdIconRegistry],
	directives: [FORM_DIRECTIVES, NgIf, NgFor, NgClass, MdIcon],
	pipes: []
})
export class DatePicker implements ControlValueAccessor, AfterViewInit {
	public isOpened: boolean
	public dateValue: string
	public viewValue: string
	public days: Array<Object>
	public dayNames: Array<string>
	private el: any
	private date: any
	private viewContainer: ViewContainerRef
	private onChange: Function
	private onTouched: Function
	private cd: any
	private cannonical: number

	@Input('model-format') modelFormat: string
	@Input('view-format') viewFormat: string
	@Input('init-date') initDate: string
	@Input('first-week-day-sunday') firstWeekDaySunday: boolean
	@Input('static') isStatic: boolean

	@Output() changed: EventEmitter<Date> = new EventEmitter<Date>()

	constructor(cd: NgModel, viewContainer: ViewContainerRef) {
		cd.valueAccessor = this
		this.cd = cd
		this.viewContainer = viewContainer
		this.el = viewContainer.element.nativeElement
		this.init()
	}

	ngAfterViewInit() {
		this.initValue()
	}

	public openDatepicker(): void {
		this.isOpened = true
	}

	public closeDatepicker(): void {
		this.isOpened = false
	}

	public prevYear(): void {
		this.date.subtract(1, 'Y')
		this.generateCalendar(this.date)
	}

	public prevMonth(): void {
		this.date.subtract(1, 'M')
		this.generateCalendar(this.date)
	}

	public nextYear(): void {
		this.date.add(1, 'Y')
		this.generateCalendar(this.date)
	}

	public nextMonth(): void {
		this.date.add(1, 'M')
		this.generateCalendar(this.date)
	}

	public selectDate(e, date): void {
		e.preventDefault()
		if (this.isSelected(date)) return

		let selectedDate = moment(date.day + '.' + (date.month + 1) + '.' + date.year, 'DD.MM.YYYY')
		this.setValue(selectedDate)
		this.closeDatepicker()
		this.changed.emit(selectedDate.toDate())
	}

	private generateCalendar(date): void {
		let lastDayOfMonth = date.endOf('month').date()
		let month = date.month()
		let year = date.year()
		let n = 1
		let firstWeekDay = null

		this.dateValue = date.format('MMMM YYYY')
		this.days = []

		if (this.firstWeekDaySunday === true) {
			firstWeekDay = date.set('date', 2).day()
		} else {
			firstWeekDay = date.set('date', 1).day()
		}

		if (firstWeekDay !== 1) {
			n -= firstWeekDay - 1
		}

		for (let i = n; i <= lastDayOfMonth; i += 1) {
			if (i > 0) {
				this.days.push({ day: i, month: month + 1, year: year, enabled: true })
			} else {
				this.days.push({ day: null, month: null, year: null, enabled: false })
			}
		}
	}

	isSelected(date) {
		let selectedDate = moment(date.day + '.' + date.month + '.' + date.year, 'DD.MM.YYYY')
		return selectedDate.toDate().getTime() === this.cannonical
	}

	private generateDayNames(): void {
		this.dayNames = []
		let date = this.firstWeekDaySunday === true ? moment('2015-06-07') : moment('2015-06-01')
		for (let i = 0; i < 7; i += 1) {
			this.dayNames.push(date.format('ddd'))
			date.add('1', 'd')
		}
	}

	private initMouseEvents(): void {
		let body = document.getElementsByTagName('body')[0]

		body.addEventListener('click', (e) => {
			if (!this.isOpened || !e.target) return
			if (this.el !== e.target && !this.el.contains(e.target)) {
				this.closeDatepicker()
			}
		}, false)
	}

	private setValue(value: any): void {
		let val = moment(value, this.modelFormat || 'YYYY-MM-DD')
		this.viewValue = val.format(this.viewFormat || 'Do MMMM YYYY')
		this.cd.viewToModelUpdate(val.format(this.modelFormat || 'YYYY-MM-DD'))
		this.cannonical = val.toDate().getTime()
	}

	private initValue(): void {
		setTimeout(() => {
			if (!this.initDate) {
				this.setValue(moment().format(this.modelFormat || 'YYYY-MM-DD'))
			} else {
				this.setValue(moment(this.initDate, this.modelFormat || 'YYYY-MM-DD'))
			}
		})
	}

	writeValue(value: string): void {
	if (!value) return
		this.setValue(value)
	}

	registerOnChange(fn: (_: any) => {}): void {
		this.onChange = fn
	}

	registerOnTouched(fn: (_: any) => {}): void {
		this.onTouched = fn
	}

	private init(): void {
		this.isOpened = false
		this.date = moment()
		this.firstWeekDaySunday = false
		this.generateDayNames()
		this.generateCalendar(this.date)
		this.initMouseEvents()
	}
}
