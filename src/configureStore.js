import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { PostReducer } from './reducers/PostReducer';
import { AuthReducer } from './reducers/AuthReducer';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers(
    { postReducer: PostReducer },
    { authReducer: AuthReducer }
);
//const configureStore = createStore(rootReducer)
const configureStore = () => {
    return createStore(rootReducer);
}


export default configureStore;