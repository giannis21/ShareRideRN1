import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { PostReducer } from './reducers/PostReducer';
import { AuthReducer } from './reducers/AuthReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers(

    { postReducer: PostReducer },
    { authReducer: AuthReducer }
);
//const configureStore = createStore(rootReducer)


const configureStore = createStore(
    rootReducer,
    applyMiddleware(thunk)
);
export default configureStore;