import moment from 'moment';
import React, { useCallback } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
import { COLORS } from '../../../contants';


const styles = StyleSheet.create({
    text: {
        color: COLORS.PRIMARY,
        fontFamily: 'Roboto',
    },
    container: {
        marginTop: 177,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
    },
    secondaryText: {
        color: COLORS.SECONDARY,
    },
    genresText: {
        marginTop: 4,
        fontSize: 16,
        marginRight: 16,
    },
    subtitleContainer: {
        flexDirection: 'row',
    },
    voteContainer: {
        alignItems: 'flex-start',
        marginTop: 4,
        flexDirection: 'row'
    },
    subtitle: {
        fontWeight: '700',
        marginTop: 19,
        fontSize: 18,
        marginBottom: 10
    }
});

export const InfoSectionComponent = ({movie}) => {
    const renderGenres = useCallback(() => {
        return movie.genres.map(genre => genre.name).join('/');
    }, [movie]);

    const getRuntime = useCallback(() => {
        return `${Math.round(movie.runtime * 10 / 60) / 10}hrs`;
    }, [movie]);

    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>{movie.title}</Text>
            <View style={styles.subtitleContainer}>
                <Text style={[styles.text, styles.secondaryText, styles.genresText]}>{renderGenres()}</Text>
                <Text style={[styles.text, styles.secondaryText, styles.genresText]}>{getRuntime()}</Text>
            </View>
            <View style={styles.voteContainer}>
                <Icon name="star" color={COLORS.GOLD} />
                <Text style={[styles.text, styles.secondaryText, styles.genresText]}>{movie.vote_average}</Text>
                <Text style={[styles.text, styles.secondaryText, styles.genresText]}>{moment(movie.release_date).format("MM.DD.yyyy")}</Text>
            </View>
            <View style={styles.overviewContainer}>
                <Text style={[styles.text, styles.subtitle]}>Overview</Text>
                <Text
                    style={[styles.text, styles.genresText, styles.secondaryText]}>
                    {movie.overview}
                </Text>
            </View>
        </View>
    )
}