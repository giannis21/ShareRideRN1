import React, { useState, useEffect, useRef } from 'react';

import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Image, TouchableOpacity, Dimensions } from 'react-native';
import { BaseView } from '../../layout/BaseView';
import { Spacer } from '../../layout/Spacer';
import { colors } from '../../utils/Colors';
import { Loader } from '../../utils/Loader';
import { MainHeader } from '../../utils/MainHeader';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StarsRating } from '../../utils/StarsRating';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PictureComponent } from '../../components/PictureComponent';
import { getValue, keyNames } from '../../utils/Storage';
import { RatingDialog } from '../../utils/RatingDialog';
import { getInterestedInMe, rateUser, searchUser } from '../../services/MainServices';
import { CustomInfoLayout } from '../../utils/CustomInfoLayout';
import { BASE_URL } from '../../constants/Constants';
import { constVar } from '../../utils/constStr';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RatingTabScreen from '../profile_tabs/RatingTabScreen';
import MyPostsTabScreen from '../profile_tabs/MyPostsTabScreen';
import { NavigationContainer } from '@react-navigation/native';
import PostsInterestedTabScreen from '../profile_tabs/PostsInterestedTabScreen';
import InterestedInMeScreen from '../profile_tabs/InterestedInMeScreen';
import { CloseIconComponent } from '../../components/CloseIconComponent';
import { Animated, Easing } from "react-native";
import { useSelector, useDispatch } from 'react-redux';

