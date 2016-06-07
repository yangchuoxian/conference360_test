import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Event } from '../models/event.model'

@Injectable()
export class EventService {
	constructor(private http: Http) {}
	getEvents(url: string): Observable<any> {
		return this.http.get(url)
						.map(this.extractEventData)
						.catch(this.handleError)
	}
	createNewEvent(newEvent: Event): Observable<any> {
		let body = JSON.stringify({event: newEvent})
		let headers = new Headers({ 'Content-Type': 'application/json' })
	    let options = new RequestOptions({ headers: headers })
		return this.http.post('/create_new_event', body, options)
						.map(this.extractCreateEventResponse)
						.catch(this.handleError)
	}
	private extractCreateEventResponse(res: Response) {
		return res || {}
	}
	private extractEventData(res: Response) {
		var events: Event[] = []
		let body = res.json()
		for (var i = 0; i < body.events.length; i ++) {
			var newEvent = new Event()
			newEvent.initialize(body.events[i])
			events.push(newEvent)
		}
		var totalPages = Math.floor(body.totalSize / body.itemsPerPage)
		if (body.totalSize % body.itemsPerPage != 0) {
			totalPages += 1
		}
		return {
			totalPages: totalPages,
			events: events
		}
	}
	private handleError(error: any) {
		// In a real world app, we might use a remote logging infrastructure
		let errorMessage = null
	    if (error.message != null) {
			errorMessage = error.message
	    }
	    return Observable.throw(errorMessage)
	}
}