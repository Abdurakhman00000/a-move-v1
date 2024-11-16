import {api as index } from  "..";

const api = index.injectEndpoints({
    endpoints: (builder) => ({
        GetDiscoverTV: builder.query<DICOVERTV.GetDiscoverTVResponse, DICOVERTV.GetDiscoverTVRequest>({
            query: () => ({
                url: `/discover/tv`,
                method: "GET",
            }),
            providesTags: ["discoverTV"]
        })
    })
})

export const { useGetDiscoverTVQuery } = api;