import * as React from 'react';
import { View, Text ,StyleSheet,Button} from 'react-native';
const RegisterScreen = ({navigation}) => {


    const goToLogin =() =>{
         navigation.goBack()
    }
    const goToOtp =() =>{
         navigation.navigate('Otp')
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Register Screen</Text>
        <Button title="goback" onPress={goToLogin} />
        <Button title="go to otp" onPress={goToOtp} />
      </View>
    );

}
 
export default RegisterScreen
  
const styles = StyleSheet.create({

})      