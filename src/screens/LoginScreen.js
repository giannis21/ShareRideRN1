
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Platform, TextInput, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BaseView } from '../layout/BaseView';
import { Spacer } from '../layout/Spacer';
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
import { constVar } from '../utils/constStr';
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
      setInfoMessage({ info: constVar.fillFirst, success: false })
      showCustomLayout()
      return false
    }

    if (data.password.length < 5) {
      setInfoMessage({ info: constVar.passLength, success: false })
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
    // setInfoMessage({ info: message, success: true })
    // showCustomLayout()
    setIsLoading(false)
    navigation.navigate(routes.HOMESTACK, { screen: routes.SEARCH_ROUTE_SCREEN })
  }


  const forgotPassSuccessCallback = (_otp, _email) => {

    setIsLoading(false)
    navigation.navigate(routes.OTP_SCREEN, { _otp: _otp, _email: _email, goToRestore: true })
  }

  const userErrorCallback = (message, otp, email) => {
    setInfoMessage({ info: message, success: false })
    setIsLoading(false)
    if (otp) {
      showCustomLayout(() => {
        navigation.navigate(routes.OTP_SCREEN, { _otp: otp, _email: email, goToRestore: false })
      })
    }

    showCustomLayout()

  }

  const forgotPassErrorCallback = (message) => {

    setInfoMessage({ info: message, success: false })
    setIsLoading(false)
    showCustomLayout()

  }

  const showCustomLayout = (callback) => {
    setShowInfoModal(true)
    setTimeout(function () {
      setShowInfoModal(false)
      if (callback)
        callback()
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
            text={constVar.hereEmail}
            keyboardType="email-address"
            onChangeText={onEmailChanged}
            value={data.email}

          />

          <CustomInput
            text={constVar.herePass}
            keyboardType="default"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={onPasswordChanged}
            onIconPressed={updateSecureTextEntry}
            hasIcon={true}
            value={data.password}
          />

          <Spacer height={6} />
          <TouchableWithoutFeedback onPress={openModal}>
            <Text style={styles.forgotPass} >{constVar.forgotPass}</Text>
          </TouchableWithoutFeedback>

          <Spacer height={26} />
          <RoundButton
            text={constVar.login}
            onPress={onLogin}
            backgroundColor={colors.colorPrimary} />
          <Spacer height={16} />

          <RoundButton
            text={constVar.register}
            textColor={colors.colorPrimary.toString()}
            onPress={() =>
              goToRegister()
            }
          //navigation.navigate("RestorePassword")
          // 
          // navigation.navigate(routes.OTP_SCREEN, {_otp: '6234', _email: "giannisfragoulis21@gmail.com", goToRestore: false })
          />
        </View>

        <InfoPopupModal
          isVisible={isModalVisible}
          description={constVar.changePassDescription}
          buttonText={constVar.go}
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