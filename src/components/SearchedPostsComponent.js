import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { getAutoComplete, getPlaceInfo } from '../services/MainServices';
import { colors } from '../utils/Colors';
import { CustomInput } from '../utils/CustomInput';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Spacer } from '../layout/Spacer';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_MIDDLE_STOP, REMOVE_MIDDLE_STOP, REMOVE_MIDDLE_STOPS } from '../actions/types';


export function SearchedPostsComponent({
    onPress,
    from,
    addStops,
    isStartPoint,
    showMessage
}) {
    var _ = require('lodash');

    const [value, setValue] = useState('')
    const [dataSource, setDataSource] = useState([])
    const [isRender, setIsRender] = useState(false)
    const [selectionEnabled, setSelectionEnabled] = useState(true)
    const post = useSelector(state => state.postReducer)
    const dispatch = useDispatch();


    return (

        <View style={{ width: '100%', height: '100%', paddingHorizontal: 8 }}>



            <Spacer height={20} />
            <FlatList
                data={dataSource}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 10 }} />
                )}
                extraData={isRender}
                keyExtractor={(item, index) => index}
                enableEmptySections={true}
                renderItem={(item) => {

                    return (
                        <View></View>
                    )
                }}

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
