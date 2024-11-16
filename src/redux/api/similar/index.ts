import {api as index } from "..";
import { SIMILAR } from "./types";

const api = index.injectEndpoints({
    endpoints: (builder) => ({
        getSimilarMovies: builder.query<SIMILAR.GetSimilarMoviesResponse, SIMILAR.GetSimilarMoviesRequest>({
            query: (movieId) => ({
                url: `/movie/${movieId}/similar`,
                method: "GET",
            }),
            providesTags: ["similar"]
        })
    })
})

export const { useGetSimilarMoviesQuery } = api;