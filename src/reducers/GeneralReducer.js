import { HIDE_BOTTOM_TAB } from '../actions/types';
import { constVar } from '../utils/constStr';


const intialState = {
    isSearchOpened: false
};

export function GeneralReducer(state = intialState, action) {

    switch (action.type) {

        case HIDE_BOTTOM_TAB:
            return {
                ...state,
                isSearchOpened: state.isSearchOpened = action.payload
            };

        default:
    }

    return state;

}
