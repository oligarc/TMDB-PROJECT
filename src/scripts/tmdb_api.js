/*
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.API_KEY;
console.log("API_KEY:", API_KEY);

This should work but it's not because were on the front and not in the back
In order not to upload the key, I put it over the .env file (must be at root directory)
Then in the .gitignore you have to add the .env
*/

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY; //esto es lo que he metido para que me funcione, si no no consigo sacar las peliculas

export const fetchRecentMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=es-ES`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error getting the films:", error);
  }
};

export const fetchFilmsByName = async (searchType) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchType}&language=es-ES`
    );
    const data = await response.json();
    console.log(data);
    return data.results;
  } catch (error) {
    console.error("Error getting the films; ", error);
  }
};

export const fetchGenres = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`
    );
    const data = await response.json();
    return data.genres; // Its gonna return a list of genres with an id and a name
  } catch (error) {
    console.error("Error fetching genres: ", error);
  }
};

export const fetchFilmsByGenre = async (genreId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=es-ES`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching films by genre: ", error);
  }
};
