import {api as index} from ".."

const api = index.injectEndpoints({
    endpoints: (builder) => ({
        searchKeyWords: builder.query<any, string>({
            query: (query) => ({
                url: `/search/movie`,
                method: "GET",
                params: {
                    query,
                    api_key: process.env.NEXT_PUBLIC_API_KEY
                }
            }),
            providesTags: ["search"]
        })
    })
})

export const { useSearchKeyWordsQuery } = api;