import {api as index} from "..";

const api = index.injectEndpoints({
    endpoints: (builder) => ({
        GetTopRated: builder.query<TOPRATED.GetTopRatedResponse, TOPRATED.GetTopRatedRequest>({
            query: () => ({
                url: `movie/top_rated`,
                method: "GET",
            }),
            providesTags: ["topRated"]
        })
    })
})

export const { useGetTopRatedQuery } = api;