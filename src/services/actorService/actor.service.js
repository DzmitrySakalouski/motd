import {axiosInstance} from '../../utils/axios.util';

export const getActorDataRequest = async id => {
  const data = await axiosInstance.get(`/person/${id}`);

  return data;
};

export const getActorMoviesList = async actorId => {
  const data = await axiosInstance.get(`person/${actorId}/movie_credits`);

  return data;
};

export const getActorImages = async actorId => {
  const data = await axiosInstance.get(`person/${actorId}/images`);

  return data;
};

export const buildIMDBLink = imdbId => `https://www.imdb.com/name/${imdbId}/`;
