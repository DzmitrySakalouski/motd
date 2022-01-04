import React, { useCallback, useEffect } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';
import { COLORS } from '../../contants';
import { getMovieImage } from '../../services/mainMovieService/main_movie.service';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 20,
        height: 280,
        marginBottom: 20,
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
    innerViewContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    }
});

export const HorizontalCarousel = ({title, items, onItemPress, isLoading, CaroucelItem}) => {

    const handlePress = useCallback(id => {
        onItemPress && onItemPress(id);
    }, [items]);

    if (!items) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>{title}</Text>
                <View style={styles.innerViewContainer}>
                    {
                    isLoading ? <Text style={styles.text}>...is loading</Text> :
                    <ScrollView horizontal style={{width: '100%'}}>
                    {
                        items.map(movieItem => 
                            <CaroucelItem 
                                item={movieItem}
                                key={movieItem.id}
                                onPress={() => handlePress(movieItem.id)} />)
                    }
                    </ScrollView>
                    }
                </View>
                
        </View>
    )
}