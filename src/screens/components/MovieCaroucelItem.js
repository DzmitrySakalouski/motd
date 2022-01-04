import React from 'react'
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import { COLORS } from '../../contants';
import { getMovieImage } from '../../services/mainMovieService/main_movie.service';

const styles = StyleSheet.create({
    itemImage: {
        height: 199,
        width: "100%",
        borderRadius: 5
    },
    itemContainer: {
        width: 130,
        marginRight: 30
    },
    itemTitle: {
        marginTop: 5,
        textAlign: 'center'
    },
    text: {
        color: COLORS.PRIMARY,
        fontFamily: 'Roboto',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
    },
});

export const MovieCaroucelItem = ({item, onPress}) => (
    <Pressable onPress={onPress}>
        <View style={styles.itemContainer}>
            <Image source={{uri: getMovieImage(item.poster_path)}} style={styles.itemImage} />
            <Text style={[styles.text, styles.itemTitle]}>{item.title}</Text>
        </View>
    </Pressable>
);