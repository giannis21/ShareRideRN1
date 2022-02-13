import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RoundButton } from '../../Buttons/RoundButton';
import { SelectLocationComponent } from '../../components/SelectLocationComponent';
import { BaseView } from '../../layout/BaseView';
import { Spacer } from '../../layout/Spacer';
import { routes } from '../../navigation/RouteNames';
import { colors } from '../../utils/Colors';
import { CustomInput } from '../../utils/CustomInput';
import { MainHeader } from '../../utils/MainHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Slider from 'rn-range-slider';
import Thumb from '../../components/rangePicker/Thumb';
import Rail from '../../components/rangePicker/Rail';
import RailSelected from '../../components/rangePicker/RailSelected';
import Label from '../../components/rangePicker/Label';
import Notch from '../../components/rangePicker/Notch';
import { CustomRadioButton } from '../../components/CustomRadioButton';
import { CommentInputComponent } from '../../components/CommentInputComponent';
import { constVar } from '../../utils/constStr';
import { useSelector, useDispatch } from 'react-redux';
import { CalendarPickerModal } from '../../utils/CalendarPickerModal';
import { ADD_START_DATE, SET_RADIO_SELECTED } from '../../actions/types';

import { resetValues } from '../../services/MainServices';
import { SearchLocationComponent } from '../../components/SearchLocationComponent';
import { useKeyboard } from '../../customHooks/useKeyboard';

const CreatePostScreen = ({ navigation, route }) => {

    const [data, setData] = useState({ startPoint: '', endPoint: '', check_textInputChange: false, secureTextEntry: true })
    const [cost, setCost] = useState(0);
    const [seats, setSeats] = useState(1);
    const [high, setHigh] = useState(100);
    const [comment, setComment] = useState('');
    const [date, setDate] = useState(new Date())
    const [dateSelected, setDateSelected] = useState(0)
    const [initialDate, setInitialDate] = useState(constVar.initialDate)
    const [endDate, setEndDate] = useState(constVar.endDate)
    const [isPickerVisible, setIsPickerVisible] = useState(false)
    const [openSearch, setOpenSearch] = useState({ from: true, open: false })
    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);
    const handleValueChange = useCallback((low, high) => {

        setCost(low);
        setHigh(high);
    }, []);

    const dispatch = useDispatch();

    const scrollRef = useRef()

    const post = useSelector(state => state.postReducer)
    const myUser = useSelector(state => state.authReducer.user)

    const onStartPointChanged = (value) => {
        setData({ ...data, startPoint: value })
    }

    let addStopStyle = {
        borderRadius: 22,
        paddingVertical: 3,
        paddingHorizontal: 10,
        alignSelf: 'baseline',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.colorPrimary,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
    let array1 = ['larisa', 'theessaloniki', 'platamonas']


    function renderSeats() {
        return (
            <View>
                <Text style={{ marginBottom: 15, marginTop: 25, color: 'black', fontWeight: 'bold', fontSize: 18, alignSelf: 'center' }}>Αριθμός θέσεων</Text>

                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity style={leftAddSeat} onPress={() =>
                        (seats > 1) &&
                        setSeats(seats - 1)}>
                        <Ionicons name="remove" size={24} color='black' />
                    </TouchableOpacity>
                    <Text style={{ marginHorizontal: 10, fontSize: 20 }}>{seats}</Text>
                    <TouchableOpacity style={rightAddSeat} onPress={() =>
                        (seats < 7) &&
                        setSeats(seats + 1)}>
                        <Ionicons name="add" size={24} color='black' />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderCost() {
        return (
            <View>
                <Text style={{ marginBottom: 15, marginTop: 25, color: 'black', fontWeight: 'bold', fontSize: 18, alignSelf: 'center' }}>Ελάχιστο κόστος</Text>

                <View style={amountLabel}>
                    <Text style={{ fontSize: 25 }}>{cost}</Text>
                    <Text style={{ fontSize: 20 }}>€</Text>
                </View>
                <Spacer height={10} />
                <Slider
                    style={styles.slider}
                    min={0}
                    max={100}
                    step={1}
                    floatingLabel
                    disableRange={true}
                    renderThumb={renderThumb}
                    renderRail={renderRail}
                    renderRailSelected={renderRailSelected}
                    renderLabel={renderLabel}
                    renderNotch={renderNotch}
                    onValueChanged={handleValueChange}
                />
            </View>
        )
    }

    function renderStops() {
        return (
            <View>

                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, alignSelf: 'center' }}>Στάσεις που μπορώ να κάνω</Text>
                <Spacer height={15} />
                <View style={{ marginBottom: 15 }}>
                    {
                        array1.map((item, index) => (
                            <View key={index} style={{ marginStart: 16, marginVertical: 2, justifyContent: 'flex-start', flexDirection: 'row' }}>
                                <Entypo name="location-pin" size={24} color={colors.colorPrimary} />
                                <Text style={{ fontSize: 16, fontWeight: '500', alignSelf: 'center', marginStart: 10 }}>{item}</Text>
                                <Spacer height={3} />
                            </View>
                        ))
                    }
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                    <RoundButton
                        containerStyle={addStopStyle}
                        leftIcon={true}
                        text={'Προσθήκη'}
                        onPress={() => { }}
                        backgroundColor={colors.colorPrimary} />
                </View>

            </View>

        )


    }

    const setRadioSelection = (option) => {
        dispatch({
            type: SET_RADIO_SELECTED,
            payload: option
        })
    }
    const { leftAddSeat, rightAddSeat, amountLabel } = styles
    return (

        <BaseView statusBarColor={colors.colorPrimary} removePadding>

            <MainHeader
                onSettingsPress={() => { navigation.navigate(routes.SETTINGS_SCREEN, { email: myUser.email }) }}
                onClose={() => { setOpenSearch({ from: true, open: false }) }}
                showX={openSearch.open === true}
                title={openSearch.open === true ? "Αναζήτηση" : "Δημιουργία Post"}
                onLogout={() => {
                    //  navigation.removeListener('beforeRemove')
                    resetValues(() => {

                        navigation.popToTop();
                        navigation.goBack();
                    })

                }}
            />
            <KeyboardAwareScrollView ref={scrollRef} style={{}}>
                <View>
                    <View style={{ paddingHorizontal: 16, marginTop: 15 }}>

                        <SelectLocationComponent
                            titleStart={'Αφετηρία προορισμού'}
                            titleEnd={'Τελικός προορισμός'}
                            startingPointPress={() => { setOpenSearch({ from: true, open: true }) }}
                            endPointPress={() => { setOpenSearch({ from: false, open: true }) }} />
                        <Spacer height={20} />


                        {renderStops()}

                        <Spacer height={10} />
                        <View style={{ width: '100%', backgroundColor: colors.CoolGray1, height: 1 }} />

                        {renderSeats()}
                        <View style={{ width: '100%', backgroundColor: colors.CoolGray1, height: 1, marginVertical: 10 }} />

                        {renderCost()}
                    </View>

                    <Spacer height={15} />
                </View>

                <CustomRadioButton

                    selectedOption={(option) => {
                        setRadioSelection(option)
                        setIsPickerVisible(true)
                    }} />

                <CommentInputComponent
                    onFocus={() => {
                        setTimeout(() => {
                            scrollRef.current.scrollToEnd({ animated: true })
                        }, 400);
                    }}
                    removeNote={true}
                    extraStyle={{ marginTop: 10 }}
                    onChangeText={(val) => setComment(val)} />
                <Spacer height={16} />


                <RoundButton
                    containerStyle={{ marginHorizontal: 16 }}
                    text={constVar.submit}
                    backgroundColor={colors.colorPrimary}
                    onPress={() => { }}
                />
                <Spacer height={70} />
            </KeyboardAwareScrollView>

            {openSearch.open &&
                <SearchLocationComponent from={openSearch.from} />
            }

            <CalendarPickerModal

                isVisible={isPickerVisible}
                closeAction={() => {
                    setIsPickerVisible(false);
                }}
                buttonPress={(index) => {

                    if (index === 1) {
                        setIsPickerVisible(false);
                        return
                    }
                    setIsPickerVisible(false);

                }}

            />

        </BaseView >

    );

}

