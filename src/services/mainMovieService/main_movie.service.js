import { IMAGE_BASE_URL } from "../../contants";
import { axiosInstance } from "../../utils/axios.util"

export const configureMainMovie = async () => {
    const totalDataResponse = await axiosInstance.get('/movie/popular');
    if (totalDataResponse?.total_pages) {
        const randomPage = Math.floor(Math.random() * totalDataResponse.total_pages);

        const randomPageMovies = await axiosInstance.get('/movie/popular', {params: {page: randomPage}});

        if (randomPageMovies?.results?.length) {
            const randomMovieIndexFromRange = Math.floor(Math.random() * randomPageMovies.results.length);
            const movieToDisplay = randomPageMovies.results[randomMovieIndexFromRange];
            const video = await axiosInstance.get(`/movie/${movieToDisplay.id}/videos`);
            const movie = await getMovieDetails(movieToDisplay.id);
            movie['video'] = video.results[0];
            console.log('MOVIE ===> ', movie);
            return movie;
        }
    }
}

const getMovieDetails = async (id) => {
    const data = await axiosInstance.get(`/movie/${id}`);

    return data;
}

export const getMovieImage = path => `${IMAGE_BASE_URL}${path}`;

export const getCast = async (movieId) => {
    return await axiosInstance.get(`/movie/${movieId}/credits`);
}

export const getRecommendedMovies = async (id) => {
    return await axiosInstance.get(`/movie/${id}/recommendations`);
}

export const buildTrailerUrl = (video) => {
    if (video.site == 'YouTube') {
        return `https://www.youtube.com/watch?v=${video.key}`
    }

    return null;
}