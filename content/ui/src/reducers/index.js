import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import fetchReducer from './fetchReducer';
import { VALUES } from '../actions/values';

export default combineReducers({
  router: routerReducer,
  values: fetchReducer(VALUES)
});
