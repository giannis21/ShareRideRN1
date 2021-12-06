
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
      "pass": "11111"
    }
  }  

  await instance.post(`/createtoken`, send)
    .then(res => {
      console.log(res.data.body.accessToken)
      storeValue('token', res.data.body.accessToken)

      //  login(send,res.data.body.accessToken,successCallBack,errorCallback)
      
      let config = getHeaderConfig(res.data.body.accessToken)
      console.log("eeeee",config)

      instance.post(`/login`, send, config)
        .then(res => {
          console.log(res.data)
          if(res.data?.error?.code === 200){
            storeInfoLocally(res.data)
            successCallBack()
          }
          
        }).catch(function (error) {
          console.log("error", error.message)

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
  const d = new Date();
  console.log("res", res)
  storeValue('lastLoginDate', d.getTime().toString())
  storeValue('age', res.body.user.age)
  storeValue('car', res.body.user.car)
  storeValue('carDate', res.body.user.cardate)
  storeValue('email', res.body.user.email)
  storeValue('facebook', res.body.user.facebook)
  storeValue('fullName', res.body.user.fullname)
  storeValue('gender', res.body.user.gender)
  storeValue('instagram', res.body.user.instagram)
  storeValue('phone', res.body.user.mobile)
  storeValue('password', res.body.user.password)


}
