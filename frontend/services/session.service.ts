import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import { Session } from '../models/session.model'

@Injectable()
export class SessionService {
	private getSessionsForEventUrl = '/get_sessions_for_event?id='
	constructor(private http: Http) { }
	getSessionsForEvent(eventId: string): Observable<any> {
		return this.http.get(this.getSessionsForEventUrl + eventId)
			.map(this.extractSessionData)
			.catch(this.handleError)
	}
	private extractSessionData(res: Response) {
		var sessions: Session[] = []
		let body = res.json()
		for (var i = 0; i < body.sessions.length; i++) {
			var newSession = new Session()
			newSession.initialize(body.sessions[i])
			sessions.push(newSession)
		}
		return sessions
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