export default CreatePostScreen

const styles = StyleSheet.create({
    amountLabel: {
        height: 45,
        width: 'auto',
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: colors.CoolGray1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    leftAddSeat: {
        height: 45,
        width: 40,
        backgroundColor: colors.CoolGray2,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    rightAddSeat: {
        height: 45,
        width: 40,
        backgroundColor: colors.CoolGray2,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
    timer: {
        fontSize: 17,
        fontWeight: '900',
        textAlign: 'center'
    },
    timerContainer: {
        backgroundColor: 'white',
        height: 'auto', width: '100%',
        borderRadius: 23
    },
    header: {
        fontSize: 23,
        alignSelf: 'center',
        marginStart: 14,
        color: 'black',
        fontWeight: 'bold'
    },
    wrongPass: {
        fontSize: 13, fontWeight: '900', color: 'red'
    },
    topContainer: {
        flexDirection: 'row',
        marginTop: 16
    },
    container: {
        padding: 16,
        flexGrow: 1
    },
    input: {
        height: 40,
        marginBottom: 12,
        paddingVertical: 12,
        borderBottomWidth: 1
    },
    absolute: {
        position: 'absolute',
        left: 16,
        bottom: 0,
        top: 0
    },
    box: {
        width: 55,
        alignSelf: 'center',

        height: 55,
        backgroundColor: 'white',
        borderRadius: 8,
        marginRight: 8,
        color: 'black'
    }
});
