const dummyMovies = [
  {
    id: 1,
    title: 'The Dummy Awakens',
    overview:
      'A young developer discovers a secret movie hub filled with hardcoded data and unlimited imagination.',
    release_date: '2024-01-10',
    vote_average: 8.1,
    // Star Wars: The Force Awakens poster path
    poster_path: '/wqnLdwVXoBjKibFRR5U3y0aDUhs.jpg',
    genres: [{ id: 878, name: 'Science Fiction' }, { id: 12, name: 'Adventure' }],
  },
  {
    id: 2,
    title: 'Code of Shadows',
    overview:
      'In a city of bugs and crashes, one engineer hunts for the ultimate refactor that can save the world.',
    release_date: '2023-07-21',
    vote_average: 7.5,
    // The Batman poster path
    poster_path: '/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    genres: [{ id: 28, name: 'Action' }, { id: 53, name: 'Thriller' }],
  },
  {
    id: 3,
    title: 'Silent Commit',
    overview:
      'A mysterious commit appears in a massive repo. No author, no message, only consequences.',
    release_date: '2022-11-02',
    vote_average: 7.9,
    // Inception poster path
    poster_path: '/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
    genres: [{ id: 9648, name: 'Mystery' }, { id: 18, name: 'Drama' }],
  },
  {
    id: 4,
    title: 'Refactor Reloaded',
    overview:
      'A veteran programmer returns to clean legacy code, facing infinite loops and circular dependencies.',
    release_date: '2021-05-15',
    vote_average: 7.2,
    // The Matrix poster path
    poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    genres: [{ id: 35, name: 'Comedy' }, { id: 878, name: 'Sci-Fi' }],
  },
];

function delay(result, ms = 300) {
  return new Promise((resolve) => setTimeout(() => resolve(result), ms));
}

export function getPopularMovies(page = 1) {
  const data = {
    page,
    results: dummyMovies,
    total_pages: 1,
    total_results: dummyMovies.length,
  };
  return delay(data);
}

export function searchMovies(query, page = 1) {
  const q = (query || '').toLowerCase();
  const filtered = dummyMovies.filter((m) =>
    m.title.toLowerCase().includes(q)
  );
  const data = {
    page,
    results: filtered,
    total_pages: 1,
    total_results: filtered.length,
  };
  return delay(data);
}

export function getMovieDetails(id) {
  const numericId = Number(id);
  const movie = dummyMovies.find((m) => m.id === numericId) || null;
  if (!movie) {
    return delay(Promise.reject(new Error('Movie not found')));
  }
  return delay(movie);
}
