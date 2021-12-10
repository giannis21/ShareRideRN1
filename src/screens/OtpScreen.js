import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { InfoPopupModal } from '../utils/InfoPopupModal';
import { Spacer } from '../layout/Spacer';
import Feather from 'react-native-vector-icons/Feather';
import { Loader } from '../utils/Loader';
import { BaseView } from '../layout/BaseView';
import { colors } from '../utils/Colors';
import { CustomInfoLayout } from '../utils/CustomInfoLayout';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const OtpScreen = ({ navigation, route }) => {
  const [data, setData] = React.useState({ email: '', password: '', check_textInputChange: false, secureTextEntry: true })
  const [isLoading, setIsLoading] = React.useState(false)
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [modalInput, setModalInput] = React.useState(false)
  const [areFieldsOkay, setAreFieldsOkay] = React.useState({ areEmpty: false, isPasswordValid: true, isEmailValid: true })
  const [showInfoModal, setShowInfoModal] = React.useState(false);
  const [code, setCode] = React.useState('');
  const { otp, email } = route.params;

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

  const modalSubmit = () => {



  }
  return (

    <BaseView statusBarColor={colors.colorPrimary}>
      <Loader isLoading={isLoading} />
      {/* <CustomInfoLayout
      isVisible={showInfoModal}
      title={"infoMessage"}
      icon={hasErrors ? 'x-circle' : 'check-circle'}
      success={!hasErrors}
    />
  */}
      <View>

        <View style={styles.topContainer}>
          <Feather style={{ alignSelf: 'flex-start' }} name="chevron-left" size={30} color='black' />
          <Text style={{ fontSize: 23, alignSelf: 'center', marginStart: 14, color: 'black', fontWeight: 'bold' }}>Πάμε για επιβεβαίωση</Text>
        </View>

        <Spacer height={45} />

        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
          <View style={{backgroundColor:'white',height:'auto',width:'100%',borderRadius:23}}>
            <Text style={{ fontSize: 17, fontWeight: '900' ,textAlign:'center'}}>5:00</Text>

          </View>
          <Spacer height={45} />
          <Text style={{ fontSize: 17, fontWeight: '900' ,textAlign:'center'}}>Έλαβες έναν 4-ψήφιο κωδικό στο {email}; Πληκτρολόγησέ τον εδώ:</Text>
         
          <OTPInputView
            style={{ width: '70%', height: '30%' }}
            codeInputHighlightStyle={{ borderColor: colors.colorPrimary }}
            pinCount={4}
            autoFocusOnLoad={true}
            codeInputFieldStyle={styles.box}
            onCodeFilled={(code) => {
              console.log("code ", code)
            }}
            code={code}
            onCodeChanged={(c) => setCode(c)}
          />

          <Text style={{ fontSize: 13, fontWeight: '900' ,color:'red'}}>ο κωδικός είναι λάθος ή έχει λήξει</Text>
           <Spacer height={50} />
          <Text style={{ fontSize: 16, fontWeight: '900' ,paddingHorizontal:22,alignSelf:'center',textAlign:'center'}}>δεν έλαβες κάποιο email; Τσέκαρε μήπως πήγε στα σπαμ σου ✉</Text>
          <Spacer height={30} />
     
          <Text style={{ fontSize: 16, fontWeight: 'bold' ,paddingHorizontal:22,alignSelf:'center',textAlign:'center'}}>retry</Text>

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
