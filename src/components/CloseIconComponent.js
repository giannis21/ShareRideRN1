import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../utils/Colors';
import Icon from 'react-native-vector-icons/Ionicons';


export function CloseIconComponent({
    onPress
}) {


    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            style={styles.container}>
            <View style={styles.circleContainer}>


                <Icon name="close" color='black' size={18} style={{ color: colors.colorPrimary }} />
            </View>

        </TouchableWithoutFeedback>


    );
}

const styles = StyleSheet.create({

    circle: {
        borderRadius: 100 / 2,
    },
    circleContainer: {
        borderRadius: 100 / 2,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.colorPrimary,
        borderWidth: 1
    },
    container: {
        flex: 1,
        marginTop: 5,
        marginStart: 10
    },

});
