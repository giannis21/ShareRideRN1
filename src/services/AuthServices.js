
import axios from "axios";
import instance from "../network/api";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch } from "react-redux";
import * as types from '../actions/types'
import { getHeaderConfig } from "../utils/Functions";
import {getValue, setValue,keyNames} from '../utils/Storage'
export const createToken = async ({ email, password, successCallBack, errorCallback }) => {
  
  const send = {
    "data": {
      "email": email,
      "pass": password
    }
  }  
 
  await instance.post(`/createtoken`, send)
    .then(res => {
 
      let token = res.data.accessToken
     
      setValue(keyNames.token, token)

      login({send:send,token:token,successCallBack:successCallBack,errorCallback:errorCallback})
      
    
    }).catch(function (error) {
        errorCallback(error.response.data.message ?? 'Ουπς, κάτι πήγε λάθος')
    });

};
 

const login = async({ send, token, successCallBack, errorCallback} ) => {
  let config = getHeaderConfig(token)
 
  await instance.post(`/login`, send, config)
    .then(res => {
      storeInfoLocally(res.data)
   
      successCallBack()
       
    }).catch(function (error) {
      errorCallback(error.response.data.message ?? 'Ουπς, κάτι πήγε λάθος')
    });

};

export const forgotPass = async ({ email,successCallBack, errorCallback }) => {
  
  let config = getHeaderConfig()
  const send = {
    "data": {
      "email": email   
    }
  }  
  console.log(config)
  await instance.post(`/passotp`, send, config)
    .then(res => {
       console.log("passotp called ",res.data) 
       successCallBack(res.data.otp,email)
 
       
    }).catch(function (error) {
      errorCallback(error.response.data.message ?? 'Ουπς, κάτι πήγε λάθος')
    });


};

export const restorePassword = async ({password, successCallBack, errorCallback }) => {
  
  let config = await getHeaderConfig()
  let email=  await getValue(keyNames.email) 

  const send = {
    "data": {
      "email": email,
      "pass": password
    }
  }  

  await instance.post(`/updateUserPass`, send, config)
    .then(res => {
       successCallBack(res.data.message)
    }).catch(function (error) {
      errorCallback(error.response.data.message ?? 'Ουπς, κάτι πήγε λάθος')
    });


};

const storeInfoLocally = (res) => {
  try{
    const d = new Date();
    console.log("resdfsdfss",  res.user)
  
    setValue('lastLoginDate', d.getTime().toString())
    setValue('age', res.user.age)
    setValue('car', res.user.car)
    setValue('carDate', res.user.cardate)
    setValue('email', res.user.email)
    setValue('facebook', res.user.facebook)
    setValue('fullName', res.user.fullname)
    setValue('gender', res.user.gender ?? "")
    setValue('instagram', res.user.instagram ?? "")
    setValue('phone', res.user.mobile)
    setValue('password', res.user.password)
  
  }catch(err){

  }
 

}
