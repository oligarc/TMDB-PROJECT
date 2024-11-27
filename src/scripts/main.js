import { fetchRecentMovies } from "./tmdb_api";

fetchRecentMovies().then((movies) => {
  console.log("Most recent films" + movies);
  const moviesContainer = document.querySelector(".movies-container");
  const row = document.createElement("div");
  row.classList.add("row", "justify-content-between");
  movies.forEach((movie) => {
    const movieCard = `<div class="col-md-4 col-lg-3 mb-4">
        <div class="card">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">${movie.overview}</p>
          </div>
        </div>
      </div>`;

    row.innerHTML += movieCard;
  });
  moviesContainer.appendChild(row);
});
