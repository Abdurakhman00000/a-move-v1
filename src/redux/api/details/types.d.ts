import { IDetails, ITvDetails } from "@/types/schema";

namespace DETAILS {
    type GetMovieDetailsResponse = IDetails;
    type GetMovieDetailsRequest = number;


    type GetTvDetailsResponse = ITvDetails;
    type GetTvDetailsRequest = number;


    type GetSearchDetailsResponse = {
        id: number;
        title?: string; // Используется для фильмов
        name?: string; // Используется для ТВ-шоу
        overview: string; // Описание
        release_date?: string; // Дата релиза
        vote_average: number; // Рейтинг
        poster_path?: string; // Путь к постеру
        genres: Genre[]; // Жанры
    }
}