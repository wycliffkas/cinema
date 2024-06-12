export const genres = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie',
};
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&sort_by=popularity.desc`;
export const getImagePath = (path) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
export const getBackdropPath = (path) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

export const fetchTrailerUrl = (video) => {
  let videoUrl = '';
  if (video.site === 'YouTube') {
    videoUrl = `https://www.youtube.com/watch?v=${video.key}`;
  } else if (video.site === 'Vimeo') {
    videoUrl = `https://vimeo.com/${video.key}`;
  }
  return videoUrl
};

export const getMovies = async () => {
  const { results } = await fetch(API_URL).then((x) => x.json());
  const movies = results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }) => ({
      key: String(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genres: genre_ids.map((genre) => genres[genre]),
    })
  );

  return movies;
};


export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
    return {}
  };
}

export const fetchMovieCredits = async (movieId) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`);
  const data = await response.json();
  const cast = data.cast;
  const sortedCast = cast.sort((a, b) => a.cast_id - b.cast_id);
  const mainCharacters = sortedCast.slice(0, 10);
  return mainCharacters.map((actor) => {
    return {
      name: actor.name,
      profilePath: getImagePath(actor.profile_path),
      character: actor.character,
    }
  })
};

export const fetchMovieVideos = async (movieId) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
  const data = await response.json();
  const videos = data.results.filter(video => video.type === 'Trailer' && video.official === true,);
  return videos.map((video) => {
    return {
      name: video.name,
      id: video.id,
      url: fetchTrailerUrl(video),
      key: video.key
    }
   })
};