import { useEffect, useState } from "react"
import { configureMainMovie } from "../services/mainMovieService/main_movie.service";

export const useMainMovieFetch = () => {
    const [isLoading, setLoading] = useState(false);
    const [movieData, setMovieData] = useState(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        try {
            setIsError(false);
            setLoading(true);
            configureMainMovie().then(data => {
                if (data) {
                    setMovieData(data);
                }
                setLoading(false);
            });
        } catch {
            setIsError(true);
            setLoading(false);
        }
    }, []);

    return {
        movieData,
        isLoading,
        isError
    };
};
