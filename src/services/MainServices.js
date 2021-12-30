
import axios from "axios";
import instance from "../network/api";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch } from "react-redux";
import * as types from '../actions/types'
import { getHeaderConfig } from "../utils/Functions";
import { getValue, setValue, keyNames } from '../utils/Storage'
import { constVar } from "../utils/constStr";


export const rateUser = async ({ email, emailreviewer, rating, text, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()

    const send = {
        "data": {
            "email": email,
            "emailreviewer": emailreviewer,
            "rating": rating,
            "text": text
        }
    }

    await instance.post(`/createreview`, send, config)
        .then(res => {
            console.log(res.data)
            successCallback(res.data.message, res.data.average)
        }).catch(function (error) {
            console.log("error ", error.response.data)
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}

export const searchUser = async ({ email, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()

    const send = {
        "data": {
            "email": email,
        }
    }
    console.log("send ", send)
    await instance.post(`/searchuser`, send, config)
        .then(res => {
            console.log("res.data ", res.data)
            successCallback(res.data)
        }).catch(function (error) {
            console.log("error ", error.response.data)
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}

