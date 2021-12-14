import { BlurView } from '@react-native-community/blur'
import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { COLORS } from '../../contants'

const styles = StyleSheet.create({
    container: {
        position:'absolute', top: 0, left: 0, right: 0, bottom: 0,
        paddingTop: 40,
        paddingHorizontal: 16,
        flex: 1,
    },
    text: {
        color: COLORS.PRIMARY,
        fontFamily: 'Roboto',
    }
})

export const Drawer = props => {
    return (
        <BlurView
            style={styles.container}
            blurType="dark"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
        >
            <View>
               <Text style={styles.text}>
                    Drawer
                </Text> 
            </View>
        </BlurView>  
    )
}