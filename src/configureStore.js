import { createStore, combineReducers } from 'redux';
import { PostReducer } from './reducers/PostReducer';

const rootReducer = combineReducers(
    { postReducer: PostReducer }
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;