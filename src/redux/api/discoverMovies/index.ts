import {api as index } from  "..";

const api = index.injectEndpoints({
    endpoints: (builder) => ({
        GetDiscoverMovies: builder.query<DISCOVER.GetDiscoverMoviesResponse, DISCOVER.GetDiscoverMoviesRequest>({
            query: () => ({
                url: `/discover/movie`,
                method: "GET",
            }),
            providesTags: ["discoverMovie"]
        })
    })
})

export const { useGetDiscoverMoviesQuery } = api;