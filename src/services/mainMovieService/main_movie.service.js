import {IMAGE_BASE_URL} from '../../contants';
import {axiosInstance} from '../../utils/axios.util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export const configureMainMovie = async () => {
  const randomPage = Math.floor(Math.random() * 500);

  const randomPageMovies = await axiosInstance.get('/movie/popular', {
    params: {page: randomPage},
  });

  if (randomPageMovies?.results?.length) {
    const randomMovieIndexFromRange = Math.floor(
      Math.random() * randomPageMovies.results.length,
    );
    const movieToDisplay = randomPageMovies.results[randomMovieIndexFromRange];
    const video = await axiosInstance.get(`/movie/${movieToDisplay.id}/videos`);
    const movie = await getMovieDetails(movieToDisplay.id);
    movie.video = video.results[0];
    return movie;
  }

  return null;
};

export const presentMovie = async () => {
  const currentDate = moment().format('MM_dd_YYYY');
  const keys = await AsyncStorage.getAllKeys();

  if (keys.includes(currentDate)) {
    console.log('includes');
    const movie = await fetchSavedMovie(currentDate);
    console.log('includes', movie);
    return movie;
  }

  return await updateMovie();
};

export const fetchSavedMovie = async dateStringKey => {
  const savedMovie = await AsyncStorage.getItem(dateStringKey);

  return JSON.parse(savedMovie);
};

export const saveNewMovie = async movie => {
  const currentDate = moment().format('MM_dd_YYYY');
  const movieString = JSON.stringify(movie);
  return await AsyncStorage.setItem(currentDate, movieString);
};

export const updateMovie = async () => {
  console.log('UPDATE');
  const movie = await fetchMovie();
  await saveNewMovie(movie);
  return movie;
};

export const fetchMovie = async () => {
  const randomPage = Math.floor(Math.random() * 500);

  const randomPageMovies = await axiosInstance.get('/movie/popular', {
    params: {page: randomPage},
  });

  if (randomPageMovies?.results?.length) {
    const randomMovieIndexFromRange = Math.floor(
      Math.random() * randomPageMovies.results.length,
    );
    const movieToDisplay = randomPageMovies.results[randomMovieIndexFromRange];
    const video = await axiosInstance.get(`/movie/${movieToDisplay.id}/videos`);
    const movie = await getMovieDetails(movieToDisplay.id);
    movie.video = video.results[0];

    return movie;
  }

  return null;
};

const getMovieDetails = async id => {
  const data = await axiosInstance.get(`/movie/${id}`);

  return data;
};

export const getMovieImage = path => `${IMAGE_BASE_URL}${path}`;

export const getCast = async movieId => {
  return await axiosInstance.get(`/movie/${movieId}/credits`);
};

export const getRecommendedMovies = async id => {
  return await axiosInstance.get(`/movie/${id}/recommendations`);
};

export const buildTrailerUrl = video => {
  if (video.site == 'YouTube') {
    return `https://www.youtube.com/watch?v=${video.key}`;
  }

  return null;
};
