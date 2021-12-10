import { setValue, getValue } from "../utils/Storage";

export const getHeaderConfig =(token) => {
  let newToken  = token ? token : getValue('token')
    let config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + newToken
        }
       }
    return config
  }
 