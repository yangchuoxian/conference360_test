import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class SalesforceUserService {
	constructor(private http: Http) {}
	login(email: string, password: string): Observable<any> {
		let body = JSON.stringify({
			email: email,
			password: password
		})
		let headers = new Headers({ 'Content-Type': 'application/json' })
	    let options = new RequestOptions({ headers: headers })
	    return this.http.post('/submit_salesforce_user_login', body, options)
	    				.map(this.extractData)
	    				.catch(this.handleError)
	}
	hasUserLoggedIn(): Observable<any> {
		return this.http.get('/has_user_logged_in')
						.map(this.extractData)
						.catch(this.handleError)	
	}
	private extractData(res: Response) {
		return 'ok'
	}
	private handleError(error: any) {
		return Observable.throw(error)
	}
}