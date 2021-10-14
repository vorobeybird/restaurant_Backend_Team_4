import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export const Desserts = () => {
    return (
        <View>
            <View >
                <Text style={styles.Header}>Desserts</Text>
            </View>
            <Text >List of dishes will be here</Text>
            <View style={styles.ContentContainer}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Header: {
        top: '10%',
        alignSelf: 'center',
        fontFamily: 'Open Sans',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 24,
        lineHeight: 33,
        textAlign: 'center',
        color: '#000000',
    },
    ContentContainer: {

    }
});