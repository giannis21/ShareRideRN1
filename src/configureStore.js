import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { PostReducer } from './reducers/PostReducer';
import { AuthReducer } from './reducers/AuthReducer';

const AppReducers = combineReducers({
    authReducer: AuthReducer,
    postReducer: PostReducer
})
// const AppReducers = combineReducers(
//     { authReducer: AuthReducer },
//     { postReducer: PostReducer },


const rootReducer = (state, action) => {
    return AppReducers(state, action)
}
const logger = createLogger()
//const configureStore = createStore(rootReducer)


let configureStore = createStore(rootReducer, compose(applyMiddleware(thunk)));
export default configureStore;