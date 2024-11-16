import {api as index} from "..";

const api = index.injectEndpoints({
    endpoints: (builder) => ({
        getCredits: builder.query<CREDIT.GetCreditResponse, CREDIT.GetCreditRequest>({
            query: (movieId) => ({
                url: `/movie/${movieId}/credits`,
                method: "GET",
              }),
              providesTags: ["credits"]
        })
    })
})

export const { useGetCreditsQuery } = api;