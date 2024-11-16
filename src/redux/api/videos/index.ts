import {api as index} from "..";
import { VIDEOS } from "./types";

const api = index.injectEndpoints({
    endpoints: (builder) => ({
        getVideos: builder.query<VIDEOS.GetVideosResponse, VIDEOS.GetVideosRequest>({
            query: (movieId) => ({
                url: `/movie/${movieId}/videos`,
                method: "GET",
              }),
              providesTags: ["videos"],
        })
    })
})


export const {useGetVideosQuery} = api