export class Event {
	public Id: string
	public title: string
	public start: Date
	public end: Date
	public status: string
	public registration_limit: number
	public remaining_seats: number
	public description: string
	public image_url: string
	initialize(event) {
		this.Id = event.Id
		this.title = event.title
		this.start = new Date(event.start)
		this.end = new Date(event.end)
		this.status = event.status
		this.registration_limit = event.registration_limit
		this.remaining_seats = event.remaining_seats
		this.description = event.description
		this.image_url = event.image_url
	}
}