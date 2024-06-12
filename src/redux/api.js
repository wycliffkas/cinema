import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../config';
import endpoints from '../network/endpoints';
import { genres, getBackdropPath, getImagePath, fetchTrailerUrl } from '../../api';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: () => endpoints.getMovies(),
            transformResponse: (response) => {
                return response.results.map(
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
                )
            },
        }),
        getMovieDetails: builder.query({
            query: (movieId) => endpoints.getMovieDetails(movieId),
            transformResponse: (response) => response,
        }),
        getMovieCredits: builder.query({
            query: (movieId) => endpoints.getMovieCredits(movieId),
            transformResponse: (response) => {
                const cast = response.cast;
                const sortedCast = cast.sort((a, b) => a.cast_id - b.cast_id);
                const mainCharacters = sortedCast.slice(0, 10);
                return mainCharacters.map((actor) => {
                    return {
                        name: actor.name,
                        profilePath: getImagePath(actor.profile_path),
                        character: actor.character,
                    }
                })
            }
        }),
        getMovieVideos: builder.query({
            query: (movieId) => endpoints.getMovieVideos(movieId),
            transformResponse: (response) => {
                const videos = response.results.filter(video => video.type === 'Trailer' && video.official === true,);
                return videos.map((video) => {
                    return {
                        name: video.name,
                        id: video.id,
                        url: fetchTrailerUrl(video),
                        key: video.key
                    }
                })
            }
        }),
    })
})

export const {
    useGetMoviesQuery,
    useGetMovieDetailsQuery,
    useGetMovieCreditsQuery,
    useGetMovieVideosQuery,
} = api;