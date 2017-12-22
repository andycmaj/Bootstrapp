import { RSAA } from 'redux-api-middleware';
import { uniq, concat, mergeWith } from 'ramda';

const mergePlan = (x, y) => {
  if (Array.isArray(x) && Array.isArray(y)) {
    return uniq(concat(x, y));
  }

  if (typeof x === 'object' && typeof y === 'object') {
    return mergeWith(mergePlan, x, y);
  }

  return y;
};

const deepMerge = mergeWith(mergePlan);

const createFetchActions = (
  apiName,
  { url, method = 'GET', actionTypeOverrides = {} }
) => {
  const actionTypes = deepMerge(
    createFetchActionTypes(apiName, url),
    actionTypeOverrides
  );

  return {
    [RSAA]: {
      method,
      endpoint: url,
      credentials: 'include',
      options: {
        redirect: 'follow',
      },
      headers: {
        Accept: 'application/json',
      },
      types: [actionTypes.request, actionTypes.success, actionTypes.failure],
    },
  };
};

export const createFetchActionTypes = (apiName, url) => ({
  request: {
    type: `FETCH_REQUEST_${apiName}`,
    meta: { apiName, url, type: 'FETCH_REQUEST' },
  },
  success: {
    type: `FETCH_SUCCESS_${apiName}`,
    meta: { apiName, url, type: 'FETCH_SUCCESS' },
  },
  failure: {
    type: `FETCH_FAILURE_${apiName}`,
    meta: { apiName, url, type: 'FETCH_FAILURE' },
  },
});

export default createFetchActions;
