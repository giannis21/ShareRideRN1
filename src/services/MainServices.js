
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
export const verifyUser = async ({ email, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()

    const send = {
        "data": {
            "email": email,
        }
    }

    await instance.post(`/verify`, send, config)
        .then(res => {
            console.log(res.data)
            successCallback(res.data.message)
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

    await instance.post(`/searchuser`, send, config)
        .then(res => {
            console.log("searchuser ", res.data)
            successCallback(res.data)
        }).catch(function (error) {
            console.log("error ", error.response.data)
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}

export const getReviews = async ({ email, page, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()

    const send = {
        "data": {
            "email": email,
            "page": page
        }
    }
    // console.log(send)
    await instance.post(`/getReviews`, send, config)
        .then(res => {
            //  console.log(res.data.body)
            successCallback(res.data.body)
        }).catch(function (error) {
            console.log(error.response.data)
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}

export const getPostsUser = async ({ email, page, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()

    const send = {
        "data": {
            "email": email,
            "page": page
        }
    }
    console.log(send)
    await instance.post(`/getPostsUser`, send, config)
        .then(res => {
            console.log("getPostsUser ", res.data)
            successCallback(res.data)
        }).catch(function (error) {
            console.log(error)
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}

export const getInterested = async ({ email, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()

    const send = {
        "data": {
            "email": email,
        }
    }
    console.log(send)
    await instance.post(`/getInterested`, send, config)
        .then(res => {
            console.log("getInterested ", res.data)
            //  successCallback(res.data)
        }).catch(function (error) {
            console.log(error)
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}

