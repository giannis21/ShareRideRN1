import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useIsFocused from '@react-navigation/native'
import { Platform, StatusBar } from "react-native";

const STATUSBAR_HEIGHT = Platform.OS === 'android' ? 48 : 0;

export function BaseView({ edges, light, statusBarColor, children, translucent, containerStyle }) {

    return (
        <SafeAreaView
            style={containerStyle ? containerStyle : { flex: 1, paddingHorizontal: 16, backgroundColor: 'white' }}>

            {true && <StatusBar backgroundColor={statusBarColor}
                barStyle={!light ? 'light-content' : 'dark-content'}
                hidden={false}
                translucent={translucent} />
            }
            {children}
        </SafeAreaView>
    )
}