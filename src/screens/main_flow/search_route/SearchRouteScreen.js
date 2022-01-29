import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';
import { BaseView } from '../../../layout/BaseView';
import { routes } from '../../../navigation/RouteNames';
import { resetValues } from '../../../services/MainServices';
import { colors } from '../../../utils/Colors';
import { Loader } from '../../../utils/Loader';
import { MainHeader } from '../../../utils/MainHeader';
import { getValue, keyNames } from '../../../utils/Storage';
import { BackHandler } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const SearchRouteScreen = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [myEmail, setMyEmail] = useState('')
    let onLogout = false
    const isFocused = useIsFocused()
    useEffect(() => {

        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            BackHandler.exitApp()
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(async () => {
        setMyEmail(await getValue(keyNames.email))
    }, [])
    const getMe = () => {
        return getValue(keyNames.email)
    }
    return (

        <BaseView statusBarColor={colors.colorPrimary} removePadding>
            <Loader isLoading={isLoading} />
            <MainHeader
                title={"Αναζήτηση διαδρομής"}
                onSettingsPress={() => { navigation.navigate(routes.PROFILE_SCREEN, { email: myEmail }) }}
                onLogout={() => {
                    navigation.removeListener('beforeRemove')
                    resetValues(() => {

                        navigation.popToTop();
                        navigation.goBack();
                    })

                }}
                showX
            />

            <View style={{ flex: 1, flexDirection: 'column' }}>

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
