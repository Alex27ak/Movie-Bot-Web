document.addEventListener("DOMContentLoaded", () => {
  const movieForm = document.getElementById("movieForm");
  const movieList = document.getElementById("movieList");

  const API_URL = "/api/movies";

  const fetchMovies = async () => {
    try {
      const res = await fetch(API_URL);
      const movies = await res.json();

      movieList.innerHTML = "";
      movies.forEach((movie) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${movie.title}</strong><br><a href="${movie.link}" target="_blank">${movie.link}</a>`;
        movieList.appendChild(li);
      });
    } catch (err) {
      console.error("Error fetching movies", err);
    }
  };

  movieForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const link = document.getElementById("link").value.trim();

    if (!title || !link) return;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, link }),
      });

      movieForm.reset();
      fetchMovies();
    } catch (err) {
      console.error("Error adding movie", err);
    }
  });

  fetchMovies();
});
