const events = [
    {
        id: 1,
        title: "Jazz Night",
        date: "2025-06-01",
        time: "6:00 PM",
        location: "Islamabad",
        category: "Music"
    },
    {
        id: 2,
        title: "Art Exhibition",
        date: "2025-06-05",
        time: "10:00 AM",
        location: "Lahore",
        category: "Art"
    },
    {
        id: 3,
        title: "Tech Meetup",
        date: "2025-06-10",
        time: "5:00 PM",
        location: "Karachi",
        category: "Technology"
    },
    {
        id: 4,
        title: "Spring Festival",
        date: "2025-06-15",
        time: "12:00 PM",
        location: "Faisalabad",
        category: "Festival"
    },
    {
        id: 5,
        title: "Photography Workshop",
        date: "2025-06-18",
        time: "9:00 AM",
        location: "Rawalpindi",
        category: "Workshop"
    },
    {
        id: 6,
        title: "AI Bootcamp",
        date: "2025-06-20",
        time: "8:00 AM",
        location: "Islamabad",
        category: "Technology"
    },
    {
        id: 7,
        title: "Street Art Tour",
        date: "2025-06-22",
        time: "2:00 PM",
        location: "Karachi",
        category: "Art"
    },
    {
        id: 8,
        title: "Cultural Fest",
        date: "2025-06-25",
        time: "3:00 PM",
        location: "Lahore",
        category: "Festival"
    },
    {
        id: 9,
        title: "Startup Workshop",
        date: "2025-06-27",
        time: "1:00 PM",
        location: "Faisalabad",
        category: "Workshop"
    },
    {
        id: 10,
        title: "Classical Music Night",
        date: "2025-06-30",
        time: "7:00 PM",
        location: "Rawalpindi",
        category: "Music"
    }
];

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function displayEvents(eventList) {
    const grid = document.getElementById('eventsGrid');
    grid.innerHTML = '';
    eventList.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('event-card');
        card.innerHTML = `
            <h3>${event.title}</h3>
            <p><span class="icon">🎵</span>Category: ${event.category}</p>
            <p><span class="icon">📅</span>Date: ${event.date}</p>
            <p><span class="icon">📍</span>Location: ${event.location}</p>
            <button class="favorite-btn" onclick="toggleFavorite(${event.id})" aria-label="Toggle favorite for ${event.title}">
                ${favorites.includes(event.id) ? '★' : '☆'}
            </button>
        `;
        grid.appendChild(card);
    });
}

function applyFilters() {
    const category = document.getElementById('categoryFilter').value;
    const date = document.getElementById('dateFilter').value;
    const location = document.getElementById('locationFilter').value.toLowerCase();

    const filteredEvents = events.filter(event => {
        return (
            (!category || event.category === category) &&
            (!date || event.date === date) &&
            (!location || event.location.toLowerCase().includes(location))
        );
    });

    localStorage.setItem('filters', JSON.stringify({ category, date, location }));
    displayEvents(filteredEvents);
}

function clearFilters() {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('dateFilter').value = '';
    document.getElementById('locationFilter').value = '';
    localStorage.removeItem('filters');
    displayEvents(events);
}

function toggleFavorite(eventId) {
    if (favorites.includes(eventId)) {
        favorites = favorites.filter(id => id !== eventId);
    } else {
        favorites.push(eventId);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    applyFilters();
}

function showFavorites() {
    const favoriteEvents = events.filter(event => favorites.includes(event.id));
    displayEvents(favoriteEvents);
}

function showAllEvents() {
    const savedFilters = JSON.parse(localStorage.getItem('filters'));
    if (savedFilters) {
        document.getElementById('categoryFilter').value = savedFilters.category || '';
        document.getElementById('dateFilter').value = savedFilters.date || '';
        document.getElementById('locationFilter').value = savedFilters.location || '';
        applyFilters();
    } else {
        displayEvents(events);
    }
}

window.onload = showAllEvents;
