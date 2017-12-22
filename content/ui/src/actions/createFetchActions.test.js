import { RSAA, validateRSAA } from 'redux-api-middleware';
import createFetchActions, {
  createFetchActionTypes,
} from './createFetchActions';

const actionTypes = createFetchActionTypes('TEST');

describe('createFetchActionTypes', () => {
  it('should return three RSAA action types', () => {
    expect(actionTypes).toMatchSnapshot();
  });
});

describe('createFetchActions', () => {
  describe('with default options', () => {
    const fetch = createFetchActions('TEST', { url: 'url' });

    it('must return the expected RSAA', () => {
      expect(fetch).toMatchSnapshot();
    });

    it('must return a valid RSAA', () => {
      const validationErrors = validateRSAA(fetch);
      expect(validationErrors).toHaveLength(0);
    });
  });

  describe('with method specified', () => {
    const expectedMethod = 'POST';
    const fetch = createFetchActions('TEST', {
      method: expectedMethod,
    });

    it('must return RSAA with specified method', () => {
      expect(fetch[RSAA].method).toBe(expectedMethod);
    });
  });

  describe('with actionTypeOverrides specified', () => {
    const expectedRequestType = 'REQUEST_TYPE';
    const fetch = createFetchActions('TEST', {
      actionTypeOverrides: {
        request: {
          type: expectedRequestType,
        },
        success: {
          payload: (action, state, response) => {},
          meta: { foo: 'foo' },
        },
      },
    });

    it('must return RSAA with overridden request type', () => {
      expect(fetch[RSAA].types[0].type).toBe(expectedRequestType);
    });

    it('must return RSAA with default success type', () => {
      expect(fetch[RSAA].types[1].type).toBe(actionTypes.success.type);
    });

    it('must return RSAA with overridden success payload', () => {
      expect(fetch[RSAA].types[1].payload).toBeDefined();
    });

    it('must return RSAA with overridden success meta', () => {
      expect(fetch[RSAA].types[1].meta.foo).toBeDefined();
    });
  });
});
