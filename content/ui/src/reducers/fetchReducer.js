import { createFetchActionTypes } from '../actions/createFetchActions';

const defaultState = {
  isLoading: false,
};

export default function fetchReducer(apiName) {
  const actionTypes = createFetchActionTypes(apiName);
  return (state = defaultState, { type, payload, meta, error }) => {
    switch (type) {
      case actionTypes.request.type:
        return { ...state, ...payload, error, isLoading: !error };

      case actionTypes.success.type:
        return { ...state, ...payload, isLoading: false };

      case actionTypes.failure.type:
        return { ...state, error: payload, isLoading: false };

      default:
        return state;
    }
  };
}
