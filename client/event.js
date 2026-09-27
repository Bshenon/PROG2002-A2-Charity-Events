const params = new URLSearchParams(window.location.search);
const eventId = params.get('id');

const eventDetails = document.getElementById('event-details');

if (!eventId) {
    eventDetails.innerHTML = '<p>Event not found.</p>';
} else {
    fetch(`http://localhost:3000/api/events/${eventId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Event not found');
            }

            return response.json();
        })
        .then(event => {
            const date = new Date(event.event_date);
            const formattedDate = date.toLocaleDateString('en-AU');

            const goal = Number(event.fundraising_goal);
            const raised = Number(event.amount_raised);

            let progress = 0;

            if (goal > 0) {
                progress = Math.min((raised / goal) * 100, 100);
            }

            eventDetails.innerHTML = `
                <div class="event-details-card">

                    <h2>${event.event_name}</h2>

                    <p>
                        <strong>Category:</strong>
                        ${event.category_name}
                    </p>

                    <p>
                        <strong>Date:</strong>
                        ${formattedDate}
                    </p>

                    <p>
                        <strong>Time:</strong>
                        ${event.event_time}
                    </p>

                    <p>
                        <strong>Location:</strong>
                        ${event.location}
                    </p>

                    <p>
                        <strong>Ticket Price:</strong>
                        $${Number(event.ticket_price).toFixed(2)}
                    </p>

                    <h3>About This Event</h3>
                    <p>${event.description}</p>

                    <h3>Fundraising Progress</h3>

                    <p>
                        $${raised.toFixed(2)} raised of
                        $${goal.toFixed(2)}
                    </p>

                    <div class="progress-bar">
                        <div
                            class="progress-fill"
                            style="width: ${progress}%">
                        </div>
                    </div>

                    <h3>Organised by ${event.organisation_name}</h3>

                    <p>${event.organisation_description}</p>

                    <p>
                        <strong>Email:</strong>
                        ${event.contact_email}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        ${event.phone}
                    </p>

                    <button id="register-button">
                        Register for Event
                    </button>

                </div>
            `;

            document
                .getElementById('register-button')
                .addEventListener('click', () => {
                    alert(
                        `Thank you for your interest in ${event.event_name}! Registration has been recorded.`
                    );
                });
        })
        .catch(error => {
            console.error('Error loading event:', error);
            eventDetails.innerHTML = '<p>Unable to load event details.</p>';
        });
}