export interface IMovieItem {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
    release_date: string;
    overview: string;
}

export interface IMoviesResponse {
    page: number;
    results: IMovieItem[];
    total_pages: number;
    total_results: number;
}

export interface IMovieResponse {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    backdrop_path: string;
    genres: Array<{ id: number, name: string }>;
    origin_country: string[];
}