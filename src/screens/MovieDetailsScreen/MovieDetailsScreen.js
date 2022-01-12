import React, { useMemo } from 'react'
import { Image, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { buildTrailerUrl, configureMainMovie, getCast, getMovieImage, getRecommendedMovies } from '../../services/mainMovieService/main_movie.service';
import { InfoSectionComponent } from './components/InfoSectionComponent';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../contants';
import { Icon as ElementsIcon } from 'react-native-elements';
import { HorizontalCarousel } from '../components/HorizontalCarousel';
import { useQuery } from 'react-query';
import { MovieCaroucelItem } from '../components/MovieCaroucelItem';
import { CrewCarouselItem } from '../components/CrewCarouselItem';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Config from 'react-native-config';
import { BallIndicator } from 'react-native-indicators';

const styles = StyleSheet.create({
    frontImageStyle: {
        width: 195, 
        height: 314,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.BACKGROUND_PRIMARY,
    },
    frontImageStyleContainer: {
        position: 'absolute',
        bottom: -157,
        zIndex: 2,
        opacity: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    container: {
        backgroundColor: COLORS.BACKGROUND_PRIMARY,
        paddingBottom: 60,
    },
    bgPoster: {
        width: '100%',
        height: '100%',
        opacity: 0.3,
    },
    header: {
        width: '100%',
        height: 300,
        position: 'relative',
    },
    mainSection: {
        paddingHorizontal: 24,
    }
});

const YouTubeButton = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <ElementsIcon size={100} name="play-circle-filled" color={COLORS.RED} />
        </TouchableOpacity>
    );
};

export const MovieDetailsScreen = () => {
    const {data: movie, isFetching} = useQuery('primary_movie', { enabled: false });
    const movieImage = useMemo(() => getMovieImage(movie?.poster_path), [movie]);
    const {
        data: recommendedData, 
        isLoading: isLoadingRecommended
    } = useQuery('recommended', () => getRecommendedMovies(movie.id));
    const {
        data: crewData,
        isLoading: isLoadingCrew
    } = useQuery('crew', () => getCast(movie.id));
    
    const borderRadiusValue = useSharedValue(15);
    const imageAnimationStyles = useAnimatedStyle(() => ({
        borderRadius: withTiming(borderRadiusValue.value, {duration: 10000}),
    }));

    const openTrailer = async () => {
        const url = buildTrailerUrl(movie.video);
        if (url) {
            await InAppBrowser.open(url, {
                dismissButtonStyle: 'cancel',
                preferredBarTintColor: COLORS.BACKGROUND_PRIMARY,
                preferredControlTintColor: COLORS.PRIMARY,
                readerMode: false,
                animated: true,
                modalPresentationStyle: 'fullScreen',
                modalTransitionStyle: 'coverVertical',
                modalEnabled: true,
                enableBarCollapsing: false,
            });
        }
    }

    console.log('isLoading', isFetching);


    if (isFetching) {
        return (
            <View style={styles.loaderContainer}>
                <BallIndicator size={50} color='white' />
            </View>
        );
    }

    return (
        <ScrollView bounces={false} contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Image source={{uri: movieImage}} style={styles.bgPoster} />
                <View style={styles.frontImageStyleContainer}>
                    <SharedElement id="movie_poster_main">
                        <Animated.Image pointerEvents="none" source={{uri: movieImage}} style={[styles.frontImageStyle, imageAnimationStyles]} />
                    </SharedElement>
                    <YouTubeButton onPress={openTrailer} />
                </View>
            </View>
            <View style={styles.mainSection}>
                <InfoSectionComponent movie={movie} />
                <HorizontalCarousel
                    items={crewData?.cast}
                    title="Cast"
                    isLoading={isLoadingCrew}
                    onItemPress={null}
                    CaroucelItem={CrewCarouselItem}
                />
                <HorizontalCarousel
                    items={recommendedData?.results}
                    title="Recommended" 
                    isLoading={isLoadingRecommended}
                    onItemPress={(id) => console.log(id, id)}
                    CaroucelItem={MovieCaroucelItem}
                />
            </View>
        </ScrollView>
    );
};