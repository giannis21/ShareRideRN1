
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
            successCallback(res.data)
        }).catch(function (error) {
            console.log("error ", error.response.status, error.response.data)
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
    await instance.post(`/getPostsUser`, send, config)
        .then(res => {
            successCallback(res.data)
        }).catch(function (error) {
            console.log(error)
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}

export const getInterestedInMe = async ({ email, page, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()

    const send = {
        "data": {
            "email": email,
            "page": page
        }
    }

    await instance.post(`/getInterested`, send, config)
        .then(res => {

            successCallback(res.data)
        }).catch(function (error) {
            console.log(error)
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}

export const getInterestedPerUser = async ({ email, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()

    const send = {
        "data": {
            "email": email,
        }
    }
    await instance.post(`/getInterestedPerUser`, send, config)
        .then(res => {
            successCallback(res.data)
        }).catch(function (error) {
            console.log(error)
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}


export const showInterest = async ({ email, postId, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()

    const send = {
        "data": {
            "email": email,
            "postid": postId
        }
    }
    await instance.post(`/interested`, send, config)
        .then(res => {

            successCallback(res.data.message)
        }).catch(function (error) {

            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}

export const deletePost = async ({ postID, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()

    const send = {
        "data": {
            "postid": postID
        }
    }
    await instance.post(`/deletePost`, send, config)
        .then(res => {
            successCallback(res.data.message)
        }).catch(function (error) {
            console.log(error.response.data, "dd")
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}

export const createPost = async ({ data, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()
    await instance.post(`/createpost`, data, config)
        .then(res => {
            successCallback(res.data.message)
        }).catch(function (error) {
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}

export const getInterestedPerPost = async ({ postId, page, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()

    const send = {
        "data": {
            "postid": postId,
            "page": page
        }
    }

    await instance.post(`/getIntPost`, send, config)
        .then(res => {
            successCallback(res.data)
        }).catch(function (error) {
            console.log("getIntPost", error)
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}
export const searchForPosts = async ({ sendObj, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()

    await instance.post(`/searchposts`, sendObj, config)
        .then(res => {
            let itemStringified = JSON.stringify(res.data.body.postUser)
            let itemStringified1 = JSON.parse(itemStringified)
            successCallback(res.data)
        }).catch(function (error) {
            console.log("searchposts", error)
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}

export const deleteInterested = async ({ piid, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()

    const send = {
        "data": {
            "piid": piid
        }
    }

    await instance.post(`/deleteInterested`, send, config)
        .then(res => {
            successCallback(res.data.message)
        }).catch(function (error) {
            console.log(error.response.data, error.response.status)
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}

export const verInterested = async ({ postid, piid, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()

    const send = {
        "data": {
            "postid": postid,
            "piid": piid
        }
    }

    await instance.post(`/verInterested`, send, config)
        .then(res => {
            successCallback(res.data.message)
        }).catch(function (error) {
            console.log(error.response.data, error.response.status)
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}

export const getAutoComplete = async ({ value, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()

    await instance.get(`/autocomplete/json?input=${value}`, config)
        .then(res => {
            successCallback(res.data.predictions)
        }).catch(function (error) {
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}
export const getPlaceInfo = async ({ place_id, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()

    await instance.get(`/details/json?place_id=${place_id}`, config)
        .then(res => {

            successCallback(res.data.result.geometry.location.lat + "," + res.data.result.geometry.location.lng)
        }).catch(function (error) {
            console.log(error)
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}

export const updateProfile = async ({ sendObj, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()

    await instance.post(`/updateProfile`, sendObj, config)
        .then(res => {

            successCallback(res.data.message)
        }).catch(function (error) {

            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}
export const createRequest = async ({ data, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()
    await instance.post(`/createRequest`, data, config)
        .then(res => {
            successCallback(res.data.message)
        }).catch(function (error) {
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}
export const deleteRequest = async ({ data, successCallback, errorCallback }) => {
    let config = await getHeaderConfig()
    await instance.post(`/deleteRequest`, data, config)
        .then(res => {
            successCallback(res.data.message)
        }).catch(function (error) {
            console.log(error.response.data.message)
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
}
export const getRequests = async ({ successCallback, errorCallback }) => {
    let config = await getHeaderConfig()
    await instance.post('/getRequests', {}, config)
        .then(res => {

            // dispatch({
            //     type: types.GET_REQUESTS,
            //     payload: res.data
            // })
            successCallback(res.data.requests)
        }).catch(function (error) {
            console.log(error.response.data)
            errorCallback(error.response.data.message ?? constVar.sthWentWrong)
        });
    // return async (dispatch) => {



    //     await instance.post('/getRequests', {}, config)
    //         .then(res => {
    //             console.log(res.data)
    //             dispatch({
    //                 type: types.GET_REQUESTS,
    //                 payload: res.data
    //             })

    //         }).catch(function (error) {
    //             console.log(error.response.data)
    //             errorCallback(error.response.data.message ?? constVar.sthWentWrong)
    //         });
    // }

}

export const resetValues = (callback) => {
    try {

        setValue(keyNames.lastLoginDate, '')
        setValue(keyNames.age, '')
        setValue(keyNames.car, '')
        setValue(keyNames.carDate, '')
        setValue(keyNames.email, '')
        setValue(keyNames.facebook, "-")
        setValue(keyNames.fullName, '')
        setValue(keyNames.gender, "")
        setValue(keyNames.instagram, "-")
        setValue(keyNames.phone, '')
        setValue(keyNames.password, '')
        callback()
    } catch (err) {
        console.log(err)
    }
}

export const addActivePost = ({ post }) => {
    return async dispatch => {
        dispatch({
            type: types.ADD_ACTIVE_POST,
            payload: post
        })
    };
};