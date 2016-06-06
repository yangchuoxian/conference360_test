export class Session {
	public Id: string
	public title: string
	public start: Date
	public end: Date
	public status: string
	public registration_limit: number
	public remaining_seats: number
	public belongs_to_event: string
	initialize(session) {
		this.Id = session.Id
		this.title = session.title
		this.start = new Date(session.start)
		this.end = new Date(session.end)
		this.status = session.status
		this.registration_limit = session.registration_limit
		this.remaining_seats = session.remaining_seats
		this.belongs_to_event = session.belongs_to_event
	}
}