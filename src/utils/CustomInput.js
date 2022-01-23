import React from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Spacer } from "../layout/Spacer";
import { colors } from '../utils/Colors';
import Feather from 'react-native-vector-icons/Feather';

export function CustomInput({ text, hasIcon, keyboardType, secureTextEntry, onChangeText, onIconPressed, value, maxLenth, extraStyle, labelNot, placeHolder, disabled }) {

    return (
        <View style={[styles.SectionStyle, { extraStyle }]}>

            {!labelNot &&
                <View>
                    <Text style={{ color: '#8b9cb5' }}>{text}</Text>
                    <Spacer height={10} />
                </View>
            }



            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    editable={disabled ? false : true}

                    style={styles.inputStyle}
                    placeholderTextColor="#8b9cb5"
                    placeholder={placeHolder ? placeHolder : null}
                    autoCapitalize="none"
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry ? true : false}
                    //  returnKeyType="next"
                    blurOnSubmit={false}
                    maxLength={maxLenth}
                    onChangeText={onChangeText}
                    value={value} />

                {hasIcon ? <TouchableOpacity activeOpacity={0.1} style={{ marginRight: 10 }} onPress={onIconPressed}>
                    {secureTextEntry ?
                        <Feather style={{ color: colors.colorPrimary }} name="eye-off" size={20} color='grey' /> :
                        <Feather style={{ color: colors.colorPrimary }} name="eye" size={20} color='grey' />}
                </TouchableOpacity>
                    : null
                }

            </View>
        </View>

    )

}

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'column',
        height: 'auto',
        width: '100%',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.colorPrimary,
    },

    inputStyle: {
        flex: 1,
        color: 'black',

    },
})

