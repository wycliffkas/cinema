const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

class Endpoints {

    getMovies = () => `/now_playing?api_key=${API_KEY}&sort_by=popularity.desc`;

    getMovieDetails = (movieId) => `/${movieId}?api_key=${API_KEY}`;

    getMovieCredits = (movieId) => `/${movieId}/credits?api_key=${API_KEY}`;

    getMovieVideos = (movieId) => `/${movieId}/videos?api_key=${API_KEY}`;

    getMovieReviews = (movieId) => `/${movieId}/reviews?api_key=${API_KEY}`;

    getMovieImages = (movieId) => `/${movieId}/images?api_key=${API_KEY}`;

}

export default new Endpoints();
