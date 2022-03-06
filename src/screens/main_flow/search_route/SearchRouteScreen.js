import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { BaseView } from '../../../layout/BaseView';
import { routes } from '../../../navigation/RouteNames';
import { getPlaceInfo, resetValues } from '../../../services/MainServices';
import { colors } from '../../../utils/Colors';
import { Loader } from '../../../utils/Loader';
import { MainHeader } from '../../../utils/MainHeader';
import { getValue, keyNames } from '../../../utils/Storage';
import { BackHandler } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CustomInput } from '../../../utils/CustomInput';
import { SearchLocationComponent } from '../../../components/SearchLocationComponent';
import { FiltersModal } from '../../../utils/FiltersModal';
import { constVar } from '../../../utils/constStr';
import { ADD_SEARCH_END_POINT, ADD_SEARCH_START_POINT, CLEAR_SEARCH_VALUES } from '../../../actions/types';
import { SelectLocationComponent } from '../../../components/SelectLocationComponent';
import { Spacer } from '../../../layout/Spacer';
import { RoundButton } from '../../../Buttons/RoundButton';
import { SearchedPostsComponent } from '../../../components/SearchedPostsComponent';
import { CustomInfoLayout } from '../../../utils/CustomInfoLayout';

const SearchRouteScreen = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [openSearch, setOpenSearch] = useState({ from: true, open: false })
    const [openSearchedPost, setOpenSearchedPosts] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [infoMessage, setInfoMessage] = useState({ info: '', success: false });
    let scaleValue = new Animated.Value(0); // declare an animated value
    const isFocused = useIsFocused()
    const cardScale = scaleValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [4, 1.1, 1.2]
    });

    const myUser = useSelector(state => state.authReducer.user)
    const post = useSelector(state => state.postReducer)

    const dispatch = useDispatch()

    const resetValues = () => {
        dispatch({ type: CLEAR_SEARCH_VALUES, payload: {} })
    }
    function handleBackButtonClick() {
        BackHandler.exitApp()
        return true;
    }

    const showFavorite = () => {
        if (post.searchStartplace !== '' && post.searchEndplace !== '')
            return true

        return false
    }
    useEffect(() => {

        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);
    const getPlace = (place_id, place, isStartPoint) => {

        getPlaceInfo({
            place_id,
            successCallback: ((coordinates) => {

                dispatch({
                    type: getType(isStartPoint),
                    payload: [place, coordinates]
                })

            }),
            errorCallback: (() => { })
        })
    }
    const showCustomLayout = (callback) => {
        setShowInfoModal(true)
        setTimeout(function () {
            setShowInfoModal(false)
            if (callback)
                callback()
        }, 2000);
    }
    const searchPosts = () => {
        //  setOpenSearchedPosts(true)
        if (post.searchStartplace === '' || post.searchEndplace === '') {
            setInfoMessage({ info: "Συμπλήρωσε και τα δύο πεδία πρώτα!", success: false })
            showCustomLayout()
            return
        }

        let send = {
            data: {
                email: myUser.email,
                startplace: post.searchStartplace,
                startcoord: post.searchStartcoord,
                endplace: post.searchEndplace,
                endcoord: post.searchEndcoord,
                startdate: "2021-10-05",
                enddate: "2022-12-19",
                page: 1,
                cost: 100,
                age: null,
                age_end: null,
                car: null,
                cardate: null,
                gender: null,
                withReturn: true,
                petAllowed: true,
                returnStartDate: "2022-12-19",
                returnEndDate: "2022-12-20"
            }
        }
    }

    function getType(isStartPoint) {
        return isStartPoint ? ADD_SEARCH_START_POINT : ADD_SEARCH_END_POINT
    }


    return (

        <BaseView statusBarColor={colors.colorPrimary} removePadding>
            <Loader isLoading={isLoading} />
            <MainHeader
                onClose={() => { openSearchedPost ? setOpenSearchedPosts(false) : setOpenSearch({ from: true, open: false }) }}
                title={"Αναζήτηση διαδρομής"}
                showX={openSearch.open === true || openSearchedPost === true}
                onSettingsPress={() => {
                    navigation.navigate(routes.SETTINGS_SCREEN, { email: myUser.email })
                }}
                onLogout={() => {
                    navigation.removeListener('beforeRemove')
                    resetValues(() => {
                        navigation.navigate(routes.AUTHSTACK, { screen: routes.LOGIN_SCREEN })
                    })

                }}
                onFilterPress={() => {
                    setIsModalVisible(true)
                }}

            />
            {openSearch.open &&
                <SearchLocationComponent
                    from={openSearch.from}
                    onPress={(place_id, place, isStartPoint) => {
                        getPlace(place_id, place, isStartPoint)
                        setOpenSearch({ from: true, open: false })

                    }} />
            }
            {openSearchedPost &&
                <SearchedPostsComponent
                />
            }
            <View style={{ paddingHorizontal: 16, marginTop: 15 }}>

                <SelectLocationComponent
                    onReset={resetValues}
                    titleStart={'Αφετηρία προορισμού'}
                    titleEnd={'Τελικός προορισμός'}
                    startingPointPress={() => { setOpenSearch({ from: true, open: true }) }}
                    endPointPress={() => { setOpenSearch({ from: false, open: true }) }} />

                <Spacer height={16} />
                <RoundButton
                    text={'Αναζήτηση'}
                    onPress={searchPosts}
                    backgroundColor={colors.colorPrimary} />
            </View>
            <CustomInfoLayout
                isVisible={showInfoModal}
                title={infoMessage.info}
                icon={!infoMessage.success ? 'x-circle' : 'check-circle'}
                success={infoMessage.success}
            />

            <FiltersModal
                isVisible={isModalVisible}
                description={constVar.changePassDescription}
                buttonText={constVar.go}
                closeAction={() => {
                    setIsModalVisible(false);
                }}
                buttonPress={() => { }}
                descrStyle={true}
                onChangeText={() => { }}
            />
        </BaseView>

    );

}

export default SearchRouteScreen

const styles = StyleSheet.create({
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
