
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BASE_URL } from '../constants/Constants';
import { Spacer } from '../layout/Spacer';

import { colors } from '../utils/Colors';
import { PictureComponent } from './PictureComponent';

export function UserComponent({
    user,
    onProfileClick,
    deleteInterested,
    fillWidth
}) {
    const { userStyleAdded, stretch, noStretch, container } = styles

    let color = user.isVerified ? colors.verifiedUser : colors.CoolGray2
    return (

        <TouchableOpacity onPress={() => {

            onProfileClick(user.email)

        }} style={{ marginTop: 10 }}>

            <View style={[userStyleAdded, fillWidth ? stretch : noStretch, { backgroundColor: color }]}>
                <View style={container}>
                    <PictureComponent imageSize="small" url={BASE_URL + user.imagePath} />
                    <Spacer width={14} />
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{user.fullname}</Text>
                </View>



                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        deleteInterested(user.piid)
                    }}>

                        <FontAwesome name="close" size={24} color='red' style={{ marginHorizontal: 10 }} />
                    </TouchableOpacity>

                    <Entypo name="add-user" size={22} color={colors.colorPrimary} style={{ marginHorizontal: 5 }} />
                </View>

            </View>



            <Spacer height={10} />

        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({

    userStyleAdded: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        flexDirection: 'row',
        alignItems: 'center',



        borderRadius: 13,
        marginEnd: 10,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    stretch: {
        justifyContent: 'space-between',
        width: '100%',
    },
    noStretch: {
        alignSelf: 'baseline',
    }

})
