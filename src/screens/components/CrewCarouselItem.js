import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { COLORS } from '../../contants';
import { getMovieImage } from '../../services/mainMovieService/main_movie.service';

const styles = StyleSheet.create({
    text: {
        color: COLORS.PRIMARY,
        fontFamily: 'Roboto',
    },
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
    placeholder: {
        backgroundColor: COLORS.BACKGROUND_SECONDARY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: '900'
    },
    secondary: {
        color: COLORS.PRIMARY,
    }
});

export const CrewCarouselItem = ({item, onPress}) => {
    return (
        <View style={styles.itemContainer}>
            {
                item.profile_path ? 
                    <Image style={styles.itemImage} source={{uri:  getMovieImage(item.profile_path)}} /> : 
                    <View style={[styles.itemImage, styles.placeholder]}>
                        <Icon name="theater-comedy" size={90} color={COLORS.PRIMARY} />
                    </View>
            }
            <Text style={[styles.text, styles.name]}>{item.name}</Text>
            <Text style={[styles.text, styles.secondary]}>{item.character}</Text>
        </View>
    )
}