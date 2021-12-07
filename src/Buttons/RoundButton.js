import React from "react";
import { StyleSheet,TouchableOpacity,View,Text } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from "../utils/Colors";
export function RoundButton({
    text,
    backgroundColor,
    onPress,
    containerStyle,
    icon,
    disabled,
    textColor
  }) {
    const { container, iconStyle } = styles;
  
    return (
      <View>
        <TouchableOpacity
        activeOpacity={0.8}
          style={[
            container,
            containerStyle, 
            {
              backgroundColor: backgroundColor ? backgroundColor
                : colors.transparent
            }
          ]}
          onPress={onPress}
          disabled={disabled}
        >
          <Text style={{textAlign:'center',color: textColor? textColor : 'white'}}>{text}</Text>
  
          {icon && <Feather name="eye-off" size={20} color='grey' />  }
             
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    // CONTAINER
  
    container: {
      borderRadius: 22,
      paddingVertical: 12,
      paddingHorizontal: 18,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors.colorPrimary,
      borderWidth:1
    },
    iconStyle: {
      marginLeft: 12,
      alignSelf: 'center'
    }
  });