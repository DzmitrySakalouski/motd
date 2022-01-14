import {axiosInstance} from '../../utils/axios.util';

export const getActorData = async id => {
  const data = await axiosInstance.get(`/person/${id}`);

  return data;
};

export const getActorMoviesList = async actorId => {
  const data = await axiosInstance.get(`person/${actorId}/movie_credits`);

  return data;
};
