import * as React from 'react';
import { View, Text, StyleSheet, Button, Platform, TextInput, Keyboard } from 'react-native';
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
import { createToken, restorePassword } from '../services/AuthServices';
import { Loader } from '../utils/Loader';
import { CustomInput } from '../utils/CustomInput';
import { InfoPopupModal } from '../utils/InfoPopupModal';
import { CustomInfoLayout } from '../utils/CustomInfoLayout';
import { getValue, setValue } from '../utils/Storage';

let hasErrors = false
const RestorePasswordScreen = ({ navigation }) => {
  var _ = require('lodash');
  const [data, setData] = React.useState({ password: '', passwordConfirm: '', secureTextEntry: true, secureTextEntryConfirmed: true })
  const [isLoading, setIsLoading] = React.useState(false)
  const [showInfoModal, setShowInfoModal] = React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState({ hasError: false, message: false });

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setData({ password: '', passwordConfirm: '', secureTextEntry: true, secureTextEntryConfirmed: true })
      setIsLoading(false)
      setInfoMessage({ hasError: false, message: false });
      setShowInfoModal(false)

    });

    return unsubscribe;
  }, [navigation]);

  const showCustomLayout = (callback) => {
    setShowInfoModal(true)

    setTimeout(function () {
      setShowInfoModal(false)
      callback()
    }, 3000);
  }
  const successCallBack = (message) => {
    setInfoMessage({ hasError: false, message })
    showCustomLayout((() => {
      navigation.popToTop()
    }))
  }
  const errorCallback = (message) => {
    setInfoMessage({ hasError: true, message })
    showCustomLayout()
  }
  const onButtonPressed = () => {
    Keyboard.dismiss()
    if (_.isEmpty(data.password) || _.isEmpty(data.passwordConfirm)) {
      setInfoMessage({ hasError: true, message: 'Συμπληρώστε τα πεδία πρώτα.' })
      showCustomLayout()
    } else if (data.password.length < 5 || data.passwordConfirm.length < 5) {
      setInfoMessage({ hasError: true, message: 'Ο κωδικός αποτελείται απο 5 χαρακτήρες και άνω.' })
      showCustomLayout()
    }
    else if (data.password !== data.passwordConfirm) {
      setInfoMessage({ hasError: true, message: 'Οι κωδικοί είναι διαφορετικοί.' })
      showCustomLayout()
    } else {
      let password = data.password
      restorePassword({ password, successCallBack: successCallBack, errorCallback: errorCallback })
    }


  }
  const goToLogin = () => {

  }
  const onPasswordChanged = (value) => {
    setData({ ...data, password: value })
  }
  const onPasswordConfirmedChanged = (value) => {
    setData({ ...data, passwordConfirm: value })
  }
  const updateSecureTextEntry = () => {
    setData({ ...data, secureTextEntry: !data.secureTextEntry });
  }

  const updateSecureTextEntryConfirmed = () => {
    setData({ ...data, secureTextEntryConfirmed: !data.secureTextEntryConfirmed });
  }


  return (
    <BaseView statusBarColor={colors.colorPrimary}>
      <Loader isLoading={isLoading} />
      <CustomInfoLayout
        isVisible={showInfoModal}
        title={infoMessage.message}
        icon={infoMessage.hasError ? 'x-circle' : 'check-circle'}
        success={!infoMessage.hasError}
      />

      <KeyboardAwareScrollView
        extraScrollHeight={Platform.OS === 'ios' ? 20 : 0}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={true}
        bounces={true}
        keyboardShouldPersistTaps={'handled'}>
        <View style={styles.topContainer}>
          <TouchableWithoutFeedback onPress={() => { navigation.popToTop() }}>
            <Feather style={{ alignSelf: 'flex-start' }} name="chevron-left" size={30} color='black' />
          </TouchableWithoutFeedback>

          <Text style={styles.header}>Νέο password</Text>
        </View>

        <Spacer height={80} />
        <CustomInput
          text='δώσε έναν νέο κωδικό'
          secureTextEntry={data.secureTextEntry ? true : false}
          onChangeText={onPasswordChanged}
          onIconPressed={updateSecureTextEntry}
          hasIcon={true}
          value={data.password}
        />

        <CustomInput
          text='επιβεβαίωση κωδικού'
          secureTextEntry={data.secureTextEntryConfirmed ? true : false}
          onChangeText={onPasswordConfirmedChanged}
          onIconPressed={updateSecureTextEntryConfirmed}
          hasIcon={true}
          value={data.passwordConfirm}
        />
        <Spacer height={5} />

        <Text style={{ fontSize: 13, color: '#8b9cb5' }}>*Ο κωδικός αποτελείται απο 5 χαρακτήρες και άνω</Text>
        <Spacer height={30} />

        <RoundButton
          text="Πάμε"
          backgroundColor={colors.colorPrimary}
          onPress={onButtonPressed}
         />
      </KeyboardAwareScrollView>
    </BaseView >
  );

}

export default RestorePasswordScreen

const styles = StyleSheet.create({
  header: {
    fontSize: 23,

    marginStart: 14,
    color: 'black',
    fontWeight: 'bold',

  },
  wrongPass: {
    fontSize: 13, fontWeight: '900', color: 'red'
  },
  topContainer: {
    flexDirection: 'row',
    marginTop: 16,

  },
})      