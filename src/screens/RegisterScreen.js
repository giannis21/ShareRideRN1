import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Platform, TextInput, Image } from 'react-native';
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
import ActionSheet from 'react-native-actionsheet';
import { onLaunchCamera, onLaunchGallery } from '../utils/Functions';
import { CheckBox } from 'react-native-elements';

const RegisterScreen = ({ navigation }) => {
     let initalData = { email: '', password: '', passwordConfirmed: '', secureTextEntry: true, secureTextEntryConfirmed: true, fullName: '', phone: '', age: '', gender: 'man' }
     const [data, setData] = React.useState(initalData)
     const [isLoading, setIsLoading] = React.useState(false)
     const [isModalVisible, setIsModalVisible] = React.useState(false)
     const [modalInput, setModalInput] = React.useState(false)
     const [areFieldsOkay, setAreFieldsOkay] = React.useState({ areEmpty: false, isPasswordValid: true, isEmailValid: true })
     const [showInfoModal, setShowInfoModal] = React.useState(false);
     const [checked, setChecked] = React.useState('man');
     const [singleFile, setSingleFile] = useState(null);

     const actionSheetRef = useRef();
     const showActionSheet = () => {
          actionSheetRef.current.show();
     };
     const goToLogin = () => {
          navigation.goBack()
     }
     const goToOtp = () => {
          navigation.navigate('Otp')
     }

     React.useEffect(() => {
          const unsubscribe = navigation.addListener('focus', () => {
               setData(initalData)
               setIsModalVisible(false)
               setShowInfoModal(false)
               console.log("email", data.email)
          });

          return unsubscribe;
     }, [navigation]);


     const goToRegister = () => {
          navigation.navigate('Register')
     }
     const onEmailChanged = (value) => {
          setData({ ...data, email: value })
     }
     const onPhoneChanged = (value) => {
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
     const onActionSheet = (index) => {
          switch (index) {
               case 0:
                    return null
               case 1:
                    return onLaunchCamera((data) => {
                         setSingleFile(data)
                         //uploadPhoto(data);
                    });
               case 2:
                    return onLaunchGallery((data) => {
                         //uploadPhoto(data);
                    });
          }
     };

     const selectFile = () => {

          var options = {
               title: 'Select Image',
               customButtons: [
                    {
                         name: 'customOptionKey',
                         title: 'Choose file from Custom Option'
                    },
               ],

               storageOptions: {
                    skipBackup: true,
                    path: 'images',
               },

          };



     };

     return (


          <BaseView statusBarColor={colors.colorPrimary}>
               <Loader isLoading={isLoading} />
               <CustomInfoLayout
                    isVisible={showInfoModal}
                    title={"asas"}
                    icon={true ? 'x-circle' : 'check-circle'}
                    success={!true}
               />
               <ActionSheet
                    ref={actionSheetRef}
                    options={['Elimina foto', 'Scatta foto', 'Scegli foto', 'Annulla']}
                    destructiveButtonIndex={0}
                    cancelButtonIndex={3}
                    onPress={(index) => onActionSheet(index)}
               />
               <KeyboardAwareScrollView
                    extraScrollHeight={Platform.OS === 'ios' ? 20 : 0}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={true}
                    bounces={true}
                    keyboardShouldPersistTaps={'handled'}>
                    <View>

                         <Spacer height={35} />



                         <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                              <TouchableWithoutFeedback style={styles.circleContainer} onPress={selectFile}>
                                   <View style={[{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }]} >
                                        <Image source={require('../assets/images/profile.png')} style={[{ width: 70, height: 70 }, styles.circle]} />
                                   </View>


                                   <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 4 }}>
                                        <View style={[{ borderRadius: 20, position: 'absolute', backgroundColor: 'white', width: 39, height: 39, justifyContent: 'center' }]}>
                                             <Feather style={{ alignSelf: 'center' }} name="camera" size={27} color='black' />
                                        </View>
                                   </View>

                              </TouchableWithoutFeedback>

                         </View>

                         <Spacer height={35} />

                         <CustomInput
                              text='εδώ, δίνεις το email σου'
                              keyboardType="email-address"
                              onChangeText={onEmailChanged}
                              value={data.email}
                         />

                         <CustomInput
                              text='ονοματεπώνυμο'
                              keyboardType="default"
                              onChangeText={onEmailChanged}
                              value={data.email}
                         />
                         <CustomInput
                              text='αριθμός τηλεφώνου'
                              keyboardType="default"
                              onChangeText={onPhoneChanged}
                              value={data.email}
                         />
                         <CustomInput
                              text='ηλικία'
                              keyboardType="numeric"
                              onChangeText={onEmailChanged}
                              value={data.email}
                         />
                         <Spacer height={16} />
                         <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                              <Text style={{ alignSelf: 'center', fontWeight: 'bold', marginEnd: 16 }}>Φυλο</Text>
                              <CheckBox
                                   center
                                   title='Άντρας'
                                   checkedIcon='check-square-o'
                                   uncheckedIcon='square-o'
                                   checked={checked === 'man' ? true : false}
                                   onPress={() => setChecked('man')}
                              />
                              <CheckBox
                                   center
                                   title='Γυναίκα'
                                   checkedIcon='check-square-o'
                                   uncheckedIcon='square-o'
                                   checked={checked === 'woman' ? true : false}
                                   onPress={() => setChecked('woman')}
                              />



                         </View>

                         <CustomInput
                              text='εδώ, τον κωδικό σου'
                              keyboardType="default"
                              secureTextEntry={data.secureTextEntry ? true : false}
                              onChangeText={onPasswordChanged}
                              onIconPressed={updateSecureTextEntry}
                              hasIcon={true}
                              value={data.password}
                         />


                         <CustomInput
                              text='επιβεβαίωση κωδικού'
                              keyboardType="default"
                              secureTextEntry={data.secureTextEntry ? true : false}
                              onChangeText={onPasswordChanged}
                              onIconPressed={updateSecureTextEntry}
                              hasIcon={true}
                              value={data.password}
                         />
                         <Spacer height={6} />
                         <Text style={{ fontSize: 13, color: '#8b9cb5' }}>*Ο κωδικός αποτελείται απο 5 χαρακτήρες και άνω</Text>
                         <Spacer height={16} />
                         <View style={{ width: '100%', backgroundColor: colors.CoolGray1.toString(), height: 2 }} />
                         <Spacer height={26} />
                         <RoundButton
                              text="Εγγραφή"
                              onPress={() => { }}
                              backgroundColor={colors.colorPrimary} />
                         <Spacer height={16} />

                         <RoundButton
                              text="Είσοδος"
                              textColor={colors.colorPrimary.toString()}
                              onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
                         />

                         <Spacer height={26} />
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
               </KeyboardAwareScrollView>

          </BaseView >

     );


}

export default RegisterScreen

const styles = StyleSheet.create({
     circle: {
          borderRadius: 100 / 2,
     },
     circleContainer: {

          width: 100,
          height: 100,
          borderRadius: 100 / 2,
          backgroundColor: colors.Gray2,
     },
})      
