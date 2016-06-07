import { Injectable, EventEmitter } from '@angular/core'

@Injectable()
// StateService behaves as a singleton service and records the global app state, the root app component goes to different route depending on this state
export class StateService {
	stateChanged = new EventEmitter<string>()
	afterLoginState: string
	state: string
	params: any
	setState(newState: string) {
		this.state = newState
		this.stateChanged.emit(newState)
	}
}