import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { CustomInput } from './CustomInput';
import { colors } from './Colors';
import { RoundButton } from '../Buttons/RoundButton';
import { Spacer } from '../layout/Spacer';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export function OpenImageModal({
  closeAction,
  title,
  titleType,
  description,
  buttonText,
  closeText,
  buttonPress,
  isVisible,
  isPost
}) {
  const { modal, container, textStyle } = styles;

  return (
    <View>
      <Modal
        isVisible={isVisible}
        style={modal}
        onBackdropPress={closeAction}
        onSwipeComplete={closeAction}
        swipeDirection="down"
        useNativeDriver={true}
      >
        {!isPost && <View style={container}>
          <TouchableOpacity style={{ padding: 10 }} onPress={() => { buttonPress(0) }}>
            <Text style={textStyle}>Βγάλε φωτογραφία</Text>
          </TouchableOpacity>

          <View style={{ width: '100%', backgroundColor: colors.Gray2.toString(), height: 1 }} />

          <TouchableOpacity style={{ padding: 10 }} onPress={() => buttonPress(1)} >
            <Text style={textStyle}>Επέλεξε φωτογραφία</Text>
          </TouchableOpacity>


        </View>
        }
        <Spacer height={10} />
        <TouchableOpacity activeOpacity={0.9} style={[{ padding: 10 }, container]} onPress={() => buttonPress(2)}>
          <Text style={[textStyle, { color: 'red' }]}>Διαγραφή</Text>
        </TouchableOpacity>
      </Modal >
    </View >
  );
}

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    fontSize: 17
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 10,

  },
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 'auto',
    paddingHorizontal: 10
  },
  descriptionStyle: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    textAlign: 'center'
  }
});
