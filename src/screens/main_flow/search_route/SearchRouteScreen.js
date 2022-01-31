import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { BaseView } from '../../../layout/BaseView';
import { routes } from '../../../navigation/RouteNames';
import { resetValues } from '../../../services/MainServices';
import { colors } from '../../../utils/Colors';
import { Loader } from '../../../utils/Loader';
import { MainHeader } from '../../../utils/MainHeader';
import { getValue, keyNames } from '../../../utils/Storage';
import { BackHandler } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchRouteScreen = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false)

    let scaleValue = new Animated.Value(0); // declare an animated value
    const isFocused = useIsFocused()
    const cardScale = scaleValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [4, 1.1, 1.2]
    });

    const myUser = useSelector(state => state.authReducer.user)
    useEffect(() => {

        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            BackHandler.exitApp()
        });

        return unsubscribe;
    }, [navigation]);

    const value = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0] //παιρνω μονο την get method του usestate
    const leftvalue = useState(new Animated.Value(11))[0] //παιρνω μονο την get method του usestate
    const moveBall = () => {
        // scaleValue.setValue(0);
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 450,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();

        // Animated.spring(leftvalue, {
        //     toValue: 500,
        //     //   duration: 1000,
        //     useNativeDriver: false
        // }).start()
        // Animated.timing(leftvalue, {
        //     toValue: { x: 100, y: 100 },
        //     duration: 1000,
        //     useNativeDriver: false
        // }).start()
    }

    return (

        <BaseView statusBarColor={colors.colorPrimary} removePadding>
            <Loader isLoading={isLoading} />
            <MainHeader
                title={"Αναζήτηση διαδρομής"}
                onSettingsPress={() => {
                    //  moveBall()
                    navigation.navigate(routes.PROFILE_SCREEN, { email: myUser.email })
                }}
                onLogout={() => {
                    navigation.removeListener('beforeRemove')
                    resetValues(() => {

                        navigation.popToTop();
                        navigation.goBack();
                    })

                }}
                showX
            />

            <View style={{ flex: 1, flexDirection: 'column' }} >




            </View>
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
