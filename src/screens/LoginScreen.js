import * as React from 'react';
import { View, Text, StyleSheet, Button, Platform, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ceil } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
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
 

let infoMessage = ''
let hasErrors = false

const LoginScreen = ({ navigation }) => {
  var _ = require('lodash');

  const [data, setData] = React.useState({ email: '', password: '', check_textInputChange: false, secureTextEntry: true })
  const [isLoading, setIsLoading] = React.useState(false)
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [modalInput, setModalInput] = React.useState(false)
  const [areFieldsOkay, setAreFieldsOkay] = React.useState({ areEmpty: false, isPasswordValid: true, isEmailValid: true })
  const [showInfoModal, setShowInfoModal] = React.useState(false);


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        setData({ email: '', password: '', check_textInputChange: false, secureTextEntry: true })
        setIsModalVisible(false)
        setShowInfoModal(false)
        console.log("email",data.email)
    });

    return unsubscribe;
  }, [navigation]);


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
      infoMessage = "Συμπληρώστε τα πεδία πρώτα."
      hasErrors = true
      showCustomLayout()
      return false
    }

    if (data.password.length < 5) {
      infoMessage = "Ο κωδικός αποτελείται απο τουλάχιστον 5 χαρακτήρες."
      hasErrors = true
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
    console.log("dsd ",modalInput)
    setIsLoading(true)
    forgotPass({
      email: modalInput,
      successCallBack: forgotPassSuccessCallback,
      errorCallback: forgotPassErrorCallback
    })
  }
  const userSuccessCallback = (message) => {
    console.log(message)
    infoMessage = message
    hasErrors = false
    setIsLoading(false)
  }
  const forgotPassSuccessCallback = (_otp,_email) => {
    setIsLoading(false)
    navigation.navigate(routes.OTP_SCREEN,{otp:_otp,email:_email,goToRestore:true})
  }

  const userErrorCallback = (message) => {
    console.log("callback+ " + message)
    infoMessage = message
    hasErrors = true

    setIsLoading(false)
    showCustomLayout()

  }

  const forgotPassErrorCallback = (message) => {
    console.log("callback+ " + message)
    infoMessage = message
    hasErrors = true

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
        title={infoMessage}
        icon={hasErrors ? 'x-circle' : 'check-circle'}
        success={!hasErrors}
      />
        
     <KeyboardAwareScrollView
        extraScrollHeight={Platform.OS === 'ios' ? 20 : 0}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={true}
        bounces={true}
        keyboardShouldPersistTaps={'handled'}>
        <View>

          <Spacer height={35} />
          <Feather style={{ alignSelf: 'center' }} name="eye-off" size={80} color='grey' />
 
          <Spacer height={35} />

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
            //  navigation.navigate(routes.OTP_SCREEN,{otp_:'6234',email_:"giannisfragoulis21@gmail.com"})
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