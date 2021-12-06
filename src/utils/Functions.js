export const getHeaderConfig =(token) => {
    let config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpYW5uaXNmcmFnb3VsaXMyMUBnbWFpbC5jb20iLCJkYXRhIjoiMjAyMS0xMi0wNlQxOToxMjo1OC4zMTJaIiwiaWF0IjoxNjM4ODE3OTc4LCJleHAiOjE2NDQwMDE5Nzh9.XZUdbncHHmiNmFH666ZUhG56gbQ5QhFQz5-0g32D6p0" + token
        }
       }
    return config
  }