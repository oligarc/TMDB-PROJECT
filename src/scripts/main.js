import { fetchRecentMovies, fetchFilmsByName } from "./tmdb_api";

window.onload = () => {
  fetchRecentMovies().then((movies) => {
    console.log("Most recent films" + movies);
    displayMovies(movies);
  });
};

const displayMovies = (movies) => {
  const moviesContainer = document.querySelector(".movies-container");
  moviesContainer.innerHTML = "";

  const row = document.createElement("div");
  row.classList.add("row", "justify-content-between");

  movies.forEach((movie) => {
    const movieCard = `
      <div class="col-md-4 col-lg-3 mb-4">
        <div class="card">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">${movie.overview}</p>
          </div>
        </div>
      </div>
    `;
    row.innerHTML += movieCard;
  });

  moviesContainer.appendChild(row);
};

const searchButton = document.getElementById("searchFilmButton");
const searchInput = document.getElementById("searchFilmInput");
//Making sure we get the searchInput value

searchButton.addEventListener("click", () => {
  console.log(searchInput.value.trim());
  if (searchInput) {
    fetchFilmsByName(searchInput.value.trim()).then((movies) => {
      console.log(movies);
      displayMovies(movies);
    });
  }
});
