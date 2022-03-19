import React, { useState, useEffect, useRef, useCallback } from 'react';

import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Image, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIconComponent } from '../../components/CloseIconComponent';
import { BaseView } from '../../layout/BaseView';
import { colors } from '../../utils/Colors';
import { CustomInfoLayout } from '../../utils/CustomInfoLayout';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { PictureComponent } from '../../components/PictureComponent';
import { routes } from '../../navigation/RouteNames';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
import { resetValues } from '../../services/MainServices';
import { usePreventGoBack } from '../../customHooks/usePreventGoBack';
import { useFocusEffect } from '@react-navigation/native';
const SettingsScreen = ({ navigation, route }) => {
    var _ = require('lodash');
    let initalData = { email: '', facebook: '', instagram: '', carBrand: 'ΟΛΑ', carDate: '', fullName: '', phone: '', age: '', gender: 'man', image: '', hasInterested: false, hasReviews: false, hasPosts: false, count: 0, average: null, interestedForYourPosts: false }
    const [data, setData] = useState(initalData)
    const [isLoading, setIsLoading] = React.useState(false)
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [infoMessage, setInfoMessage] = useState({ info: '', success: false });
    const [rating, setCurrentRating] = useState(null);

    const [isRatingDialogOpened, setRatingDialogOpened] = useState(false);
    const [userViewRate, setUserViewRate] = useState(true);
    const [headerVisible, setHeaderVisible] = useState(false);
    const [initialReviews, setInitialReviews] = useState();
    const [openTabs, setOpenTabs] = useState(false)

    const [openRatings, setOpenRatings] = useState(false)
    const [openMyPosts, setOpenMyPosts] = useState(false)
    const [openPostsInterested, setOpenPostsInterested] = useState(false)
    const [openPostsInterestedInMe, setOpenPostsInterestedInMe] = useState(false)
    const [editProfile, setEditProfile] = useState(false)
    const [singleFile, setSingleFile] = useState(null);
    const [isImageModalVisible, setImageModalVisible] = useState(false)
    const dispatch = useDispatch()

    const myUser = useSelector(state => state.authReducer.user)
    usePreventGoBack(goBack)

    const scrollRef = useRef();

    const goBack = () => {
        navigation.goBack()
    }
    useFocusEffect(useCallback(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    }, []));

    const handleBackButtonClick = async () => {
        navigation.goBack()
        return true;
    }


    const goToProfile = () => {
        navigation.navigate(routes.PROFILE_STACK, { screen: routes.PROFILE_SCREEN, params: { email: myUser.email } })
    }

    const goToChangePass = () => {
        navigation.navigate(routes.RESTORE_PASSWORD_SCREEN, { email: myUser.email, isRestore: false })
    }

    const goToContact = () => {
        navigation.navigate(routes.CONTACT_FORM_SCREEN)
    }

    const goToFiltersScreen = () => {
        navigation.navigate(routes.FILTERS_SCREEN)
    }

    const onLogout = () => {
        resetValues(() => {
            navigation.navigate(routes.AUTHSTACK, { screen: routes.LOGIN_SCREEN })
        })
    }
    const retrieveImage = async () => {
        const path = `${RNFetchBlob.fs.dirs.DCIMDir}/${myUser.email}.png`;
        try {
            const data = await RNFetchBlob.fs.readFile(path, 'base64');
            setSingleFile(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        retrieveImage()
    }, [])

    const { tabsStyle, titleStyle } = styles
    return (

        <BaseView statusBarColor={colors.colorPrimary}  >
            <CustomInfoLayout
                isVisible={showInfoModal}
                title={infoMessage.info}
                icon={!infoMessage.success ? 'x-circle' : 'check-circle'}
                success={infoMessage.success}
            />

            <Image
                style={{ width: 200, height: 200, alignSelf: 'center', marginTop: -30 }}
                source={require('../../assets/images/logo_transparent.png')}
            />

            <View style={{ position: 'absolute', marginTop: 10, marginStart: 10, justifyContent: 'space-around' }}>
                <CloseIconComponent onPress={goBack} />
            </View>
            <View style={{ paddingHorizontal: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <PictureComponent
                        isLocal={true}
                        singleFile={singleFile}
                        imageSize={"small"} />
                    <Text style={{ marginStart: 16, fontSize: 18, color: '#2175D3' }}>{myUser.fullName.toUpperCase()}</Text>
                </View>
                <View style={{ backgroundColor: colors.CoolGray1, height: 1, width: '100%', marginVertical: 20 }} />

                <TouchableOpacity onPress={goToProfile} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Fontisto style={{ alignSelf: 'center' }} name="person" size={27} color={'#2175D3'} />
                    <Text style={titleStyle}>Προβολή προφίλ</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={goToChangePass} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 29, marginStart: -4 }}>
                    <Entypo style={{ alignSelf: 'flex-start' }} name="lock" size={27} color={'#2175D3'} />
                    <Text style={titleStyle}>Αλλαγή κωδικού</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={goToFiltersScreen} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 29, marginStart: -4 }}>
                    <Icon name="filter" size={27} color={'#2175D3'} />
                    <Text style={titleStyle}>Φίλτρα</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToContact} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 29, marginStart: -4 }}>
                    <Entypo style={{ alignSelf: 'flex-start' }} name="message" size={27} color={'#2175D3'} />
                    <Text style={titleStyle}>Φόρμα επικοινωνίας</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 29, marginStart: -4 }}>
                    <AntDesign style={{ alignSelf: 'flex-start' }} name="exception1" size={27} color={'#2175D3'} />
                    <Text style={titleStyle}>'Οροι και Προϋποθέσεις</Text>
                </TouchableOpacity>

                <View style={{ backgroundColor: colors.CoolGray1, height: 1, width: '100%', marginTop: 20 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 13, color: '#595959', opacity: 0.6 }}>App version: 1.0.1</Text>
                    <TouchableOpacity onPress={onLogout} style={{ flexDirection: 'row', marginTop: 1 }}>
                        <AntDesign name="logout" color='#595959' size={13} style={{ alignSelf: 'center', marginEnd: 5 }} />
                        <Text style={{ fontSize: 13, color: '#595959', opacity: 0.6 }}>Έξοδος</Text>
                    </TouchableOpacity>
                </View>


            </View>







        </BaseView >

    );

}

export default SettingsScreen

const styles = StyleSheet.create({
    titleStyle: {
        marginStart: 16,
        fontSize: 16,
        color: '#595959',
        opacity: 0.6
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
    tabsStyle: {
        right: 0,
        left: 0,
        bottom: 0,
        marginHorizontal: 10,
        height: '100%'
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

    }
});
