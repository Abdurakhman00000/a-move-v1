import {api as index } from "..";
import { DETAILS } from "./types";

const api = index.injectEndpoints({
    endpoints: (builder) => ({
        getMovieDetails: builder.query<DETAILS.GetMovieDetailsResponse, DETAILS.GetMovieDetailsRequest>({
            query: (id) => ({
                url: `/movie/${id}`,
                method: "GET",
            }),
            providesTags: ["movieDetails"],
        }),

        getTvDetails: builder.query<DETAILS.GetTvDetailsResponse, DETAILS.GetTvDetailsRequest>({
            query: (id) => ({
                url: `/tv/${id}`,
                method: "GET",
            }),
            providesTags: ["tvDetails"]
            }),

            // getSearchItemDetails: builder.query<DETAILS.GetSearchDetailsResponse, { id: number; mediaType: string }>({
            //     query: ({ id, mediaType }) => ({
            //         url: `/${mediaType}/${id}`, 
            //         method: "GET",
            //     }) 
            //     providesTags: ["searchDetails"],
            //   }),
        }),
    })


export const { useGetMovieDetailsQuery, useGetTvDetailsQuery} = api;