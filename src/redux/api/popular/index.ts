import {api as index} from "..";

const api = index.injectEndpoints({
    endpoints: (builder) => ({
        GetPopular: builder.query<POPULAR.GetPopularResponse, POPULAR.GetPopularRequest>({
            query: () => ({
                url: `/movie/popular`,
                method: "GET",
            }),
            providesTags: ["popular"]
        })
    })
})

export const { useGetPopularQuery } = api;