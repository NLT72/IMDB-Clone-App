// Function to fetch data from the OMDB API
async function searchMovies(query) {
    const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=46348d8b`);
    const data = await response.json();
    return data.Search;
  }
  
  // Function to display search results
  document.getElementById('searchInput').addEventListener('input', async function() {
    const query = this.value;
    const results = await searchMovies(query);
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Clear previous results
    if (results) {
      results.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
          <h3>${movie.Title}</h3>
          <img src="${movie.Poster}" alt="${movie.Title}">
          <button onclick="addToFavorites('${movie.imdbID}')">Add to Favorites</button>
          <button onclick="showMovieDetails('${movie.imdbID}')">View Details</button>
        `;
        searchResults.appendChild(movieItem);
      });
    }
  });
  
  // Function to add a movie to favorites
  function addToFavorites(movieId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }
  
  // Function to remove a movie from favorites
  function removeFromFavorites(movieId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(movieId)) {
      favorites = favorites.filter(id => id !== movieId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      updateFavoritesList();
    }
  }
  
  // Function to display detailed movie information on the movie page
  async function showMovieDetails(movieId) {
    const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=46348d8b`);
    const movie = await response.json();
    const movieDetails = document.getElementById('movieDetails');
    movieDetails.innerHTML = `
      <h2>${movie.Title}</h2>
      <img src="${movie.Poster}" alt="${movie.Title}">
      <p>${movie.Plot}</p>
      <button onclick="addToFavorites('${movie.imdbID}')">Add to Favorites</button>
      <button onclick="removeFromFavorites('${movie.imdbID}')">Remove from Favorites</button>
    `;
  }
  
  // Function to update the favorites list
  function updateFavoritesList() {
    const favoriteList = document.getElementById('favoriteList');
    favoriteList.innerHTML = '';
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.forEach(async movieId => {
      const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=46348d8b`);
      const movie = await response.json();
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <h3>${movie.Title}</h3>
        <img src="${movie.Poster}" alt="${movie.Title}">
        <button onclick="showMovieDetails('${movie.imdbID}')">View Details</button>
        <button onclick="removeFromFavorites('${movie.imdbID}')">Remove from Favorites</button>
      `;
      favoriteList.appendChild(listItem);
    });
  }
  
  // Call the updateFavoritesList function to display the favorites on the favorites page
  updateFavoritesList();
