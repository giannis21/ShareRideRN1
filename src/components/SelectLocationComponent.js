import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { Spacer } from '../layout/Spacer';
import { colors } from '../utils/Colors';

export function SelectLocationComponent({
    title,
    startingPointPress,
    endPointPress
}) {

    return (

        <View>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Από</Text>

            <TouchableOpacity onPress={startingPointPress} >
                <Spacer height={20} />
                <Text style={{ color: '#8b9cb5' }}>{title}</Text>
                <Spacer height={15} />
                <View style={{ width: '100%', backgroundColor: colors.colorPrimary, height: 1 }} />
            </TouchableOpacity>

            <Spacer height={35} />
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Μέχρι</Text>
            <TouchableOpacity onPress={endPointPress} >
                <Spacer height={20} />
                <Text style={{ color: '#8b9cb5' }}>Τελικός προορισμός</Text>
                <Spacer height={15} />
                <View style={{ width: '100%', backgroundColor: colors.colorPrimary, height: 1 }} />
            </TouchableOpacity>
        </View>

    )

}