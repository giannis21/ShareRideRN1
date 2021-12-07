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
import { createToken } from '../services/AuthServices';
import { Loader } from '../utils/Loader';
import { CustomInput } from '../utils/CustomInput';
const LoginScreen = ({ navigation }) => {
  const [data, setData] = React.useState({ email: '', password: '', check_textInputChange: false, secureTextEntry: true })
  const [isLoading, setIsLoading] = React.useState(false)
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

  const onLogin = () => {
    let email = data.email
    let password = data.password
    setIsLoading(true)
    createToken({
      email,
      password,
      successCallBack: userSuccessCallback,
      errorCallback: userErrorCallback
    })
  }
  const openModal = () => {
    
  }
  const userSuccessCallback = () => {
    //navigation.navigate(routes.REGISTER_SCREEN)
    // login({
    //   email,
    //   pass,
    //   successCallBack: tokenSuccessCallback,
    //   errorCallback: tokenErrorCallback
    //   })
    setIsLoading(false)
  }

  const userErrorCallback = () => {
    setIsLoading(false)
    // navigation.navigate(routes.REGISTER_SCREEN)
  }
  return (


    <BaseView statusBarColor={colors.colorPrimary}>

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
          />

          <CustomInput
            text='εδώ, τον κωδικό σου'
            keyboardType="default"
            onChangeText={onEmailChanged}
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={onPasswordChanged}
            onIconPressed={updateSecureTextEntry}
            hasIcon={true}

          />

          <Spacer height={6} />
          <TouchableWithoutFeedback onPress={openModal}>
            <Text style={{ color: '#8b9cb5', alignSelf: 'flex-end' }} >Ξέχασες τον κωδικό σου;</Text>
          </TouchableWithoutFeedback>
          <Spacer height={26} />
          <RoundButton text="Είσοδος" onPress={onLogin} backgroundColor={colors.colorPrimary} />
          <Spacer height={16} />
          <RoundButton text="Εγγραφή" textColor={colors.colorPrimary.toString()} onPress={() => navigation.navigate(routes.REGISTER_SCREEN)} />
        </View>

      </KeyboardAwareScrollView>

    </BaseView>


  );

}

export default LoginScreen

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'column',
    height: 'auto',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.colorPrimary,
  },

  inputStyle: {
    flex: 1,
    color: 'black',

  },
})