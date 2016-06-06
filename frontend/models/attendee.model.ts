export class Attendee {
	public Id: string
	public company: string
	public email: string
	public first_name: string
	public last_name: string
	public phone: string
	initialize(attendee) {
		this.Id = attendee.Id
		this.company = attendee.company
		this.email = attendee.email
		this.first_name = attendee.first_name
		this.last_name = attendee.last_name
		this.phone = attendee.phone
	}
}