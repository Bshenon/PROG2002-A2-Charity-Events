const CATEGORY_API = 'http://localhost:3000/api/categories';
const SEARCH_API = 'http://localhost:3000/api/events/search';

const categorySelect = document.getElementById('category');
const searchForm = document.getElementById('search-form');
const searchResults = document.getElementById('search-results');
const clearButton = document.getElementById('clear-button');

// Load categories from the database
fetch(CATEGORY_API)
    .then(response => response.json())
    .then(categories => {
        categories.forEach(category => {
            const option = document.createElement('option');

            option.value = category.category_id;
            option.textContent = category.category_name;

            categorySelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error loading categories:', error);
    });


// Search for events
searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const category = categorySelect.value;

    const params = new URLSearchParams();

    if (date) {
        params.append('date', date);
    }

    if (location) {
        params.append('location', location);
    }

    if (category) {
        params.append('category', category);
    }

    const url = `${SEARCH_API}?${params.toString()}`;

    fetch(url)
        .then(response => response.json())
        .then(events => {
            displayResults(events);
        })
        .catch(error => {
            console.error('Error searching events:', error);

            searchResults.innerHTML =
                '<p>Unable to search events.</p>';
        });
});


// Clear all search filters
clearButton.addEventListener('click', () => {

    document.getElementById('date').value = '';
    document.getElementById('location').value = '';
    categorySelect.value = '';

    searchResults.innerHTML =
        '<p>Use the search options above to find events.</p>';
});


// Display search results
function displayResults(events) {

    searchResults.innerHTML = '';

    if (events.length === 0) {
        searchResults.innerHTML =
            '<p>No events matched your search.</p>';
        return;
    }

    events.forEach(event => {

        const card = document.createElement('div');
        card.className = 'event-card';

        const date = new Date(event.event_date);
        const formattedDate = date.toLocaleDateString('en-AU');

        card.innerHTML = `
            <h3>${event.event_name}</h3>

            <p>
                <strong>Category:</strong>
                ${event.category_name}
            </p>

            <p>
                <strong>Date:</strong>
                ${formattedDate}
            </p>

            <p>
                <strong>Location:</strong>
                ${event.location}
            </p>

            <p>${event.description}</p>

            <a href="event.html?id=${event.event_id}">
                View Event
            </a>
        `;

        searchResults.appendChild(card);
    });
}