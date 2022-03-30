import { HIDE_BOTTOM_TAB, SET_TERMS } from '../actions/types';
import { constVar } from '../utils/constStr';


const intialState = {
    isSearchOpened: false,
    terms: ''
};

export function GeneralReducer(state = intialState, action) {

    switch (action.type) {

        case HIDE_BOTTOM_TAB:
            return {
                ...state,
                isSearchOpened: state.isSearchOpened = action.payload
            };
        case SET_TERMS:
            return {
                ...state,
                terms: state.terms = action.payload
            };

        default:
    }

    return state;

}
