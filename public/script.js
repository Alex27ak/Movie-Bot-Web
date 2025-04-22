const movieList = document.getElementById('movieList');
const searchInput = document.getElementById('searchInput');

async function fetchMovies() {
  try {
    const res = await fetch('/api/movies');
    const data = await res.json();
    return data.movies || [];
  } catch (err) {
    console.error('Failed to fetch movies:', err);
    return [];
  }
}

function renderMovies(movies) {
  movieList.innerHTML = '';
  if (movies.length === 0) {
    movieList.innerHTML = '<p>No movies found.</p>';
    return;
  }

  movies.forEach(movie => {
    const div = document.createElement('div');
    div.className = 'movie-item';
    div.textContent = movie.title;
    movieList.appendChild(div);
  });
}

async function handleSearch() {
  const query = searchInput.value.toLowerCase();
  const movies = await fetchMovies();
  const filtered = movies.filter(movie => movie.title.toLowerCase().includes(query));
  renderMovies(filtered);
}

// Initial load
fetchMovies().then(renderMovies);
searchInput.addEventListener('input', handleSearch);
