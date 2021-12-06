import * as React from 'react';
import { View, Text ,StyleSheet,Button} from 'react-native';
const OtpScreen = ({navigation}) => {


    const goToLogin =() =>{
         navigation.popToTop()
    }

    const goToRestorePass =() =>{
         navigation.navigate("RestorePassword")
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>OTP Screen</Text>
        <Button title="goToLogin" onPress={goToLogin} />
        <Button title="goToRestore" onPress={goToRestorePass} />
        {/* <Button title="goToLogin" onPress={goToOtp} /> */}
      </View>
    );

}
 
export default OtpScreen
  
const styles = StyleSheet.create({

})      