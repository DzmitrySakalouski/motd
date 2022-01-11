import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        paddingRight: 10,
    },
});

export const ReloadButton = () => {
    return (
        <Pressable style={styles.container}>
            <Icon name="rotate-left" color="white" size={28} />
        </Pressable>
    )
};
