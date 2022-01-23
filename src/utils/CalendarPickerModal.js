import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { CustomInput } from './CustomInput';
import { colors } from './Colors';
import { RoundButton } from '../Buttons/RoundButton';
import { Spacer } from '../layout/Spacer';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import { constVar } from './constStr';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_END_DATE, ADD_START_DATE } from '../actions/types';
export function CalendarPickerModal({
    closeAction,
    title,
    titleType,
    description,
    buttonText,
    closeText,
    buttonPress,
    isVisible,

}) {
    const { modal, container, textStyle } = styles;
    const [date, setDate] = useState(new Date())
    const [error, setError] = useState({ state: false, message: '' })

    const post = useSelector(state => state.postReducer)
    let dispatch = useDispatch()


    const checkDate = () => {
        let diff = new Date().getTime() - date.getTime();
        if (diff > 0) {
            setError({ state: true, message: 'Η ημερομηνία που επιλέξατε είναι περασμένη' })
            return
        }


        if (post.startdate !== constVar.initialDate) {
            //  
            let dateArray = post.startdate.split("/")
            let year = dateArray[2]
            let month = dateArray[1]
            let day = dateArray[0]


            let initial = new Date(year + "/" + month + "/" + day, date.toString())

            if (initial.getTime() > date.getTime()) {
                setError({ state: true, message: 'Η τελική ημερομηνία προηγείται της αρχικής' })
                return
            }
        }

        if (post.enddate !== constVar.endDate) {
            let dateArray = post.startdate.split("/")
            let year = dateArray[2]
            let month = dateArray[1]
            let day = dateArray[0]
            console.log(year + "/" + month + "/" + day, date.toString())

            let end = new Date(year + "/" + month + "/" + day)

            if (end.getTime() > date.getTime()) {
                setError({ state: true, message: 'Η αρχική ημερομηνία πρέπει να προηγείται της τελικής' })
                return
            }
        }
        let year = date.getFullYear()
        let day = date.getDate()
        let month = date.getMonth() + 1

        post.radioSelected === 0 ? (

            dispatch({
                type: ADD_START_DATE,
                payload: day + "/" + month + "/" + year
            })
        ) : (
            dispatch({
                type: ADD_END_DATE,
                payload: day + "/" + month + "/" + year
            })
        )

        buttonPress(1)
    }


    const closeModal = () => {
        setError({ state: false, message: '' })
        closeAction()
    }
    return (
        <View>
            <Modal
                isVisible={isVisible}
                style={modal}
                onBackdropPress={closeModal}
                onSwipeComplete={closeModal}
                swipeDirection="down"
                useNativeDriver={true}
            >
                <View style={container}>
                    <DatePicker
                        mode="date"
                        open={true}
                        date={date}
                        onDateChange={(date) => {
                            setDate(date);
                            setError(false)
                        }}
                        onConfirm={(date) => {

                        }}
                        onCancel={() => {
                            // setOpen(false)
                        }}
                    />
                    {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                    <View style={{ width: '100%', backgroundColor: colors.CoolGray1, height: 1, marginTop: 10 }} />
                    <TouchableOpacity activeOpacity={0.9} style={[{ padding: 10 }, container]} onPress={checkDate}>
                        <Text style={[textStyle, { color: 'black' }]}>Προσθήκη</Text>
                    </TouchableOpacity>

                </View>

                <Spacer height={10} />
                <TouchableOpacity activeOpacity={0.9} style={[{ padding: 10 }, container]} onPress={() => buttonPress(2)}>
                    <Text style={[textStyle, { color: 'red' }]}>Άκυρο</Text>
                </TouchableOpacity>
            </Modal >
        </View >
    );
}

const styles = StyleSheet.create({
    textStyle: {
        textAlign: 'center',
        fontSize: 17
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 10,

    },
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: 'auto',
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingTop: 10
    },
    descriptionStyle: {
        paddingHorizontal: 16,
        paddingVertical: 32,
        textAlign: 'center'
    }
});
