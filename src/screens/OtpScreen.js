import * as React from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';
import { InfoPopupModal } from '../utils/InfoPopupModal';
import { Spacer } from '../layout/Spacer';
import Feather from 'react-native-vector-icons/Feather';
import { Loader } from '../utils/Loader';
import { BaseView } from '../layout/BaseView';
import { colors } from '../utils/Colors';
import { CustomInfoLayout } from '../utils/CustomInfoLayout';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useTimer } from '../customHooks/useTimer';
import { forgotPass } from '../services/AuthServices';

const OtpScreen = ({ navigation, route }) => {
  const [data, setData] = React.useState({ email: '', password: '', check_textInputChange: false, secureTextEntry: true })
  const [isLoading, setIsLoading] = React.useState(false)
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [modalInput, setModalInput] = React.useState(false)
  const [areFieldsOkay, setAreFieldsOkay] = React.useState({ areEmpty: false, isPasswordValid: true, isEmailValid: true })
  const [showInfoModal, setShowInfoModal] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [showTextError, setShowTextError] = React.useState(false);
  const { otp_, email_, goToRestore } = route.params;
  const [refreshTimer, setRefreshTimer] = React.useState(false);

  const [otp, setOtp] = React.useState(otp_);
  const [email, setEmail] = React.useState(email_);
  const [hasErrors, setHasErrors] = React.useState(false);

  let timerTime = useTimer(true, refreshTimer)

  const modalInputChange = (value) => {
    setModalInput(value)
  }
  console.log("otp ", otp)
  const goToLogin = () => {
    navigation.popToTop()
  }

  const goToRestorePass = () => {
    navigation.navigate("RestorePassword")
  }

  const onConfirm = (code) => {

    if (timerTime == '00:00') {
      setShowTextError(true)
      return
    }

    if (code === otp) {
      if (goToRestore)
        navigation.navigate("RestorePassword")
      else
        navigation.popToTop()
    } else {
      setTimeout(function () {
        setShowTextError(true)
        setCode('')
      }, 300);

    }
  }


  const forgotPassSuccessCallback = (_otp, _email) => {

    setIsLoading(false)
    setTimeout(function () {
      setShowTextError(false)
      setCode('')
    }, 300);

    setRefreshTimer(!refreshTimer)
    // setEmail(_email)
    setOtp(_otp)
    setHasErrors(false)
    // navigation.navigate(routes.OTP_SCREEN,{otp:_otp,email:_email,goToRestore:true})
  }

  const forgotPassErrorCallback = (message) => {

    setHasErrors(true)
    setIsLoading(false)
    //  showCustomLayout()

  }
  const modalSubmit = () => {



  }
  const retry = () => {
    console.log("retry ", email_)
    //  setIsLoading(true)
    forgotPass({
      email: email_,
      successCallBack: forgotPassSuccessCallback,
      errorCallback: forgotPassErrorCallback
    })
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
        title={"infoMessage"}
        icon={hasErrors ? 'x-circle' : 'check-circle'}
        success={!hasErrors}
      />

      <View style={{ flex: 1, flexDirection: 'column' }}>

        <View style={styles.topContainer}>
          <TouchableWithoutFeedback onPress={() => { navigation.popToTop() }}>
            <Feather style={{ alignSelf: 'flex-start' }} name="chevron-left" size={30} color='black' />
          </TouchableWithoutFeedback>

          <Text style={styles.header}>Πάμε για επιβεβαίωση</Text>
        </View>

        <Spacer height={65} />

        <View style={{ alignItems: 'center' }} >
          <View style={styles.timerContainer}>
            <Text style={styles.timer}>{timerTime}</Text>
          </View>

          <Spacer height={45} />
          
          <Text style={{ fontSize: 17, fontWeight: '900', textAlign: 'center' }}>Έλαβες έναν 4-ψήφιο κωδικό στο {email}; Πληκτρολόγησέ τον εδώ:</Text>

          <OTPInputView
            style={{ width: '70%', height: '20%' }}
            codeInputHighlightStyle={{ borderColor: colors.colorPrimary }}
            pinCount={4}
            autoFocusOnLoad={true}
            codeInputFieldStyle={styles.box}
            onCodeFilled={(code) => {
              onConfirm(code)
            }}
            code={code}
            onCodeChanged={(c) => {
              if (showTextError && code.length === 0) {
                setShowTextError(false)
              }
              setCode(c)
            }}
          />

          {showTextError ? (
            <Text style={styles.wrongPass}>ο κωδικός είναι λάθος ή έχει λήξει</Text>) : null}

          <Spacer height={50} />
          <Text style={{ fontSize: 16, paddingHorizontal: 22, alignSelf: 'center', textAlign: 'center', fontWeight: '900' }}>δεν έλαβες κάποιο email; Τσέκαρε μήπως πήγε στα σπαμ σου ✉</Text>
          <Spacer height={30} />

          <TouchableWithoutFeedback onPress={retry}>
            <Text style={{ fontSize: 16, paddingHorizontal: 22, alignSelf: 'center', textAlign: 'center', fontWeight: 'bold' }}>retry</Text>

          </TouchableWithoutFeedback>

        </View>



      </View>

      {/* <InfoPopupModal
        isVisible={isModalVisible}
        description={"Δώσε μας το email που χρησιμοποίησες για την εγγραφή σου και θα σου στείλουμε έναν νέο κωδικό τον οποίον μπορείς να τον αλλάξεις."}
        buttonText={"Πάμε"}
        closeAction={() => {
          setIsModalVisible(false);
        }}
        buttonPress={modalSubmit}
        descrStyle={true}
        onChangeText={modalInputChange}
      /> */}


    </BaseView>

  );

}

export default OtpScreen

const styles = StyleSheet.create({
  timer: {
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center'
  },
  timerContainer: {
    backgroundColor: 'white',
    height: 'auto', width: '100%',
    borderRadius: 23
  },
  header: {
    fontSize: 23,
    alignSelf: 'center',
    marginStart: 14,
    color: 'black',
    fontWeight: 'bold'
  },
  wrongPass: {
    fontSize: 13, fontWeight: '900', color: 'red'
  },
  topContainer: {
    flexDirection: 'row',
    marginTop: 16
  },
  container: {
    padding: 16,
    flexGrow: 1
  },
  input: {
    height: 40,
    marginBottom: 12,
    paddingVertical: 12,
    borderBottomWidth: 1
  },
  absolute: {
    position: 'absolute',
    left: 16,
    bottom: 0,
    top: 0
  },
  box: {
    width: 55,
    alignSelf: 'center',

    height: 55,
    backgroundColor: 'white',
    borderRadius: 8,
    marginRight: 8,
    color: 'black'
  }
});
