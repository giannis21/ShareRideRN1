import React, { useState, useEffect, useRef } from 'react';

import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Image, TouchableOpacity, Dimensions } from 'react-native';
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
import { RoundButton } from '../../Buttons/RoundButton';
import { ADD_AVERAGE } from '../../actions/types';
import { TextInput } from 'react-native-gesture-handler';
import { onLaunchCamera, onLaunchGallery } from '../../utils/Functions';
import { OpenImageModal } from '../../utils/OpenImageModal';

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
    const [openRatings, setOpenRatings] = useState(false)
    const [openMyPosts, setOpenMyPosts] = useState(false)
    const [openPostsInterested, setOpenPostsInterested] = useState(false)
    const [openPostsInterestedInMe, setOpenPostsInterestedInMe] = useState(false)
    const [editProfile, setEditProfile] = useState(false)
    const [singleFile, setSingleFile] = useState(null);
    const [isImageModalVisible, setImageModalVisible] = useState(false)
    const dispatch = useDispatch()
    let heightValue = useState(new Animated.Value(height))[0]
    let heightValue1 = useState(new Animated.Value(height))[0]
    const myUser = useSelector(state => state.authReducer.user)
    // const checkBeforeLeaving = (e) => {
    //     console.log(initalData)
    //     // setOpenPostsInterestedInMe(false)
    // }
    // useEffect(() => {
    //     // Adding side effect on component mount
    //     navigation.addListener('blur', checkBeforeLeaving);

    //     // Specify how to clean up after this effect on component-unmount:    
    //     return () => navigation.removeEventListener('blur', checkBeforeLeaving)
    // }, [navigation])
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('beforeRemove', (e) => {

    //     });

    //     return unsubscribe;
    // }, [navigation]);


    const scrollRef = useRef();

    const goBack = () => {
        navigation.goBack()
    }

    const Tab = createMaterialTopTabNavigator();

    function userInfo(icon, title, subTitle, editable, keyboardType) {
        return (
            <View style={{ flexDirection: 'row', marginStart: 16, marginEnd: 16 }}>
                <MaterialCommunityIcons name={icon} size={32} color={colors.colorPrimary} />
                <Spacer width={16} />
                <View>
                    <Spacer height={3} />
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#595959', opacity: 0.6 }}>{title}</Text>
                    <Spacer height={5} />
                    <TextInput keyboardType={keyboardType ? 'numeric' : 'default'} editable={editable} style={{ fontSize: 15, fontWeight: 'bold', color: 'black', width }}>{subTitle}</TextInput>
                    {editable &&
                        <View style={{ backgroundColor: colors.colorPrimary, height: 1, width: '80%' }} />
                    }

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

                    <PictureComponent
                        singleFile={singleFile}
                        url={singleFile ? null : data.image}
                        imageSize={"medium"} />
                    <Spacer width={5} />
                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{data.fullName}</Text>
                        <StarsRating rating={rating} size="small" />
                    </View>

                </View>

                <Spacer height={5} />
                <View style={{ width: '100%', backgroundColor: colors.CoolGray1.toString(), height: 1, justifyContent: 'flex-end' }} />
                {
                    route.params?.email === myUser.email &&
                    <TouchableOpacity activeOpacity={1} onPress={() => { setEditProfile(!editProfile) }} style={{ position: 'absolute', justifyContent: 'flex-end', alignItems: 'center', right: 9, top: 16 }}>
                        {!editProfile ? <Entypo name="edit" color='black' size={24} style={{ alignSelf: 'center' }} /> :
                            <EvilIcons name="close" color='black' size={30} style={{ alignSelf: 'center' }} />
                        }
                    </TouchableOpacity>
                }



            </View>
        )
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

        if (!_.isNull(data.average))
            setCurrentRating(data.average.toString())
        else
            setCurrentRating("0")

        setData({
            email: data?.user?.email,
            phone: data.user.mobile ?? '-',
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
        if (route.params?.email === myUser.email || data.reviewAble === false) //this is my profile
            setUserViewRate(false)

        setUserData(data)
    }
    const searchUserErrorCallback = () => {

    }

    const rate = (rating, text) => {


        rateUser({
            email: data.email,
            emailreviewer: myUser.email,
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
            return
        }

        if (headerVisible === false)
            setHeaderVisible(true)


    }

    const handlerAnimation = (open) => {
        if (!open) {

            heightValue.setValue(0)
            Animated.timing(heightValue, {
                toValue: height,
                duration: 350,
                easing: Easing.linear,
                useNativeDriver: true
            }).start();
        } else {


            heightValue.setValue(height)
            Animated.timing(heightValue, {
                toValue: 0,
                duration: 350,
                easing: Easing.linear,
                useNativeDriver: true
            }).start();
        }
    }
    let style1 = { flex: 1, backgroundColor: 'white' }
    let style2 = { flex: 1, backgroundColor: 'black', opacity: 0.5 }

    const { tabsStyle } = styles
    return (

        <BaseView statusBarColor={colors.colorPrimary} containerStyle={isRatingDialogOpened ? style2 : style1} >
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

            <View style={{ position: 'absolute', marginTop: 5, justifyContent: 'space-around' }}>
                <CloseIconComponent onPress={() => openTabs ? setOpenTabs(false) : navigation.goBack()} />
            </View>

            <TouchableOpacity
                style={{ justifyContent: 'flex-end', alignItems: 'center', right: 9, top: 16, zIndex: 1, position: 'absolute' }}
                activeOpacity={1}
                onPress={() => { setEditProfile(!editProfile) }}>
                {!editProfile ? <Entypo name="edit" color='black' size={24} style={{ alignSelf: 'center' }} /> :
                    <EvilIcons name="close" color='black' size={30} style={{ alignSelf: 'center' }} />
                }

            </TouchableOpacity>


            {data.email !== '' &&

                <KeyboardAwareScrollView height={400} ref={scrollRef} onScroll={handleScroll}>


                    <Loader isLoading={isLoading} />

                    <Spacer height={35} />
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <PictureComponent
                            singleFile={singleFile}
                            onPress={() => { editProfile && setImageModalVisible(true) }}
                            openCamera={editProfile ? true : false}
                            url={singleFile ? null : data.image}
                            imageSize={"big"} />


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
                    {userInfo('email', constVar.email, data.email, false)}
                    <Spacer height={28} />
                    {userInfo('phone', constVar.mobile, data.phone, editProfile ? true : false, "numeric")}
                    <Spacer height={28} />
                    {userInfo('phone', constVar.age, data.age, editProfile ? true : false, "numeric")}
                    <Spacer height={28} />

                    <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>{constVar.socialTitle}</Text>
                    <Spacer height={10} />
                    <View style={{ width: '100%', backgroundColor: colors.CoolGray1.toString(), height: 1 }} />

                    <Spacer height={28} />

                    {userInfo('facebook', constVar.facebook, data.facebook, editProfile ? true : false)}
                    <Spacer height={28} />
                    {userInfo('instagram', constVar.instagram, data.instagram, editProfile ? true : false)}
                    <Spacer height={28} />

                    <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>{constVar.car}</Text>
                    <Spacer height={10} />
                    <View style={{ width: '100%', backgroundColor: colors.CoolGray1.toString(), height: 1 }} />
                    <Spacer height={28} />
                    <View style={{ flexDirection: 'row', marginHorizontal: 16 }}>

                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#595959', opacity: 0.6, textAlign: 'center', marginBottom: 5 }}>{constVar.carBrand}</Text>

                            <TextInput editable={editProfile ? true : false} style={{ fontSize: 13, fontWeight: 'bold', color: 'black', width: '100%', textAlign: 'center' }}>{data.carBrand}</TextInput>
                            {editProfile &&
                                <View style={{ backgroundColor: colors.colorPrimary, height: 1, width: '100%' }} />
                            }
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#595959', opacity: 0.6, textAlign: 'center', marginBottom: 5 }}>{constVar.carAgeTitle}</Text>

                            <TextInput keyboardType='numeric' editable={editProfile ? true : false} style={{ fontSize: 13, fontWeight: 'bold', color: 'black', textAlign: 'center', width: '100%' }}>{data.carDate}</TextInput>
                            {editProfile &&
                                <View style={{ backgroundColor: colors.colorPrimary, height: 1, width: '100%' }} />
                            }
                        </View>

                    </View>

                    {(((data.hasInterested || data.hasPosts || data.hasReviews || data.interestedForYourPosts)
                        && (myUser.email === data.email))
                        || (myUser.email !== data.email && data.hasReviews))
                        && <View style={{ marginTop: 20, marginHorizontal: 16, padding: 3 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Δείτε επίσης:</Text>
                            <View style={{ backgroundColor: colors.CoolGray2, marginTop: 8, borderRadius: 10, padding: 10 }}>
                                {data.hasReviews &&
                                    <TouchableOpacity
                                        onPress={() => {
                                            setHeaderVisible(false);
                                            setOpenRatings(true)
                                            handlerAnimation(true)

                                        }
                                        }
                                        style={[styles.infoContainer, { flexDirection: 'row', alignItems: 'center', marginTop: 10 }]}>

                                        <Text style={styles.rates} >Αξιολογήσεις</Text>
                                    </TouchableOpacity>
                                }

                                {data.hasPosts && myUser.email === data.email &&
                                    <TouchableOpacity
                                        onPress={() => {
                                            setHeaderVisible(false);
                                            setOpenMyPosts(true)
                                            handlerAnimation(true)
                                        }
                                        }
                                        style={[styles.infoContainer, { flexDirection: 'row', alignItems: 'center', marginTop: 10 }]}>

                                        <Text style={styles.rates} >τα Post μου</Text>
                                    </TouchableOpacity>
                                }
                                {data.hasInterested && myUser.email === data.email &&

                                    <TouchableOpacity
                                        style={[styles.infoContainer, { flexDirection: 'row', alignItems: 'center', marginTop: 10 }]}
                                        onPress={() => {
                                            setHeaderVisible(false);
                                            setOpenPostsInterested(true)
                                            handlerAnimation(true)
                                        }
                                        }
                                    >

                                        <Text style={styles.rates} >Post που ενδιαφέρομαι</Text>
                                    </TouchableOpacity>
                                }

                                {data.interestedForYourPosts && myUser.email === data.email &&
                                    <TouchableOpacity
                                        onPress={() => {
                                            setHeaderVisible(false);
                                            setOpenPostsInterestedInMe(true)
                                            handlerAnimation(true)
                                        }
                                        }
                                        style={[styles.infoContainer, { flexDirection: 'row', alignItems: 'center', marginTop: 10 }]}>

                                        <Text style={styles.rates} >Ενδιαφερόμενοι</Text>
                                    </TouchableOpacity>
                                }


                            </View>

                            {/* <View style={styles.footerBtn}>
                                <Text style={{ color: 'white', fontSize: 15 }}>Περισσότερα στοιχεία</Text>
                            </View> */}
                        </View>
                    }

                    <Spacer height={20} />

                </KeyboardAwareScrollView>

            }


            {/* {(openTabs || ((myUser.email !== data.email && data.hasReviews) && openTabs)) &&
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

                            {data.hasPosts && myUser.email === data.email && false &&
                                <Tab.Screen name={"τα Post μου"}>
                                    {(props) => (
                                        <MyPostsTabScreen
                                            navigation={navigation}
                                            email={data.email}
                                        />
                                    )}
                                </Tab.Screen>
                            }

                            {data.hasInterested && myUser.email === data.email && false &&
                                <Tab.Screen name={"ενδιαφέρομαι"}>
                                    {(props) => (
                                        <PostsInterestedTabScreen
                                            email={data.email}
                                        />
                                    )}
                                </Tab.Screen>
                            }

                            {data.interestedForYourPosts && myUser.email === data.email &&
                                <Tab.Screen name={"ενδιαφερόμενοι"}>
                                    {(props) => (
                                        <InterestedInMeScreen
                                            email={data.email}
                                        />
                                    )}
                                </Tab.Screen>
                            }

                        </Tab.Navigator>

                    </View>

                </View>
            } */}

            {openRatings &&

                <Animated.View style={[{ transform: [{ translateY: heightValue }] }, tabsStyle]}>
                    <RatingTabScreen
                        email={data.email}
                        onCloseContainer={() => {
                            handlerAnimation(false)
                            setHeaderVisible(true);
                            setOpenRatings(false)
                        }}
                    />
                </Animated.View>
            }

            {openMyPosts &&
                <Animated.View style={[{ transform: [{ translateY: heightValue }] }, tabsStyle]}>
                    <MyPostsTabScreen
                        navigation={navigation}
                        email={data.email}
                        onCloseContainer={() => {
                            handlerAnimation(false)
                            setHeaderVisible(true);
                            setOpenMyPosts(false)
                        }}
                    />
                </Animated.View>
            }
            {openPostsInterested &&
                <Animated.View style={[{ transform: [{ translateY: heightValue }] }, tabsStyle]}>
                    <PostsInterestedTabScreen
                        email={data.email}
                        onCloseContainer={() => {
                            handlerAnimation(false)
                            setHeaderVisible(true);
                            setOpenPostsInterested(false)
                        }}
                    />
                </Animated.View>
            }

            {openPostsInterestedInMe &&
                <Animated.View style={[{ transform: [{ translateY: heightValue }] }, tabsStyle]}>
                    <InterestedInMeScreen
                        email={data.email}
                        onCloseContainer={() => {
                            handlerAnimation(false)
                            setHeaderVisible(true);
                            setOpenPostsInterestedInMe(false)
                        }}
                    />
                </Animated.View>

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
