import { LOGIN_USER, LOGOUT, SIGNUP_CHECK } from '../actions/types';

export const CONTRACT_TYPE = {
  HOME: 'RES',
  BUSINESS: 'Business'
};

// export const EMAIL_STATUS = {
//   NOT_MODIFIED: 'notModified',
//   VERIFICATION: 'verification',
//   VERIFICATED: 'verificated'
// };

const intialState = {
  user: {
    lastLoginDate: '',
    age: '',
    car: '',
    carDate: '',
    email: '',
    facebook: '',
    fullName: '',
    gender: '',
    instagram: '',
    phone: '',
    password: '',
    token: ''
  },

};

export function AuthReducer(state = intialState, action) {
  console.log("reducer calledn\n\n\n\n\n\n", action.payload)
  switch (action.type) {
    case LOGIN_USER:
      return {
        user: action.payload
      };
    case SIGNUP_CHECK:
      return {
        ...state,
        check: action.payload
      };
    case LOGOUT:
      return {
        ...intialState,
        user: {}
      };
    default:
      return state;
  }
}