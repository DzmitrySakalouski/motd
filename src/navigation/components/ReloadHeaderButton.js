import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useMutation, useQueryClient } from 'react-query';
import { updateMovie } from '../../services/mainMovieService/main_movie.service';

const styles = StyleSheet.create({
    container: {
        paddingRight: 10,
    },
});

export const ReloadButton = () => {
    const queryClient = useQueryClient();
    const { mutate: update } = useMutation(() => updateMovie(), {
        cacheKey: 'primary_movie',
        onSuccess: () => {
            queryClient.refetchQueries('primary_movie');
        }
    });
    return (
        <TouchableOpacity style={styles.container} onPress={update}>
            <Icon name="rotate-left" color="white" size={28} />
        </TouchableOpacity>
    )
};
