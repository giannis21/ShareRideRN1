import * as React from 'react';
import { View, Text, StyleSheet, Button, Platform, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ceil } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BaseView } from '../layout/BaseView';
import { Spacer } from '../layout/Spacer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RoundButton } from '../Buttons/RoundButton';
import { colors } from '../utils/Colors';
import { routes } from '../navigation/RouteNames';
import { createToken } from '../services/AuthServices';
const LoginScreen = ({ navigation }) => {
  const [data, setData] = React.useState({ email: '', password: '', check_textInputChange: false, secureTextEntry: true })

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

  const onLogin= () => {
     let email= data.email
     let password = data.password
     console.log("asasasas"+data.password)
     createToken({
      email,
      password,
      successCallBack: tokenSuccessCallback,
      errorCallback: tokenErrorCallback
      })
  }
  const tokenSuccessCallback =() => {
    //navigation.navigate(routes.REGISTER_SCREEN)
    // login({
    //   email,
    //   pass,
    //   successCallBack: tokenSuccessCallback,
    //   errorCallback: tokenErrorCallback
    //   })
  }

  const tokenErrorCallback =() => {
    navigation.navigate(routes.REGISTER_SCREEN)
  }
  return (


    <BaseView  statusBarColor={colors.colorPrimary}>
      <KeyboardAwareScrollView 
       extraScrollHeight ={Platform.OS === 'ios'? 20: 0}
       showsVerticalScrollIndicator={false}
       automaticallyAdjustContentInsets={true}
       bounces={true}
       keyboardShouldPersistTaps={'handled'}>
        <View>
          <View style={styles.SectionStyle}>

          <Spacer height={15} />

          <Feather style={{alignSelf:'center'}} name="eye-off" size={80} color='grey' />

          <Spacer height={35} />

            <Text style={{ color: '#8b9cb5' }}>εδώ, δίνεις το email σου</Text>

            <Spacer height={10} />

            <TextInput
              style={styles.inputStyle}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
              onChangeText={onEmailChanged}/>
            
          </View>
          
          <View style={styles.SectionStyle}>

            <Text style={{ color: '#8b9cb5' }} >εδώ, τον κωδικό σου</Text>
            <Spacer height={10} />

            <View style={{flexDirection:'row'}}>
              <TextInput
              style={styles.inputStyle}
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
              returnKeyType='done'
              blurOnSubmit={false}
              secureTextEntry={data.secureTextEntry ? true : false}
              underlineColorAndroid="#f000"
              returnKeyType="next"
              onChangeText={onPasswordChanged}/>
            
            <TouchableOpacity style={{marginRight:10}} onPress ={updateSecureTextEntry}>
              {data.secureTextEntry ?
               <Feather style={{color:colors.colorPrimary}} name="eye-off" size={20} color='grey' /> : 
               <Feather style={{color:colors.colorPrimary}} name="eye" size={20} color='grey' />}
            </TouchableOpacity>
            </View>
            
          </View>
          <Spacer height={6}/>
          <Text style={{ color: '#8b9cb5', alignSelf:'flex-end' }} >Ξέχασες τον κωδικό σου;</Text>
          <Spacer height={26}/>
          <RoundButton text="Είσοδος" onPress={onLogin} backgroundColor={colors.colorPrimary}/>
          <Spacer height={16}/>
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