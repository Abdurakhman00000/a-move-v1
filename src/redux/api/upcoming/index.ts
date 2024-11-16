import {api as index} from "..";

const api = index.injectEndpoints({
    endpoints: (builder) => ({
        getUpcoming: builder.query<UPCOMING.GetUpcomingResponse, UPCOMING.GetUpcomingRequest>({
            query: () => ({
                url: "/discover/movie",
                method: "GET",
            }),
            providesTags: ["upcoming"]
        })
    })
})

export const { useGetUpcomingQuery} = api;