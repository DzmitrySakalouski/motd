import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/core';
import React, {useCallback} from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { getMovieImage } from '../../services/mainMovieService/main_movie.service';
import { useMainMovieFetch } from '../../utils/main_movie.util';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    button: {
        borderColor: 'white',
        borderWidth: 1.5,
        paddingHorizontal: 40,
        paddingVertical: 12,
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        textTransform: 'uppercase',
        fontFamily: 'Bebas Neue',
        fontSize: 23,
    }
});

export const MainMovieScreen = () => {
    const {isLoading, isError, movieData} = useMainMovieFetch();
    const {navigate} = useNavigation();

    const handleNavigateToDetails = useCallback(() => {
        navigate('MovieDetailsScreen', {movie: movieData})
    }, [movieData]);

    const animatedImageStyle = useAnimatedStyle(() => {
        return {
            width: '100%',
            height: '100%',
        };
    });

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>...Loading</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.container}>
                <Text style={{color: 'red', fontSize: 50}}>...Loading</Text>
            </View>
        );
    }

    return (
        <ImageBackground
            source={{uri: getMovieImage(movieData?.poster_path)}} 
            style={styles.container}
            resizeMode="stretch">
            <BlurView 
                style={{position:'absolute', top: 0, left: 0, right: 0, bottom: 0}}
                blurType="dark"
                blurAmount={10}
                reducedTransparencyFallbackColor="white" />
                <View style={{height: 350, width: 230}}>
                    <SharedElement id="movie_poster_main">
                        <Animated.Image 
                            source={{uri: getMovieImage(movieData?.poster_path)}} 
                            style={animatedImageStyle}
                            resizeMode="cover" />
                    </SharedElement>
                </View>
            <TouchableOpacity onPress={handleNavigateToDetails}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>View details</Text>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    )
};
