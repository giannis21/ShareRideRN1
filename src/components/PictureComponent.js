import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../utils/Colors';


export function PictureComponent({
    onPress,
    singleFile,
    openCamera,
    url
}) {
    var _ = require('lodash');
    let imageWidth = !_.isNull(singleFile) || url ? 92 : 70
    return (

        <TouchableWithoutFeedback style={styles.circleContainer} onPress={onPress}>
            <View style={[{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }]} >

                <Image
                    style={[{ width: imageWidth, height: imageWidth }, styles.circle]}

                    source={
                        url ? { uri: url } : (
                            !_.isNull(singleFile)
                                ? { uri: 'data:image/jpg;base64,' + singleFile.data }
                                : require('../assets/images/profile.png')
                        )

                    }
                />

            </View>


            {openCamera && <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 4 }}>
                <View style={[{ borderRadius: 20, position: 'absolute', backgroundColor: 'white', width: 39, height: 39, justifyContent: 'center' }]}>
                    <Feather style={{ alignSelf: 'center' }} name="camera" size={27} color='black' />
                </View>
            </View>
            }
        </TouchableWithoutFeedback>


    );
}

const styles = StyleSheet.create({


    container: {
        backgroundColor: colors.colorPrimary,
        borderBottomLeftRadius: 54,
        height: 'auto',
        padding: 10,
        marginStart: 6,
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
    maskInputContainer: {
        marginVertical: Platform.OS === 'ios' ? 13 : 20,
        paddingVertical: Platform.OS === 'ios' ? 0 : 20,
        fontSize: 14,
        backgroundColor: 'black',

    },
});
