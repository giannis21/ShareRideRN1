import { LOGIN_USER, LOGOUT, SIGNUP_CHECK, SET_PROFILE_PHOTO, ADD_AVERAGE } from '../actions/types';

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
    token: '',
    average: '0',
    count: '0',
    photoProfile: ''
  },


};

export function AuthReducer(state = intialState, action) {
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
    case SET_PROFILE_PHOTO:
      return {
        ...state,
        user: {
          ...state.user,
          photoProfile: action.payload
        }

      };
    case LOGOUT:
      return {
        ...intialState,
        user: {}
      };
    case ADD_AVERAGE:
      return {
        ...intialState,
        user: {
          ...state.user,
          average: action.payload.average,
          count: action.payload.count
        }
      };
    default:
      return state;
  }
}