import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../utils/Colors';
import { CustomInput } from '../utils/CustomInput';


export function SearchLocationComponent({
    onPress,
    from
}) {
    var _ = require('lodash');
    let imageWidth = 0


    return (

        <View style={{ width: '100%', height: '100%', paddingHorizontal: 8 }}>

            <CustomInput
                text={"αναζήτηση τοποθεσίας"}
                keyboardType="default"

                onChangeText={() => { }}

                value={''}
            />

        </View>


    );
}

const styles = StyleSheet.create({


    container: {
        backgroundColor: colors.colorPrimary,
        borderBottomLeftRadius: 54,
        height: 'auto',
        padding: 10,
        marginStart: 6,
    },
    circle: {
        borderRadius: 100 / 2,
    },
    circleContainer: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: colors.Gray2,
    },
    circleContainer1: {
        width: 50,
        height: 50,
        borderRadius: 100 / 2,
        backgroundColor: colors.Gray2,
    },
    circleContainer2: {
        width: 37,
        height: 37,
        borderRadius: 100 / 2,
        backgroundColor: colors.Gray2,
    },
    maskInputContainer: {
        marginVertical: Platform.OS === 'ios' ? 13 : 20,
        paddingVertical: Platform.OS === 'ios' ? 0 : 20,
        fontSize: 14,
        backgroundColor: 'black',

    },
});
