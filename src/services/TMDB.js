import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;


export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    //*GET GENRES
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}&language=fr-FR`,
    }),
    //*GET MOVIES BY CATEGORIES
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        if(searchQuery){
          return `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${tmdbApiKey}&language=fr-FR&page=${page}&include_adult=true`;
        }

        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}&language=fr-FR`;
        }

        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}&language=fr-FR`;
        }

        return `movie/popular?page=${page}&api_key=${tmdbApiKey}&language=fr-FR`;
      },
    }),

    getMovie: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}&language=fr-FR`
    })
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieQuery } = tmdbApi;
