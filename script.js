// Fetch data from the OMDB API
const API_KEY = 'http://www.omdbapi.com/?i=tt3896198&apikey=46348d8b';
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                if (data.Search) {
                    const movies = data.Search;
                    renderSearchResults(movies);
                } else {
                    searchResults.innerHTML = '<p>No results found</p>';
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        searchResults.innerHTML = '';
    }
});

function renderSearchResults(movies) {
    searchResults.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <button class="add-favorite" data-imdbid="${movie.imdbID}">Add to Favorites</button>
        `;
        searchResults.appendChild(movieCard);
    });
}

// Add to favorites
searchResults.addEventListener('click', event => {
    if (event.target.classList.contains('add-favorite')) {
        const imdbID = event.target.dataset.imdbid;
        const movieCard = event.target.closest('.movie-card');
        const movieTitle = movieCard.querySelector('h3').innerText;
        // Add to favorites logic
        // You can use local storage to store favorites
        // Handle UI changes
    }
});

// Display movie details page
// Similar to fetching search results and rendering movie details
