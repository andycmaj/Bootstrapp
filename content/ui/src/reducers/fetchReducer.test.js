import fetchReducer from './fetchReducer';
import { createFetchActionTypes } from '../actions/createFetchActions';

describe('fetchReducer', () => {
  const reducer = fetchReducer('TEST');
  const actionTypes = createFetchActionTypes('TEST');

  const inState = {
    foo: 'foo',
    bar: 42,
  };

  it('should return correct payload for request actiontype', () => {
    const action = {
      ...actionTypes.request,
      payload: {
        requested: true,
      },
    };

    const outState = reducer(inState, action);

    expect(outState.requested).toBe(true);
    expect(outState.isLoading).toBe(true);
  });

  it('should return correct payload for success actiontype', () => {
    const action = {
      ...actionTypes.success,
      payload: {
        bar: 'bar',
      },
    };

    const outState = reducer(inState, action);

    expect(outState.bar).toBe(action.payload.bar);
    expect(outState.isLoading).toBe(false);
  });

  it('should return correct payload for failure actiontype', () => {
    const action = {
      ...actionTypes.failure,
      payload: 'some error message',
    };

    const outState = reducer(inState, action);

    expect(outState.error).toBe(action.payload);
    expect(outState.isLoading).toBe(false);
  });
});
