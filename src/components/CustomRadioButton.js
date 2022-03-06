import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../utils/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { Spacer } from '../layout/Spacer';
import { constVar } from '../utils/constStr';
import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_DATES, SET_RADIO_SELECTED } from '../actions/types';
import { CheckBox } from 'react-native-elements';


export function CustomRadioButton({
    onPress,
    selectedOption,
    rangeRadioSelected,
    returnedDate
}) {

    let dispatch = useDispatch()
    const [selected, setSelected] = useState("one")
    const [hasReturnDate, setHasReturnDate] = useState(false)
    const post = useSelector(state => state.postReducer)


    let backgroundColorLeft = selected == "one" ? colors.colorPrimary : 'white'
    let backgroundColorRight = selected !== "one" ? colors.colorPrimary : 'white'
    let opacityRight = selected === "one" ? 0.2 : null

    const clearDates = () => {
        dispatch({
            type: REMOVE_DATES,
            payload: {}
        })
    }
    const setOption = (option) => {
        setSelected(option)
        rangeRadioSelected(option)
    }

    const setSelectedDate = (dateIndicator) => {
        selectedOption(dateIndicator)
    }

    const resetIcon = () => {
        if (post.startdate !== constVar.initialDate ||
            post.enddate !== constVar.endDate ||
            post.returnStartDate !== constVar.returnStartDate ||
            post.returnEndDate !== constVar.returnEndDate
        )
            return true

        return false
    }
    const DateInput = ({ date, selection, opacity, disabled }) => {
        return (
            <TouchableOpacity disabled={disabled} style={{ width: '48%' }} onPress={() => { setSelectedDate(selection) }} >
                <Spacer height={20} />
                <Text style={{ color: getColor(selection), alignSelf: 'center', opacity }}>{date}</Text>
                <Spacer height={10} />
                <View style={{ width: '100%', backgroundColor: colors.colorPrimary, height: 1, opacity }} />
            </TouchableOpacity>
        )
    }

    const getColor = (option) => {
        switch (option) {
            case 0: return post.startdate === constVar.initialDate ? '#8b9cb5' : 'black'
            case 1: return post.enddate === constVar.endDate ? '#8b9cb5' : 'black'
            case 2: return post.returnStartDate === constVar.returnStartDate ? '#8b9cb5' : 'black'
            case 3: return post.returnEndDate === constVar.returnEndDate ? '#8b9cb5' : 'black'
        }

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
            {resetIcon() &&
                <TouchableOpacity
                    onPress={clearDates}
                    style={{ alignItems: 'flex-end', marginTop: 10 }}>

                    <Icon name="close" color='black' size={18} />
                </TouchableOpacity>
            }

            <Spacer height={10} />

            <View style={{ flexDirection: 'row', }}>
                <DateInput date={post?.startdate} selection={0} />

                <View style={{ width: '4%' }} />

                <DateInput date={post?.enddate} selection={1} opacity={opacityRight} disabled={selected === "one"} />

            </View>

            <TouchableWithoutFeedback onPress={() => { returnedDate(!hasReturnDate); setHasReturnDate(!hasReturnDate) }} style={{ alignItems: 'center', marginTop: 13, }}>
                <Text style={{ color: '#8b9cb5', }}>με επιστροφη; {hasReturnDate ? "👍" : "👎"}</Text>

            </TouchableWithoutFeedback>

            {
                hasReturnDate && <View style={{ marginTop: 15 }}>
                    <Text style={{ color: '#8b9cb5' }}>Σκέφτομαι να επιστρέψω..</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <DateInput date={post?.returnStartDate} selection={2} />

                        <View style={{ width: '4%' }} />

                        <DateInput date={post?.returnEndDate} selection={3} />

                    </View>
                    <Text style={{ color: '#8b9cb5', fontSize: 10, marginTop: 4 }}>*μπορείς να επιλέξεις μόνο μία</Text>
                </View>
            }

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
