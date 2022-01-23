import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../utils/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { Spacer } from '../layout/Spacer';
import { constVar } from '../utils/constStr';
import { useSelector, useDispatch } from 'react-redux';
import { SET_RADIO_SELECTED } from '../actions/types';


export function CustomRadioButton({
    onPress,
    selectedOption,

}) {

    let dispatch = useDispatch()
    const [selected, setSelected] = useState("one")
    const post = useSelector(state => state.postReducer)

    console.log(post.radioSelected)

    let backgroundColorLeft = selected == "one" ? colors.colorPrimary : 'white'
    let backgroundColorRight = selected !== "one" ? colors.colorPrimary : 'white'
    let opacityRight = selected === "one" ? 0.2 : null

    const setOption = (option) => {
        let payload = 1
        if (option === "one")
            payload = 0

        dispatch({
            type: SET_RADIO_SELECTED,
            payload: payload
        })
        setSelected(option)
    }

    const setSelectedDate = (dateIndicator) => {
        selectedOption(dateIndicator)
    }
    return (
        <View
            onPress={onPress}
            style={styles.container}>
            <View style={{ flexDirection: 'row', marginHorizontal: 50 }}>
                <TouchableOpacity
                    style={[styles.leftContainer, { backgroundColor: backgroundColorLeft }]}
                    onPress={() => { setOption("one") }}>
                    <Text style={selected == "one" ? styles.selectedText : styles.unSelectedText}>μία</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.rightContainer, { backgroundColor: backgroundColorRight }]}
                    onPress={() => { setOption("many") }}>
                    <Text style={selected !== "one" ? styles.selectedText : styles.unSelectedText}>εύρος</Text>
                </TouchableOpacity>
            </View>

            <Spacer height={20} />

            <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity style={{ width: '48%' }} onPress={() => { setSelectedDate(0) }} >
                    <Spacer height={20} />
                    <Text style={{ color: post.startdate === constVar.initialDate ? '#8b9cb5' : 'black', alignSelf: 'center' }}>{post?.startdate}</Text>
                    <Spacer height={10} />
                    <View style={{ width: '100%', backgroundColor: colors.colorPrimary, height: 1 }} />
                </TouchableOpacity>

                <View style={{ width: '4%' }} />

                <TouchableOpacity disabled={selected === "one"} style={{ width: '48%' }} onPress={() => { setSelectedDate(1) }} >
                    <Spacer height={20} />
                    <Text style={{ color: post.enddate === constVar.endDate ? '#8b9cb5' : 'black', alignSelf: 'center', opacity: opacityRight }}>{post?.enddate}</Text>
                    <Spacer height={10} />
                    <View style={{ width: '100%', opacity: opacityRight, backgroundColor: colors.colorPrimary, height: 1 }} />
                </TouchableOpacity>
            </View>


        </View >


    );
}

const styles = StyleSheet.create({
    unSelectedText: {
        color: 'black'
    },
    selectedText: {
        color: 'white'
    },
    rightContainer: {
        borderTopRightRadius: 14,
        borderBottomEndRadius: 14,
        width: '50%',
        paddingVertical: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.colorPrimary,
        borderWidth: 1
    },
    leftContainer: {
        borderTopLeftRadius: 14,
        borderBottomLeftRadius: 14,
        width: '50%',
        paddingVertical: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.colorPrimary,
        borderColor: colors.colorPrimary,
        borderWidth: 1

    },
    container: {
        flex: 1,
        marginTop: 5,
        margin: 16
    },

});
