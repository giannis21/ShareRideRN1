
import axios from "axios";
import instance from "../network/api";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch } from "react-redux";
import * as types from '../actions/types'
import { getHeaderConfig } from "../utils/Functions";
export const createToken = async ({ email, password, successCallBack, errorCallback }) => {
  
  const send = {
    "data": {
      "email": email,
      "pass": password
    }
  }  
  console.log("res.data.body.accessToken",send)
  await instance.post(`/createtoken`, send)
    .then(res => {
      console.log(res.data.body.accessToken)
      storeValue('token', res.data.body.accessToken)

       login(send,res.data.body.accessToken,successCallBack,errorCallback)
      
      let config = getHeaderConfig(res.data.body.accessToken)
    
      instance.post(`/login`, send, config)
        .then(res => {
       console.log("asasasasas",res.data )
          if(res.data.body !== null){
          // storeInfoLocally(res.data)
           successCallBack()
          //   console.log("asasasasas" )
          }else{
            errorCallback()
          }
        }).catch(function (error) {
          console.log("error", error.message)
           errorCallback()
        });


    }).catch(function (error) {
      console.log("error", error.message)
      errorCallback()
    });

};

const storeValue = async (key, token) => {
  try {
    await AsyncStorage.setItem(key, token);
  } catch (error) { }

};

const login = ({ send, token, successCallBack, errorCallback }) => {




};

const storeInfoLocally = (res) => {
  try{
    const d = new Date();
    console.log("res",  res.body.user.instagram)
  
    storeValue('lastLoginDate', d.getTime().toString())
    storeValue('age', res.body.user.age)
    storeValue('car', res.body.user.car)
    storeValue('carDate', res.body.user.cardate)
    storeValue('email', res.body.user.email)
    storeValue('facebook', res.body.user.facebook)
    storeValue('fullName', res.body.user.fullname)
    storeValue('gender', res.body.user.gender ?? "")
    storeValue('instagram', res.body.user.instagram ?? "")
    storeValue('phone', res.body.user.mobile)
    storeValue('password', res.body.user.password)
  
  }catch(err){

  }
 

}
