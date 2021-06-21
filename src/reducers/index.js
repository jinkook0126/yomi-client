import { combineReducers } from 'redux';
import auth from './auth';
import modal from './modal';
import furniture from './furniture'

export default combineReducers({
    auth,
    modal,
    furniture
});