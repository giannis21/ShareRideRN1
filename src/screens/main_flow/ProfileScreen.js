import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Image, TouchableOpacity, Dimensions, BackHandler, PermissionsAndroid } from 'react-native';
import { BaseView } from '../../layout/BaseView';
import { Spacer } from '../../layout/Spacer';
import { colors } from '../../utils/Colors';
import { Loader } from '../../utils/Loader';
import { MainHeader } from '../../utils/MainHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StarsRating } from '../../utils/StarsRating';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PictureComponent } from '../../components/PictureComponent';
import { getValue, keyNames } from '../../utils/Storage';
import { RatingDialog } from '../../utils/RatingDialog';
import { getInterestedInMe, getUsersToRate, rateUser, searchUser, updateProfile } from '../../services/MainServices';
import { CustomInfoLayout } from '../../utils/CustomInfoLayout';
import { BASE_URL } from '../../constants/Constants';
import { constVar } from '../../utils/constStr';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { CloseIconComponent } from '../../components/CloseIconComponent';
import { Animated, Easing } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { RoundButton } from '../../Buttons/RoundButton';
import { ADD_AVERAGE, OPEN_HOC_MODAL, SET_PROFILE_PHOTO } from '../../actions/types';
import { TextInput } from 'react-native-gesture-handler';
import { carBrands, newCarBrands, onLaunchCamera, onLaunchGallery, range } from '../../utils/Functions';
import { OpenImageModal } from '../../utils/OpenImageModal';
import { routes } from '../../navigation/RouteNames';
import { DATA_USER_TYPE, regex } from '../../utils/Regex';
import { DataSlotPickerModal } from '../../utils/DataSlotPickerModal';
import { HorizontalLine } from '../../components/HorizontalLine';
import { ViewRow } from '../../components/HOCS/ViewRow';
import { CustomText } from '../../components/CustomText';
import RNFetchBlob from 'rn-fetch-blob';
import { request, PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import { CustomIcon } from '../../components/CustomIcon'
import { isEmailContainedInUsersRates, isReviewToEdit } from '../../customSelectors/GeneralSelectors';
const ProfileScreen = ({ navigation, route }) => {
    var _ = require('lodash');
    const myUser = useSelector(state => state.authReducer.user)
    let emailContainedInUsersRates = useSelector(isEmailContainedInUsersRates(route?.params?.email))

    // i am checking if the current profile belongs to users to rate. If so, checking toEdit field 
    //in order to send to BE
    let editReview = useSelector(isReviewToEdit(route?.params?.email))

    let initalData = { email: '', facebook: '', initialFacebook: '', instagram: '', initialInstagram: '', carBrand: 'ΟΛΑ', initialCarBrand: 'ΟΛΑ', carDate: '', initialCarDate: '', fullName: '', phone: '', initialPhone: '', age: '', initialAge: '', gender: 'man', image: '', hasInterested: false, hasReviews: false, hasPosts: false, count: 0, average: null, interestedForYourPosts: false, hasRequests: false }
    const [data, setData] = useState(initalData)
    const [isLoading, setIsLoading] = React.useState(false)
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [infoMessage, setInfoMessage] = useState({ info: '', success: false });
    const [rating, setCurrentRating] = useState(null);

    const [isRatingDialogOpened, setRatingDialogOpened] = useState(false);
    const [dataSlotPickerVisible, setDataSlotPickerVisible] = useState(false);
    const [dataSlotPickerTitle, setDataSlotPickerTitle] = useState(constVar.selectAge);
    const [userViewRate, setUserViewRate] = useState(true);
    const [headerVisible, setHeaderVisible] = useState(false);
    const { height, width } = Dimensions.get("window");

    const [editProfile, setEditProfile] = useState(false)
    const [singleFile, setSingleFile] = useState(null);
    const [isImageModalVisible, setImageModalVisible] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [pickerData, setPickerData] = useState([])
    const dispatch = useDispatch()



    const scrollRef = useRef();

    const Tab = createMaterialTopTabNavigator();

    const onTextsChanged = (val, icon) => {
        switch (icon) {
            case 'phone': {
                setData({ ...data, phone: val })
                break
            }
            case 'age': {
                setData({ ...data, age: val })
                break
            }
            case 'facebook': {
                setData({ ...data, facebook: val })
                break
            }
            case 'instagram': {
                setData({ ...data, instagram: val })
                break
            }
        }
    }

    function ActionItem({ screenRoute, title }) {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(screenRoute, { email: data.email })
                }}
                style={[styles.infoContainer, { flexDirection: 'row', alignItems: 'center', marginTop: 10 }]}>

                <Text style={styles.rates} >{title}</Text>
                <MaterialIcons name={"arrow-forward-ios"} size={15} style={{ marginStart: 10 }} color={'white'} />

            </TouchableOpacity>
        )
    }
    function userInfo(icon, title, subTitle, editable, keyboardType) {
        return (
            <ViewRow style={{ marginHorizontal: 16, marginTop: 28 }}>
                <MaterialCommunityIcons name={icon} size={32} color={colors.colorPrimary} />
                <Spacer width={16} />
                <View>
                    <Text style={{ marginVertical: 6, fontSize: 13, fontWeight: 'bold', color: getColorOrTitle(icon, DATA_USER_TYPE.TITLE_COLOR, title), opacity: 0.6 }}>{getColorOrTitle(icon, DATA_USER_TYPE.TITLE, title)}</Text>
                    <TouchableOpacity activeOpacity={1} onPress={() => { editProfile && icon === 'account-details' && openPicker(1) }} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
                        <TextInput
                            maxLength={icon === 'age' ? 2 : icon === 'phone' ? 10 : null}
                            onChangeText={(val) => onTextsChanged(val, icon)}
                            keyboardType={keyboardType ? 'numeric' : 'default'}
                            editable={editable}
                            style={{ fontSize: 15, fontWeight: 'bold', color: 'black', width: '100%' }}>{subTitle}</TextInput>

                        {editProfile && icon === 'account-details' &&
                            <View style={{ position: 'absolute', right: '23%' }}>
                                <AntDesign name={'caretdown'} size={16} color={colors.colorPrimary} />

                            </View>
                        }
                    </TouchableOpacity>

                    {editProfile && icon !== 'email' &&
                        < View style={{ backgroundColor: getColorOrTitle(icon, DATA_USER_TYPE.LINE_COLOR, title), height: 1, width: '80%' }} />
                    }
                </View>
            </ViewRow>
        )
    }

    const getColorOrTitle = (icon, type, title) => {
        switch (icon) {
            case 'phone': {
                switch (type) {
                    case DATA_USER_TYPE.LINE_COLOR:
                        return regex.phoneNumber.test(data.phone) ? colors.colorPrimary : 'red'
                    case DATA_USER_TYPE.TITLE_COLOR:
                        return regex.phoneNumber.test(data.phone) ? colors.title_grey : 'red'
                    case DATA_USER_TYPE.TITLE:
                        return regex.phoneNumber.test(data.phone) ? title : constVar.phoneIncorrect
                }
            }
            case 'facebook': {
                switch (type) {
                    case DATA_USER_TYPE.LINE_COLOR:
                        return data.facebook.length >= 3 || data.facebook === '-' ? colors.colorPrimary : 'red'
                    case DATA_USER_TYPE.TITLE_COLOR:
                        return data.facebook.length >= 3 || data.facebook === '-' ? colors.title_grey : 'red'
                    case DATA_USER_TYPE.TITLE:
                        return data.facebook.length >= 3 || data.facebook === '-' ? title : constVar.instagramIncorrect
                }
            }
            case 'instagram': {
                switch (type) {
                    case DATA_USER_TYPE.LINE_COLOR:
                        return regex.instagram.test(data.instagram) || data.instagram === '-' ? colors.colorPrimary : 'red'
                    case DATA_USER_TYPE.TITLE_COLOR:
                        return regex.instagram.test(data.instagram) || data.instagram === '-' ? colors.title_grey : 'red'
                    case DATA_USER_TYPE.TITLE:
                        return regex.instagram.test(data.instagram) || data.instagram === '-' ? title : constVar.instagramIncorrect
                }
            }
            default: {
                switch (type) {
                    case DATA_USER_TYPE.LINE_COLOR:
                        return colors.colorPrimary
                    case DATA_USER_TYPE.TITLE_COLOR:
                        return colors.title_grey
                    case DATA_USER_TYPE.TITLE:
                        return title
                }
            }
        }
        return title
    }


    function renderTopContainer() {
        return (
            <View style={{ position: 'absolute', height: 'auto', width: '100%', backgroundColor: 'white' }}>
                <Spacer height={5} />
                <View style={{ position: 'absolute', marginTop: 10, marginStart: 10 }}>
                    <CloseIconComponent onPress={() => navigation.goBack()} />
                </View>

                <ViewRow style={{ alignItems: 'center', justifyContent: 'center' }}>

                    <PictureComponent
                        singleFile={singleFile}
                        url={singleFile ? null : data.image}
                        imageSize={"medium"} />
                    <Spacer width={5} />
                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{data.fullName}</Text>
                        {data.count > 0 &&
                            <StarsRating rating={rating} size="small" />
                        }

                    </View>

                </ViewRow>

                <Spacer height={5} />
                <View style={{ width: '100%', backgroundColor: colors.CoolGray1.toString(), height: 1, justifyContent: 'flex-end' }} />
                {
                    route.params?.email === myUser.email &&
                    <TouchableOpacity activeOpacity={1} onPress={resetToInitialState} style={{ position: 'absolute', justifyContent: 'flex-end', alignItems: 'center', right: 9, top: 16 }}>
                        {!editProfile ?
                            <CustomIcon type={'Entypo'} name="edit" size={24} style={{ alignSelf: 'center' }} />
                            :
                            <CustomIcon name="close" color='black' size={30} style={{ alignSelf: 'center' }} />
                        }
                    </TouchableOpacity>
                }



            </View>
        )
    }
    function CarColumn({ column }) {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => { editProfile && openPicker(column === 1 ? 2 : 3) }} style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#595959', opacity: 0.6, textAlign: 'center', marginBottom: 5 }}>{column === 1 ? constVar.carBrand : constVar.carAgeTitle}</Text>
                <ViewRow style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput editable={false} style={{ fontSize: 13, fontWeight: 'bold', color: 'black', width: '80%', textAlign: 'center' }}>{column === 1 ? data.carBrand : data.carDate}</TextInput>
                    {editProfile && <AntDesign name={'caretdown'} size={16} color={colors.colorPrimary} />}
                </ViewRow>

                {editProfile &&
                    <HorizontalLine containerStyle={{ backgroundColor: colors.colorPrimary }} />
                }
            </TouchableOpacity>
        )
    }
    function CarDetails({ }) {
        return (
            <ViewRow style={{ marginHorizontal: 16 }}>

                <CarColumn column={1} />
                <CarColumn column={2} />

            </ViewRow>
        )
    }
    const resetToInitialState = () => {
        setEditProfile(!editProfile)
        setData({
            ...data,
            phone: data.initialPhone,
            facebook: data.initialFacebook,
            instagram: data.initialInstagram,
            age: data.initialAge,
            carBrand: data.initialCarBrand,
            carDate: data.initialCarDate

        })
    }

    const onActionSheet = (index) => {
        switch (index) {
            case 0:
                return onLaunchCamera((data) => {
                    setSingleFile(data)
                });
            case 1:
                return onLaunchGallery((data) => {
                    setSingleFile(data)
                });
            case 2: {
                setSingleFile(null)
                return null

            }
        }
    };

    const setUserData = async (data) => {
        if (route.params?.email === myUser.email || data.reviewAble === false) //this is my profile
            setUserViewRate(false)

        if (!_.isNull(data.average))
            setCurrentRating(data.average.toString())
        else
            setCurrentRating("0")

        setData({
            email: data?.user?.email,
            phone: data.user.mobile ?? '-',
            initialPhone: data.user.mobile ?? '-',
            age: data.user.age,
            initialAge: data.user.age,
            facebook: data.user.facebook ?? '-',
            initialFacebook: data.user.facebook ?? '-',
            instagram: data.user.instagram ?? '-',
            initialInstagram: data.user.instagram ?? '-',
            carBrand: data.user.car ?? '-',
            initialCarBrand: data.user.car ?? '-',
            carDate: data.user.cardate ?? '-',
            initialCarDate: data.user.cardate ?? '-',
            fullName: data.user.fullname ?? '-',
            image: BASE_URL + data.image ?? '-',
            hasInterested: data.hasInterested,
            hasReviews: data.count > 0,
            hasPosts: data.hasPosts,
            count: data.count,
            interestedForYourPosts: data.interestedForYourPosts,
            hasRequests: data.hasRequests
        })
        if (emailContainedInUsersRates) {
            setTimeout(() => {
                setRatingDialogOpened(true)
            }, 700);
        }


        dispatch({ type: ADD_AVERAGE, payload: { average: data.average, count: data.count } })
    }

    useEffect(() => {
        searchUser({
            email: route.params.email,
            successCallback: searchUserSuccessCallback,
            errorCallback: searchUserErrorCallback
        })

    }, [])

    const searchUserSuccessCallback = async (data) => {
        setUserData(data)
    }
    const searchUserErrorCallback = () => {

    }
    const getInitialValue = () => {
        if (dataSlotPickerTitle === constVar.selectAge) {
            return data.age
        } else if (dataSlotPickerTitle === constVar.selectCar) {
            return data.carBrand
        } else {
            return data.carDate
        }
    }

    const setDatePickerValues = (selectedValue) => {
        if (dataSlotPickerTitle === constVar.selectAge) {
            setData({ ...data, age: selectedValue })
        } else if (dataSlotPickerTitle === constVar.selectCar) {
            setData({ ...data, carBrand: selectedValue })
        } else {
            setData({ ...data, carDate: selectedValue })
        }
    }

    const rate = (rating, text) => {
        rateUser({
            email: data.email,
            emailreviewer: myUser.email,
            rating: rating,
            text: text,
            //editReview : editReview? true: undefined,  
            successCallback: ratingSuccessCallback,
            errorCallback: ratingErrorCallback
        })
    }
    const ratingSuccessCallback = (message, average) => {

        setUserViewRate(false)
        setInfoMessage({ info: message, success: true })
        showCustomLayout(() => {
            setRatingDialogOpened(false)
            if (!_.isNull(average))
                setCurrentRating(average.toString())
        })
        getUsersToRateIfNeeded()
    }

    const getUsersToRateIfNeeded = async () => {
        if (emailContainedInUsersRates)
            dispatch(getUsersToRate())
    }

    const openPicker = (option) => {

        if (option === 1) {
            setPickerData(range(18, 70))
            setDataSlotPickerTitle(constVar.selectAge)
            setDataSlotPickerVisible(true)
        } else if (option === 2) {
            setPickerData(_.tail(newCarBrands))
            setDataSlotPickerTitle(constVar.selectCar)
            setDataSlotPickerVisible(true)
        } else {
            setPickerData(range(2000, parseInt(moment().format('YYYY'))))
            setDataSlotPickerTitle(constVar.selectCarAge)
            setDataSlotPickerVisible(true)
        }
    }
    const updateProfile1 = () => {

        let sendObj = {
            data: {
                mobile: data.phone,
                age: data.age,
                facebook: data.facebook,
                instagram: data.instagram,
                car: data.carBrand,
                cardate: data.carDate,
                photo: singleFile ? singleFile.data : undefined
            }
        }

        updateProfile({
            sendObj,
            successCallback: ((message) => {
                setEditProfile(false);
                singleFile && storeImageLocally()
                setInfoMessage({ info: message, success: true })
                showCustomLayout()
            }),
            errorCallback: ((errorMessage) => {
                setEditProfile(false)
                setInfoMessage({ info: errorMessage, success: false })
                showCustomLayout()
            })
        })

    }

    const storeImageLocally = async () => {



        check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
            .then((result) => {
                switch (result) {
                    case PermissionsAndroid.RESULTS.GRANTED:
                        const path = `${RNFetchBlob.fs.dirs.DCIMDir}/images/${myUser.email}.png`;
                        RNFetchBlob.fs.writeFile(path, singleFile.data, 'base64')
                        dispatch({ type: SET_PROFILE_PHOTO, payload: singleFile.data })

                        break;
                    default:
                        break;
                }
            })
            .catch((error) => {
                console.log("sadsadsadsdsadasdasdsa", error)
            });



    }


    const ratingErrorCallback = (message) => {
        setInfoMessage({ info: message, success: false })
        showCustomLayout(() => {
            setRatingDialogOpened(false)
        })
    }
    const showCustomLayout = (callback) => {
        setShowInfoModal(true)

        setTimeout(function () {
            setShowInfoModal(false)
            if (callback)
                callback()
        }, 2500);
    }
    const handleScroll = (event) => {
        if (event.nativeEvent.contentOffset.y === 0) {
            setHeaderVisible(false)
            return
        }

        if (headerVisible === false)
            setHeaderVisible(true)


    }



    const showLoader = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    const addPickerData = () => {


    }
    const validFields = () => {
        return (((data.facebook.length >= 3 || data.facebook === '-')
            && (regex.instagram.test(data.instagram)
                || data.instagram === '-')
            && regex.phoneNumber.test(data.phone))
            && (data.phone !== data.initialPhone
                || data.age !== data.initialAge
                || data.facebook !== data.initialFacebook
                || data.instagram !== data.initialInstagram
                || data.carBrand !== data.initialCarBrand
                || data.carDate !== data.initialCarDate
                || singleFile?.data
            ))
    }
    function EditIcon({ }) {

        return (
            <TouchableOpacity
                style={{ justifyContent: 'flex-end', alignItems: 'center', right: 9, top: 16, zIndex: 1, position: 'absolute' }}
                activeOpacity={1}
                onPress={resetToInitialState}>

                {!editProfile ? <Entypo name="edit" color='black' size={24} style={{ alignSelf: 'center' }} /> :
                    <EvilIcons name="close" color='black' size={30} style={{ alignSelf: 'center' }} />}
            </TouchableOpacity>
        )
    }
    const { actionsContainer, baseView2, baseView1, topInfoContainer, ratesAmount, rateNowContainer } = styles
    return (

        <BaseView statusBarColor={colors.colorPrimary} containerStyle={isRatingDialogOpened ? baseView2 : baseView1} >
            <CustomInfoLayout
                isVisible={showInfoModal}
                title={infoMessage.info}
                icon={!infoMessage.success ? 'x-circle' : 'check-circle'}
                success={infoMessage.success}
            />

            <OpenImageModal
                isVisible={isImageModalVisible}
                closeAction={() => {
                    setImageModalVisible(false);
                }}
                buttonPress={(index) => {
                    setImageModalVisible(false);
                    onActionSheet(index)
                }}

            />

            <CloseIconComponent onPress={() => { navigation.goBack() }} containerStyle={{ position: 'absolute', zIndex: 1, marginTop: 10, marginStart: 10 }} />

            {myUser.email === route.params.email && <EditIcon />}

            {
                data.email !== '' &&

                <KeyboardAwareScrollView height={400} ref={scrollRef} onScroll={handleScroll}>


                    <Loader isLoading={isLoading} />
                    <View style={topInfoContainer}>
                        <PictureComponent
                            singleFile={singleFile}
                            onPress={() => { editProfile && setImageModalVisible(true) }}
                            openCamera={editProfile ? true : false}
                            url={singleFile ? null : data.image}
                            imageSize={"big"} />



                        <CustomText type={'title1'} text={data.fullName} textStyle={{ marginTop: 10, marginBottom: 20 }} />

                        {data.count > 0 &&
                            <StarsRating
                                rating={rating}
                                setRating={(rating) => setCurrentRating(rating)}
                            />
                        }

                        {data.count > 0 &&
                            <Text style={ratesAmount}>{data.count === 1 ? data.count + ` Ψήφος` : data.count + ` Ψήφοι`} </Text>
                        }

                        <Spacer height={20} />

                        {userViewRate &&
                            <Text onPress={() => setRatingDialogOpened(true)} style={rateNowContainer}>{constVar.rateNow}</Text>
                        }

                        <Spacer height={20} />
                        <CustomText type={'title1'} text={constVar.personalInfo} />
                        <Spacer height={10} />
                        <HorizontalLine />

                    </View>


                    {route.params?.email === myUser.email && userInfo('email', constVar.email, data.email, false)}

                    {userInfo('phone', constVar.mobile, data.phone, editProfile ? true : false, "numeric")}

                    {userInfo('account-details', constVar.age, data.age, false, "numeric")}

                    <CustomText
                        type={'title1'}
                        containerStyle={{ marginVertical: 10 }}
                        text={constVar.socialTitle}
                        textAlign={'center'} />

                    <HorizontalLine />

                    {userInfo('facebook', constVar.facebook, data.facebook, editProfile ? true : false)}

                    {userInfo('instagram', constVar.instagram, data.instagram, editProfile ? true : false)}
                    <Spacer height={28} />

                    <CustomText
                        type={'title1'}
                        text={constVar.car}
                        textAlign={'center'} />


                    <HorizontalLine containerStyle={{ marginTop: 10, marginBottom: 28 }} />

                    <CarDetails />

                    {(((data.hasInterested || data.hasPosts || data.hasReviews || data.interestedForYourPosts)
                        && (myUser.email === data.email))
                        || (myUser.email !== data.email && data.hasReviews))
                        && <View style={{ marginTop: 20, marginHorizontal: 16, padding: 3 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Δείτε επίσης:</Text>
                            <View style={actionsContainer}>
                                {data.hasReviews &&
                                    <ActionItem screenRoute={routes.RATINGS_PROFILE_SCREEN} title={'Αξιολογήσεις'} />
                                }

                                {data.hasPosts && myUser.email === data.email &&
                                    <ActionItem screenRoute={routes.MYPOSTS_PROFILE_SCREEN} title={'τα Post μου'} />
                                }

                                {data.hasInterested && myUser.email === data.email &&
                                    <ActionItem screenRoute={routes.POSTS_INTERESTED_PROFILE_SCREEN} title={'Post που ενδιαφέρομαι'} />
                                }

                                {data.interestedForYourPosts && myUser.email === data.email &&
                                    <ActionItem screenRoute={routes.POSTS_INTERESTED_IN_ME_PROFILE_SCREEN} title={'Ενδιαφερόμενοι'} />
                                }

                                {data.hasRequests && myUser.email === data.email &&
                                    <ActionItem screenRoute={routes.REQUESTS_PROFILE_SCREEN} title={'Αιτήματα για λήψη ειδοποιήσεων'} />
                                }
                            </View>
                        </View>
                    }

                    <Spacer height={20} />

                </KeyboardAwareScrollView>

            }

            <RatingDialog
                onSubmit={(rating, text) => rate(rating, text)}
                isVisible={isRatingDialogOpened}
                closeAction={() => {
                    setRatingDialogOpened(false)
                }} />


            {data.image !== '' && headerVisible && renderTopContainer()}

            {editProfile &&
                <RoundButton
                    disabled={!validFields()}
                    containerStyle={{ bottom: 10, marginHorizontal: 10 }}
                    text={'Ενημέρωση'}
                    onPress={updateProfile1}
                    backgroundColor={colors.colorPrimary} />
            }

            <DataSlotPickerModal
                data={pickerData}
                title={dataSlotPickerTitle}
                isVisible={dataSlotPickerVisible}
                onClose={() => {
                    setDataSlotPickerVisible(false);
                }}
                onConfirm={(selectedValue, secValue, thirdValue) => {
                    setDatePickerValues(selectedValue)
                    setDataSlotPickerVisible(false);
                }}
                initialValue1={getInitialValue()}
            />
        </BaseView >

    );

}

export default ProfileScreen

const styles = StyleSheet.create({
    topInfoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35
    },
    baseView1: {
        flex: 1,
        backgroundColor: 'white'
    },
    baseView2: {
        flex: 1,
        backgroundColor: 'black',
        opacity: 0.5
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
    ratesAmount: {
        fontSize: 13,
        backgroundColor: '#F0AD4E',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 5,
        width: 'auto',
        paddingHorizontal: 5,
        borderRadius: 6,
        paddingVertical: 1
    },
    tabsStyle: {
        right: 0,
        left: 0,
        bottom: 0,
        marginHorizontal: 10,
        height: '100%'
    },
    actionsContainer: {
        backgroundColor: colors.CoolGray2,
        marginTop: 8,
        borderRadius: 10,
        padding: 10
    },
    footerBtn: {

        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 8,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'baseline',
        backgroundColor: colors.colorPrimary,

    },
    infoContainer: {
        alignSelf: 'baseline',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 18,
        flexDirection: 'row',
        backgroundColor: colors.infoColor,

    },
    dot: {
        marginLeft: 10,
        width: 6,
        height: 6,
        borderRadius: 100 / 2,
        backgroundColor: 'black',
    },
    rates: {
        fontSize: 15,
        marginLeft: 10,

        color: "white",
        fontWeight: 'bold',

    },
    rateNowContainer: {
        padding: 3,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#F0AD4E',
        textAlign: 'center',
        width: '100%',
        color: 'white'
    }
});
