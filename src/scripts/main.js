import {
  fetchRecentMovies,
  fetchFilmsByName,
  fetchGenres,
  fetchFilmsByGenre,
} from "./tmdb_api.js";

window.onload = () => {
  //window.onload makes sure these functions are gonna always work when you refresh
  fetchRecentMovies().then((movies) => {
    console.log("Most recent films" + movies);
    displayMovies(movies);
  });

  fetchGenres().then((genres) => {
    console.log("Genres", genres);
    populateGenresDropdown(genres);
  });
};

const displayMovies = (movies) => {
  const moviesContainer = document.querySelector(".movies-container");
  moviesContainer.innerHTML = "";

  const row = document.createElement("div");
  row.classList.add("row", "justify-content-between");

  movies.forEach((movie) => {
    const movieCard = `
      <div class="col-md-4 col-lg-3 mb-4 d-flex align-items-stretch">
        <div class="card h-100">
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

const populateGenresDropdown = (genres) => {
  const genresDropdown = document.getElementById("genresDropdown");
  genresDropdown.innerHTML = "";

  genres.forEach((genre) => {
    const genreItem = document.createElement("a"); //Create an a element for every genre in json
    genreItem.classList.add("dropdown-item");
    genreItem.textContent = genre.name; //Name of the genre
    genreItem.href = "#";
    genreItem.dataset.genreId = genre.id; //Get the id for every genre

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

//This is another function related to the click one, instead of clicking when you press Enter you search the film too
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchButton.click();
  }
});
