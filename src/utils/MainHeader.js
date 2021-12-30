import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Modal from 'react-native-modal';
import { CustomInput } from './CustomInput';
import { colors } from './Colors';
import { RoundButton } from '../Buttons/RoundButton';
import { Spacer } from '../layout/Spacer';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export function MainHeader({
    title,
    onSettingsPress,
    onClose,
    showX
}) {
    const { modal, container } = styles;
    const selectedColor = colors.colorPrimary

    return (

        <View style={{ flexDirection: 'row' }}>
            {showX &&
                <TouchableWithoutFeedback
                    onPress={onClose}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="close-circle-outline" color='black' size={40} style={{ marginStart: 16 }} />
                </TouchableWithoutFeedback>
            }

            <View style={[container, { flex: 1, marginStart: showX ? 8 : 30 }]}>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                }}>
                    <Text style={{ color: 'white', alignSelf: 'center', flexWrap: 'wrap', fontSize: 19, marginStart: 14 }}>{title}</Text>
                    <View style={{ flexDirection: 'row' }}>

                        <Icon name="filter" color='white' size={23} style={{ alignSelf: 'center' }} />
                        <Spacer width={10} />
                        <TouchableWithoutFeedback onPress={onSettingsPress}>
                            <Icon name="settings" color='white' size={23} style={{ alignSelf: 'center' }} />
                        </TouchableWithoutFeedback>
                    </View>

                </View>



            </View>
        </View>


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

});
