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
      age : '',
      car : '',
      carDate : '',
      email : '',
      facebook : '',
      fullName: '',
      gender : '',
      instagram : '',
      phone : '',
      password: '',
      token : ''
  },
  
};

export function AuthReducer(state = intialState, { payload, type }) {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        user: { ...payload }
      };
    case SIGNUP_CHECK:
      return {
        ...state,
        check: { ...payload }
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