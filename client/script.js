const API_URL = 'http://localhost:3000/api/events';

fetch(API_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load events');
        }

        return response.json();
    })
    .then(events => {
        const eventList = document.getElementById('event-list');

        eventList.innerHTML = '';

        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';

            const date = new Date(event.event_date);
            const formattedDate = date.toLocaleDateString('en-AU');

            eventCard.innerHTML = `
                <h3>${event.event_name}</h3>
                <p><strong>Category:</strong> ${event.category_name}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p>${event.description}</p>
                <a href="event.html?id=${event.event_id}">View Event</a>
            `;

            eventList.appendChild(eventCard);
        });
    })
    .catch(error => {
        console.error('Error loading events:', error);

        document.getElementById('event-list').innerHTML =
            '<p>Unable to load events.</p>';
    });