const ProfileScreen = ({ navigation, route }) => {
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
    const { height, width } = Dimensions.get("window");
    const [myEmail, setMyEmail] = useState('')
    const [myFullName, setMyFullname] = useState('')



    const user = useSelector(state => state.authReducer.user)

    useEffect(async () => {
        console.log("user", user)
        setMyEmail(user.email)
        setMyFullname(user.fullname)
    }, [])

    const scrollRef = useRef();

    const goBack = () => {
        navigation.goBack()
    }

    const Tab = createMaterialTopTabNavigator();

    function userInfo(icon, title, subTitle) {
        return (
            <View style={{ flexDirection: 'row', marginStart: 16 }}>
                <MaterialCommunityIcons name={icon} size={32} color={colors.colorPrimary} />
                <Spacer width={16} />
                <View>
                    <Spacer height={3} />
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#595959', opacity: 0.6 }}>{title}</Text>
                    <Spacer height={5} />
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>{subTitle}</Text>
                </View>
            </View>
        )
    }
    function renderTopContainer() {
        return (
            <View style={{ position: 'absolute', height: 'auto', width: '100%', backgroundColor: 'white' }}>
                <Spacer height={5} />
                <View style={{ position: 'absolute', marginTop: 5 }}>
                    <CloseIconComponent onPress={() => navigation.goBack()} />
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>

                    <PictureComponent url={data.image} imageSize={"medium"} />
                    <Spacer width={5} />
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{data.fullName}</Text>
                </View>

                <Spacer height={5} />
                <View style={{ width: '100%', backgroundColor: colors.CoolGray1.toString(), height: 1, justifyContent: 'flex-end' }} />

            </View>
        )
    }

    const setUserData = async (data) => {

        if (!_.isNull(data.average))
            setCurrentRating(data.average.toString())
        else
            setCurrentRating("0")

        setData({
            email: data?.user?.email,
            phone: data.user.mobile,
            age: data.user.age,
            facebook: data.user.facebook ?? '-',
            instagram: data.user.instagram ?? '-',
            carBrand: data.user.car ?? '-',
            carDate: data.user.cardate ?? '-',
            fullName: data.user.fullname ?? '-',
            image: BASE_URL + data.image ?? '-',
            hasInterested: data.hasInterested,
            hasReviews: data.count > 0,
            hasPosts: data.hasPosts,
            count: data.count,
            interestedForYourPosts: data.interestedForYourPosts
        })

    }

    useEffect(() => {
        searchUser({
            email: route.params.email,
            successCallback: searchUserSuccessCallback,
            errorCallback: searchUserErrorCallback
        })

    }, [])

    const searchUserSuccessCallback = async (data) => {
        if (route.params?.email === await getValue(keyNames.email) || data.reviewAble === false) //this is my profile
            setUserViewRate(false)

        setUserData(data)
    }
    const searchUserErrorCallback = () => {

    }

    const rate = (rating, text) => {


        rateUser({
            email: data.email,
            emailreviewer: myEmail,
            rating: rating,
            text: text,
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
        } else {
            if (headerVisible === false)
                setHeaderVisible(true)
        }

    }
    let style1 = { flex: 1, backgroundColor: 'white' }
    let style2 = { flex: 1, backgroundColor: 'black', opacity: 0.5 }

    return (

        <BaseView statusBarColor={colors.colorPrimary} containerStyle={isRatingDialogOpened ? style2 : style1} >
            <CustomInfoLayout
                isVisible={showInfoModal}
                title={infoMessage.info}
                icon={!infoMessage.success ? 'x-circle' : 'check-circle'}
                success={infoMessage.success}
            />
            <View style={{ position: 'absolute', marginTop: 5 }}>
                <CloseIconComponent onPress={() => openTabs ? setOpenTabs(false) : navigation.goBack()} />
            </View>

            {data.email !== '' &&

                <KeyboardAwareScrollView height={400} ref={scrollRef} onScroll={handleScroll}>


                    <Loader isLoading={isLoading} />

                    <Spacer height={35} />
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <PictureComponent url={data.image} imageSize={"big"} />


                        <Spacer height={10} />


                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{data.fullName}</Text>
                            <Spacer height={20} />

                            {data.count > 0 &&
                                <View>
                                    <StarsRating
                                        rating={rating}
                                        setRating={(rating) => setCurrentRating(rating)}
                                    />

                                </View>

                            }
                        </View>
                        {data.count > 0 &&
                            <Text style={{ fontSize: 13, backgroundColor: '#F0AD4E', fontWeight: 'bold', color: 'white', textAlign: 'center', marginTop: 5, width: 'auto', paddingHorizontal: 5, borderRadius: 6, paddingVertical: 1 }}>{data.count === 1 ? data.count + ` Ψήφος` : data.count + ` Ψήφοι`} </Text>
                        }



                        <Spacer height={20} />

                        {userViewRate &&
                            <TouchableWithoutFeedback onPress={() => setRatingDialogOpened(true)}>
                                <Text style={{ padding: 3, fontSize: 16, fontWeight: 'bold', backgroundColor: '#F0AD4E', textAlign: 'center', width: '100%', color: 'white' }}>{constVar.rateNow}</Text>
                            </TouchableWithoutFeedback>
                        }

                        <Spacer height={20} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{constVar.personalInfo}</Text>
                        <Spacer height={10} />
                        <View style={{ width: '100%', backgroundColor: colors.CoolGray1.toString(), height: 1 }} />



                    </View>

                    <Spacer height={28} />
                    {userInfo('email', constVar.email, data.email)}
                    <Spacer height={28} />
                    {userInfo('phone', constVar.mobile, data.phone)}
                    <Spacer height={28} />
                    {userInfo('phone', constVar.age, data.age)}
                    <Spacer height={28} />

                    <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>{constVar.socialTitle}</Text>
                    <Spacer height={10} />
                    <View style={{ width: '100%', backgroundColor: colors.CoolGray1.toString(), height: 1 }} />

                    <Spacer height={28} />

                    {userInfo('facebook', constVar.facebook, data.facebook)}
                    <Spacer height={28} />
                    {userInfo('instagram', constVar.instagram, data.instagram)}
                    <Spacer height={28} />

                    <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>{constVar.car}</Text>
                    <Spacer height={10} />
                    <View style={{ width: '100%', backgroundColor: colors.CoolGray1.toString(), height: 1 }} />
                    <Spacer height={28} />
                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ flex: 1 }}>
                            <Text style={{ padding: 3, fontSize: 15, fontWeight: 'bold', backgroundColor: colors.CoolGray2, color: '#595959', opacity: 0.6, textAlign: 'center', color: 'black' }}>{constVar.carBrand}</Text>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black', alignSelf: 'center' }}>{data.carBrand}</Text>

                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={{ padding: 3, fontSize: 15, fontWeight: 'bold', backgroundColor: colors.CoolGray2, color: '#595959', opacity: 0.6, textAlign: 'center', color: 'black' }}>{constVar.carAgeTitle}</Text>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black', alignSelf: 'center' }}>{data.carDate}</Text>

                        </View>

                    </View>

                    {(((data.hasInterested || data.hasPosts || data.hasReviews || data.interestedForYourPosts)
                        && (myEmail === data.email))
                        || (myEmail !== data.email && data.hasReviews))
                        && <TouchableOpacity onPress={() => setOpenTabs(true)}>
                            <View style={styles.footerBtn}>
                                <Text style={{ color: 'white', fontSize: 15 }}>Περισσότερα στοιχεία</Text>
                            </View>
                        </TouchableOpacity>
                    }

                </KeyboardAwareScrollView>

            }


            {(openTabs || ((myEmail !== data.email && data.hasReviews) && openTabs)) &&
                <View>
                    <View style={{ top: 47, right: 0, left: 0, bottom: 0, marginHorizontal: 10, paddingBottom: 50, height: '100%' }}>
                        <Tab.Navigator
                            screenOptions={{
                                tabBarLabelStyle: { textTransform: 'lowercase' },
                                tabBarScrollEnabled: true,
                                swipeEnabled: true
                            }}
                        >
                            {data.hasReviews && false &&
                                <Tab.Screen name={"Αξιολογήσεις"}>
                                    {(props) => (
                                        <RatingTabScreen
                                            email={data.email}
                                        />
                                    )}
                                </Tab.Screen>
                            }

                            {data.hasPosts && myEmail === data.email && false &&
                                <Tab.Screen name={"τα Post μου"}>
                                    {(props) => (
                                        <MyPostsTabScreen
                                            navigation={navigation}
                                            email={data.email}
                                        />
                                    )}
                                </Tab.Screen>
                            }

                            {data.hasInterested && myEmail === data.email && false &&
                                <Tab.Screen name={"ενδιαφέρομαι"}>
                                    {(props) => (
                                        <PostsInterestedTabScreen
                                            email={data.email}
                                        />
                                    )}
                                </Tab.Screen>
                            }

                            {data.interestedForYourPosts && myEmail === data.email &&
                                <Tab.Screen name={"ενδιαφερόμενοι"}>
                                    {(props) => (
                                        <InterestedInMeScreen
                                            email={data.email}

                                            myEmail={myEmail}
                                        />
                                    )}
                                </Tab.Screen>
                            }

                        </Tab.Navigator>

                    </View>

                </View>
            }

            <RatingDialog
                onSubmit={(rating, text) => rate(rating, text)}
                isVisible={isRatingDialogOpened}
                closeAction={() => {
                    setRatingDialogOpened(false)
                }} />

            {
                data.image !== '' && headerVisible && !openTabs &&
                renderTopContainer()
            }

        </BaseView >

    );

}

export default ProfileScreen

const styles = StyleSheet.create({
    circle: {
        borderRadius: 100 / 2,
    },
    circleContainer: {

        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: colors.Gray2,
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
});
