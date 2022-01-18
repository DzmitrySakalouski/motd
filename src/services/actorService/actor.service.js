import {axiosInstance} from '../../utils/axios.util';

export const getActorDataRequest = async id => {
  try {
    const data = await axiosInstance.get(`/person/${id}`);

    return data;
  } catch (error) {
    return error;
  }
};

export const getActorMoviesList = async actorId => {
  try {
    const data = await axiosInstance.get(`person/${actorId}/movie_credits`);

    return data;
  } catch (error) {
    return error;
  }
};

export const getActorImages = async actorId => {
  try {
    const data = await axiosInstance.get(`person/${actorId}/images`);

    return data;
  } catch (error) {
    return error;
  }
};

export const buildIMDBLink = imdbId => `https://www.imdb.com/name/${imdbId}/`;
