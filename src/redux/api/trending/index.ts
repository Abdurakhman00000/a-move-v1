import {api as index} from "..";

const api = index.injectEndpoints({
    endpoints: (builder) => ({
        getTrendingMovies: builder.query<TRENDING.GetTrendingResponse, TRENDING.GetTrendingRequest>({
            query: (query) => ({
                url: `/trending/movie/${query}`,
                method: "GET",
            }),
            providesTags: ["trending"]
        })
    })
})

export const {useGetTrendingMoviesQuery} = api;