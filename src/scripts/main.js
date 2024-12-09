import {
  fetchRecentMovies,
  fetchFilmsByName,
  fetchGenres,
  fetchFilmsByGenre,
  fetchMovieInfo,
} from "./tmdb_api.js";
import {
  fetchFavorites,
  fetchWatchlist,
  addToFavorites,
  addToWatchlist,
} from "./json-server.js";

let currentPage = 1;

window.onload = () => {
  //window.onload makes sure these functions are gonna always work when you refresh
  fetchRecentMovies(currentPage).then((movies) => {
    console.log("Most recent films" + movies);
    displayMovies(movies);
  });

  fetchGenres().then((genres) => {
    console.log("Genres", genres);
    populateGenresDropdown(genres);
  });
};

const comeBackHere = document.getElementById("comeBackHere");
const scrollToComeBackHere = () => {
  comeBackHere.scrollIntoView({ behavior: "smooth" });
};

const loadMoreMoviesPrevious = () => {
  if (currentPage == 1) {
    currentPage = currentPage;
  } else {
    currentPage--;
  }
  fetchRecentMovies(currentPage).then((movies) => {
    displayMovies(movies);
  });
};

const loadMoreMoviesNext = () => {
  currentPage++;
  fetchRecentMovies(currentPage).then((movies) => {
    displayMovies(movies);
  });
};

const loadButtonPreviousPage = document.getElementById(
  "loadMoreFilmsButtonPreviousPage"
);

loadButtonPreviousPage.addEventListener("click", () => {
  loadMoreMoviesPrevious();
  scrollToComeBackHere();
});

const loadButtonNextPage = document.getElementById(
  "loadMoreFilmsButtonNextPage"
);
loadButtonNextPage.addEventListener("click", () => {
  loadMoreMoviesNext();
  scrollToComeBackHere();
});

document.getElementById("favouritesLink").addEventListener("click", () => {
  fetchFavorites().then((favorites) => {
    console.log("Favorites:", favorites);
    displayMovies(favorites, "favourites-container");
  });
});

document.getElementById("watchlistLink").addEventListener("click", () => {
  fetchWatchlist().then((watchlist) => {
    console.log("Watchlist:", watchlist);
    displayMovies(watchlist, "watchlist-container");
  });
});

document.getElementById("shrekButton").addEventListener("click", () => {
  document.body.classList.toggle("shrek-mode"); //toggle removes or add the class depending if it is already or not
  const shrekImage = document.getElementById("shrekImage");
  if (document.body.classList.contains("shrek-mode")) {
    shrekImage.style.display = "block"; //If it contains the shrek-mode class, img is gonna be shown
  } else {
    shrekImage.style.display = "none";
  }
});

const displayMovies = (movies) => {
  const moviesContainer = document.querySelector(".movies-container");
  moviesContainer.innerHTML = "";

  const row = document.createElement("div");
  row.classList.add("row", "justify-content-center");

  movies.forEach((movie) => {
    const movieCard = `
      <div class="col-md-4 col-lg-3 mb-4 d-flex align-items-stretch">
        <div class="card h-100 rounded shadow hover-shadow d-flex flex-column movie-card" data-id="${
          movie.id
        }">
          <img src="https://image.tmdb.org/t/p/w500${
            movie.poster_path
          }" class="card-img-top rounded" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title fw-bold">${movie.title}</h5>
            <p class="card-text">${movie.overview}</p>
            <div class="rating-circle">
            <span class="rating-text">${movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    row.innerHTML += movieCard;
  });

  moviesContainer.appendChild(row);
  const movieCards = document.querySelectorAll(".movie-card");
  movieCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const movieID = e.currentTarget.getAttribute("data-id");
      fetchMovieInfo(movieID).then((movieDetails) => {
        console.log(movieDetails);
        displayMovieDetails(movieDetails);
      });
    });
  });
};

const displayMovieDetails = (movie) => {
  const movieDetailsContainer = document.querySelector(
    ".movie-details-container"
  );
  const moviesContainer = document.querySelector(".movies-container");

  //Gonna have a new container in the html
  //This is gonna have a button to go back and another more on tmbd button
  movieDetailsContainer.innerHTML = `
    <div class="row">
      <div class="col-md-4">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
    movie.title
  }" class="img-fluid rounded shadow-lg">
      </div>
      <div class="col-md-8">
        <h2 class="fw-bold mb-3">${movie.title}</h2>
        <p class="text-muted"><strong>Release Date:</strong> ${
          movie.release_date
        }</p>
        <p class="lead mb-4">${movie.overview}</p>
        <button class="btn btn-outline-success btn-sm add-to-favorites">Add to Favorites</button>
        <button class="btn btn-outline-primary btn-sm add-to-watchlist">Add to Watchlist</button>
        <div id="errorMessage" class="alert alert-danger" style="display: none;"></div>
        <div class="genres">
          <h5 class="fw-bold">Genres:</h5>
          <p>${movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>

        <div class="row">
          <div class="col-6">
            <button id="goBackButton" class="btn btn-primary w-100">Go Back</button>
          </div>
          <div class="col-6">
            <a href="https://www.themoviedb.org/movie/${
              movie.id
            }" target="_blank" class="btn btn-info w-100">More on TMDB</a>
          </div>
        </div>
      </div>
    </div>
  `;

  // Its gonna be shown
  movieDetailsContainer.style.display = "block";

  // Scroll into view is a method that takes to the element, the behavior smooth is telling a slow down instead of going fast
  movieDetailsContainer.scrollIntoView({ behavior: "smooth" });

  // Go Back function
  document.getElementById("goBackButton").addEventListener("click", goBack);

  //Functionality added to the buttons
  const addToFavoritesButton = document.querySelector(".add-to-favorites");
  const addToWatchlistButton = document.querySelector(".add-to-watchlist");

  addToFavoritesButton.addEventListener("click", () => {
    addToFavorites(movie);
  });

  addToWatchlistButton.addEventListener("click", () => {
    addToWatchlist(movie);
  });
};

const goBack = () => {
  const movieDetailsContainer = document.querySelector(
    ".movie-details-container"
  );
  const moviesContainer = document.querySelector(".movies-container");
  movieDetailsContainer.style.display = "none";
  moviesContainer.style.display = "block";
  moviesContainer.scrollIntoView({ behavior: "smooth" });
};

const populateGenresDropdown = (genres) => {
  const genresDropdown = document.getElementById("genresDropdown");
  genresDropdown.innerHTML = "";

  genres.forEach((genre) => {
    const genreItem = document.createElement("a"); // Create an a element for every genre in JSON
    genreItem.classList.add("dropdown-item");
    genreItem.textContent = genre.name; // Name of the genre
    genreItem.href = "#";
    genreItem.dataset.genreId = genre.id; // Get the id for every genre

    // Immediately add the event for it when you click
    genreItem.addEventListener("click", (e) => {
      e.preventDefault();
      fetchFilmsByGenre(genre.id).then((movies) => {
        console.log(`Movies in genre ${genre.name}`, movies);
        displayMovies(movies);
      });
    });

    genresDropdown.appendChild(genreItem);
  });
};

const searchButton = document.getElementById("searchFilmButton");
const searchInput = document.getElementById("searchFilmInput");

// Making sure we get the searchInput value
searchButton.addEventListener("click", () => {
  console.log(searchInput.value.trim());
  if (searchInput) {
    fetchFilmsByName(searchInput.value.trim()).then((movies) => {
      console.log(movies);
      displayMovies(movies);
    });
  }
});

// This is another function related to the click one, instead of clicking when you press Enter you search the film too
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchButton.click();
  }
});
