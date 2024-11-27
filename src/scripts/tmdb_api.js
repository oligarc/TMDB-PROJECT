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

export const fetchRecentMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=es-ES`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error al obtener las películas:", error);
  }
};
