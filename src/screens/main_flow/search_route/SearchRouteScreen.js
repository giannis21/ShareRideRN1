import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { BaseView } from '../../../layout/BaseView';
import { routes } from '../../../navigation/RouteNames';
import { getPlaceInfo, resetValues, searchForPosts } from '../../../services/MainServices';
import { colors } from '../../../utils/Colors';
import { Loader } from '../../../utils/Loader';
import { MainHeader } from '../../../utils/MainHeader';
import { filterKeys, getValue, keyNames } from '../../../utils/Storage';
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
import moment from 'moment';

const SearchRouteScreen = ({ navigation, route }) => {
    var _ = require('lodash');
    const [isLoading, setIsLoading] = useState(false)
    const [openSearch, setOpenSearch] = useState({ from: true, open: false })
    const [openSearchedPost, setOpenSearchedPosts] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [infoMessage, setInfoMessage] = useState({ info: '', success: false });
    const [total_pages, setTotalPages] = useState(1);

    const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState(1);
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
    const searchPosts = async () => {

        if (post.searchStartplace === '' || post.searchEndplace === '') {
            setInfoMessage({ info: "Συμπλήρωσε και τα δύο πεδία πρώτα!", success: false })
            showCustomLayout()
            return
        }

        let sendObj = {
            data: {
                email: myUser.email,
                startplace: post.searchStartplace,
                startcoord: post.searchStartcoord,
                endplace: post.searchEndplace,
                endcoord: post.searchEndcoord,
                startdate: '2022-03-09',// await getStartDate(),
                enddate: '2024-03-19', //await getEndDate(),
                page: 1,
                cost: await getValue(filterKeys.maxCost) ?? '100',
                age: await getStartAge(),
                age_end: await getEndAge(),
                car: await getValue(filterKeys.carMark) ?? null,
                cardate: await getValue(filterKeys.carAge) ?? null,
                gender: await getGender(),
                withReturn: await hasReturnDate(),
                petAllowed: await getValue(filterKeys.allowPet) ? true : null,
                returnStartDate: await getReturnStartDate(),
                returnEndDate: await getReturnEndDate()
            }
        }
        console.log(sendObj)
        searchForPosts({
            sendObj,
            successCallback: ((data) => {
                setOpenSearchedPosts(true)

                setIsLoading(false)
                setDataSource([...dataSource, ...data.body.postUser]);
                setTotalPages(data.totalPages)
                setOffset(offset + 1)
            }),
            errorCallback: ((errorMessage) => {
                setInfoMessage({ info: errorMessage, success: false })
                showCustomLayout()
            })
        })

    }

    const getGender = async () => {
        let gender = await getValue(filterKeys.showMe)

        if (gender) {
            switch (gender) {
                case 'όλους': return null
                case 'άνδρες': return 'male'
                default: return 'female'
            }
        }

        return null

    }
    const getStartAge = async () => {
        let ageRange = await getValue(filterKeys.ageRange)
        if (ageRange) {
            return ageRange.split('-')[0]
        }
        return null
    }

    const getEndAge = async () => {
        let ageRange = await getValue(filterKeys.ageRange)
        if (ageRange) {
            return parseInt(ageRange.split('-')[1])
        }
        return null
    }

    const hasReturnDate = async () => {

        let returnStartDate = await getValue(filterKeys.returnStartDate)
        if (returnStartDate && returnStartDate !== constVar.returnStartDate) {
            return true
        }
        return null

    }
    const getReturnStartDate = async () => {
        let returnStartDate = await getValue(filterKeys.returnStartDate)
        if (returnStartDate && returnStartDate !== constVar.returnStartDate) {
            return moment(returnStartDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }
        return null
    }
    const getReturnEndDate = async () => {
        let returnEndDate = await getValue(filterKeys.returnEndDate)
        if (returnEndDate && returnEndDate !== constVar.returnEndDate) {
            return moment(returnEndDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }
        return null
    }
    const getStartDate = async () => {
        let startDate = await getValue(filterKeys.startDate)
        if (startDate && startDate !== constVar.initialDate) {
            return moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }
        return null
    }

    const getEndDate = async () => {
        let endDate = await getValue(filterKeys.endDate)
        if (endDate && endDate !== constVar.endDate) {
            return moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }
        return null
    }
    function getType(isStartPoint) {
        return isStartPoint ? ADD_SEARCH_START_POINT : ADD_SEARCH_END_POINT
    }

    let resetArray = () => {
        setDataSource([]);
        setOpenSearchedPosts(false)
    }
    return (

        <BaseView statusBarColor={colors.colorPrimary} removePadding>
            <Loader isLoading={isLoading} />
            <MainHeader
                onClose={() => { openSearchedPost ? resetArray() : setOpenSearch({ from: true, open: false }) }}
                title={"Αναζήτηση διαδρομής"}
                showX={openSearch.open === true || openSearchedPost === true}
                onSettingsPress={() => {
                    navigation.navigate(routes.SETTINGS_SCREEN, { email: myUser.email })
                }}
                onLogout={() => {
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
            {openSearchedPost && !_.isEmpty(dataSource) &&
                <SearchedPostsComponent data={dataSource} offset={offset} total_pages={total_pages}
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
