import { ADD_ACTIVE_POST, ADD_END_DATE, ADD_START_DATE, DELETE_ACTIVE_USER, LOGIN_USER, LOGOUT, SET_RADIO_SELECTED, SIGNUP_CHECK } from '../actions/types';
import { constVar } from '../utils/constStr';


const intialState = {

    email: "",
    date: "",
    startplace: "",
    startcoord: "",
    endplace: "",
    endcoord: "",
    numseats: 1,
    startdate: constVar.initialDate, //
    enddate: constVar.endDate,  //
    costperseat: 0,
    comment: "",
    moreplaces: [],
    radioSelected: 0,

    activePost: {}
};

export function PostReducer(state = intialState, action) {

    switch (action.type) {

        case ADD_START_DATE:

            return {
                ...state,
                startdate: state.startdate = action.payload
            };
        case ADD_END_DATE:
            return {
                ...state,
                enddate: state.enddate = action.payload
            };
        case SET_RADIO_SELECTED:
            return {
                ...state,
                radioSelected: state.radioSelected = action.payload
            };
        case ADD_ACTIVE_POST:
            return {
                ...state,
                activePost: state.activePost = action.payload
            };
        case DELETE_ACTIVE_USER: {
            const { activePost } = state
            let users = activePost.users.filter((obj) => obj.piid !== action.payload)
            activePost.users = users
            return {
                ...state,
                activePost: state.activePost = activePost
            };
        }
        default:
    }

    return state;

}
