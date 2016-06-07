import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Attendee } from '../models/attendee.model'

@Injectable()
export class AttendeeService {
	constructor(private http: Http) {}
	registerUserForEventAndSessions(newAttendee: Attendee, eventId: string, sessionIds: string[]): Observable<any> {
		let body = JSON.stringify({
			eventId: eventId,
			attendee: newAttendee,
			sessionIds: sessionIds
		})
		let headers = new Headers({ 'Content-Type': 'application/json' })
	    let options = new RequestOptions({ headers: headers })
		return this.http.post('/register_user_for_event_and_sessions', body, options)
						.map(this.extractData)
						.catch(this.handleError)
	}
	private extractData(res: Response) {
		return res || {}
	}
	private handleError(error: any) {
		let body = JSON.parse(error._body)
		let errorMessage = body.message
		return Observable.throw(errorMessage)
	}
}