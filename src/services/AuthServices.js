
import axios from "axios";
import instance from "../network/api";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch } from "react-redux";
import * as types from '../actions/types'
import { getHeaderConfig } from "../utils/Functions";
import { getValue, setValue, keyNames } from '../utils/Storage'
import { constVar } from "../utils/constStr";
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

      login({ send: send, token: token, successCallBack: successCallBack, errorCallback: errorCallback })


    }).catch(function (error) {
      console.log(error.response.data)
      errorCallback(error.response.data.message ?? constVar.sthWentWrong)
    });

};


const login = async ({ send, token, successCallBack, errorCallback }) => {
  let config = await getHeaderConfig(token)
  await instance.post(`/login`, send, config)
    .then(res => {
      console.log(res.data)
      storeInfoLocally(res.data)
      successCallBack(res.data.message)

    }).catch(function (error) {
      console.log(error.response.data)
      errorCallback(error.response.data.message ?? constVar.sthWentWrong)
    });

};

export const forgotPass = async ({ email, successCallBack, errorCallback }) => {

  let config = getHeaderConfig()
  const send = {
    "data": {
      "email": email
    }
  }
  console.log(config)
  await instance.post(`/passotp`, send, config)
    .then(res => {
      console.log("passotp called ", res.data)
      successCallBack(res.data.otp, email, res.data.message)


    }).catch(function (error) {
      console.log(error.response.data)
      errorCallback(error.response.data.message ?? constVar.sthWentWrong)
    });


};

export const restorePassword = async ({ password, successCallBack, errorCallback }) => {

  let config = await getHeaderConfig()
  let email = await getValue(keyNames.email)

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
      errorCallback(error.response.data.message ?? constVar.sthWentWrong)
    });


};

export const uploadImage = async (email, singleFile, successCallBack, errorCallback) => {
  let config = await getHeaderConfig()
  config.headers = { ...config.headers, "Content-Type": "multipart/form-data" };

  var data = new FormData();
  data.append('upload', {
    uri: singleFile,
    name: email + '.jpeg',
    type: 'image/*'
  })

  await instance.post(`/upload`, data, config)
    .then(res => {

      successCallBack()

    }).catch(function (error) {
      console.log("error ", error)
      errorCallback(error.response.data.message ?? constVar.sthWentWrong)
    });

};

export const registerUser = async (data, successCallBack, errorCallback) => {
  let config = await getHeaderConfig()

  const send = {
    "data": {
      "email": data.email,
      "password": data.password,
      "mobile": data.phone,
      "fullname": data.fullName,
      "gender": data.checked,
      "car": data.carBrand,
      "cardate": data.carDate,
      "age": data.age,
      "photo": "1"
    }
  }
  await instance.post(`/register`, send, config)
    .then(res => {
      console.log("data ", res.data.body.message, res.data.body.otp)
      successCallBack(res.data.body.message, res.data.body.otp)
    }).catch(function (error) {
      errorCallback(error.response.data.message ?? constVar.sthWentWrong)
    });
}

const storeInfoLocally = (res) => {
  try {
    const d = new Date();


    setValue(keyNames.lastLoginDate, d.getTime().toString())
    setValue(keyNames.age, res.user.age)
    setValue(keyNames.car, res.user.car)
    setValue(keyNames.carDate, res.user.cardate)
    setValue(keyNames.email, res.user.email)
    setValue(keyNames.facebook, res.user.facebook ?? "-")
    setValue(keyNames.fullName, res.user.fullname)
    setValue(keyNames.gender, res.user.gender ?? "-")
    setValue(keyNames.instagram, res.user.instagram ?? "-")
    setValue(keyNames.phone, res.user.mobile.toString())
    setValue(keyNames.password, res.user.password.toString())

  } catch (err) {

  }


}
