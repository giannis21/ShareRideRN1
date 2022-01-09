import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../utils/Colors';


export function PictureComponent({
    onPress,
    singleFile,
    openCamera,
    url,
    dimensions,
    imageSize
}) {
    var _ = require('lodash');
    let imageWidth = 0


    const getStyle = () => {
        if (imageSize === 'big') {
            imageWidth = !singleFile && !url ? 72 : 92
            return styles.circleContainer
        } else if (imageSize === 'medium') {
            imageWidth = 46
            return styles.circleContainer1
        } else {
            imageWidth = 34
            return styles.circleContainer2
        }


    }
    // console.log("asdasdsadsadsadas ", url)
    return (

        <TouchableWithoutFeedback style={getStyle()} onPress={onPress}>
            <View style={[{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }]} >

                <Image
                    style={[{ width: imageWidth, height: imageWidth }, styles.circle]}

                    source={
                        url ? { uri: url } : (
                            !_.isNull(singleFile)
                                ? { uri: 'data:image/jpg;base64,' + singleFile.data }
                                : require('../assets/images/profile.png')


                        )}
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
    circleContainer1: {
        width: 50,
        height: 50,
        borderRadius: 100 / 2,
        backgroundColor: colors.Gray2,
    },
    circleContainer2: {
        width: 40,
        height: 40,
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