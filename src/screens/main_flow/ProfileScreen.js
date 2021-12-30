import React, { useState, useEffect, useRef } from 'react';

import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
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
import { rateUser, searchUser } from '../../services/MainServices';
import { CustomInfoLayout } from '../../utils/CustomInfoLayout';
import { BASE_URL } from '../../constants/Constants';
const ProfileScreen = ({ navigation, route }) => {
    var _ = require('lodash');
    let initalData = { email: '', facebook: '', instagram: '', carBrand: 'ΟΛΑ', carDate: '', fullName: '', phone: '', age: '', gender: 'man', image: '' }
    const [data, setData] = useState(initalData)
    const [isLoading, setIsLoading] = React.useState(false)
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [singleFile, setSingleFile] = useState(null);
    const [infoMessage, setInfoMessage] = useState({ info: '', success: false });
    const [rating, setCurrentRating] = useState(null);

    const [isRatingDialogOpened, setRatingDialogOpened] = useState(false);
    const [userViewRate, setUserViewRate] = useState(true);

    const goBack = () => {
        navigation.goBack()
    }
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


    let imageWidth = !_.isNull(singleFile) ? 92 : 70
    const setUserData = async (data) => {

        if (!_.isNull(data.average))
            setCurrentRating(data.average.toString())
        else
            setCurrentRating("0")

        setData({
            email: data.user.email,
            phone: data.user.mobile,
            age: data.user.age,
            facebook: data.user.facebook ?? '-',
            instagram: data.user.instagram ?? '-',
            carBrand: data.user.car ?? '-',
            carDate: data.user.cardate ?? '-',
            fullName: data.user.fullname ?? '-',
            image: BASE_URL + data.image ?? '-'
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

    const rate = async (rating, text) => {
        let myEmail = await getValue(keyNames.email)

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
            {data.email !== '' &&
                <KeyboardAwareScrollView>


                    <Loader isLoading={isLoading} />

                    <Spacer height={35} />
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                        <PictureComponent singleFile={singleFile} url={data.image} />

                        <Spacer height={10} />
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{data.fullName}</Text>
                            <Spacer height={20} />

                            {rating && <StarsRating
                                rating={rating}
                                setRating={(rating) => setCurrentRating(rating)}
                            />}
                        </View>
                        <Spacer height={20} />

                        {userViewRate &&
                            <TouchableWithoutFeedback onPress={() => setRatingDialogOpened(true)}>
                                <Text style={{ padding: 3, fontSize: 16, fontWeight: 'bold', backgroundColor: '#F0AD4E', textAlign: 'center', width: '100%', color: 'white' }}>Αξιολόγησε τώρα</Text>
                            </TouchableWithoutFeedback>
                        }

                        <Spacer height={20} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Προσωπικά στοιχεία</Text>
                        <Spacer height={10} />
                        <View style={{ width: '100%', backgroundColor: colors.CoolGray1.toString(), height: 1 }} />


                    </View>
                    <Spacer height={28} />
                    {userInfo('email', 'Email', data.email)}
                    <Spacer height={28} />
                    {userInfo('phone', 'Αριθμός τηλεφώνου', data.phone)}
                    <Spacer height={28} />
                    {userInfo('phone', 'Ηλικία', data.age)}
                    <Spacer height={28} />

                    <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>Κοινωνικά δίκτυα</Text>
                    <Spacer height={10} />
                    <View style={{ width: '100%', backgroundColor: colors.CoolGray1.toString(), height: 1 }} />

                    <Spacer height={28} />
                    {userInfo('facebook', 'Facebook', data.facebook)}
                    <Spacer height={28} />
                    {userInfo('instagram', 'Instagram', data.instagram)}
                    <Spacer height={28} />

                    <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>Όχημα</Text>
                    <Spacer height={10} />
                    <View style={{ width: '100%', backgroundColor: colors.CoolGray1.toString(), height: 1 }} />
                    <Spacer height={28} />
                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ flex: 1 }}>
                            <Text style={{ padding: 3, fontSize: 15, fontWeight: 'bold', backgroundColor: colors.CoolGray2, color: '#595959', opacity: 0.6, textAlign: 'center', color: 'black' }}>Μάρκα αυτοκινήτου</Text>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black', alignSelf: 'center' }}>{data.carBrand}</Text>

                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={{ padding: 3, fontSize: 15, fontWeight: 'bold', backgroundColor: colors.CoolGray2, color: '#595959', opacity: 0.6, textAlign: 'center', color: 'black' }}>Χρονολογία</Text>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black', alignSelf: 'center' }}>{data.carDate}</Text>

                        </View>

                    </View>
                    <Spacer height={28} />

                </KeyboardAwareScrollView>
            }
            <RatingDialog
                onSubmit={(rating, text) => rate(rating, text)}
                isVisible={isRatingDialogOpened}
                closeAction={() => {
                    setRatingDialogOpened(false)
                }} />

        </BaseView>

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
    maskInputContainer: {
        marginVertical: Platform.OS === 'ios' ? 13 : 20,
        paddingVertical: Platform.OS === 'ios' ? 0 : 20,
        fontSize: 14,
        backgroundColor: 'black',

    },
});
