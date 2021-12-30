import * as React from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';
import { BaseView } from '../../../layout/BaseView';
import { routes } from '../../../navigation/RouteNames';
import { colors } from '../../../utils/Colors';
import { Loader } from '../../../utils/Loader';
import { MainHeader } from '../../../utils/MainHeader';


const SearchRouteScreen = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = React.useState(false)



    return (

        <BaseView statusBarColor={colors.colorPrimary} removePadding>
            <Loader isLoading={isLoading} />
            <MainHeader
                title={"Αναζήτηση διαδρομής"}
                onSettingsPress={() => { navigation.navigate(routes.PROFILE_SCREEN, { email: "giannisfragoulis21@gmail.com" }) }}
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
