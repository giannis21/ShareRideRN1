export const getHeaderConfig =(token) => {
    let config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
       }
    return config
  }