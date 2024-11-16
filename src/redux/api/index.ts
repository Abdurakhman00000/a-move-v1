import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/3`,
    prepareHeaders: (headers) => {
        if(process.env.NEXT_PUBLIC_API_KEY) {
            headers.set("Authorization", `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);
        }
        return headers;
    }
})


const baseQueryExtended: BaseQueryFn = (args, api, extraOptions) => {
    const result = baseQuery(args, api, extraOptions);
    return result;
}


export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryExtended,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    tagTypes: ["upcoming","trending", "search", "popular", "topRated", "discoverMovie", "discoverTV", "credits", "videos", "similar", "movieDetails", "tvDetails", "searchDetails"],
    endpoints: () => ({}),
})