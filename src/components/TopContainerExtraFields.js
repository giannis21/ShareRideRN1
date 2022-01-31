
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../utils/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { Spacer } from '../layout/Spacer';
import { CloseIconComponent } from './CloseIconComponent';


export function TopContainerExtraFields({
    onCloseContainer,
    title
}) {


    return (

        <View style={{ height: 'auto', width: '100%', backgroundColor: 'white' }}>
            <Spacer height={5} />
            <View style={{ flexDirection: 'row', paddingBottom: 2, }}>


                <TouchableOpacity activeOpacity={1} style={styles.circleContainer} onPress={onCloseContainer}>


                    <Icon name="close" color='black' size={18} style={{ color: colors.colorPrimary }} />
                </TouchableOpacity>


                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, marginStart: 16, fontWeight: 'bold' }}>{title}</Text>
                </View>

            </View>


            <View style={{ width: '100%', backgroundColor: colors.CoolGray2.toString(), height: 1, marginTop: 4 }} />
        </View>

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
