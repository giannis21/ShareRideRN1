
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Platform, TextInput, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BaseView } from '../layout/BaseView';
import { Spacer } from '../layout/Spacer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RoundButton } from '../Buttons/RoundButton';
import { colors } from '../utils/Colors';
import { routes } from '../navigation/RouteNames';
import { createToken, forgotPass } from '../services/AuthServices';
import { Loader } from '../utils/Loader';
import { CustomInput } from '../utils/CustomInput';
import { InfoPopupModal } from '../utils/InfoPopupModal';
import { CustomInfoLayout } from '../utils/CustomInfoLayout';
import { useIsFocused } from '@react-navigation/native';

const LoginScreen = ({ navigation, route }) => {
  var _ = require('lodash');

  const [data, setData] = useState({ email: '', password: '', check_textInputChange: false, secureTextEntry: true })
  const [isLoading, setIsLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalInput, setModalInput] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoMessage, setInfoMessage] = useState({ info: '', success: false });
  const isFocused = useIsFocused()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setData({ email: '', password: '', check_textInputChange: false, secureTextEntry: true })
      setIsModalVisible(false)
      setShowInfoModal(false)
      navigation.setParams({ message: undefined });

    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setTimeout(function () {
      if (isFocused) {
        if (!_.isUndefined(route.params?.message)) {
          setInfoMessage({ info: route.params.message, success: true })
          showCustomLayout()
        }
      }
    }, 500);

  }, [isFocused]);

  const goToRegister = () => {
    navigation.navigate('Register')
  }
  const onEmailChanged = (value) => {
    setData({ ...data, email: value })
  }

  const onPasswordChanged = (value) => {
    setData({ ...data, password: value })
  }
  const updateSecureTextEntry = () => {
    setData({ ...data, secureTextEntry: !data.secureTextEntry });
  }
  const modalInputChange = (value) => {
    setModalInput(value)
  }

  const onLogin = () => {

    if (!valid())
      return

    setIsLoading(true)
    createToken({
      email: data.email,
      password: data.password,
      successCallBack: userSuccessCallback,
      errorCallback: userErrorCallback
    })
  }

  const valid = () => {
    if (_.isEmpty(data.email) || _.isEmpty(data.password)) {
      setInfoMessage({ info: "Συμπληρώστε τα πεδία πρώτα.", success: false })
      showCustomLayout()
      return false
    }

    if (data.password.length < 5) {
      setInfoMessage({ info: "Ο κωδικός αποτελείται απο τουλάχιστον 5 χαρακτήρες.", success: false })
      showCustomLayout()
      return false
    }

    return true

  }
  const openModal = () => {
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  const modalSubmit = () => {

    setIsLoading(true)
    forgotPass({
      email: modalInput,
      successCallBack: forgotPassSuccessCallback,
      errorCallback: forgotPassErrorCallback
    })
  }
  const userSuccessCallback = (message) => {
    setInfoMessage({ info: message, success: true })
    showCustomLayout()
    setIsLoading(false)
  }


  const forgotPassSuccessCallback = (_otp, _email) => {
    setIsLoading(false)
    navigation.navigate(routes.OTP_SCREEN, { otp: _otp, email: _email, goToRestore: true })
  }

  const userErrorCallback = (message) => {

    setInfoMessage({ info: message, success: false })
    setIsLoading(false)
    showCustomLayout()

  }

  const forgotPassErrorCallback = (message) => {

    setInfoMessage({ info: message, success: false })
    setIsLoading(false)
    showCustomLayout()

  }

  const showCustomLayout = () => {
    setShowInfoModal(true)
    setTimeout(function () {
      setShowInfoModal(false)
    }, 3000);
  }

  return (


    <BaseView statusBarColor={colors.colorPrimary}>
      <Loader isLoading={isLoading} />
      <CustomInfoLayout
        isVisible={showInfoModal}
        title={infoMessage.info}
        icon={!infoMessage.success ? 'x-circle' : 'check-circle'}
        success={infoMessage.success}
      />

      <KeyboardAwareScrollView
        extraScrollHeight={Platform.OS === 'ios' ? 20 : 0}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={true}
        bounces={true}
        keyboardShouldPersistTaps={'handled'}>
        <Image
          style={{ width: 280, height: 280, alignSelf: 'center', marginTop: -70 }}
          source={require('../assets/images/logo_transparent.png')}
        />
        <View style={{ marginTop: -26 }}>

          <CustomInput
            text='εδώ, δίνεις το email σου'
            keyboardType="email-address"
            onChangeText={onEmailChanged}
            value={data.email}

          />

          <CustomInput
            text='εδώ, τον κωδικό σου'
            keyboardType="default"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={onPasswordChanged}
            onIconPressed={updateSecureTextEntry}
            hasIcon={true}
            value={data.password}
          />

          <Spacer height={6} />
          <TouchableWithoutFeedback onPress={openModal}>
            <Text style={styles.forgotPass} >Ξέχασες τον κωδικό σου;</Text>
          </TouchableWithoutFeedback>

          <Spacer height={26} />
          <RoundButton
            text="Είσοδος"
            onPress={onLogin}
            backgroundColor={colors.colorPrimary} />
          <Spacer height={16} />

          <RoundButton
            text="Εγγραφή"
            textColor={colors.colorPrimary.toString()}
            onPress={() =>
              //navigation.navigate("RestorePassword")
              goToRegister()
              // navigation.navigate(routes.OTP_SCREEN, { _otp: '6234', _email: "giannisfragoulis21@gmail.com" })
            } />
        </View>

        <InfoPopupModal
          isVisible={isModalVisible}
          description={"Δώσε μας το email που χρησιμοποίησες για την εγγραφή σου και θα σου στείλουμε έναν νέο κωδικό τον οποίον μπορείς να τον αλλάξεις."}
          buttonText={"Πάμε"}
          closeAction={() => {
            setIsModalVisible(false);
          }}
          buttonPress={modalSubmit}
          descrStyle={true}
          onChangeText={modalInputChange}
        />
      </KeyboardAwareScrollView>

    </BaseView>


  );

}

export default LoginScreen

const styles = StyleSheet.create({
  forgotPass: {
    color: '#8b9cb5',
    alignSelf: 'flex-end'
  }
})