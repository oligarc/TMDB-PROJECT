const API_URL = "/api";

const movieExists = async (movieId, listType) => {// This function checks if the movie already exists
    const response = await fetch(`${API_URL}/${listType}`);
    const movies = await response.json();
    // Check if the movie with the same ID already exists in the list
    return movies.some(movie => movie.id === movieId);
  };

export const fetchFavorites = async () => {
  const response = await fetch(`${API_URL}/favorites`);
  return await response.json();
};

export const addToFavorites = async (movie) => {
    const movieAlreadyExists = await movieExists(movie.id, 'favorites');
    if (movieAlreadyExists) {
      alert('This movie is already in your favorites!');
      return;  // Exit the function if the movie already exists
    }

  const response = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  return await response.json();
};

export const fetchWatchlist = async () => {
  const response = await fetch(`${API_URL}/watchlist`);
  return await response.json();
};

export const addToWatchlist = async (movie) => {
    const movieAlreadyExists = await movieExists(movie.id, 'watchlist');
  if (movieAlreadyExists) {
    alert('This movie is already in your watchlist!');
    return;  // Exit the function if the movie already exists
  }
  
  const response = await fetch(`${API_URL}/watchlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  return await response.json();
};
