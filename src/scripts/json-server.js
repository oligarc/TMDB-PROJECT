const API_URL = "/api";

const movieExists = async (movieId, listType) => {
  // This function checks if the movie already exists
  const response = await fetch(`${API_URL}/${listType}`);
  const movies = await response.json();
  // Check if the movie with the same ID already exists in the list
  return movies.some((movie) => movie.id === movieId);
};

const showMessage = (message, type = "danger") => {
  const messageDiv = document.getElementById("errorMessage");

  if (messageDiv) {
    // Set the message text and dynamically change the class based on type
    messageDiv.textContent = message;
    messageDiv.className = `alert alert-${type}`;
    messageDiv.style.display = "block";

    // Automatically hide the message after 3 seconds
    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 3000);
  } else {
    console.error("Message container not found in the DOM.");
  }
};

//////////////FAVORITES
export const fetchFavorites = async () => {
  const response = await fetch(`${API_URL}/favorites`);
  return await response.json();
};

export const addToFavorites = async (movie) => {
  const movieAlreadyExists = await movieExists(movie.id, "favorites");
  if (movieAlreadyExists) {
    showMessage("This movie is already in your favorites!", "danger");
    return; // Exit the function if the movie already exists
  }

  const response = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  showMessage("Movie added to favorites!", "success");
  return await response.json();
};


/////////////WATCHLIST
export const fetchWatchlist = async () => {
  const response = await fetch(`${API_URL}/watchlist`);
  return await response.json();
};

export const addToWatchlist = async (movie) => {
  const movieAlreadyExists = await movieExists(movie.id, "watchlist");
  if (movieAlreadyExists) {
    showMessage("This movie is already in your watchlist!", "danger");
    return; // Exit the function if the movie already exists
  }

  const response = await fetch(`${API_URL}/watchlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  showMessage("Movie added to watchlist!", "success");
  return await response.json();
};

