import {IMAGE_BASE_URL} from '../../contants';
import {axiosInstance} from '../../utils/axios.util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export const presentMovie = async () => {
  const currentDate = moment().format('MM_dd_YYYY');
  const keys = await AsyncStorage.getAllKeys();

  if (keys.includes(currentDate)) {
    const movie = await fetchSavedMovie(currentDate);

    return movie;
  }

  return await updateMovie();
};

export const fetchSavedMovie = async dateStringKey => {
  try {
    const savedMovie = await AsyncStorage.getItem(dateStringKey);

    return JSON.parse(savedMovie);
  } catch (error) {
    return error;
  }
};

export const saveNewMovie = async movie => {
  try {
    const currentDate = moment().format('MM_dd_YYYY');
    const movieString = JSON.stringify(movie);

    return await AsyncStorage.setItem(currentDate, movieString);
  } catch (error) {
    return error;
  }
};

export const updateMovie = async () => {
  try {
    const movie = await fetchMovie();
    await saveNewMovie(movie);

    return movie;
  } catch (error) {
    return error;
  }
};

export const fetchMovie = async () => {
  try {
    const randomPage = Math.floor(Math.random() * 500);

    const randomPageMovies = await axiosInstance.get('/movie/popular', {
      params: {page: randomPage},
    });

    if (randomPageMovies?.results?.length) {
      const randomMovieIndexFromRange = Math.floor(
        Math.random() * randomPageMovies.results.length,
      );
      const movieToDisplay =
        randomPageMovies.results[randomMovieIndexFromRange];
      const video = await getMovieVideo(movieToDisplay.id);
      const movie = await getMovieDetails(movieToDisplay.id);
      movie.video = video.results[0];

      return movie;
    }

    return null;
  } catch (error) {
    return error;
  }
};

const getMovieDetails = async id => {
  try {
    const data = await axiosInstance.get(`/movie/${id}`);

    return data;
  } catch (error) {
    return error;
  }
};

export const getMovieVideo = async id => {
  try {
    const data = await axiosInstance.get(`/movie/${id}/videos`);

    return data;
  } catch (error) {
    return error;
  }
};

export const getMovieImage = path => `${IMAGE_BASE_URL}${path}`;

export const getCast = async movieId => {
  try {
    return await axiosInstance.get(`/movie/${movieId}/credits`);
  } catch (error) {
    return error;
  }
};

export const getRecommendedMovies = async id => {
  try {
    return await axiosInstance.get(`/movie/${id}/recommendations`);
  } catch (error) {
    return error;
  }
};

export const buildTrailerUrl = video => {
  if (video.site === 'YouTube') {
    return `https://www.youtube.com/watch?v=${video.key}`;
  }

  return null;
};
