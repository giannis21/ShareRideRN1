import * as React from 'react';
import { View, Text ,StyleSheet,Button} from 'react-native';
const RestorePasswordScreen = ({navigation}) => {


    const goToLogin =() =>{
         navigation.popToTop()
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Restore pass Screen</Text>
        <Button title="goToLogin" onPress={goToLogin} />
        {/* <Button title="goToLogin" onPress={goToOtp} /> */}
      </View>
    );

}
 
export default RestorePasswordScreen
  
const styles = StyleSheet.create({

})      