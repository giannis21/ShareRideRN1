import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import { BASE_URL } from '../constants/Constants';
import { Spacer } from '../layout/Spacer';
import { colors } from '../utils/Colors';
import { PictureComponent } from './PictureComponent';


export function PostLayoutComponent({
    onPress,
    singleFile,
    openCamera,
    url,
    dimensions,
    imageSize
}) {
    var _ = require('lodash');

    function getMiddle() {
        let list = ["larisa", "Lamia", "Platamonas"]

        return (
            <View style={{ marginStart: 16, marginVertical: 8, justifyContent: 'flex-start' }}>
                {list.map((item, index) => {
                    return (
                        <View style={{ flexDirection: 'row' }}>
                            <Entypo name="location-pin" size={20} color={colors.colorPrimary} />
                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{item}</Text>
                            <Spacer height={3} />
                        </View>
                    )
                })}
            </View>


        )
    }


    return (

        <View style={{ height: 150, borderRadius: 5 }}>

            <Spacer height={5} />

            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '16%', marginStart: 6 }}>

                    <PictureComponent imageSize="small" url={"BASE_URL + item.imagepath"} />
                    <Spacer width={15} />
                </View>


                <View style={{ width: '84%', borderBottomWidth: 1, backgroundColor: 'red', paddingBottom: 7, borderBottomColor: colors.CoolGray1.toString(), flexDirection: 'row' }}>
                    <View style={{ width: '55%' }}>
                        <View style={{}}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}> giannis fragoulis</Text>
                            <Text style={{ fontSize: 12, color: '#595959', opacity: 0.6, marginEnd: 10 }}> 2021-10-26 15:30</Text>
                        </View>

                        <Spacer height={10} />

                        <View style={{ height: 'auto' }} >

                            <View style={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 9,
                                right: 0,
                                backgroundColor: colors.CoolGray1.toString(),
                                width: 1,
                                marginVertical: 15
                            }} ></View>
                            <View style={{ flexDirection: 'row' }}>
                                <Entypo name="location-pin" size={20} color={colors.colorPrimary} />
                                <Text style={{ fontSize: 13, fontWeight: 'bold' }}>Athens</Text>
                            </View>

                            {getMiddle()}
                            <View style={{ flexDirection: 'row' }}>
                                <Entypo name="location-pin" size={20} color={colors.colorPrimary} />
                                <Text style={{ fontSize: 13, fontWeight: 'bold' }}>Thessaloniki</Text>
                            </View>


                        </View>



                        <Spacer height={15} />



                    </View>
                    <View style={{ width: '50%', marginTop: 44 }}>

                        <Text style={{ fontSize: 13, fontWeight: 'bold' }}>Ημερομηνία αναχώρησης</Text>
                        <Spacer height={10} />
                        <Text style={styles.date}>19/4/2022</Text>
                        <Spacer height={3} />
                        <Text style={{ fontSize: 12, color: '#595959', opacity: 0.6, marginEnd: 10, marginStart: 30 }}>έως</Text>
                        <Spacer height={3} />
                        <Text style={styles.date}>20/4/2022</Text>
                    </View>
                </View>

            </View>
            <Text>15€/Θέση 12323123</Text>
        </View >


    );
}

const styles = StyleSheet.create({

    date: {
        color: 'white',
        borderRadius: 22,
        paddingVertical: 2,
        paddingHorizontal: 8,
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'baseline',
        backgroundColor: colors.colorPrimary,

    },
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
