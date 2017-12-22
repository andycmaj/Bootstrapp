import createFetchActions from './createFetchActions';
import { API_URL } from '../constants';

export const VALUES = 'VALUES';

export const get = () =>
  createFetchActions(VALUES, {
    url: `${API_URL}/values`,
  });
