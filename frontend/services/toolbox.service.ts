import { Injectable } from '@angular/core'

@Injectable()
export class Toolbox {
	formatDate(date: Date) {
		var day = date.getDate()
		var dayString = '' + day
		if (day < 10) {
			dayString = '0' + day
		}
		var month = date.getMonth() + 1
		var monthString = '' + month
		if (month < 10) {
			monthString = '0' + month
		}
		var year = date.getFullYear()
		var hour = date.getHours()
		var hourString = '' + hour
		if (hour < 10) {
			hourString = '0' + hour
		} 
		var minute = date.getMinutes()
		var minuteString = '' + minute
		if (minute < 10) {
			minuteString = '0' + minute
		}
		return year + '-' + monthString + '-' + dayString + ' ' + hourString + ':' + minuteString
	}
}